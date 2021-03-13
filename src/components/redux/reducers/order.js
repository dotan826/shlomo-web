
const initialState = {
    selectedOrder: "",
    selectedSupplierName: "",
    selectedSupplierID: "",
    selectedClientName: "",
    selectedClientID: "",
    projectName: "",
    projectSupplyDate: "",
    selectedExistProject: "",
    orderTypePage: 1, // 1 = Select Order, 2 = New Order, 3 = Exist Order, 4 = Loading
    orderNotes: "",
    orderSupplyNotes: "",

    partList: null, // Part List (when creating new order)
    partColumns: null, // Part Columns
    partColumnsExtractLength: 0, // until which column we need to extract details

    tableList: [], // Table List
    tableListAmount: [], // Order Table List Parts Amount (should be in the same order as Table List !)
    tableListToShow: [], // Order Table List to Show and Refresh whenever need !

    orderKey: null, // Order Key
    isOrderExist: false, // Is Order Exist ?... true or false...
}

const order = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_SELECTED_ORDER':
            return { ...state, selectedOrder: action.payload };
        case 'SET_SELECTED_SUPPLIER_NAME':
            return { ...state, selectedSupplierName: action.payload };
        case 'SET_SELECTED_SUPPLIER_ID':
            return { ...state, selectedSupplierID: action.payload };
        case 'SET_SELECTED_CLIENT_NAME':
            return { ...state, selectedClientName: action.payload };
        case 'SET_SELECTED_CLIENT_ID':
            return { ...state, selectedClientID: action.payload };
        case 'SET_PROJECT_NAME':
            return { ...state, projectName: action.payload };
        case 'SET_PROJECT_SUPPLY_DATE':
            return { ...state, projectSupplyDate: action.payload };
        case 'SET_SELECTED_EXIST_PROJECT':
            return { ...state, selectedExistProject: action.payload };
        case 'SET_ORDER_TYPE_PAGE':
            return { ...state, orderTypePage: action.payload };
        case 'SET_PART_LIST':
            return { ...state, partList: action.payload };
        case 'SET_PART_COLUMNS':
            return { ...state, partColumns: action.payload };
        case 'SET_PART_COLUMNS_EXTRACT_LENGTH':
            return { ...state, partColumnsExtractLength: action.payload };
        case 'SET_TABLE_LIST':
            return { ...state, tableList: action.payload };
        case 'SET_TABLE_LIST_AMOUNT':
            return { ...state, tableListAmount: action.payload };
        case 'SET_TABLE_LIST_TO_SHOW':
            return { ...state, tableListToShow: action.payload };
        case 'SET_ORDER_NOTES':
            return { ...state, orderNotes: action.payload };
        case 'SET_ORDER_SUPPLY_NOTES':
            return { ...state, orderSupplyNotes: action.payload };
        case 'SET_ORDER_KEY':
            return { ...state, orderKey: action.payload };
        case 'SET_IS_ORDER_EXIST':
            return { ...state, isOrderExist: action.payload };
        default:
            return state;
    }
}

export default order;




