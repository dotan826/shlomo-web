import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { ConfigProvider, Typography, Select, Button, Input, DatePicker, Modal } from 'antd';
import { base } from '../TestingData.js';
import OrderCreate from './OrderCreate.js';
import axios from 'axios';
import PrintOrder from './printOrder/PrintOrder.js';

import { useSelector, useDispatch } from 'react-redux';
import { setCurrentPage } from '../redux/actions/webStatusActions.js';
import * as orderActions from '../redux/actions/orderActions.js';

const { Option } = Select;

const OrdersContainer = styled.div`
    display: flex;
    flex-direction: column;

    @media only screen and (max-width: 415px) {  // On Mobile

    }
    
    @media only screen and (min-width: 416px) {  // On Computer

    }
`;

const OrdersSection = styled.div`
    display: flex;
    
    @media only screen and (max-width: 415px) {  // On Mobile
        flex-direction: column;
    }
    
    @media only screen and (min-width: 416px) {  // On Computer

    }
`;

const ButtonSection = styled.div`
    display: flex;
    justify-content: center;

    @media only screen and (max-width: 415px) {  // On Mobile

    }
    
    @media only screen and (min-width: 416px) {  // On Computer

    }
`;

const NewOrder = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    margin: 10px;

    background-color: rgba(255, 255, 255, 0.5);
    border-radius: 25px;
    border: solid;

    @media only screen and (max-width: 415px) {  // On Mobile
        width: 330px;
        height: 450px;
    }

    @media only screen and (min-width: 416px) {  // On Computer
        width: 350px;
        height: 450px;
    }
`;

const ExistOrder = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    margin: 10px;

    background-color: rgba(255, 255, 255, 0.5);
    border-radius: 25px;
    border: solid;

    @media only screen and (max-width: 415px) {  // On Mobile
        width: 330px;
        height: 200px;
    }

    @media only screen and (min-width: 416px) {  // On Computer
        width: 350px;
        height: 200px;
    }
`;

const StyledLine = styled.div`
    display: flex;
    justify-content: space-between;


    @media only screen and (max-width: 415px) {  // On Mobile
        width: 300px;
    }

    @media only screen and (min-width: 416px) {  // On Computer
        width: 300px;
    }
`;

const StyledText = styled(Typography.Text)`
    font-weight: bold;
    margin: 15px;

    @media only screen and (max-width: 415px) {  // On Mobile
        width: 230px;
    }

    @media only screen and (min-width: 416px) {  // On Computer
        width: 230px;
        
    }
`;

const StyledTitle = styled(Typography.Title)`
    
`;

const StyledSelect = styled(Select)`
    margin: 15px;

    @media only screen and (max-width: 415px) {  // On Mobile
        width: 100%;
    }

    @media only screen and (min-width: 416px) {  // On Computer
        width: 100%;
        
    }
`;

const StyledOption = styled(Option)`

    

    @media only screen and (max-width: 415px) {  // On Mobile

    }

    @media only screen and (min-width: 416px) {  // On Computer
        
    }
`;

const StyledInput = styled(Input)`
    margin: 10px;
    font-weight: bold;
`;

const StyledDatePicker = styled(DatePicker)`
    width: 300px;
    margin: 10px;
    font-weight: bold;
`;

const StyledButton = styled(Button)`

    margin: 10px;

    @media only screen and (max-width: 415px) {  // On Mobile

    }

    @media only screen and (min-width: 416px) {  // On Computer
        width: 120px;
        height: 40px;
    }
`;

const Orders = (props) => {

    const userID = useSelector(state => state.webStatus.userID);
    const dispatch = useDispatch();

    const [suppliersList, setSuppliersList] = useState(null); // Suppliers List
    const [clientsList, setClientsList] = useState(null); // Clients List
    const [ordersList, setOrdersList] = useState(null); // Orders List
    const [isLoading, setIsLoading] = useState(true); // true while fetching data...

    const orderTypePage = useSelector(state => state.order.orderTypePage); // 1 = Select Order, 2 = New Order, 3 = Print Order, 4 = Loading
    const selectedOrder = useSelector(state => state.order.selectedOrder); // Selected Order Type
    const selectedSupplierName = useSelector(state => state.order.selectedSupplierName); // Selected Supplier Name
    const selectedSupplierID = useSelector(state => state.order.selectedSupplierID); // Selected Supplier ID
    const selectedClientName = useSelector(state => state.order.selectedClientName); // Selected Client Name
    const selectedClientID = useSelector(state => state.order.selectedClientID); // Selected Client ID
    const projectName = useSelector(state => state.order.projectName); // Project Name
    const projectSupplyDate = useSelector(state => state.order.projectSupplyDate); // Project Supply Date
    const selectedExistProject = useSelector(state => state.order.selectedExistProject); // Selected Exist Project (_id)

    const orderNotes = useSelector(state => state.order.orderNotes);
    const orderSupplyNotes = useSelector(state => state.order.orderSupplyNotes);
    const tableList = useSelector(state => state.order.tableList);
    const tableListAmount = useSelector(state => state.order.tableListAmount);
    const tableListToShow = useSelector(state => state.order.tableListToShow);

    const affixingColumns = [
        "_id",
        "מקט פנימי",
        "תת קטגוריה",
        "סוג",
        "חברה",
        "סוג משנה",
        "גימור",
        "מידות",
        "משקל",
        "שיטת חישוב",
        "מחיר יחידה",
        "ספק",
        "מקט ספק",
        "דגם",
        "תאריך עדכון",
        "הערות",
        "_uid",
        "_sid",
        "key"
    ];

    const plywoodColumns = [
        "_id",
        "מקט פנימי",
        "תת קטגוריה",
        "סוג",
        "תת סוג",
        "סוג משנה",
        "ציפוי",
        "שיטת חישוב",
        "מידות",
        "מחיר יחידה",
        "ספק",
        "תאריך עדכון",
        "הערות",
        "_uid",
        "_sid",
        "key",
    ];

    const woodColumns = [
        "_id",
        "מקט פנימי",
        "תת קטגוריה",
        "מבנה החומר",
        "שם החומר",
        "עובי",
        "עובי בממ",
        "שיטת חישוב",
        "דרך חישוב",
        "מחיר יחידה",
        "מחיר יחידה בשח",
        "ספק",
        "תאריך עדכון",
        "הערות",
        "_uid",
        "_sid",
        "key"
    ];

    const handleOrderTypeSelect = (value) => { // סוג הזמנה
        dispatch(orderActions.setSelectedOrder(value));
    }

    const handleSupplierSelect = (value) => { // ספק
        dispatch(orderActions.setSelectedSupplierID(value));
        for (let x of suppliersList) {
            if (value.localeCompare(x["_id"]) === 0) {
                dispatch(orderActions.setSelectedSupplierName(x["שם"]));
            }
        }
    }

    const handleClientSelect = (value) => { // הזמנה עבור
        dispatch(orderActions.setSelectedClientID(value));
        for (let x of clientsList) {
            if (value.localeCompare(x["_id"]) === 0) {
                dispatch(orderActions.setSelectedClientName(x["שם"]));
            }
        }
    }

    const handleProjectSelect = (value) => { // פרוייקט (קיים)
        dispatch(orderActions.setSelectedExistProject(value));
    }

    const handleProjectNameInput = (e) => { // שם פרויקט
        dispatch(orderActions.setProjectName(e.target.value));
    }

    const handleProjectDateInput = (date, dateString) => { // תאריך אספקה
        if (date !== null) {
            const supplyDate = date["_d"].getUTCDate() + "/" + (date["_d"].getUTCMonth() + 1) + "/" + date["_d"].getUTCFullYear();
            dispatch(orderActions.setProjectSupplyDate(supplyDate));
        }
    }

    const handleNewOrderClick = () => { // Affixing = 1 , Plywood = 2, Wood = 3
        if (selectedOrder.length > 0 && selectedSupplierID.length > 0 && selectedClientID.length > 0 && projectName.length > 0 && projectSupplyDate.length > 0) {
            let partName;
            if (selectedOrder.localeCompare("פרזול") === 0) {
                partName = "affixing";
                dispatch(orderActions.setPartColumns(affixingColumns));
                dispatch(orderActions.setPartColumnsExtractLength(9));
            }
            else if (selectedOrder.localeCompare("לבידים") === 0) {
                partName = "plywood";
                dispatch(orderActions.setPartColumns(plywoodColumns));
                dispatch(orderActions.setPartColumnsExtractLength(8));
            }
            else if (selectedOrder.localeCompare("עץ") === 0) {
                partName = "wood";
                dispatch(orderActions.setPartColumns(woodColumns));
                dispatch(orderActions.setPartColumnsExtractLength(8));
            }
            dispatch(orderActions.setOrderTypePage(4));
            axios.post(base + `/${partName}`, { userID: userID, supplierID: selectedSupplierID }).then((documents) => {
                dispatch(orderActions.setPartList(documents.data));
                dispatch(orderActions.setOrderTypePage(2));
            });
        }
        else {
            Modal.info({
                title: 'יש למלא את נתוני ההזמנה החדשה',
                content: "",
                style: {
                    direction: "rtl"
                },
                onOk() { },
            });
        }

    }

    const handleExistOrderClick = () => {
        if (selectedExistProject.length > 0) {
            for (let order of ordersList) {
                if (order["_id"].localeCompare(selectedExistProject) === 0) {
                    dispatch(orderActions.setSelectedOrder(order["selectedOrder"])); // ok
                    dispatch(orderActions.setSelectedSupplierName(order["selectedSupplierName"])); // ok
                    dispatch(orderActions.setSelectedSupplierID(order["selectedSupplierID"])); // ok
                    dispatch(orderActions.setSelectedClientName(order["selectedClientName"])); // ok
                    dispatch(orderActions.setSelectedClientID(order["selectedClientID"])); // ok
                    dispatch(orderActions.setProjectName(order["projectName"])); // ok
                    dispatch(orderActions.setProjectSupplyDate(order["projectSupplyDate"])); // ok
                    dispatch(orderActions.setOrderNotes(order["orderNotes"])); // ok
                    dispatch(orderActions.setOrderSupplyNotes(order["orderSupplyNotes"])); // ok

                    dispatch(orderActions.setTableList(order["tableList"])); // ok
                    dispatch(orderActions.setTableListAmount(order["tableListAmount"])); // ok
                    // dispatch(orderActions.setTableListToShow(order["tableListToShow"])); // ok
                    // dispatch(orderActions.setTableListToShow([])); // ok

                    dispatch(orderActions.setOrderKey(order["key"])); // ok
                    dispatch(orderActions.setIsOrderExist(true)); // ok

                    let partName;
                    if (order["selectedOrder"].localeCompare("פרזול") === 0) {
                        partName = "affixing";
                        dispatch(orderActions.setPartColumns(affixingColumns));
                        dispatch(orderActions.setPartColumnsExtractLength(9));
                    }
                    else if (order["selectedOrder"].localeCompare("לבידים") === 0) {
                        partName = "plywood";
                        dispatch(orderActions.setPartColumns(plywoodColumns));
                        dispatch(orderActions.setPartColumnsExtractLength(8));
                    }
                    else if (order["selectedOrder"].localeCompare("עץ") === 0) {
                        partName = "wood";
                        dispatch(orderActions.setPartColumns(woodColumns));
                        dispatch(orderActions.setPartColumnsExtractLength(8));
                    }
                    axios.post(base + `/${partName}`, { userID: userID, supplierID: order["selectedSupplierID"] }).then((documents) => {
                        dispatch(orderActions.setPartList(documents.data));
                        dispatch(orderActions.setOrderTypePage(2));
                    });
                }
            }

        }
        else {
            Modal.info({
                title: 'יש לבחור הזמנה.',
                content: "",
                style: {
                    direction: "rtl"
                },
                onOk() { },
            });
        }
    }

    const reloading = () => {
        axios.post(base + '/suppliers', { userID: userID }).then((documents) => {
            setSuppliersList(documents.data);
        });
        axios.post(base + '/clients', { userID: userID }).then((documents) => {
            setClientsList(documents.data);
        });
        axios.post(base + '/orders', { userID: userID }).then((documents) => {
            setOrdersList(documents.data);
            setIsLoading(false);
        });
    }

    useEffect(() => {
        reloading();
    }, [orderTypePage]);

    // Printing Purposes ! >>>>>>>>>>>>>
    const listsForPrinting = {
        suppliersList: suppliersList,
        clientsList: clientsList
    }

    return (
        <OrdersContainer>
            {orderTypePage === 1 ?
                <ConfigProvider direction="rtl">
                    <OrdersSection>
                        <ExistOrder>
                            <StyledTitle level={3}>הזמנה קיימת</StyledTitle>
                            <StyledLine>
                                <StyledSelect style={{ fontWeight: "bold" }} defaultValue="" onChange={handleProjectSelect} loading={isLoading}>
                                    {ordersList ?
                                        ordersList.map((value, index) => {
                                            return (<StyledOption style={{ fontWeight: "bold" }} key={value["key"]} value={value["_id"]}>{value["projectName"]}</StyledOption>);
                                        })
                                        : null}
                                </StyledSelect>
                                <StyledText>פרוייקט</StyledText>
                            </StyledLine>
                            <StyledButton type="primary" onClick={() => { handleExistOrderClick() }}>צפה</StyledButton>
                        </ExistOrder>
                        <NewOrder>
                            <StyledTitle level={3}>הזמנה חדשה</StyledTitle>
                            <StyledLine>
                                <StyledSelect style={{ fontWeight: "bold" }} defaultValue="" onChange={handleOrderTypeSelect}>
                                    <StyledOption style={{ fontWeight: "bold" }} value="פרזול">פרזול</StyledOption>
                                    <StyledOption style={{ fontWeight: "bold" }} value="לבידים">לבידים</StyledOption>
                                    <StyledOption style={{ fontWeight: "bold" }} value="עץ">עץ</StyledOption>
                                </StyledSelect>
                                <StyledText>סוג הזמנה</StyledText>
                            </StyledLine>
                            <StyledLine>
                                <StyledSelect style={{ fontWeight: "bold" }} defaultValue="" onChange={handleSupplierSelect}>
                                    {suppliersList ?
                                        suppliersList.map((value, index) => {
                                            return (<StyledOption style={{ fontWeight: "bold" }} key={value["key"]} value={value["_id"]}>{value["שם"]}</StyledOption>);
                                        })
                                        : null}
                                </StyledSelect>
                                <StyledText>ספק</StyledText>
                            </StyledLine>
                            <StyledLine>
                                <StyledSelect style={{ fontWeight: "bold" }} defaultValue="" onChange={handleClientSelect}>
                                    {clientsList ?
                                        clientsList.map((value, index) => {
                                            return (<StyledOption style={{ fontWeight: "bold" }} key={value["key"]} value={value["_id"]}>{value["שם"]}</StyledOption>);
                                        })
                                        : null}
                                </StyledSelect>
                                <StyledText>הזמנה עבור</StyledText>
                            </StyledLine>
                            <StyledLine>
                                <StyledInput value={projectName} onChange={handleProjectNameInput}></StyledInput>
                                <StyledText>שם פרויקט</StyledText>
                            </StyledLine>
                            <StyledLine>
                                <StyledDatePicker onChange={handleProjectDateInput}></StyledDatePicker>
                                <StyledText>תאריך אספקה</StyledText>
                            </StyledLine>
                            <StyledButton type="primary" onClick={() => { handleNewOrderClick() }}>צור</StyledButton>
                        </NewOrder>
                    </OrdersSection>
                    <ButtonSection>
                        <StyledButton type="primary" danger onClick={() => { dispatch(setCurrentPage("Menu")) }}>חזרה לתפריט</StyledButton>
                    </ButtonSection>
                </ConfigProvider>
                : null}
            {orderTypePage === 2 ? <OrderCreate></OrderCreate> : null}
            {orderTypePage === 3 ? <PrintOrder listsForPrinting={listsForPrinting}></PrintOrder> : null}
            {orderTypePage === 4 ? <div>LOADING !</div> : null}
        </OrdersContainer>
    );
}


export default Orders;


