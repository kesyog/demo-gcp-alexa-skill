#!/bin/sh

# Copyright 2021 Google LLC
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     https://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

# Example of how to use gcloud CLI tool to deploy Cloud Function

# Name of Google Cloud project
GCP_PROJECT=my-project
# Target Google Cloud region
GCP_REGION=us-east4
# Name of Google Cloud function to create/update
GCF_FUNCTION_NAME=ask-request-handler

# Should match entry function in index.ts
ENTRY=entry

gcloud config set project $GCP_PROJECT

gcloud functions deploy $GCF_FUNCTION_NAME \
  --entry-point $ENTRY \
  --allow-unauthenticated \
  --security-level=secure-always \
  --trigger-http \
  --runtime=nodejs12 \
  --region $GCP_REGION \
  --source .
