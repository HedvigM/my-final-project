import { createSlice } from '@reduxjs/toolkit';

const member = createSlice({
  name: 'member',
  initialState: {
    memberId: null,
    name: null,
    accessToken: null
  },
  reducers: {
    setMemberId: (store, action) => {
      store.memberId = action.payload;
    },
    setMemberName: (store, action) => {
      store.name = action.payload;
    },
    setAccessToken: (store, action) => {
      store.accessToken = action.payload;
    }
  }
});

export default member;
