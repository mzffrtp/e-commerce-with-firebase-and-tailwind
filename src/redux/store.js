import { combineReducers, createStore } from "redux";

/* reducers */
import loginReducer from "./reducers/loginReducer";
import productsReducer from "./reducers/productsReducer";

const rootReducer = combineReducers({
    loginState: loginReducer,
    productsState: productsReducer

})

const store = createStore(rootReducer)

export default store;