// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Recorder } from "@azure-tools/test-recorder";
import type {
  CommunicationIdentifier,
  CommunicationUserIdentifier,
  PhoneNumberIdentifier,
} from "@azure/communication-common";
import { serializeCommunicationIdentifier } from "@azure/communication-common";
import { CallMedia } from "../../src/callMedia.js";
import type {
  FileSource,
  TextSource,
  SsmlSource,
  RecognitionChoice,
} from "../../src/models/models.js";
import { DtmfTone } from "../../src/models/models.js";
import type {
  CallMediaRecognizeDtmfOptions,
  CallMediaRecognizeChoiceOptions,
  CallMediaRecognizeSpeechOptions,
  CallAutomationClient,
  CallConnection,
  CallInvite,
  ContinuousDtmfRecognitionOptions,
  SendDtmfTonesOptions,
  CreateCallOptions,
  AnswerCallOptions,
  PlayOptions,
  StartTranscriptionOptions,
  StopTranscriptionOptions,
  HoldOptions,
  UnholdOptions,
} from "../../src/index.js";
import { CallAutomationEventProcessor } from "../../src/index.js";

// Current directory imports
import {
  createRecorder,
  createTestUser,
  dispatcherCallback,
  serviceBusWithNewCall,
  createCallAutomationClient,
  waitForIncomingCallContext,
  waitForEvent,
  events,
  serviceBusReceivers,
  incomingCallContexts,
  loadPersistedEvents,
  persistEvents,
  fileSourceUrl,
  getPhoneNumbers,
} from "../utils/recordedClient.js";
import { createMediaClient, generateHttpClient } from "../utils/mockClient.js";
import {
  CALL_CONNECTION_ID,
  CALL_TARGET_ID,
  MEDIA_UR_MP3,
  MEDIA_URL_WAV,
  baseUri,
  generateToken,
} from "../utils/connectionUtils.js";
import { describe, it, assert, vi, beforeEach, afterEach } from "vitest";

describe("CallMedia Unit Tests", async function () {
  let callMedia: CallMedia;

  afterEach(function () {
    vi.restoreAllMocks();
  });

  it("can instantiate", async function () {
    new CallMedia(
      CALL_CONNECTION_ID,
      baseUri,
      { key: generateToken() },
      new CallAutomationEventProcessor(),
    );
  });

  it("makes successful Play file request", async function () {
    const mockHttpClient = generateHttpClient(202);

    callMedia = createMediaClient(mockHttpClient);
    const spy = vi.spyOn(mockHttpClient, "sendRequest");

    const playSource: FileSource[] = [
      {
        url: MEDIA_UR_MP3,
        kind: "fileSource",
      },
    ];

    const playTo: CommunicationIdentifier[] = [{ communicationUserId: CALL_TARGET_ID }];

    await callMedia.play(playSource, playTo);
    const request = spy.mock.calls[0][0];
    const data = JSON.parse(request.body?.toString() || "");

    assert.equal(data.playTo[0].rawId, CALL_TARGET_ID);
    assert.equal(data.playSources[0].kind, "file");
    assert.equal(data.playSources[0].file.uri, playSource[0].url);
    assert.equal(request.method, "POST");
  });

  it("makes successful Play TTS request", async function () {
    const mockHttpClient = generateHttpClient(202);

    callMedia = createMediaClient(mockHttpClient);
    const spy = vi.spyOn(mockHttpClient, "sendRequest");

    const playSource: TextSource[] = [
      {
        text: "test test test",
        customVoiceEndpointId: "customVoiceEndpointId",
        kind: "textSource",
      },
    ];

    const playTo: CommunicationIdentifier[] = [{ communicationUserId: CALL_TARGET_ID }];

    await callMedia.play(playSource, playTo);
    const request = spy.mock.calls[0][0];
    const data = JSON.parse(request.body?.toString() || "");

    assert.equal(data.playTo[0].rawId, CALL_TARGET_ID);
    assert.equal(data.playSources[0].kind, "text");
    assert.equal(data.playSources[0].text.text, playSource[0].text);
    assert.equal(request.method, "POST");
  });

  it("makes successful Play SSML request", async function () {
    const mockHttpClient = generateHttpClient(202);

    callMedia = createMediaClient(mockHttpClient);
    const spy = vi.spyOn(mockHttpClient, "sendRequest");

    const playSource: SsmlSource[] = [
      {
        ssmlText:
          '<speak version="1.0" xmlns="http://www.w3.org/2001/10/synthesis" xml:lang="en-US"><voice name="en-US-JennyNeural">Recognize Choice Completed, played through SSML source.</voice></speak>',
        customVoiceEndpointId: "customVoiceEndpointId",
        kind: "ssmlSource",
      },
    ];

    const playTo: CommunicationIdentifier[] = [{ communicationUserId: CALL_TARGET_ID }];

    await callMedia.play(playSource, playTo);
    const request = spy.mock.calls[0][0];
    const data = JSON.parse(request.body?.toString() || "");

    assert.equal(data.playTo[0].rawId, CALL_TARGET_ID);
    assert.equal(data.playSources[0].kind, "ssml");
    assert.equal(data.playSources[0].ssml.ssmlText, playSource[0].ssmlText);
    assert.equal(request.method, "POST");
  });

  it("makes successful PlayToAll request", async function () {
    const mockHttpClient = generateHttpClient(202);

    callMedia = createMediaClient(mockHttpClient);
    const spy = vi.spyOn(mockHttpClient, "sendRequest");

    const playSource: FileSource[] = [
      {
        url: MEDIA_URL_WAV,
        kind: "fileSource",
      },
    ];

    const playTo: CommunicationIdentifier[] = [];

    await callMedia.play(playSource, playTo);
    const request = spy.mock.calls[0][0];
    const data = JSON.parse(request.body?.toString() || "");

    assert.equal(data.playSources[0].kind, "file");
    assert.equal(data.playSources[0].file.uri, playSource[0].url);
    assert.equal(request.method, "POST");
  });

  it("makes successful StartRecognizing DTMF request", async function () {
    const mockHttpClient = generateHttpClient(202);

    callMedia = createMediaClient(mockHttpClient);
    const spy = vi.spyOn(mockHttpClient, "sendRequest");
    const targetParticipant: CommunicationIdentifier = { communicationUserId: CALL_TARGET_ID };
    const recognizeOptions: CallMediaRecognizeDtmfOptions = {
      kind: "callMediaRecognizeDtmfOptions",
      maxTonesToCollect: 5,
    };

    await callMedia.startRecognizing(targetParticipant, recognizeOptions);
    const request = spy.mock.calls[0][0];
    const data = JSON.parse(request.body?.toString() || "");

    assert.equal(data.recognizeInputType, "dtmf");
    assert.equal(data.recognizeOptions.dtmfOptions.maxTonesToCollect, 5);
    assert.equal(request.method, "POST");
  });

  it("makes successful StartRecognizing Choices request", async function () {
    const mockHttpClient = generateHttpClient(202);

    callMedia = createMediaClient(mockHttpClient);
    const spy = vi.spyOn(mockHttpClient, "sendRequest");
    const targetParticipant: CommunicationIdentifier = { communicationUserId: CALL_TARGET_ID };
    const choice: RecognitionChoice = {
      label: "choice",
      phrases: ["test"],
    };
    const recognizeOptions: CallMediaRecognizeChoiceOptions = {
      choices: [choice],
      kind: "callMediaRecognizeChoiceOptions",
    };

    await callMedia.startRecognizing(targetParticipant, recognizeOptions);
    const request = spy.mock.calls[0][0];
    const data = JSON.parse(request.body?.toString() || "");

    assert.equal(data.recognizeInputType, "choices");
    assert.equal(data.recognizeOptions.choices[0].phrases[0], "test");
    assert.equal(request.method, "POST");
  });

  it("makes successful StartRecognizing Speech request", async function () {
    const mockHttpClient = generateHttpClient(202);

    callMedia = createMediaClient(mockHttpClient);
    const spy = vi.spyOn(mockHttpClient, "sendRequest");
    const targetParticipant: CommunicationIdentifier = { communicationUserId: CALL_TARGET_ID };
    const recognizeOptions: CallMediaRecognizeSpeechOptions = {
      kind: "callMediaRecognizeSpeechOptions",
      speechModelEndpointId: "customModelEndpointId",
    };

    await callMedia.startRecognizing(targetParticipant, recognizeOptions);
    const request = spy.mock.calls[0][0];
    const data = JSON.parse(request.body?.toString() || "");

    assert.equal(data.recognizeInputType, "speech");
    assert.equal(data.recognizeOptions.speechOptions.endSilenceTimeoutInMs, 2000);
    assert.equal(request.method, "POST");
  });

  it("makes successful CancelAllMediaOperations request", async function () {
    const mockHttpClient = generateHttpClient(202);

    callMedia = createMediaClient(mockHttpClient);
    const spy = vi.spyOn(mockHttpClient, "sendRequest");
    await callMedia.cancelAllOperations();

    const request = spy.mock.calls[0][0];

    assert.equal(request.method, "POST");
  });

  it("makes successful StartContinuousDtmfRecognition request", async function () {
    const mockHttpClient = generateHttpClient(200);

    callMedia = createMediaClient(mockHttpClient);
    const spy = vi.spyOn(mockHttpClient, "sendRequest");
    const targetParticipant: CommunicationIdentifier = { communicationUserId: CALL_TARGET_ID };
    const continuousDtmfRecognitionOptions: ContinuousDtmfRecognitionOptions = {
      operationContext: "test_operation_context",
    };

    await callMedia.startContinuousDtmfRecognition(
      targetParticipant,
      continuousDtmfRecognitionOptions,
    );
    const request = spy.mock.calls[0][0];
    const data = JSON.parse(request.body?.toString() || "");

    assert.deepEqual(data.targetParticipant, serializeCommunicationIdentifier(targetParticipant));
    assert.equal(data.operationContext, continuousDtmfRecognitionOptions.operationContext);
    assert.equal(request.method, "POST");
  });

  it("makes successful StopContinuousDtmfRecognition request", async function () {
    const mockHttpClient = generateHttpClient(200);

    callMedia = createMediaClient(mockHttpClient);
    const spy = vi.spyOn(mockHttpClient, "sendRequest");
    const targetParticipant: CommunicationIdentifier = { communicationUserId: CALL_TARGET_ID };
    const continuousDtmfRecognitionOptions: ContinuousDtmfRecognitionOptions = {
      operationContext: "test_operation_context",
    };

    await callMedia.stopContinuousDtmfRecognition(
      targetParticipant,
      continuousDtmfRecognitionOptions,
    );
    const request = spy.mock.calls[0][0];
    const data = JSON.parse(request.body?.toString() || "");

    assert.deepEqual(data.targetParticipant, serializeCommunicationIdentifier(targetParticipant));
    assert.equal(data.operationContext, continuousDtmfRecognitionOptions.operationContext);
    assert.equal(request.method, "POST");
  });

  it("makes successful SendDtmf request", async function () {
    const mockHttpClient = generateHttpClient(202);

    callMedia = createMediaClient(mockHttpClient);
    const spy = vi.spyOn(mockHttpClient, "sendRequest");
    const targetParticipant: CommunicationIdentifier = { communicationUserId: CALL_TARGET_ID };
    const sendDtmfOptions: SendDtmfTonesOptions = {
      operationContext: "test_operation_context",
    };
    const tones = ["one", "two", "three", "pound"];

    await callMedia.sendDtmfTones(tones, targetParticipant, sendDtmfOptions);
    const request = spy.mock.calls[0][0];
    const data = JSON.parse(request.body?.toString() || "");

    assert.deepEqual(data.targetParticipant, serializeCommunicationIdentifier(targetParticipant));
    assert.deepEqual(data.tones, tones);
    assert.equal(data.operationContext, sendDtmfOptions.operationContext);
    assert.equal(request.method, "POST");
  });

  it("makes successful hold request", async function () {
    const mockHttpClient = generateHttpClient(200);

    callMedia = createMediaClient(mockHttpClient);
    const spy = vi.spyOn(mockHttpClient, "sendRequest");

    const playSource: TextSource = {
      text: "test test test",
      customVoiceEndpointId: "customVoiceEndpointId",
      kind: "textSource",
    };

    const participantToHold: CommunicationIdentifier = { communicationUserId: CALL_TARGET_ID };
    const options: HoldOptions = {
      playSource: playSource,
      operationContext: "withPlaySource",
      operationCallbackUri: "https://localhost",
    };
    await callMedia.hold(participantToHold, options);
    const request = spy.mock.calls[0][0];
    const data = JSON.parse(request.body?.toString() || "");
    assert.equal(data.targetParticipant.rawId, CALL_TARGET_ID);
    assert.equal(data.playSourceInfo.kind, "text");
    assert.equal(data.playSourceInfo.text.text, playSource.text);
    assert.equal(data.operationContext, "withPlaySource");
    assert.equal(data.operationCallbackUri, "https://localhost");
    assert.equal(request.method, "POST");
  });

  it("makes successful Hold request with no playSource", async function () {
    const mockHttpClient = generateHttpClient(200);

    callMedia = createMediaClient(mockHttpClient);
    const spy = vi.spyOn(mockHttpClient, "sendRequest");

    const participantToHold: CommunicationIdentifier = { communicationUserId: CALL_TARGET_ID };
    await callMedia.hold(participantToHold);
    const request = spy.mock.calls[0][0];
    const data = JSON.parse(request.body?.toString() || "");
    assert.equal(data.targetParticipant.rawId, CALL_TARGET_ID);
    assert.equal(request.method, "POST");
    assert.isUndefined(data.playSourceInfo);
  });

  it("makes successful unhold request", async function () {
    const mockHttpClient = generateHttpClient(200);

    callMedia = createMediaClient(mockHttpClient);
    const spy = vi.spyOn(mockHttpClient, "sendRequest");

    const participantToUnhold: CommunicationIdentifier = { communicationUserId: CALL_TARGET_ID };
    const options: UnholdOptions = {
      operationContext: "unholdContext",
    };
    await callMedia.unhold(participantToUnhold, options);
    const request = spy.mock.calls[0][0];
    const data = JSON.parse(request.body?.toString() || "");
    assert.equal(data.targetParticipant.rawId, CALL_TARGET_ID);
    assert.equal(request.method, "POST");
    assert.equal(data.operationContext, options.operationContext);
  });

  it("makes successful Start Hold Music request", async function () {
    const mockHttpClient = generateHttpClient(200);

    callMedia = createMediaClient(mockHttpClient);
    const spy = vi.spyOn(mockHttpClient, "sendRequest");

    const playSource: TextSource = {
      text: "test test test",
      customVoiceEndpointId: "customVoiceEndpointId",
      kind: "textSource",
    };

    const participantToHold: CommunicationIdentifier = { communicationUserId: CALL_TARGET_ID };

    await callMedia.startHoldMusic(participantToHold, playSource);
    const request = spy.mock.calls[0][0];
    const data = JSON.parse(request.body?.toString() || "");
    assert.equal(data.targetParticipant.rawId, CALL_TARGET_ID);
    assert.equal(data.playSourceInfo.kind, "text");
    assert.equal(data.playSourceInfo.text.text, playSource.text);
    assert.equal(request.method, "POST");
  });

  it("makes successful Start Hold Music request with no playSource", async function () {
    const mockHttpClient = generateHttpClient(200);

    callMedia = createMediaClient(mockHttpClient);
    const spy = vi.spyOn(mockHttpClient, "sendRequest");
    const participantToHold: CommunicationIdentifier = { communicationUserId: CALL_TARGET_ID };

    await callMedia.startHoldMusic(participantToHold);
    const request = spy.mock.calls[0][0];
    const data = JSON.parse(request.body?.toString() || "");
    assert.equal(data.targetParticipant.rawId, CALL_TARGET_ID);
    assert.equal(request.method, "POST");
    assert.isUndefined(data.playSourceInfo);
  });

  it("makes successful Stop Hold Music request", async function () {
    const mockHttpClient = generateHttpClient(200);

    callMedia = createMediaClient(mockHttpClient);
    const spy = vi.spyOn(mockHttpClient, "sendRequest");

    const participantToUnhold: CommunicationIdentifier = { communicationUserId: CALL_TARGET_ID };

    await callMedia.stopHoldMusic(participantToUnhold);
    const request = spy.mock.calls[0][0];
    const data = JSON.parse(request.body?.toString() || "");
    assert.equal(data.targetParticipant.rawId, CALL_TARGET_ID);
    assert.equal(request.method, "POST");
  });

  it("makes successful Start Transcription request", async function () {
    const mockHttpClient = generateHttpClient(202);

    callMedia = createMediaClient(mockHttpClient);
    const spy = vi.spyOn(mockHttpClient, "sendRequest");
    const startTranscriptionOptions: StartTranscriptionOptions = {
      locale: "en-US",
      operationContext: "test_operation_context",
    };

    await callMedia.startTranscription(startTranscriptionOptions);
    const request = spy.mock.calls[0][0];
    const data = JSON.parse(request.body?.toString() || "");

    assert.equal(data.locale, startTranscriptionOptions.locale);
    assert.equal(data.operationContext, startTranscriptionOptions.operationContext);
    assert.equal(request.method, "POST");
  });

  it("makes successful Stop TranscriptionOptions request", async function () {
    const mockHttpClient = generateHttpClient(202);

    callMedia = createMediaClient(mockHttpClient);
    const spy = vi.spyOn(mockHttpClient, "sendRequest");
    const stopTranscriptionOptions: StopTranscriptionOptions = {
      operationContext: "test_operation_context",
    };

    await callMedia.stopTranscription(stopTranscriptionOptions);
    const request = spy.mock.calls[0][0];
    const data = JSON.parse(request.body?.toString() || "");

    assert.equal(data.operationContext, stopTranscriptionOptions.operationContext);
    assert.equal(request.method, "POST");
  });

  it("makes successful Update Transcription request", async function () {
    const mockHttpClient = generateHttpClient(202);

    callMedia = createMediaClient(mockHttpClient);
    const spy = vi.spyOn(mockHttpClient, "sendRequest");
    const locale = "en-US";

    await callMedia.updateTranscription(locale);
    const request = spy.mock.calls[0][0];
    const data = JSON.parse(request.body?.toString() || "");

    assert.equal(data.locale, locale);
    assert.equal(request.method, "POST");
  });
});

describe("Call Media Client Live Tests", function () {
  let recorder: Recorder;
  let callerCallAutomationClient: CallAutomationClient;
  let receiverCallAutomationClient: CallAutomationClient;
  let callConnection: CallConnection;
  let testUser: CommunicationUserIdentifier;
  let testUser2: CommunicationUserIdentifier;
  let callerPhoneUser: PhoneNumberIdentifier;
  let receiverPhoneUser: PhoneNumberIdentifier;
  let testName: string;

  beforeEach(async function (ctx) {
    recorder = await createRecorder(ctx);
    testUser = await createTestUser(recorder);
    testUser2 = await createTestUser(recorder);
    callerCallAutomationClient = createCallAutomationClient(recorder, testUser);
    receiverCallAutomationClient = createCallAutomationClient(recorder, testUser2);
  });

  afterEach(async function () {
    persistEvents(testName);
    serviceBusReceivers.forEach((receiver) => {
      receiver.close();
    });
    events.forEach((callConnectionEvents) => {
      callConnectionEvents.clear();
    });
    events.clear();
    serviceBusReceivers.clear();
    incomingCallContexts.clear();
    await recorder.stop();
    if (callConnection) {
      try {
        await callConnection.hangUp(true);
      } catch {
        return;
      }
    }
  });

  it("Play audio to target participant", { timeout: 60000 }, async function (ctx) {
    const fullTitle: string | undefined =
      ctx.task.suite && ctx.task.suite.name && ctx.task.name
        ? `${ctx.task.suite.name} ${ctx.task.name}`
        : undefined;
    testName = fullTitle ? fullTitle.replace(/ /g, "_") : "create_call_and_hang_up";
    await loadPersistedEvents(testName);

    const callInvite: CallInvite = { targetParticipant: testUser2 };
    const uniqueId = await serviceBusWithNewCall(testUser, testUser2);
    const callBackUrl: string = dispatcherCallback + `?q=${uniqueId}`;
    const createCallOption: CreateCallOptions = { operationContext: "playAudioCreateCall" };

    const result = await callerCallAutomationClient.createCall(
      callInvite,
      callBackUrl,
      createCallOption,
    );
    const incomingCallContext = await waitForIncomingCallContext(uniqueId, 8000);
    const callConnectionId: string = result.callConnectionProperties.callConnectionId
      ? result.callConnectionProperties.callConnectionId
      : "";
    assert.isDefined(incomingCallContext);

    if (incomingCallContext) {
      const answerCallOption: AnswerCallOptions = { operationContext: "playAudioAnswer" };
      await receiverCallAutomationClient.answerCall(
        incomingCallContext,
        callBackUrl,
        answerCallOption,
      );
    }
    const callConnectedEvent = await waitForEvent("CallConnected", callConnectionId, 8000);
    assert.isDefined(callConnectedEvent);
    callConnection = result.callConnection;

    const playSource: FileSource[] = [
      {
        url: fileSourceUrl,
        kind: "fileSource",
      },
    ];

    const playOption: PlayOptions = { operationContext: "playAudio" };
    await callConnection.getCallMedia().play(playSource, [testUser2], playOption);
    const playCompletedEvent = await waitForEvent("PlayCompleted", callConnectionId, 20000);
    assert.isDefined(playCompletedEvent);
    await callConnection.hangUp(true);
    const callDisconnectedEvent = await waitForEvent("CallDisconnected", callConnectionId, 8000);
    assert.isDefined(callDisconnectedEvent);
  });

  it("Play audio to all participants", { timeout: 60000 }, async function (ctx) {
    const fullTitle: string | undefined =
      ctx.task.suite && ctx.task.suite.name && ctx.task.name
        ? `${ctx.task.suite.name} ${ctx.task.name}`
        : undefined;
    testName = fullTitle ? fullTitle.replace(/ /g, "_") : "create_call_and_hang_up";
    await loadPersistedEvents(testName);

    const callInvite: CallInvite = { targetParticipant: testUser2 };
    const uniqueId = await serviceBusWithNewCall(testUser, testUser2);
    const callBackUrl: string = dispatcherCallback + `?q=${uniqueId}`;
    const createCallOption: CreateCallOptions = { operationContext: "playToAllCreateCall" };

    const result = await callerCallAutomationClient.createCall(
      callInvite,
      callBackUrl,
      createCallOption,
    );
    const incomingCallContext = await waitForIncomingCallContext(uniqueId, 8000);
    const callConnectionId: string = result.callConnectionProperties.callConnectionId
      ? result.callConnectionProperties.callConnectionId
      : "";
    assert.isDefined(incomingCallContext);

    if (incomingCallContext) {
      const answerCallOption: AnswerCallOptions = { operationContext: "playToAllAnswer" };
      await receiverCallAutomationClient.answerCall(
        incomingCallContext,
        callBackUrl,
        answerCallOption,
      );
    }
    const callConnectedEvent = await waitForEvent("CallConnected", callConnectionId, 8000);
    assert.isDefined(callConnectedEvent);
    callConnection = result.callConnection;

    const playSource: FileSource[] = [
      {
        url: fileSourceUrl,
        kind: "fileSource",
      },
    ];

    const playOption: PlayOptions = { operationContext: "playToAllAudio" };
    await callConnection.getCallMedia().playToAll(playSource, playOption);

    const playCompletedEvent = await waitForEvent("PlayCompleted", callConnectionId, 20000);
    assert.isDefined(playCompletedEvent);

    await callConnection.hangUp(true);
    const callDisconnectedEvent = await waitForEvent("CallDisconnected", callConnectionId, 8000);
    assert.isDefined(callDisconnectedEvent);
  });

  it("Cancel all media operations", { timeout: 60000 }, async function (ctx) {
    const fullTitle: string | undefined =
      ctx.task.suite && ctx.task.suite.name && ctx.task.name
        ? `${ctx.task.suite.name} ${ctx.task.name}`
        : undefined;
    testName = fullTitle ? fullTitle.replace(/ /g, "_") : "create_call_and_hang_up";
    await loadPersistedEvents(testName);

    const callInvite: CallInvite = { targetParticipant: testUser2 };
    const uniqueId = await serviceBusWithNewCall(testUser, testUser2);
    const callBackUrl: string = dispatcherCallback + `?q=${uniqueId}`;
    const createCallOption: CreateCallOptions = { operationContext: "CancelMediaCreateCall" };

    const result = await callerCallAutomationClient.createCall(
      callInvite,
      callBackUrl,
      createCallOption,
    );
    const incomingCallContext = await waitForIncomingCallContext(uniqueId, 8000);
    const callConnectionId: string = result.callConnectionProperties.callConnectionId
      ? result.callConnectionProperties.callConnectionId
      : "";
    assert.isDefined(incomingCallContext);

    if (incomingCallContext) {
      const answerCallOption: AnswerCallOptions = { operationContext: "CancelMediaAnswer" };
      await receiverCallAutomationClient.answerCall(
        incomingCallContext,
        callBackUrl,
        answerCallOption,
      );
    }
    const callConnectedEvent = await waitForEvent("CallConnected", callConnectionId, 8000);
    assert.isDefined(callConnectedEvent);
    callConnection = result.callConnection;

    const playSource: FileSource[] = [
      {
        url: fileSourceUrl,
        kind: "fileSource",
      },
    ];

    const playOption: PlayOptions = { operationContext: "CancelplayToAllAudio" };
    await callConnection.getCallMedia().playToAll(playSource, playOption);
    await callConnection.getCallMedia().cancelAllOperations();

    const playCanceledEvent = await waitForEvent("PlayCanceled", callConnectionId, 20000);
    assert.isDefined(playCanceledEvent);

    await callConnection.hangUp(true);
    const callDisconnectedEvent = await waitForEvent("CallDisconnected", callConnectionId, 8000);
    assert.isDefined(callDisconnectedEvent);
  });

  it("Trigger DTMF actions", { timeout: 60000 }, async function (ctx) {
    const fullTitle: string | undefined =
      ctx.task.suite && ctx.task.suite.name && ctx.task.name
        ? `${ctx.task.suite.name} ${ctx.task.name}`
        : undefined;
    testName = fullTitle
      ? fullTitle.replace(/ /g, "_")
      : "create_call_and_trigger_dtmf_actions_then_hang_up";
    await loadPersistedEvents(testName);

    const phoneNumbers = await getPhoneNumbers(recorder);
    assert.isAtLeast(
      phoneNumbers.length,
      2,
      "Invalid PSTN setup, test needs at least 2 phone numbers",
    );
    callerPhoneUser = { phoneNumber: phoneNumbers.pop() as string };
    receiverPhoneUser = { phoneNumber: phoneNumbers.pop() as string };

    const callInvite: CallInvite = {
      targetParticipant: receiverPhoneUser,
      sourceCallIdNumber: callerPhoneUser,
    };
    const uniqueId = await serviceBusWithNewCall(callerPhoneUser, receiverPhoneUser);
    const callBackUrl: string = dispatcherCallback + `?q=${uniqueId}`;

    const result = await callerCallAutomationClient.createCall(callInvite, callBackUrl);
    const incomingCallContext = await waitForIncomingCallContext(uniqueId, 30000);
    const callConnectionId: string = result.callConnectionProperties.callConnectionId
      ? result.callConnectionProperties.callConnectionId
      : "";
    assert.isDefined(incomingCallContext);

    if (incomingCallContext) {
      await receiverCallAutomationClient.answerCall(incomingCallContext, callBackUrl);
    }
    const callConnectedEvent = await waitForEvent("CallConnected", callConnectionId, 8000);
    assert.isDefined(callConnectedEvent);
    callConnection = result.callConnection;

    const continuousDtmfRecognitionOptions1: ContinuousDtmfRecognitionOptions = {
      operationContext: "ContinuousDtmfRecognitionStart",
    };
    await callConnection
      .getCallMedia()
      .startContinuousDtmfRecognition(receiverPhoneUser, continuousDtmfRecognitionOptions1);

    const continuousDtmfRecognitionOptions2: ContinuousDtmfRecognitionOptions = {
      operationContext: "ContinuousDtmfRecognitionSend",
    };
    await callConnection
      .getCallMedia()
      .sendDtmfTones([DtmfTone.Pound], receiverPhoneUser, continuousDtmfRecognitionOptions2);
    const sendDtmfCompleted = await waitForEvent("SendDtmfTonesCompleted", callConnectionId, 8000);
    assert.isDefined(sendDtmfCompleted);

    const continuousDtmfRecognitionOptions3: ContinuousDtmfRecognitionOptions = {
      operationContext: "ContinuousDtmfRecognitionStop",
    };
    await callConnection
      .getCallMedia()
      .stopContinuousDtmfRecognition(receiverPhoneUser, continuousDtmfRecognitionOptions3);
    const continuousDtmfRecognitionStopped = await waitForEvent(
      "ContinuousDtmfRecognitionStopped",
      callConnectionId,
      8000,
    );
    assert.isDefined(continuousDtmfRecognitionStopped);

    await callConnection.hangUp(true);
    const callDisconnectedEvent = await waitForEvent("CallDisconnected", callConnectionId, 8000);
    assert.isDefined(callDisconnectedEvent);
  });
});
