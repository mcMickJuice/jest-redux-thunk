export const assertIsMockFunction = (mock: any) => {
  if (mock._isMockFunction !== true) {
    throw new Error("Value provided is not a mock function");
  }
};

export const assertActionTypeProvided = (actionType: any) => {
  if (actionType == null) {
    throw new Error("ActionType not provided");
  }
};
