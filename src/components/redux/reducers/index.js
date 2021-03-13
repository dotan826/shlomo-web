/**
 * Reducers :
 * 
 * webStatus :
 * - connected (Boolean)
 * - user name (String)
 * - user id (String)
 * - current page (Number)
 * 
 * clients :
 * - clients list (Array)
 * - new client values (Array of objects - e.g. [ {"שם": ""}, {"חפ": ""}, ... ])
 * 
 * suppliers :
 * - clients list (Array)
 * - new client values (Array of objects - e.g. [ {"שם": ""}, {"חפ": ""}, ... ])
 * 
 * manufacturers :
 * - clients list (Array)
 * - new client values (Array of objects - e.g. [ {"שם": ""}, {"חפ": ""}, ... ])
 * 
 * parts :
 * - 
 * 
 * 
 */

import { combineReducers } from 'redux';

import webStatus from './webStatus.js';
import order from './order.js';

export default combineReducers({
    webStatus,
    order
});
