// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PerfOptionDictionary } from "../../src";
import { EventPerfTest } from "../../src/eventPerfTest";
import { MockEventReceiver, Event } from "./mockEventReceiver";

export class MockEventReceiverTest extends EventPerfTest {
  public client: MockEventReceiver;
  public options: PerfOptionDictionary = {};
  public subscriber: { close: () => Promise<void> } | undefined;

  constructor() {
    super();
    this.client = new MockEventReceiver();
  }

  setup() {
    this.subscriber = this.client.subscribe(
      {
        processEvent: async (_event: Event) => {
          // { event: event }
          this.eventRaised();
        },
        processError: async (error: Error) => {
          this.errorRaised(error);
        },
      },
      { raiseErrorAfterInSeconds: 10 },
    );
  }

  async cleanup() {
    await this.subscriber?.close();
  }
}
