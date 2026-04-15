import { createSlice } from '@reduxjs/toolkit';

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    addBlog: (state, action) => {
      state.push(action.payload);
    },
    updateBlog: (state, action) => {
      const index = state.findIndex(b => String(b.id) === String(action.payload.id));
      if (index !== -1) {
        state[index] = action.payload;
      }
    },
    deleteBlog: (state, action) => {
      return state.filter(b => String(b.id) !== String(action.payload));
    },
  },
});

export const { addBlog, updateBlog, deleteBlog } = blogSlice.actions;
export default blogSlice.reducer;


