import URL from '../../utils/commons';

// Action Types
const LOADING = 'LOADING';
const ALL_LISTS = 'ALL_LISTS';

// Initial State
const initialState = {
  loading: true,
  allLists: [],
};

// Reducer
export default (state = initialState, action) => {
  switch (action.type) {
    case LOADING:
      return { ...state, loading: true };
    case ALL_LISTS:
      return { ...state, loading: false, allLists: action.payload };
    default:
      return state;
  }
};

// Action Creators
export const allLists = () => async (dispatch) => {
  dispatch({ type: LOADING });
  const res = await fetch(`${URL}lists`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = await res.json();
  dispatch({ type: ALL_LISTS, payload: data });
};
