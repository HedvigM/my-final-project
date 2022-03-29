import { createSlice } from '@reduxjs/toolkit';

export const member = createSlice({
  name: 'member',
  initialState: {
    memberName: null,
    memberId: null,
    town: null,
    profileText: null,
    knowTunes: [],
    learnTunes: []
  },
  reducers: {
    setMemberName: (store, action) => {
      store.memberName = action.payload;
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
