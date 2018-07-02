require("../src");

describe("toBeDispatchedWithAction", () => {
  describe("invalid parameters", () => {
    it("fails if no calls are made", () => {
      let error;
      try {
        expect(jest.fn()).toBeDispatchedWithAction({ type: "hello" });
      } catch (e) {
        error = e;
      }

      expect(error).toBeDefined();
      expect(error.message).toMatchSnapshot();
    });
    it("fails if dispatchMock is not a mock", () => {
      function fn() {}

      let error;
      try {
        expect(fn).toBeDispatchedWithAction({ type: "hello" });
      } catch (e) {
        error = e;
      }

      expect(error).toBeDefined();
      expect(error.message).toMatchSnapshot();
    });
    it("fails if action.type is undefined", () => {
      let error;
      try {
        expect(jest.fn()).toBeDispatchedWithAction({
          payload: {}
        });
      } catch (e) {
        error = e;
      }

      expect(error).toBeDefined();
      expect(error.message).toMatchSnapshot();
    });
  });

  describe("affirmative tests", () => {
    it("fails if action.type is never dispatched", () => {
      const dispatchMock = jest.fn();

      dispatchMock({
        type: "NOTHING"
      });

      let error;
      try {
        expect(dispatchMock).toBeDispatchedWithAction({
          type: "SOMETHING"
        });
      } catch (e) {
        error = e;
      }
      expect(error).toBeDefined();
      expect(error.message).toMatchSnapshot();
    });
    it("fails if action.type is dispatched multiple times", () => {
      const dispatchMock = jest.fn();
      const expectedActionType = "SOMETHING";

      dispatchMock({
        type: expectedActionType
      });

      dispatchMock({
        type: expectedActionType
      });

      let error;
      try {
        expect(dispatchMock).toBeDispatchedWithAction({
          type: expectedActionType
        });
      } catch (e) {
        error = e;
      }
      expect(error).toBeDefined();
      expect(error.message).toMatchSnapshot();
    });
    it("fails if action is not subset of actual dispatched action - different payload properties", () => {
      const dispatchMock = jest.fn();
      const expectedActionType = "SOMETHING";

      dispatchMock({
        type: expectedActionType,
        payload: {
          items: [1, 2, 3]
        }
      });

      let error;

      try {
        expect(dispatchMock).toBeDispatchedWithAction({
          type: expectedActionType,
          payload: {
            name: "mike"
          }
        });
      } catch (e) {
        error = e;
      }

      expect(error).toBeDefined();
      expect(error.message).toMatchSnapshot();
    });

    it("fails if action is not subset of actual dispatched action - payload properties don't match", () => {
      const dispatchMock = jest.fn();
      const expectedActionType = "SOMETHING";

      dispatchMock({
        type: expectedActionType,
        payload: {
          items: [1, 2, 3]
        }
      });

      let error;

      try {
        expect(dispatchMock).toBeDispatchedWithAction({
          type: expectedActionType,
          payload: {
            items: [1, 2]
          }
        });
      } catch (e) {
        error = e;
      }

      expect(error).toBeDefined();
      expect(error.message).toMatchSnapshot();
    });

    it("passes if action is subset of actual dispatched action - meta check", () => {
      const dispatchMock = jest.fn();
      const expectedActionType = "SOMETHING";

      dispatchMock({
        type: expectedActionType,
        meta: {
          message: "hi"
        },
        payload: {
          items: [1, 2, 3]
        }
      });

      expect(dispatchMock).toBeDispatchedWithAction({
        type: expectedActionType,
        meta: {
          message: "hi"
        }
      });
    });

    it("passes if action is subset of actual dispatched action - property subset", () => {
      const dispatchMock = jest.fn();
      const expectedActionType = "SOMETHING";

      dispatchMock({
        type: expectedActionType,
        payload: {
          items: [1, 2, 3],
          name: "mike"
        }
      });

      expect(dispatchMock).toBeDispatchedWithAction({
        type: expectedActionType,
        payload: {
          items: [1, 2, 3]
        }
      });
    });

    it("passes if multiple actions are dispatched", () => {
      const dispatchMock = jest.fn();
      const expectedActionType = "SOMETHING";

      dispatchMock({
        type: "ANOTHER TYPE",
        payload: {
          name: "mike"
        }
      });

      dispatchMock({
        type: expectedActionType,
        payload: {
          items: [1, 2, 3]
        }
      });

      expect(dispatchMock).toBeDispatchedWithAction({
        type: expectedActionType,
        payload: {
          items: [1, 2, 3]
        }
      });
    });

    it("passes if undefined is dispatched", () => {
      const dispatchMock = jest.fn();
      const expectedActionType = "SOMETHING";

      dispatchMock(undefined);

      dispatchMock({
        type: expectedActionType,
        payload: {
          items: [1, 2, 3]
        }
      });

      expect(dispatchMock).toBeDispatchedWithAction({
        type: expectedActionType,
        payload: {
          items: [1, 2, 3]
        }
      });
    });
  });
});
