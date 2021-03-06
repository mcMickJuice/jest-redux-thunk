declare namespace jest {
  interface Matchers<R> {
    /**
     * Expects that passed in mock function has been called at least once with an action
     * whose type matches expected actionType
     */
    toBeDispatchedWithActionType: (actionType: string) => R;
    /**
     * Expects that passed in mock function has been called with actions whose
     * type match the order of the expected actionTypes
     */
    toBeDispatchedWithActionTypeOrder: (
      actionTypesInExpectedOrder: string[]
    ) => R;

    /**
     * Expects that passed in mock function has been called with an action that matches
     * expected action using subset matching (similar to "toMatchObject" functionality)
     */
    toBeDispatchedWithAction: (
      action: { type: string; [prop: string]: any }
    ) => R;
  }
}
