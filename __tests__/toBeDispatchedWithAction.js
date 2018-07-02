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
    it("fails if action is not subset of actual dispatched action", () => {
      // const dispatchMock = jest.fn();
      const expectedActionType = "SOMETHING";

      // dispatchMock({
      //   type: expectedActionType,
      //   payload: {
      //     items: [1, 2, 3],
      //     jasper: "hi"
      //   }
      // });

      // expect(dispatchMock).toBeDispatchedWithAction({
      //   type: expectedActionType,
      //   payload: {
      //     items: [1, 2, 4]
      //   }
      // });

      const actual = {
        type: expectedActionType,
        payload: {
          items: [1, 2, 3],
          jasper: "hi"
        }
      };

      const expected = {
        type: expectedActionType,
        payload: {
          items: [1, 2]
        }
      };

      expect(actual).toMatchObject(expected);
    });
    // it('passes if action is subset of actual dispatched action')
  });
});
