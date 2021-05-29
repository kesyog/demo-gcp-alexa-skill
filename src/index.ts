// Copyright 2021 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import * as express from 'express';
import * as handlers from './handlers';
import {SkillBuilders} from 'ask-sdk-core';
import {
  SkillRequestSignatureVerifier,
  TimestampVerifier,
} from 'ask-sdk-express-adapter';

const SKILL_ID = 'amzn1.ask.skill.1.placeholder';

const skillBuilder = SkillBuilders.custom()
  .addRequestHandlers(
    handlers.LaunchRequestHandler,
    handlers.HelloWorldIntentHandler
  )
  .addErrorHandlers(handlers.ErrorHandler);

// Verify that the request came from the right skill
// https://developer.amazon.com/en-US/docs/alexa/custom-skills/handle-requests-sent-by-alexa.html#request-verify
const skill = skillBuilder.withSkillId(SKILL_ID).create();

// Workaround to be able to use `rawBody` extension of express.Request
// https://github.com/GoogleCloudPlatform/functions-framework-nodejs/issues/198
export interface Request extends express.Request {
  rawBody: string;
}

/**
 * Entry function that responds to any HTTP request.
 *
 * @param req HTTP request context.
 * @param res HTTP response context.
 */
export const entry = async (req: Request, res: express.Response) => {
  // Verify request came from Amazon
  // https://developer.amazon.com/en-US/docs/alexa/custom-skills/host-a-custom-skill-as-a-web-service.html#verify-request-sent-by-alexa
  try {
    await new SkillRequestSignatureVerifier().verify(req.rawBody, req.headers);
    await new TimestampVerifier().verify(req.rawBody);
  } catch (err) {
    // Alexa specifies that 400 Bad Request should be returned upon verification error
    res.status(400).end();
    return;
  }

  try {
    const response = await skill.invoke(req.body);
    res.status(200).send(response);
  } catch (error) {
    res.status(500).end();
  }
};
