import { combineReducers } from "@reduxjs/toolkit";
import { resettableReducer } from "reduxsauce";
import { RESETTABLE_REDUCER, RootState } from "~/types/reduxs";
import { reducer as counterReducer } from "./counterReducer";

const resettable = {
  counter: resettableReducer(RESETTABLE_REDUCER.COUNTER_RESET),
};

const rootReducer = combineReducers<RootState>({
  counter: resettable.counter(counterReducer),
});

export default rootReducer;
