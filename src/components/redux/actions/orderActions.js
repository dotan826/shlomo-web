export const SET_SELECTED_ORDER = "SET_SELECTED_ORDER";
export const SET_SELECTED_SUPPLIER_NAME = "SET_SELECTED_SUPPLIER_NAME";
export const SET_SELECTED_SUPPLIER_ID = "SET_SELECTED_SUPPLIER_ID";
export const SET_SELECTED_CLIENT_NAME = "SET_SELECTED_CLIENT_NAME";
export const SET_SELECTED_CLIENT_ID = "SET_SELECTED_CLIENT_ID";
export const SET_PROJECT_NAME = "SET_PROJECT_NAME";
export const SET_PROJECT_SUPPLY_DATE = "SET_PROJECT_SUPPLY_DATE";
export const SET_SELECTED_EXIST_PROJECT = "SET_SELECTED_EXIST_PROJECT";
export const SET_ORDER_TYPE_PAGE = "SET_ORDER_TYPE_PAGE";
export const SET_PART_LIST = "SET_PART_LIST";
export const SET_PART_COLUMNS = "SET_PART_COLUMNS";
export const SET_PART_COLUMNS_EXTRACT_LENGTH = "SET_PART_COLUMNS_EXTRACT_LENGTH";
export const SET_TABLE_LIST = "SET_TABLE_LIST";
export const SET_TABLE_LIST_AMOUNT = "SET_TABLE_LIST_AMOUNT";
export const SET_TABLE_LIST_TO_SHOW = "SET_TABLE_LIST_TO_SHOW";
export const SET_ORDER_NOTES = "SET_ORDER_NOTES";
export const SET_ORDER_SUPPLY_NOTES = "SET_ORDER_SUPPLY_NOTES";
export const SET_ORDER_KEY = "SET_ORDER_KEY";
export const SET_IS_ORDER_EXIST = "SET_IS_ORDER_EXIST";


// Set Selected Order.
export const setSelectedOrder = (order) => {
    return ({
        type: SET_SELECTED_ORDER,
        payload: order
    });
}

// Set Selected Supplier Name.
export const setSelectedSupplierName = (name) => {
    return ({
        type: SET_SELECTED_SUPPLIER_NAME,
        payload: name
    });
}

// Set Selected Supplier ID.
export const setSelectedSupplierID = (id) => {
    return ({
        type: SET_SELECTED_SUPPLIER_ID,
        payload: id
    });
}

// Set Selected Client Name.
export const setSelectedClientName = (name) => {
    return ({
        type: SET_SELECTED_CLIENT_NAME,
        payload: name
    });
}

// Set Selected Client ID.
export const setSelectedClientID = (id) => {
    return ({
        type: SET_SELECTED_CLIENT_ID,
        payload: id
    });
}

// Set Project Name.
export const setProjectName = (name) => {
    return ({
        type: SET_PROJECT_NAME,
        payload: name
    });
}

// Set Project Supply Date.
export const setProjectSupplyDate = (date) => {
    return ({
        type: SET_PROJECT_SUPPLY_DATE,
        payload: date
    });
}

// Set Selected Exist Project.
export const setSelectedExistProject = (project) => {
    return ({
        type: SET_SELECTED_EXIST_PROJECT,
        payload: project
    });
}

// Set Order Type Page.
export const setOrderTypePage = (page) => {
    return ({
        type: SET_ORDER_TYPE_PAGE,
        payload: page
    });
}

// Set Part List.
export const setPartList = (list) => {
    return ({
        type: SET_PART_LIST,
        payload: list
    });
}

// Set Part Columns.
export const setPartColumns = (columns) => {
    return ({
        type: SET_PART_COLUMNS,
        payload: columns
    });
}

// Set Part Columns Extract Length.
export const setPartColumnsExtractLength = (length) => {
    return ({
        type: SET_PART_COLUMNS_EXTRACT_LENGTH,
        payload: length
    });
}

// Set Table List.
export const setTableList = (list) => {
    return ({
        type: SET_TABLE_LIST,
        payload: list
    });
}

// Set Table List Amount.
export const setTableListAmount = (amount) => {
    return ({
        type: SET_TABLE_LIST_AMOUNT,
        payload: amount
    });
}

// Set Table List To Show.
export const setTableListToShow = (list) => {
    return ({
        type: SET_TABLE_LIST_TO_SHOW,
        payload: list
    });
}

// Set Order Notes.
export const setOrderNotes = (notes) => {
    return ({
        type: SET_ORDER_NOTES,
        payload: notes
    });
}

// Set Order Supply Notes.
export const setOrderSupplyNotes = (notes) => {
    return ({
        type: SET_ORDER_SUPPLY_NOTES,
        payload: notes
    });
}

// Set Order Key.
export const setOrderKey = (key) => {
    return ({
        type: SET_ORDER_KEY,
        payload: key
    });
}

// Set Is Order Exist.
export const setIsOrderExist = (value) => {
    return ({
        type: SET_IS_ORDER_EXIST,
        payload: value
    });
}




















