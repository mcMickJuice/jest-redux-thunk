declare namespace jest {
  interface Matchers<R> {
    toBeDispatchedWithActionType: (actionType: string) => R;
  }
}
