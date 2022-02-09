import { createSlice } from '@reduxjs/toolkit';

export const member = createSlice({
  name: 'member',
  initialState: {
    member: null,
    memberId: null,
    memberName: null,
    email: null,
    town: null,
    profileText: null,
    knowTunes: [],
    learnTunes: [],
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
    setEmail: (store, action) => {
      store.email = action.payload;
    },
    setTown: (store, action) => {
      store.town = action.payload;
    },
    setProfileText: (store, action) => {
      store.profileText = action.payload;
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
