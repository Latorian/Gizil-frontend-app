import { EXAMPLE_ACTION } from '../actions';

const initialState = {
  data: null,
};

const exampleReducer = (state = initialState, action) => {
  switch (action.type) {
    case EXAMPLE_ACTION:
      return {
        ...state,
        data: 'example data',
      };
    default:
      return state;
  }
};

export default exampleReducer;
