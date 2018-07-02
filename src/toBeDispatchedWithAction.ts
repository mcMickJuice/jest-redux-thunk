import diff from "jest-diff";
import {
  assertActionTypeProvided,
  assertIsMockFunction,
  toMatchObjectComparison
} from "./utils";
/**
 * ensures that an action was dispatched that matches a certain type
 * for actions that match that type, check each key to see if subset
 * actual dispatched thing
 *
 * similar to "toMatchObject" but with mocks
 */

interface ExpectedAction {
  type: string;
  [prop: string]: any;
}

function toBeDispatchedWithAction(
  this: jest.MatcherUtils,
  receivedDispatchMock: jest.Mock,
  expectedAction: ExpectedAction
) {
  assertIsMockFunction(receivedDispatchMock);
  assertActionTypeProvided(expectedAction.type);

  const calls = receivedDispatchMock.mock.calls;
  // check to see if dispatchMock was called at all
  if (calls.length === 0) {
    return {
      message: () => "Dispatch not called",
      pass: false
    };
  }

  const matchingActionTypeCalls = calls.filter(
    call => call[0].type === expectedAction.type
  );

  if (matchingActionTypeCalls.length === 0) {
    return {
      message: () => `No Action dispatched with type ${expectedAction.type}`,
      pass: false
    };
  }

  // TODO: support this?
  if (matchingActionTypeCalls.length > 1) {
    throw new Error(
      `Action of type ${
        expectedAction.type
      } dispatched multiple times. This matcher only supports action dispatched one time`
    );
  }

  const matchingDispatchedAction = matchingActionTypeCalls[0][0];

  const { type: _, ...otherProps } = expectedAction;

  const pass = Object.keys(otherProps).every(propKey => {
    const actual = matchingDispatchedAction[propKey];
    const expected = expectedAction[propKey];

    return toMatchObjectComparison(actual, expected);
  });

  const message = pass
    ? () =>
        `${this.utils.matcherHint(
          ".not.toBeDispatchedWithActionTypeOrder",
          "dispatch",
          "actionTypeOrder"
        )}\n\nExpected action type sequence not to have matched but it did`
    : () => {
        const diffString = diff(expectedAction, matchingDispatchedAction);

        return `Expected Dispatched Action:\n${this.utils.printExpected(
          expectedAction
        )}\n\nActual Dispatched Action Types (in order):\n${this.utils.printReceived(
          matchingDispatchedAction
        )}\n\nDifference:\n${diffString}`;
      };

  return {
    message,
    pass
  };
}

export default toBeDispatchedWithAction;
