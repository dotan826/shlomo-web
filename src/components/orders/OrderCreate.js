import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import { Typography, Input, Divider, Button, Modal } from 'antd';
import { testingWoodData, woodColumns, base } from '../TestingData.js';
import OrderTable from './OrderTable.js';
import { ObjectID } from 'mongodb';
import axios from 'axios';

import { useSelector, useDispatch } from 'react-redux';
import * as orderActions from '../redux/actions/orderActions.js';

const OrderCreateContainer = styled.div`
    display: flex;
    flex-direction: column;

    margin-top: 20px;
    margin-bottom: 20px;

    background-color: rgba(255, 255, 255, 0.5);
    border-radius: 25px;

    @media only screen and (max-width: 415px) {  // On Mobile
        width: 350px;
        align-items: center;
        // height: 500px;
    }
    
    @media only screen and (min-width: 416px) {  // On Computer
        width: 1000px;
        // height: 700px;
    }
`;

const PageLine = styled.div`
    display: flex;
    justify-content: center;
`;

const StyledTitle = styled(Typography.Title)`

    @media only screen and (max-width: 415px) {  // On Mobile
      
    }

    @media only screen and (min-width: 416px) {  // On Computer
      
    }
`;

const TitleSection = styled.div`
    display: flex;
    justify-content: center;
`;

const DetailsSection = styled.div`
    display: flex;

    @media only screen and (max-width: 415px) {  // On Mobile
        flex-wrap: wrap;
        justify-content: space-between;
        width: 300px;
    }

    @media only screen and (min-width: 416px) {  // On Computer
        justify-content: center;
        flex-wrap: wrap;
    }
`;

const StyledText = styled(Typography.Text)`

    @media only screen and (max-width: 415px) {  // On Mobile
        font-weight: bold;
        margin: 10px;
    }

    @media only screen and (min-width: 416px) {  // On Computer
        font-weight: bold;
        margin: 10px;
        
    }
`;

const StyledDetailsInput = styled(Input)`
    direction: rtl;
    background-color: rgba(57, 204, 204, 0.5);

    @media only screen and (max-width: 415px) {  // On Mobile
        font-weight: bold;
        margin: 10px;
        width: 150px;
    }

    @media only screen and (min-width: 416px) {  // On Computer
        font-weight: bold;
        margin: 10px;
        width: 200px;
    }
`;

const StyledActionsInput = styled(Input)`
    direction: rtl;
    background-color: rgba(255, 255, 255, 0.5);

    @media only screen and (max-width: 415px) {  // On Mobile
        font-weight: bold;
        margin: 10px;
        width: 150px;
    }

    @media only screen and (min-width: 416px) {  // On Computer
        font-weight: bold;
        margin: 10px;
        width: 800px;
    }
`;

const ActionsSection = styled.div`
    display: flex;
    

    @media only screen and (max-width: 415px) {  // On Mobile
        flex-direction: column;
        width: 200px;
    }

    @media only screen and (min-width: 416px) {  // On Computer
        justify-content: center;
    }
`;

const StyledButton = styled(Button)`
    margin: 10px;
`;

const OrderCreate = (props) => {

    const orderKey = useSelector(state => state.order.orderKey); // Order Key
    const isOrderExist = useSelector(state => state.order.isOrderExist); // Is Order Exist ?... true or false...

    const orderTypePage = useSelector(state => state.order.orderTypePage); // 1 = Select Order, 2 = New Order, 3 = Exist Order, 4 = Loading
    const selectedOrder = useSelector(state => state.order.selectedOrder); // Selected Order Type
    const selectedSupplierName = useSelector(state => state.order.selectedSupplierName); // Selected Supplier Name
    const selectedSupplierID = useSelector(state => state.order.selectedSupplierID); // Selected Supplier ID
    const selectedClientName = useSelector(state => state.order.selectedClientName); // Selected Client Name
    const selectedClientID = useSelector(state => state.order.selectedClientID); // Selected Client ID
    const projectName = useSelector(state => state.order.projectName); // Project Name
    const projectSupplyDate = useSelector(state => state.order.projectSupplyDate); // Project Supply Date
    const selectedExistProject = useSelector(state => state.order.selectedExistProject); // Selected Exist Project

    const orderNotes = useSelector(state => state.order.orderNotes);
    const orderSupplyNotes = useSelector(state => state.order.orderSupplyNotes);
    const tableList = useSelector(state => state.order.tableList);
    const tableListAmount = useSelector(state => state.order.tableListAmount);
    const tableListToShow = useSelector(state => state.order.tableListToShow);

    const userID = useSelector(state => state.webStatus.userID);

    const dispatch = useDispatch();

    // Reset Order Details and return to Orders Page.
    const resetSelectedAndReturn = () => {
        dispatch(orderActions.setSelectedOrder(""));
        dispatch(orderActions.setSelectedSupplierName(""));
        dispatch(orderActions.setSelectedSupplierID(""));
        dispatch(orderActions.setSelectedClientName(""));
        dispatch(orderActions.setSelectedClientID(""));
        dispatch(orderActions.setProjectName(""));
        dispatch(orderActions.setProjectSupplyDate(""));
        dispatch(orderActions.setSelectedExistProject(""));
        dispatch(orderActions.setOrderTypePage(1));
        dispatch(orderActions.setOrderNotes(""));
        dispatch(orderActions.setOrderSupplyNotes(""));

        dispatch(orderActions.setPartList(null));
        dispatch(orderActions.setPartColumns(null));
        dispatch(orderActions.setPartColumnsExtractLength(0));

        dispatch(orderActions.setTableList([]));
        dispatch(orderActions.setTableListAmount([]));
        dispatch(orderActions.setTableListToShow([]));

        dispatch(orderActions.setOrderKey(null));
        dispatch(orderActions.setIsOrderExist(false));
    }

    // Save Current Order
    const saveOrder = () => {
        if (orderKey === null) { // if this is a New Order then...
            const tempKey = new ObjectID().toHexString();
            dispatch(orderActions.setOrderKey(tempKey));
            const temp = {
                // "_id" = no need for this field because MongoDB will add it automaticaly ! (it's a new document!)
                "_uid": userID,
                "key": tempKey,
                "selectedOrder": selectedOrder,
                "selectedSupplierName": selectedSupplierName,
                "selectedSupplierID": selectedSupplierID,
                "selectedClientName": selectedClientName,
                "selectedClientID": selectedClientID,
                "projectName": projectName,
                "projectSupplyDate": projectSupplyDate,
                "orderNotes": orderNotes,
                "orderSupplyNotes": orderSupplyNotes,
                "tableList": tableList,
                "tableListAmount": tableListAmount,
                "tableListToShow": tableListToShow
            }
            axios.post(base + '/add-order', { collectionName: "Orders", newDocument: temp }).then((insertResult) => {
                if (insertResult.data) {
                    dispatch(orderActions.setIsOrderExist(true)); // now this order exist in database !
                    Modal.info({
                        title: '',
                        content: "ההזמנה נשמרה בהצלחה.",
                        style: {
                            direction: "rtl"
                        },
                        onOk() { },
                    });
                }
                else {
                    Modal.info({
                        title: 'שגיאה',
                        content: "לא היה ניתן לשמור, נסו שנית בעוד כמה רגעים.",
                        style: {
                            direction: "rtl"
                        },
                        onOk() { },
                    });
                }
            });
        }
        else { // if this is Existing Order then...
            const temp = {
                // "_id" = no need for this field because MongoDB will add it automaticaly ! (it's a new document!)
                "_uid": userID,
                "key": orderKey,
                "selectedOrder": selectedOrder,
                "selectedSupplierName": selectedSupplierName,
                "selectedSupplierID": selectedSupplierID,
                "selectedClientName": selectedClientName,
                "selectedClientID": selectedClientID,
                "projectName": projectName,
                "projectSupplyDate": projectSupplyDate,
                "orderNotes": orderNotes,
                "orderSupplyNotes": orderSupplyNotes,
                "tableList": tableList,
                "tableListAmount": tableListAmount,
                "tableListToShow": tableListToShow
            }
            axios.post(base + '/update-order', { collectionName: "Orders", queryKey: orderKey, updatedDocument: temp }).then((insertResult) => {
                if (insertResult.data) {
                    Modal.info({
                        title: '',
                        content: "ההזמנה נשמרה בהצלחה.",
                        style: {
                            direction: "rtl"
                        },
                        onOk() { },
                    });
                }
                else {
                    Modal.info({
                        title: 'שגיאה',
                        content: "לא היה ניתן לשמור, נסו שנית בעוד כמה רגעים.",
                        style: {
                            direction: "rtl"
                        },
                        onOk() { },
                    });
                }
            });
        }
    }

    // Delete Current Order and return to Orders Page.
    const deleteOrder = () => {
        if (orderKey === null){
            Modal.info({
                title: 'שגיאה',
                content: "ההזמנה אינה קיימת במערכת. לא ניתן לבצע מחיקה.",
                style: {
                    direction: "rtl"
                },
                onOk() { },
            });
        }
        else {
            Modal.confirm({
                title: 'פעולה זו תמחוק את ההזמנה.',
                content: "האם למחוק ?",
                style: {
                    direction: "rtl"
                },
                onOk() {
                    axios.post(base + '/delete-order', { collectionName: "Orders", deleteDocumentKey: orderKey }).then((insertResult) => {
                        if (insertResult.data) {
                            Modal.info({
                                title: '',
                                content: "ההזמנה נמחקה בהצלחה.",
                                style: {
                                    direction: "rtl"
                                },
                                onOk() { },
                            });
                            resetSelectedAndReturn();
                        }
                        else {
                            Modal.info({
                                title: 'שגיאה',
                                content: "לא היה ניתן למחוק, נסו שנית בעוד כמה רגעים.",
                                style: {
                                    direction: "rtl"
                                },
                                onOk() { },
                            });
                        }
                    });
                },
            });
        }
    }

    // Print Current Order
    const printOrder = () => {
        dispatch(orderActions.setOrderTypePage(3));
    }

    useEffect(() => {
        // New Order
        if (orderTypePage === 2) {

        }

        // Exist Order
        else if (orderTypePage === 3) {

        }
    }, []);

    return (
        <OrderCreateContainer>
            <TitleSection>
                <StyledTitle style={{ margin: "10px" }}>הזמנה חדשה</StyledTitle>
            </TitleSection>
            <Divider style={{ backgroundColor: "black" }}></Divider>
            <DetailsSection>
                <StyledDetailsInput style={{ backgroundColor: "rgba(255, 65, 54, 0.5)" }} value={selectedSupplierName}></StyledDetailsInput>
                <StyledText>ספק</StyledText>
                <StyledDetailsInput style={{ backgroundColor: "rgba(255, 65, 54, 0.5)" }} value={selectedClientName}></StyledDetailsInput>
                <StyledText>הזמנה עבור</StyledText>
                <StyledDetailsInput style={{ backgroundColor: "rgba(255, 65, 54, 0.5)" }} value={selectedOrder}></StyledDetailsInput>
                <StyledText>סוג הזמנה</StyledText>
                <StyledDetailsInput style={{ backgroundColor: "rgba(255, 65, 54, 0.5)" }} value={projectSupplyDate}></StyledDetailsInput>
                <StyledText>תאריך אספקה</StyledText>
                <StyledDetailsInput style={{ backgroundColor: "rgba(255, 65, 54, 0.5)" }} value={projectName}></StyledDetailsInput>
                <StyledText>שם פרויקט</StyledText>
            </DetailsSection>
            <Divider style={{ backgroundColor: "black" }}></Divider>

            <OrderTable></OrderTable>

            <Divider style={{ backgroundColor: "black" }}></Divider>
            <PageLine>
                <StyledActionsInput style={{ backgroundColor: "rgba(255, 65, 54, 0.5)" }} defaultValue={orderNotes} onChange={(e)=>{dispatch(orderActions.setOrderNotes(e.target.value))}}></StyledActionsInput>
                <StyledText>הערות</StyledText>
            </PageLine>
            <PageLine>
                <StyledActionsInput style={{ backgroundColor: "rgba(255, 65, 54, 0.5)" }} defaultValue={orderSupplyNotes} onChange={(e)=>{dispatch(orderActions.setOrderSupplyNotes(e.target.value))}}></StyledActionsInput>
                <StyledText>אספקה</StyledText>
            </PageLine>
            <ActionsSection>
                <StyledButton type="primary" danger onClick={() => { resetSelectedAndReturn() }}>חזור לתפריט</StyledButton>
                <StyledButton type="primary" disabled={!isOrderExist} onClick={() => { printOrder() }}>הדפס הזמנה</StyledButton>
                <StyledButton type="primary" onClick={() => { saveOrder() }}>שמור הזמנה</StyledButton>
                <StyledButton type="primary" danger disabled={!isOrderExist} onClick={() => { deleteOrder() }}>מחק הזמנה</StyledButton>
            </ActionsSection>
        </OrderCreateContainer>
    );
}



export default OrderCreate;


