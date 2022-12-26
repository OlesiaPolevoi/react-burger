import {
  OrderActions,
  TOrderDetails,
  TOrderDetailsAction,
} from '../../types/index';

const orderDetailsState = {
  orderNumber: '',
  loading: false,
  error: '',
};

export const orderDetailsReducer = (
  state: TOrderDetails = orderDetailsState,
  action: TOrderDetailsAction
) => {
  switch (action.type) {
    case OrderActions.ORDER_NUMBER_REQUEST: {
      return { orderNumber: '', loading: true, error: '' };
    }
    case OrderActions.ORDER_NUMBER_SUCCESS: {
      return {
        loading: false,
        error: '',
        orderNumber: action.payload,
      };
    }
    case OrderActions.ORDER_NUMBER_FAILURE: {
      return {
        loading: false,
        error: action.payload,
        orderNumber: '',
      };
    }
    case OrderActions.CLEAR_ORDER_NUMBER: {
      return { orderNumber: '', loading: false, error: '' };
    }
    default: {
      return state;
    }
  }
};
