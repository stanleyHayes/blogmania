import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import {getUrl} from "../constants/constants";

export const getPosts = createAsyncThunk('blog/getPosts',
    async (query) => {
        const url = getUrl(query);
        const response = await axios({method: `get`, url});
        return response.data.articles;
    });

const blogSlice = createSlice({
    name: 'blog',
    initialState: {
        posts: [],
        error: null,
        loading: false
    },
    extraReducers: {
        [getPosts.pending]: (state) => {
            state.loading = true;
            state.error = null;
        },
        [getPosts.fulfilled]: (state, action) => {
            state.loading = false;
            state.posts = action.payload;
            state.error = null;
        },
        [getPosts.rejected]: (state, action) => {
            state.loading = false;
            state.posts = [];
            state.error = action.payload;
        }
    }
});

export const selectPosts = state => state.blog.posts;
export const selectLoading = state => state.blog.loading;
export const selectError = state => state.blog.error;

export default blogSlice.reducer;
