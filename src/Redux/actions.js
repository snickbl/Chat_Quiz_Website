export const fetchData = () => ({
  type: 'FETCH_DATA',
});

export const saveUsers = (data) => ({
  type: 'SAVE_USERS',
  payload: data,
});