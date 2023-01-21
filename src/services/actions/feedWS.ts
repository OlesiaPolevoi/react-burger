export const FEED_CONNECTION_INIT = "FEED_CONNECTION_INIT";
export const FEED_CONNECTION_CLOSE = "FEED_CONNECTION_CLOSE";
export const FEED_CONNECTION_SUCCESS = "FEED_CONNECTION_SUCCESS";
export const FEED_CONNECTION_CLOSED = "FEED_CONNECTION_CLOSED";
export const FEED_CONNECTION_ERROR = "FEED_CONNECTION_ERROR";
export const FEED_GET_MESSAGE = "FEED_GET_MESSAGE";

export const feedWsActions = {
  wsInit: FEED_CONNECTION_INIT,
  wsClose: FEED_CONNECTION_CLOSE,
  onOpen: FEED_CONNECTION_SUCCESS,
  onClose: FEED_CONNECTION_CLOSED,
  onError: FEED_CONNECTION_ERROR,
  onMessage: FEED_GET_MESSAGE,
};

// /// changes:
// export interface IFeedConnectionInit {
//   readonly type: typeof FEED_CONNECTION_INIT;
// }

// export interface IFeedConnectionError {
//   readonly type: typeof FEED_CONNECTION_ERROR;
// }

// export interface IFeedConnectionSuccess {
//   readonly type: typeof FEED_CONNECTION_SUCCESS;
//   readonly countries: ReadonlyArray<TCountry>; // ?
// }

// export type TCountriesActions =
//   | IFeedConnectionInit
//   | IFeedConnectionError
//   | IFeedConnectionSuccess;

// export const getFeedConnectionInit = (): IFeedConnectionInit => ({
//   type: FEED_CONNECTION_INIT,
// });

// export const getFeedConnectionError = (): IFeedConnectionError => ({
//   type: FEED_CONNECTION_ERROR,
// });

// export const getFeedConnectionSuccess = (
//   countries: ReadonlyArray<TCountry>
// ): IFeedConnectionSuccess => ({
//   type: FEED_CONNECTION_SUCCESS,
//   countries,
// });

// // export const getCountriesThunk: AppThunk = () => (dispatch: AppDispatch) => {
// //   dispatch(getCountriesAction());
// //   getCountriesRequest().then((res) => {
// //     if (res && res.success) {
// //       dispatch(getCountriesSuccessAction(res.countries));
// //     } else {
// //       dispatch(getCountriesFailedAction());
// //     }
// //   });
// // };
