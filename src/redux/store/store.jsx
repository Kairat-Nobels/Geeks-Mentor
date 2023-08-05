import { combineReducers, configureStore } from "@reduxjs/toolkit";
import usersReducer from "../slices/usersSlice";
import entranceReducer from "../slices/entranceSlice";
import mentorsReducer from "../slices/mentorsSlice";
import filterReducer from "../slices/filterSlice";
import likesReducer from "../slices/likesSlice";
import questionsReducer from "../slices/questionsSlice";
export const store = configureStore({
    reducer: {
        usersReducer,
        entranceReducer,
        mentorsReducer,
        filterReducer,
        likesReducer,
        questionsReducer
    }
})