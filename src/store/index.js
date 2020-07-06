import { combineReducers, createStore, applyMiddleware } from "redux";
import user from './reducers/user.reducer';
import siteInfo from './reducers/siteinfo.reducer';
import thunk from 'redux-thunk';

const combine = combineReducers({
    user: user,
    siteInfo: siteInfo
})

const store = createStore(combine,applyMiddleware(thunk))

export default store;
