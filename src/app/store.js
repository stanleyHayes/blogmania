import {configureStore} from "@reduxjs/toolkit";
import userReducer from "../features/user-slice";
import blogReducer from "../features/blog-slice";

const store = configureStore({
    reducer: {
        user: userReducer,
        blog: blogReducer
    }
});

export default store;