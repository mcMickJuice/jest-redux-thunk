# jest-redux-thunk

Custom jest matchers to help with testing redux thunk actions

## The problem

Your redux actions leverage [redux-thunk](https://github.com/reduxjs/redux-thunk) and you want to test them. There are many ways to perform testing on redux actions, but to keep it simple, I tend to just use [jest mock functions](http://jestjs.io/docs/en/mock-functions.html). However, testing dispatch function as a thunk in this way involves digging into `mock.calls` properties and results in a bunch of boilerplate in order to make certain assertions.

## This solution

`jest-redux-thunk` provides a set of custom jest matchers that are specific to testing redux-thunk actions using the mock function approach. This includes looking for the `type` property on action objects and outputting helpful test failure messages.

## Installation

This module is distributed via npm and should be installed as a `devDependencies`:

```
npm install --save-dev jest-redux-thunk
```

## Usage

Import `jest-redux-thunk` which loads this library's matchers. You can perform this import in each test file or once in a [jest setup file](http://jestjs.io/docs/en/configuration.html#setuptestframeworkscriptfile-string) (recommended)

## Custom matchers

### `toBeDispatchedWithActionType`

Assert that an action has been dispatched with a certain type.

```javascript
import `jest-redux-thunk`

it('dispatches action with type CREATE_STORY', () => {
  const dispatchMock = jest.fn()

  someThunkActionCreator(dispatchMock)

  expect(dispatchMock).toBeDispatchedWithActionType('CREATE_STORY')
})
```

This matcher passes if there is at least one action dispatched that has a type that matches the expected type.

### `toBeDispatchedWithActionTypeOrder`

Assert that actions are dispatched in a certain order.

```javascript
import `jest-redux-thunk`

it('dispatches story load actions in correct order', () => {
  const dispatchMock = jest.fn()

  someThunkActionThatDispatchesMultipleTimes(dispatchMock)

  expect(dispatchMock).toBeDispatchedWithActionTypeOrder(['LOAD_STORY', 'LOAD_AUTHORS', 'LOAD_CHARACTERS'])
})
```

This matcher will fail if the order in which actions are dispatched doesn't match expected order or if expected action(s) was not dispatched at all.

# FAQ (actually, just one question that some might have regarding these matchers)

> Why not just use `toHaveBeenCalledWith`?

Good question! `toHaveBeenCalledWith` uses a deep equal comparison to compare expected parameters and actual. For testing
redux thunk, that might be too strict and lead to bloated tests

```javascript
it("action dispatches CREATE_STORY action", () => {
  const dispatchMock = jest.fn();

  dispatchMock({
    type: "CREATE_STORY",
    payload: {
      story: {
        id: 1,
        title: "New Story"
      }
    }
  });

  // fails!
  expect(dispatchMock).toHaveBeenCalledWith({
    type: "CREATE_STORY"
    // exclude payload in assertion as that's part of another test
  });
});
```

The above test would fail because we didn't specify `payload` in the value passed to `toHaveBeenCalledWith`.

This library's extensions allow for testing dispatch functions based on action types that have been dispatched:

```javascript
it("action dispatches CREATE_STORY action", () => {
  const dispatchMock = jest.fn();

  dispatchMock({
    type: "CREATE_STORY",
    payload: {
      story: {
        id: 1,
        title: "New Story"
      }
    }
  });

  // passes!
  expect(dispatchMock).toBeDispatchedWithActionType("CREATE_STORY");
});
```
