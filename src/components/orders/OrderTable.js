import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Button, Select, ConfigProvider, Input, Modal } from 'antd';

import { useSelector, useDispatch } from 'react-redux';
import * as orderActions from '../redux/actions/orderActions.js';

const { Option } = Select;

const NewOrderSection = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;

    // border: solid;

    @media only screen and (max-width: 415px) {  // On Mobile

    }

    @media only screen and (min-width: 416px) {  // On Computer
        
    }
`;

const RowOfOrder = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 900px;
    // height: 40px;
    // border: solid;
    margin: 5px;

    // border: solid;
`;

const PartOfRow = styled.span`
    display: flex;
    justify-content: center;
    // margin: 5px;
    width: ${props => props.partWidth ? props.partWidth : ""};
    font-weight: bold;
    // background-color: blue;

    // border: solid;
`;

// Order Table
const OrderTable = (props) => {

    const partList = useSelector(state => state.order.partList); // Part List
    const partColumns = useSelector(state => state.order.partColumns); // Part Columns
    const partColumnsExtractLength = useSelector(state => state.order.partColumnsExtractLength); // until which column we need to extract details

    const [selectedPartKey, setSelectedPartKey] = useState(null); // Current Selected Part (in select tag)

    const tableListToShow = useSelector(state => state.order.tableListToShow); // Table List to Show and Refresh whenever need !
    const tableList = useSelector(state => state.order.tableList); // Table List
    const tableListAmount = useSelector(state => state.order.tableListAmount); // Table List Amount

    const dispatch = useDispatch();

    // save selected part Key Number in Select Tag
    const handleSelect = (value) => {
        setSelectedPartKey(value);
    }

    // add selected part into the Table List
    const handleAdd = () => {

        // check if there is a selected part (in select tag)
        if (selectedPartKey === null) {
            Modal.info({
                title: 'נא לבחור חלק מהרשימה',
                content: "",
                style: {
                  direction: "rtl"
                },
                onOk() { },
              });
            return;
        }

        // check if the part already been added to the Table List, show message if YES, and terminate function.
        for (let part of tableList) {
            if (part["key"].localeCompare(selectedPartKey) === 0) {
                Modal.info({
                    title: 'החלק כבר נבחר והוסף לרשימה',
                    content: "יש לבחור חלק חדש",
                    style: {
                      direction: "rtl"
                    },
                    onOk() { },
                  });
                return;
            }
        }

        // add the part into the Table List
        for (let part of partList) {
            if (part["key"].localeCompare(selectedPartKey) === 0) {
                let temp = tableList;
                temp.push(part);
                dispatch(orderActions.setTableList(temp));
            }
        }

        // update Table List on the Screen
        dispatch(orderActions.setTableListToShow(
            tableList.map((value, index) => { // tableList
                return (
                    <OrderTableLine
                        key={index}
                        numberInList={index}
                        part={value}
                        handleDelete={handleDelete}
                        columnsNamesArray={partColumns}
                    >
                    </OrderTableLine>
                );
            })
        ));

        // update Table List Parts Amount
        let temp = tableListAmount;
        temp.push(0);
        dispatch(orderActions.setTableListAmount(temp));

        // reset Select Tag Option to none
        setSelectedPartKey(null);
    }

    // delete a part from the Table List
    const handleDelete = (index) => {

        let temp1 = null;
        let temp2 = null;

        // remove part from Table List
        temp1 = tableList;
        temp1.splice(index, 1);
        dispatch(orderActions.setTableList(temp1));

        // remove part amount from Table List Parts Amount
        temp2 = tableListAmount;
        temp2.splice(index, 1);
        dispatch(orderActions.setTableListAmount(temp2));

        // remove part from Table List on screen
        dispatch(orderActions.setTableListToShow(
            tableList.map((value, index) => { // tableList
                return (
                    <OrderTableLine
                        key={index}
                        numberInList={index}
                        part={value}
                        handleDelete={handleDelete}
                        columnsNamesArray={partColumns}
                    >
                    </OrderTableLine>
                );
            })
        ));

        // reset Select Tag Option to none
        setSelectedPartKey(null);
    }

    useEffect(()=>{
        if(tableList.length > 0){
            dispatch(orderActions.setTableListToShow(
                tableList.map((value, index) => { // tableList
                    return (
                        <OrderTableLine
                            key={index}
                            numberInList={index}
                            part={value}
                            handleDelete={handleDelete}
                            columnsNamesArray={partColumns}
                        >
                        </OrderTableLine>
                    );
                })
            ));
        }
    }, []);

    return (
        <NewOrderSection>
            <RowOfOrder>
                <PartOfRow style={{ margin: "5px", width: "70px" }}></PartOfRow>
                <PartOfRow style={{ width: "100px" }}>סיכום בש"ח</PartOfRow>
                <PartOfRow style={{ width: "100px", direction: "rtl" }}>מחיר ליח'</PartOfRow>
                <PartOfRow style={{ width: "80px" }}>כמות</PartOfRow>
                <PartOfRow style={{ width: "350px" }}>חלק</PartOfRow>
                <PartOfRow style={{ width: "50px", direction: "rtl" }}>מס'</PartOfRow>
            </RowOfOrder>

            {tableListToShow}

            <RowOfOrder>
                <Button type="primary" style={{ margin: "5px" }} onClick={() => { handleAdd() }}>הוסף</Button>

                <ConfigProvider direction="rtl">
                    <Select style={{ width: "800px", margin: "5px" }} onChange={handleSelect} value={selectedPartKey}>
                        {partList.map((value, index) => { // Build Select List
                            // extract part details only (String)
                            let rowDetails = "";
                            for (let x = 1; x <= partColumnsExtractLength; x++) {
                                rowDetails = rowDetails + value[partColumns[x]] + " ";
                            }

                            return <Option key={value.key} value={value.key}>{rowDetails}</Option>; // Select Single Row
                        })}

                    </Select>
                </ConfigProvider>

            </RowOfOrder>

        </NewOrderSection>
    );
}

// Order Options
const OrderTableLine = (props) => {

    const [totalLineAmount, setTotalLineAmount] = useState(0);

    const partColumnsExtractLength = useSelector(state => state.order.partColumnsExtractLength); // until which column we need to extract details

    // const tableList = useSelector(state => state.order.tableList);
    const tableListAmount = useSelector(state => state.order.tableListAmount);

    const dispatch = useDispatch();

    // extract part details only for part column (String)
    let rowDetails = "";
    for (let x = 1; x <= partColumnsExtractLength; x++) {
        rowDetails = rowDetails + props.part[props.columnsNamesArray[x]] + " ";
    }

    // update the amount in the Table List Parts Amount
    const updatePartAmount = (amountValue) => {
        let temp = tableListAmount;
        temp[props.numberInList] = amountValue;
        dispatch(orderActions.setTableListAmount(temp));

        setTotalLineAmount(props.part["מחיר יחידה"] * amountValue);
    }

    useEffect(() => {
        setTotalLineAmount(props.part["מחיר יחידה"] * tableListAmount[props.numberInList]);
    });

    const handleDelete = () => {
        props.handleDelete(props.numberInList);
    }

    return (
        <RowOfOrder key={props.part["מקט פנימי"]}>
            <Button type="primary" danger style={{ margin: "5px", width: "70px" }} onClick={()=>{handleDelete()}}>מחק</Button>
            <PartOfRow style={{ width: "100px" }}>{totalLineAmount}</PartOfRow>
            <PartOfRow style={{ width: "100px", direction: "rtl" }}>{props.part["מחיר יחידה"]}</PartOfRow>
            <PartOfRow style={{ width: "80px" }}><Input style={{textAlign: "center"}} defaultValue={tableListAmount[props.numberInList]} value={tableListAmount[props.numberInList]} onChange={(e) => { updatePartAmount(e.target.value); }}></Input></PartOfRow>
            <PartOfRow style={{ width: "350px", textAlign: "center" }}>{rowDetails}</PartOfRow>
            <PartOfRow style={{ width: "50px", direction: "rtl" }}>{props.numberInList + 1}</PartOfRow>
        </RowOfOrder>
    );
}

export default OrderTable;



