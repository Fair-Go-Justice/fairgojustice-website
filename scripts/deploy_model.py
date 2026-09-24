#!/usr/bin/env python3

"""
Deploy the AusLegalQA Mixtral model to Google Cloud Vertex AI.

This script deploys a Hugging Face model for Australian legal question answering.

Prerequisites:
1. Install dependencies: pip install -r requirements.txt
2. Authenticate with Google Cloud: gcloud auth application-default login
3. Ensure the project 'fairgojustice48981' exists and you have permissions
4. Accept the EULA for the model if required
"""

import vertexai
from vertexai import model_garden

def main():
    # Initialize Vertex AI
    vertexai.init(project="fairgojustice48981", location="us-central1")

    # Load the model from Hugging Face
    model = model_garden.OpenModel("hf-adlumal/auslegalqa-mixtral-8x7b")

    # Deploy the model
    endpoint = model.deploy(
        accept_eula=True,
        machine_type="a3-highgpu-2g",
        accelerator_type="NVIDIA_H100_80GB",
        accelerator_count=2,
        endpoint_display_name="Forensicologist Endpoint",
        model_display_name="Forensicologist",
        use_dedicated_endpoint=True,
        reservation_affinity_type="NO_RESERVATION",
    )

    print(f"Model deployed successfully!")
    print(f"Endpoint: {endpoint}")
    print(f"Model ID: {model}")

if __name__ == "__main__":
    main()