import { createSlice } from '@reduxjs/toolkit';

const member = createSlice({
  name: 'member',
  initialState: {
    memberId: null,
    memberName: null,
    accessToken: null
  },
  reducers: {
    setMemberId: (store, action) => {
      store.memberId = action.payload;
    },
    setMemberName: (store, action) => {
      store.memberName = action.payload;
    },
    setAccessToken: (store, action) => {
      store.accessToken = action.payload;
    }
  }
});

export default member;
