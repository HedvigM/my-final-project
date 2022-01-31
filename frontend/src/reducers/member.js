import { createSlice } from '@reduxjs/toolkit';

export const member = createSlice({
  name: 'member',
  initialState: {
    member: null,
    memberId: null,
    memberName: null,
    knowTunes: null,
    learnTunes: null,
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
    setKnowTunes: (store, action) => {
      store.knowTunes = action.payload;
    },
    setLearnTunes: (store, action) => {
      store.learnTunes = action.payload;
    },
    setAccessToken: (store, action) => {
      store.accessToken = action.payload;
    }
  }
});
