import diff from "jest-diff";
import deepEqual from "lodash.isequal";
import { assertIsMockFunction } from "./utils";

function toBeDispatchedWithActionTypeOrder(
  this: jest.MatcherUtils,
  dispatchMock: jest.Mock,
  expectedActionTypeOrder: string[]
) {
  assertIsMockFunction(dispatchMock);

  const calls = dispatchMock.mock.calls;
  const actualDispatchedActionTypes = calls.map(call => call[0].type);

  const pass = deepEqual(expectedActionTypeOrder, actualDispatchedActionTypes);

  const message = pass
    ? () =>
        `${this.utils.matcherHint(
          ".not.toBeDispatchedWithActionTypeOrder",
          "dispatch",
          "actionTypeOrder"
        )}\n\nExpected action type sequence not to have matched but it did`
    : () => {
        const diffString = diff(
          expectedActionTypeOrder,
          actualDispatchedActionTypes
        );

        return `Expected Dispatched Action Types (in order):\n${this.utils.printExpected(
          expectedActionTypeOrder
        )}\n\nActual Dispatched Action Types (in order):\n${this.utils.printReceived(
          actualDispatchedActionTypes
        )}\n\nDifference:\n${diffString}`;
      };

  return {
    message,
    pass
  };
}

export default toBeDispatchedWithActionTypeOrder;
