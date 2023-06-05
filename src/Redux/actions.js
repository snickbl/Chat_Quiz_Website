export const fetchData = () => ({
    type: 'FETCH_DATA',
  });
  
  export const saveRooms = (data) => ({
    type: 'SAVE_ROOMS',
    payload: data,
  });

  export const saveUsers = (data) => ({
    type: 'SAVE_USERS',
    payload: data,
  });