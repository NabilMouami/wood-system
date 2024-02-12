import {
  USER_LOGOUT,
  COL_DETAILS_REQUEST,
  COL_DETAILS_SUCCESS,
  COL_DETAILS_FAIL,
  ITEM_BOIS_BON,
  RESET_BON,
  RESET_TICKET,
  ITEM_TICKET_BON,
} from "./type";

function userSigninReducer(state = {}, action) {
  switch (action.type) {
    case USER_LOGOUT:
      return {};
    default:
      return state;
  }
}

function colDetailsReducer(state = { Col: {} }, action) {
  switch (action.type) {
    case COL_DETAILS_REQUEST:
      return { loading: true };
    case COL_DETAILS_SUCCESS:
      return { loading: false, Col: action.payload };
    case COL_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}
const initialState = {
  cart: [],
  tickets: [],
};
function BonLivrReducer(state = initialState, action) {
  switch (action.type) {
    case ITEM_BOIS_BON:
      return {
        //cart: [...state.cart, action.payload],
        ...state,
        cart: [...state.cart, action.payload],
      };
    case ITEM_TICKET_BON:
      return {
        // tickets: [...state.tickets, action.payload],
        ...state,
        tickets: [...state.tickets, action.payload],
      };
    case RESET_BON:
      return { ...state, cart: [] };
    case RESET_TICKET:
      return { ...state, tickets: [] };

    default:
      return state;
  }
}

export { userSigninReducer, colDetailsReducer, BonLivrReducer };
