# DNS Migration Guide: Cloudflare to Google Cloud DNS

This guide documents the migration of fairgojustice.com.au from Cloudflare DNS to Google Cloud DNS with Netlify hosting.

## Overview

**Domain:** fairgojustice.com.au  
**Current DNS:** Cloudflare  
**Target DNS:** Google Cloud DNS  
**Hosting:** Netlify (charming-selkie-4d0b33.netlify.app)  
**Google Cloud Project:** fairgojustice48981

---

## Step 1: Create a Managed DNS Zone in Google Cloud DNS

This creates a container for your DNS records within Google Cloud.

```bash
# Define your project ID and domain
PROJECT_ID="fairgojustice48981"
DOMAIN_NAME="fairgojustice.com.au"
ZONE_NAME="fairgojustice-zone" # A unique name for your DNS zone

# Create the managed zone
echo "Creating Google Cloud DNS managed zone for ${DOMAIN_NAME}..."
gcloud dns managed-zones create "${ZONE_NAME}" \
  --dns-name="${DOMAIN_NAME}." \
  --description="Managed zone for fairgojustice.com.au website and future email" \
  --project="${PROJECT_ID}"

echo "Managed zone created. Retrieving Google Cloud DNS Nameservers..."
# Get the nameservers assigned to your new zone
gcloud dns managed-zones describe "${ZONE_NAME}" \
  --project="${PROJECT_ID}" \
  --format="value(nameServers)"
```

Output from the `gcloud dns managed-zones describe` command will show you Google's nameservers, which will look something like this:
```
ns-cloud-e01.googledns.com.
ns-cloud-e02.googledns.com.
ns-cloud-e03.googledns.com.
ns-cloud-e04.googledns.com.
```

**⚠️ IMPORTANT:** Make a note of these nameservers; you will need them in Step 4.

---

## Step 2: Add DNS Records for Netlify (Website)

We will add the CNAME records for both www.fairgojustice.com.au and the bare domain fairgojustice.com.au to point to your Netlify site. Google Cloud DNS supports CNAME records at the apex domain (root domain), which works well with Netlify's hosting infrastructure.

```bash
# Define common variables
PROJECT_ID="fairgojustice48981"
ZONE_NAME="fairgojustice-zone"
NETLIFY_TARGET="charming-selkie-4d0b33.netlify.app." # Note the trailing dot for FQDN

echo "Adding CNAME record for www.${DOMAIN_NAME}..."
# Add CNAME for www
gcloud dns record-sets create "www.${DOMAIN_NAME}." \
  --rrdatas="${NETLIFY_TARGET}" \
  --type="CNAME" \
  --ttl="300" \
  --zone="${ZONE_NAME}" \
  --project="${PROJECT_ID}"

echo "Adding CNAME record for ${DOMAIN_NAME} (bare domain)..."
# Add CNAME for the bare domain (@)
gcloud dns record-sets create "${DOMAIN_NAME}." \
  --rrdatas="${NETLIFY_TARGET}" \
  --type="CNAME" \
  --ttl="300" \
  --zone="${ZONE_NAME}" \
  --project="${PROJECT_ID}"
```

---

## Step 3: Configure Redirects and HTTPS in Netlify

Your Netlify site needs to be configured to handle HTTPS enforcement and redirect the bare domain to www.

### 3.1 Netlify Dashboard Configuration

1. Log in to your Netlify dashboard for the charming-selkie-4d0b33.netlify.app site.
2. Go to **Site Settings → Domain Management**.
3. Under **HTTPS**:
   - Ensure **SSL Certificate** is Enabled.
   - Ensure **Force HTTPS** is Enabled.
4. Under **Primary domain**:
   - Select **www.fairgojustice.com.au** as your primary custom domain.

### 3.2 Redirect Configuration (Already Implemented)

The `_redirects` file has been added to the root of this repository with the following configuration:

```
# Redirect all traffic to www subdomain with HTTPS
# This ensures fairgojustice.com.au redirects to https://www.fairgojustice.com.au
https://fairgojustice.com.au/*    https://www.fairgojustice.com.au/:splat    301!
http://fairgojustice.com.au/*     https://www.fairgojustice.com.au/:splat    301!
```

This ensures:
- `http://fairgojustice.com.au` → 301 → `https://www.fairgojustice.com.au`
- `https://fairgojustice.com.au` → 301 → `https://www.fairgojustice.com.au`
- All traffic is normalized to `https://www.fairgojustice.com.au`

**Note:** These domain-specific redirects use the force flag (`!`) and will take precedence over the SPA routing configuration in `netlify.toml`. The existing SPA routing (status 200 rewrites) only applies after domain-level redirects are processed.

**✅ This configuration is already deployed in the repository.**

---

## Step 4: Update Nameservers at Your Registrar (GoDaddy)

This is the crucial step that switches your domain's DNS authority from Cloudflare to Google Cloud.

1. Log in to your GoDaddy account (or wherever your domain is registered).
2. Navigate to the DNS management settings for fairgojustice.com.au.
3. Find the **Nameservers** section.
4. Change the existing nameservers (currently Cloudflare's, e.g., `kellen.ns.cloudflare.com`) to the four Google Cloud nameservers you obtained in Step 1.
   - Example: `ns-cloud-e01.googledns.com`, `ns-cloud-e02.googledns.com`, etc.
5. Save the changes.

### ⚠️ Propagation Warning

DNS changes can take anywhere from a few minutes to 48 hours to fully propagate across the internet. During this time:
- Your website might experience intermittent availability
- Email services will cease to function until email DNS records are configured

---

## Step 5: Verification Checklist

After waiting for some propagation time (start with 10-15 minutes), you can verify the setup.

### DNS Verification

```bash
# Check if Google's nameservers are authoritative
# Replace with your zone's nameservers from Step 1
dig NS fairgojustice.com.au

# Check DNS resolution for the bare domain - should point to Netlify's CNAME target
dig +short fairgojustice.com.au CNAME

# Check DNS resolution for www - should point to Netlify's CNAME target
dig +short www.fairgojustice.com.au CNAME
```

### HTTP/HTTPS Verification

```bash
# Check the bare domain redirect (HTTP)
curl -I http://fairgojustice.com.au

# Check the bare domain redirect (HTTPS)
curl -I https://fairgojustice.com.au

# Check the www domain (HTTP)
curl -I http://www.fairgojustice.com.au

# Check the www domain (HTTPS) - should load the site with 200 OK
curl -I https://www.fairgojustice.com.au
```

### Expected Results

**For bare domain (`fairgojustice.com.au`) and HTTP requests:**
- You should see `HTTP/2 301` or `HTTP/1.1 301 Moved Permanently` headers
- Redirecting to `https://www.fairgojustice.com.au`

**For `https://www.fairgojustice.com.au`:**
- You should see `HTTP/2 200` or `HTTP/1.1 200 OK`
- Indicating the site loaded successfully

---

## Rollback Plan

If issues arise during migration, you can roll back by:

1. Reverting nameservers at your registrar back to Cloudflare
2. Waiting for DNS propagation (typically faster going back)
3. Verifying site accessibility

---

## Post-Migration Tasks

After successful migration:

1. **Monitor site availability** for 24-48 hours
2. **Set up email DNS records** in Google Cloud DNS (if applicable)
3. **Update any hardcoded DNS references** in your infrastructure
4. **Document the new nameservers** for team reference
5. **Set up monitoring/alerts** for domain expiration and DNS issues

---

## Support

For issues with:
- **DNS Migration:** Contact Google Cloud Support
- **Netlify Configuration:** Contact Netlify Support
- **Domain Registration:** Contact GoDaddy Support

---

**Last Updated:** December 2025  
**Maintained by:** Fair Go Justice Technical Team
