require("../src");

const expectedActionType = "EXPECTED_ACTION_TYPE";
describe("dispatchWithActionType", () => {
  describe("invalid parameters", () => {
    it("fails if no calls made", () => {
      const dispatchMock = jest.fn();

      let error;
      try {
        expect(dispatchMock).toBeDispatchedWithActionType(expectedActionType);
      } catch (e) {
        error = e;
      }

      expect(error).toBeDefined();
      expect(error.message).toMatchSnapshot();
    });
    it("fails if dispatchMock is not a mock", () => {
      const myFunc = function fn() {
        /** */
      };
      let error;
      try {
        expect(myFunc).toBeDispatchedWithActionType(expectedActionType);
      } catch (e) {
        error = e;
      }

      expect(error).toBeDefined();
      expect(error.message).toMatchSnapshot();
    });
    it("fails if no expectedActionType provided", () => {
      const dispatchMock = jest.fn();
      let error;
      try {
        // tell typescript to shutup
        expect(dispatchMock).toBeDispatchedWithActionType(undefined);
      } catch (e) {
        error = e;
      }

      expect(error).toBeDefined();
      expect(error.message).toMatchSnapshot();
    });
  });

  describe("affirmative tests", () => {
    it("fails if actionType is never dispatched", () => {
      const dispatchMock = jest.fn();

      dispatchMock({
        type: "SOMETHING_ELSE"
      });

      let error;
      try {
        expect(dispatchMock).toBeDispatchedWithActionType(expectedActionType);
      } catch (e) {
        error = e;
      }

      expect(error).toBeDefined();
      expect(error.message).toMatchSnapshot();
    });
    it("passes if actionType is dispatched", () => {
      const dispatchMock = jest.fn();

      dispatchMock({
        type: expectedActionType
      });

      expect(dispatchMock).toBeDispatchedWithActionType(expectedActionType);
    });
  });

  describe("not tests", () => {
    it("passes if actionType is not dispatched", () => {
      const dispatchMock = jest.fn();

      dispatchMock({
        type: "SOMETHING_ELSE"
      });

      expect(dispatchMock).not.toBeDispatchedWithActionType(expectedActionType);
    });
    it("passes if no calls made to dispatch", () => {
      const dispatchMock = jest.fn();

      expect(dispatchMock).not.toBeDispatchedWithActionType(expectedActionType);
    });
  });
});
