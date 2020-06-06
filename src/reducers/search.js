import {
  FETCH_SEARCH_RESULTS_SUCCESS,
  CLEAR_SEARCH_RESULTS,
} from '../action/actionTypes';
const initialSearchState = {
  results: [],
  showSearchResults: false,
};
export default function search(state = initialSearchState, action) {
  switch (action.type) {
    case FETCH_SEARCH_RESULTS_SUCCESS:
      return {
        ...state,
        results: action.users,
        showSearchResults: true,
      };
    case CLEAR_SEARCH_RESULTS:
      return {
        ...state,
        showSearchResults: false,
      };
    default:
      return state;
  }
}
