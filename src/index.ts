expect.extend({
  dispatchedWithActionType(
    receivedDispatchMock: jest.Mock,
    expectedActionType: string
  ) {
    // assert this is a mock
    const calls = receivedDispatchMock.mock.calls;
    // check to see if dispatchMock was called at all
    if (calls.length === 0) {
      return {
        message: () => "Dispatch not called at all",
        pass: false
      };
    }

    // assume always called with one param
    const pass = calls.some(call => call[0].type === expectedActionType);

    const message = pass
      ? () =>
          `${this.utils.matcherHint(
            ".not.dispatchedWithActionType",
            "dispatch",
            "actionType"
          )} \n\n Expected action type ${this.utils.printExpected(
            expectedActionType
          )} not to have been dispatched but it was`
      : () =>
          `${this.utils.matcherHint(
            ".dispatchedWithActionType",
            "dispatch",
            "actionType"
          )} \n\n Expected action type ${this.utils.printExpected(
            expectedActionType
          )} to have been dispatched but it wasn't`;

    return {
      message,
      pass
    };
  }
});
