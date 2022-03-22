import { createSlice } from '@reduxjs/toolkit';

export const member = createSlice({
  name: 'member',
  initialState: {
    member: null,
    memberId: null,
    town: null,
    profileText: null,
    knowTunes: [],
    learnTunes: []
  },
  reducers: {
    setMember: (store, action) => {
      store.member = action.payload;
    },
    setMemberId: (store, action) => {
      store.memberId = action.payload;
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
    }
  }
});
