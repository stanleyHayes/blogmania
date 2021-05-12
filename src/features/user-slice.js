import {createSlice} from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: {
        isSignedIn: false,
        userData: null,
        searchInput: "tech"
    },
    reducers: {
        setSignedIn: (state, action) => {
            state.isSignedIn = action.payload
        },
        setUserData: (state, action) => {
            state.userData = action.payload
        },
        setSearchInput: (state, action) => {
            state.searchInput = action.payload
        }
    }
});

export const {
    setSearchInput,
    setSignedIn,
    setUserData
} = userSlice.actions;

export const selectSignedIn = state => state.user.isSignedIn;
export const selectUserData = state => state.user.userData;
export const selectUserInput = state => state.user.searchInput;
export const selectBlogData = state => state.user.blogData;

export default userSlice.reducer;