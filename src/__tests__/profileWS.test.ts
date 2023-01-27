import {
  profileReducerWS,
  profileInitialState,
} from "../services/reducers/profileWS";
import {
  PROFILE_CONNECTION_SUCCESS,
  PROFILE_CONNECTION_ERROR,
  PROFILE_CONNECTION_CLOSED,
  PROFILE_GET_MESSAGE,
} from "../services/actions/profileWS";

describe("testing profileReducerWS", () => {
  it("should return the initial state", () => {
    expect(profileReducerWS(undefined, {})).toEqual(profileInitialState);
  });

  it("should handle PROFILE_CONNECTION_SUCCESS", () => {
    const resucerResponse = profileReducerWS(profileInitialState, {
      type: PROFILE_CONNECTION_SUCCESS,
    });
    const expectedResult = { ...profileInitialState, isOpen: true };
    expect(resucerResponse).toEqual(expectedResult);
  });

  it("should handle PROFILE_CONNECTION_ERROR", () => {
    const resucerResponse = profileReducerWS(profileInitialState, {
      type: PROFILE_CONNECTION_ERROR,
      payload: "errormessage",
    });
    const expectedResult = { ...profileInitialState, error: "errormessage" };
    expect(resucerResponse).toEqual(expectedResult);
  });

  it("should handle PROFILE_CONNECTION_CLOSED", () => {
    const resucerResponse = profileReducerWS(profileInitialState, {
      type: PROFILE_CONNECTION_CLOSED,
    });
    const expectedResult = { ...profileInitialState, isOpen: false };
    expect(resucerResponse).toEqual(expectedResult);
  });

  it("should handle PROFILE_GET_MESSAGE", () => {
    const resucerResponse = profileReducerWS(profileInitialState, {
      type: PROFILE_GET_MESSAGE,
      payload: { data: [1, 2, 3] },
    });

    const expectedResult = { ...profileInitialState, data: [1, 2, 3] };
    expect(resucerResponse).toEqual(expectedResult);
  });
});
