import { reducerWS, initialState } from "../services/reducers/feedWS";
import {
  FEED_CONNECTION_SUCCESS,
  FEED_CONNECTION_ERROR,
  FEED_CONNECTION_CLOSED,
  FEED_GET_MESSAGE,
} from "../services/actions/feedWS";

describe("testing reducerWS", () => {
  it("should return the initial state", () => {
    expect(reducerWS(undefined, {})).toEqual(initialState);
  });

  it("should handle FEED_CONNECTION_SUCCESS", () => {
    const resucerResponse = reducerWS(initialState, {
      type: FEED_CONNECTION_SUCCESS,
    });
    const expectedResult = { ...initialState, isOpen: true };
    expect(resucerResponse).toEqual(expectedResult);
  });

  it("should handle FEED_CONNECTION_ERROR", () => {
    const resucerResponse = reducerWS(initialState, {
      type: FEED_CONNECTION_ERROR,
      payload: "errormessage",
    });
    const expectedResult = { ...initialState, error: "errormessage" };
    expect(resucerResponse).toEqual(expectedResult);
  });

  it("should handle FEED_CONNECTION_CLOSED", () => {
    const resucerResponse = reducerWS(initialState, {
      type: FEED_CONNECTION_CLOSED,
    });
    const expectedResult = { ...initialState, isOpen: false };
    expect(resucerResponse).toEqual(expectedResult);
  });

  it("should handle FEED_GET_MESSAGE", () => {
    const resucerResponse = reducerWS(initialState, {
      type: FEED_GET_MESSAGE,
      payload: { data: [1, 2, 3] },
    });

    const expectedResult = { ...initialState, data: [1, 2, 3] };
    expect(resucerResponse).toEqual(expectedResult);
  });
});
