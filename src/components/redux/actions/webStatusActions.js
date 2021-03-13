export const SET_CONNECTED = "SET_CONNECTED";
export const SET_USER_NAME = "SET_USER_NAME";
export const SET_USER_ID = "SET_USER_ID";
export const SET_CURRENT_PAGE = "SET_CURRENT_PAGE";

// Set User Connected Status :
// true = Connected.
// false = Disconnected.
export const setConnected = (status) => {
    return ({
        type: SET_CONNECTED,
        payload: status
    });
}

// Set User Name.
export const setUserName = (name) => {
    return ({
        type: SET_USER_NAME,
        payload: name
    });
}

// Set User ID.
export const setUserID = (id) => {
    return ({
        type: SET_USER_ID,
        payload: id
    });
}

// Set Current Page To Show.
export const setCurrentPage = (page) => {
    return ({
        type: SET_CURRENT_PAGE,
        payload: page
    });
}
