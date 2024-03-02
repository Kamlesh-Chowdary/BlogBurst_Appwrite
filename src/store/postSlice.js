import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  posts: [],
};

export const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    setPost: (state, action) => {
      state.posts = action.payload;
    },
    addPost: (state, action) => {
      state.posts.push(action.payload);
    },
    updatePost: (state, action) => {
      state.posts = state.posts.map((post) =>
        post.$id === action.payload.$id ? action.payload : post
      );
    },
    deletePost: (state, action) => {
      state.posts = state.posts.filter((post) => post.$id !== action.payload);
    },
  },
});

export const { setPost, addPost, updatePost, deletePost } = postSlice.actions;
export default postSlice.reducer;
