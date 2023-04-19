import { configureStore } from "@reduxjs/toolkit";
import dataReducer from './labelsReducer';

export const store = configureStore({
    reducer : {
        data: dataReducer
    }
});