# Demo of Alexa skill hosted as Google Cloud Function 

[![Code Style: Google](https://img.shields.io/badge/code%20style-google-blueviolet.svg)](https://github.com/google/gts)

This repo demonstrates how one might build and deploy an Alexa skill as a custom web service
implemented in Typescript/Node.js and hosted as a Google Cloud Function on the Google Cloud
Platform. This is one possible alternative to using AWS Lambda.

## Instructions

1. Install the Google Cloud SDK: <https://cloud.google.com/sdk/docs/install>
2. Initialize the SDK via `gcloud auth login` or see <https://cloud.google.com/sdk/docs/initializing> for other options.
3. Replace the `SKILL_ID` in [index.ts](./src/index.ts) with your Alexa skill's id
4. Fill in `GCP_PROJECT`, `GCP_REGION`, and `GCF_FUNCTION_NAME` in [deploy.sh](./bin/deploy.sh).
5. Run `npm run deploy` to deploy the code to your Google Cloud Function.
6. In the Endpoint section of your Alexa skill's developer console, set the endpoint type to HTTPS,
add the URL for your Cloud Function, and set the SSL certificate type to "My development endpoint is
a sub-domain that has a wildcard certificate from a certificate authority."

At this point, you should be all set. Try triggering the `HelloWorldIntent` of your skill.

## References

* [Host a Custom Skill as a Web Service](https://developer.amazon.com/en-US/docs/alexa/custom-skills/host-a-custom-skill-as-a-web-service.html)

## Disclaimer

This is not an officially supported Google product.
This has zero affiliation with Amazon.
