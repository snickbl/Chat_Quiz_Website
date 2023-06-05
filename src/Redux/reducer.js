const initialState = {
    rooms: [],
    accounts: [],
  };
  
  const reducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SAVE_USERS':
        return {
          ...state,
          accounts: action.payload,
        };
        case 'SAVE_ROOMS':
        return {
          ...state,
          rooms: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default reducer;