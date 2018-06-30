require("../src");

describe("toBeDispatchedWithActionTypeOrder", () => {
  const actionType1 = "ACTION_TYPE_1";
  const actionType2 = "ACTION_TYPE_2";
  const actionType3 = "ACTION_TYPE_3";
  const expectedActionTypeOrder = [actionType1, actionType2, actionType3];
  describe("invalid parameters", () => {
    it("fails if mock function not passed to expect", () => {
      const myFunc = function fn() {
        /** */
      };
      let error;
      try {
        expect(myFunc).toBeDispatchedWithActionTypeOrder(
          expectedActionTypeOrder
        );
      } catch (e) {
        error = e;
      }

      expect(error).toBeDefined();
      expect(error.message).toMatchSnapshot();
    });
  });

  describe("affirmative tests", () => {
    it("passes if actionTypes are dispatched in correct order", () => {
      const dispatchMock = jest.fn();

      dispatchMock({
        type: actionType1
      });

      dispatchMock({
        type: actionType2
      });
      dispatchMock({
        type: actionType3
      });

      expect(dispatchMock).toBeDispatchedWithActionTypeOrder(
        expectedActionTypeOrder
      );
    });

    it("fails if actionTypes are not dispatched in correct order", () => {
      const dispatchMock = jest.fn();

      dispatchMock({
        type: actionType1
      });

      dispatchMock({
        type: actionType3
      });

      dispatchMock({
        type: actionType2
      });

      let error;

      try {
        expect(dispatchMock).toBeDispatchedWithActionTypeOrder(
          expectedActionTypeOrder
        );
      } catch (e) {
        error = e;
      }

      expect(error).toBeDefined();
      expect(error.message).toMatchSnapshot();
    });

    it("fails if one or more expect action types is not dispatched", () => {
      const dispatchMock = jest.fn();

      dispatchMock({
        type: actionType1
      });

      dispatchMock({
        type: actionType2
      });

      let error;

      try {
        expect(dispatchMock).toBeDispatchedWithActionTypeOrder(
          expectedActionTypeOrder
        );
      } catch (e) {
        error = e;
      }

      expect(error).toBeDefined();
      expect(error.message).toMatchSnapshot();
    });

    it("fails if no dispatches are made", () => {
      const dispatchMock = jest.fn();

      let error;

      try {
        expect(dispatchMock).toBeDispatchedWithActionTypeOrder(
          expectedActionTypeOrder
        );
      } catch (e) {
        error = e;
      }

      expect(error).toBeDefined();
      expect(error.message).toMatchSnapshot();
    });
  });

  describe("negative tests", () => {
    it("passes if action type dispatch order doesnt match", () => {
      const dispatchMock = jest.fn();

      dispatchMock({
        type: actionType1
      });

      dispatchMock({
        type: actionType2
      });

      expect(dispatchMock).not.toBeDispatchedWithActionTypeOrder([
        actionType2,
        actionType1
      ]);
    });
    it("fails if action type dispatch order matches", () => {
      const dispatchMock = jest.fn();

      dispatchMock({
        type: actionType1
      });

      dispatchMock({
        type: actionType2
      });
      dispatchMock({
        type: actionType3
      });

      let error;
      try {
        expect(dispatchMock).not.toBeDispatchedWithActionTypeOrder(
          expectedActionTypeOrder
        );
      } catch (e) {
        error = e;
      }
      expect(error).toBeDefined();
      expect(error.message).toMatchSnapshot();
    });
  });
});
