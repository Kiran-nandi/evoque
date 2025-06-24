import { createReducer } from '@reduxjs/toolkit';

const initialState = {
    userdata : null  
  }

  export const userReducer = createReducer(initialState, (builder) => {
    builder.addMatcher((action) => {return action.type === "userdata"}, (state, action) => {
        state.userdata = action.payload;
    })
  })