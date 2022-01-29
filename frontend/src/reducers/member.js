import { createSlice } from '@reduxjs/toolkit';
import { TUNE_URL } from '../utils/url';

export const member = createSlice({
  name: 'member',
  initialState: {
    member: null,
    memberId: null,
    memberName: null,
    accessToken: null
  },
  reducers: {
    setMember: (store, action) => {
      store.member = action.payload;
    },
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
