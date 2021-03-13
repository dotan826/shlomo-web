import React, { useState } from 'react';
import { Form, Input, Button, ConfigProvider, Typography, Modal } from 'antd';
import styled from 'styled-components';

const { Item } = Form;

const EditRowContainer = styled.div`
    display: flex;

    padding: 5px;

    // background-color: violet;
    background-color: rgba(255, 255, 255, 0.5);
    border-radius: 25px;
    border: solid;

    @media only screen and (max-width: 415px) {  // On Mobile
        align-items: center;
        justify-content: center;
        margin-top: 20px;
        margin-bottom: 20px;
        // height: 350px;
        width: 350px;
    }
    
    @media only screen and (min-width: 416px) {  // On Computer
        justify-content: center;
        align-items: center;
        width: 450px;
    }
`;

const StyledForm = styled(Form)`
    font-weight: bold;
    
`;

const StyledFormLine = styled.div`
    display: flex;
    margin: 20px;
    

    @media only screen and (max-width: 415px) {  // On Mobile
        justify-content: center;
    }
    
    @media only screen and (min-width: 416px) {  // On Computer
        justify-content: center;
    }
`;

const StyledFormItem = styled(Item)`
    display: flex;

    @media only screen and (max-width: 415px) {  // On Mobile
        
    }
    
    @media only screen and (min-width: 416px) {  // On Computer

    }
`;

const StyledText = styled(Typography.Text)`
    
    @media only screen and (max-width: 415px) {  // On Mobile
        width: 150px;
        
    }
    
    @media only screen and (min-width: 416px) {  // On Computer
        width: 200px;
    }
`;

const StyledInput = styled(Input)`
    direction: ltr;

    @media only screen and (max-width: 415px) {  // On Mobile
        // width: 260px;
    }
    
    @media only screen and (min-width: 416px) {  // On Computer
        
    }
`;

const EditRow = (props) => {

    const [loading, setLoading] = useState(false); // True while trying to validate data with Server !

    const goBackToTable = () => {
        props.actions.setShowEditOrNewRow(false);
        props.actions.resetCurrentSelectedRow();
    }

    const onFinish = (values) => {
        const data = props.actions.getCurrentSelectedRow(); // get selected row data
        const valuesToSend = values;
        if((props.actions.getActionType()).localeCompare("Edit") === 0){
            for(let i in data){
                if(i.localeCompare("_uid") === 0){
                    valuesToSend["_uid"] = data[i];
                }
                else if(i.localeCompare("_sid") === 0){
                    valuesToSend["_sid"] = data[i];
                }
                else if(i.localeCompare("key") === 0){
                    valuesToSend["key"] = data[i];
                }
            }
            props.actions.saveEditRow(values, valuesToSend);
        }
        else if((props.actions.getActionType()).localeCompare("Add") === 0){
            for(let i in data){
                if(i.localeCompare("_id") === 0){
                    valuesToSend["_id"] = data[i];
                }
                if(i.localeCompare("_uid") === 0){
                    valuesToSend["_uid"] = data[i];
                }
                else if(i.localeCompare("_sid") === 0){
                    valuesToSend["_sid"] = data[i];
                }
                else if(i.localeCompare("key") === 0){
                    valuesToSend["key"] = data[i];
                }
            }
            props.actions.saveCreateRow(valuesToSend);
        }
        goBackToTable();
    }

    const onFinishFailed = (values) => {
        console.log(values);
        Modal.info({
            title: 'חובה למלא שם',
            content: "",
            style: {
                direction: "rtl"
            },
            onOk() { },
        });
    }

    const columns = [];
    const row = [];
    const initValues = {};
    const initRows = [];

    const initiateColumnsAndRow = () => { // Get Selected Row and Initiate object values for Form
        const data = props.actions.getCurrentSelectedRow(); // get selected row data
        for (let i in data) {
            if (i.localeCompare("key") !== 0 && i.localeCompare("_id") !== 0 && i.localeCompare("_uid") !== 0 && i.localeCompare("_sid") !== 0) { // get all title and data WITHOUT key property
                columns.push(i);
                row.push(data[i]);
            }
        }
        for (let i = 0; i < columns.length; i++) { // arrange all title and data in Array for keeping their order
            initValues[columns[i]] = row[i];
            initRows.push(
                <StyledFormLine key={i}>
                    <StyledText>{columns[i]}</StyledText>
                    <StyledFormItem noStyle="true" name={columns[i]}>
                        <StyledInput style={{ direction: "rtl" }}></StyledInput>
                    </StyledFormItem>
                </StyledFormLine>
            );
        }
    }

    return (
        <EditRowContainer>
            <ConfigProvider direction="rtl">
                {initiateColumnsAndRow()}
                <StyledForm
                    name="existUser"
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    initialValues={
                        initValues
                    }>
                    {initRows}
                    <StyledFormLine>
                        <StyledFormItem noStyle="true">
                            <Button type="primary" htmlType="submit" loading={loading} style={{ margin: "5px" }}>
                                שמור
                            </Button>
                            <Button type="primary" danger style={{ margin: "5px" }} onClick={() => { goBackToTable() }}>
                                בטל
                            </Button>
                        </StyledFormItem>
                    </StyledFormLine>
                </StyledForm>
            </ConfigProvider>
        </EditRowContainer>
    );
}



export default EditRow;

