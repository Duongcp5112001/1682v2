import { DefaultActionTypes, createActions, createReducer } from "reduxsauce";
import SeamlessImmutable from "seamless-immutable";
import { BodyAction } from "~/types/reduxs";
import {
  CounterAction,
  CounterActionCreators,
  CounterState,
} from "~/types/reduxs/counterRedux";

// =========== Create State ===========

const INITIAL_STATE = SeamlessImmutable<CounterState>({
  counter: 0,
});

// =========== Create Action ===========
export interface CounterActionTypes extends DefaultActionTypes {
  INCREMENT: "INCREMENT";
}

const { Types, Creators } = createActions<
  CounterActionTypes,
  CounterActionCreators
>({
  increment: [""],
});

export const CounterTypes = Types;

export default Creators;

const increment: BodyAction<{}, CounterState> = (state) => {
  return {
    ...state,
    counter: state.counter + 1,
  };
};

// =========== Create Reducer ===========
export const reducer = createReducer<CounterState, CounterAction>(
  INITIAL_STATE,
  {
    [Types.INCREMENT]: increment,
  }
);
