
const initialState = {
    isConnected: false,
    userName: "",
    userID: "",
    currentPage: "Menu"
}

const webStatus = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_CONNECTED':
            return { ...state, isConnected: action.payload };
        case 'SET_USER_NAME':
            return { ...state, userName: action.payload };
        case 'SET_USER_ID':
            return { ...state, userID: action.payload };
        case 'SET_CURRENT_PAGE':
            return { ...state, currentPage: action.payload };
        default:
            return state;
    }
}

export default webStatus;




