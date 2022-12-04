//@ts-ignore
import { applyMiddleware, combineReducers, createStore } from "redux";
//@ts-ignore
import {composeWithDevToolsDevelopmentOnly} from "@redux-devtools/extension"
//@ts-ignore
import thunk from "redux-thunk";


const rootReducer = combineReducers({

});

export type AppStateType = ReturnType<typeof store.getState>;
export type RootState = ReturnType<typeof rootReducer>

const composeEnhancers = composeWithDevToolsDevelopmentOnly({
  trace: true,
  traceLimit: 25,
});

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

export default store;