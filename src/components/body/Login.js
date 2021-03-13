import React, { useState } from 'react';
import { Form, Input, Button, Checkbox, ConfigProvider, Typography, Modal } from 'antd';
import styled from 'styled-components';
import axios from 'axios';
import { base } from '../TestingData.js';

import { useSelector, useDispatch } from 'react-redux';
import { setConnected, setUserName, setUserID } from '../redux/actions/webStatusActions.js';

const { Item } = Form;

const LoginContainer = styled.div`
    display: flex;

    padding: 5px;

    // background-color: violet;
    background-color: rgba(255, 255, 255, 0.5);
    border-radius: 25px;
    border: solid;

    @media only screen and (max-width: 415px) {  // On Mobile
        align-items: center;
        justify-content: center;
        // height: 350px;
        // width: 300px;
    }
    
    @media only screen and (min-width: 416px) {  // On Computer
        justify-content: center;
        align-items: center;
    }
`;

const NewUser = styled.div`
    
`;

const ExistUser = styled.div`

`;

const StyledForm = styled(Form)`
    font-weight: bold;
    
`;

const StyledFormLine = styled.div`
    display: flex;
    margin: 20px;
    

    @media only screen and (max-width: 415px) {  // On Mobile
        flex-direction: column;
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
        
    }
    
    @media only screen and (min-width: 416px) {  // On Computer
        width: 180px;
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

const StyledInputPassword = styled(Input.Password)`
    direction: ltr;

    @media only screen and (max-width: 415px) {  // On Mobile
        // width: 260px;
    }
    
    @media only screen and (min-width: 416px) {  // On Computer
        
    }
`;

const Login = (props) => {

    const [loginType, setLoginType] = useState(1); // 1 = Exist User, 2 = New User
    const [loading, setLoading] = useState(false); // True while trying to validate data with Server !

    const dispatch = useDispatch();

    const onFinish = (values) => {
        if (loginType === 1) { // Check for Exist User
            setLoading(true);
            axios.post(base + '/existUser', { email: values.email, password: values.password }).then((res) => {
                if (res.data === false) {
                    Modal.info({
                        title: 'הכניסה נכשלה',
                        content: "שגיאה בפרטים או משתמש לא קיים",
                        style: {
                            direction: "rtl"
                        },
                        onOk() { },
                    });
                }
                else {
                    // setTimeout because we need to wait 300 milisecond to fetch data from server
                    setTimeout(() => {
                        dispatch(setUserID(res.data["_id"]));
                        dispatch(setUserName(res.data.fullName));
                        dispatch(setConnected(true));
                        if (values.remember === true) {
                            window.localStorage.setItem("userID", res.data["_id"]);
                            window.localStorage.setItem("userName", res.data.fullName);
                            
                        }
                    }, 300);
                }
                setLoading(false);
            });
        }
        else if (loginType === 2) { // Check for New User
            if (values.password.localeCompare(values.validatepassword) === 0) {
                setLoading(true);
                axios.post(base + '/newUser', { fullName: values.fullName, email: values.email, password: values.password }).then((res) => {
                    if (res.data === false) {
                        Modal.info({
                            title: 'הכניסה נכשלה',
                            content: "משתמש קיים. נא לבצע כניסה.",
                            style: {
                                direction: "rtl"
                            },
                            onOk() { },
                        });
                    }
                    else {
                        // setTimeout because we need to wait 300 milisecond to fetch data from server
                        setTimeout(() => {
                            dispatch(setUserID(res.data["_id"]));
                            dispatch(setUserName(res.data.fullName));
                            dispatch(setConnected(true));
                        }, 300);
                    }
                    setLoading(false);
                });
            }
            else {
                Modal.error({
                    title: '2 הסיסמאות לא זהות',
                    content: "יש לבדוק את השדות ולנסות שוב",
                    style: {
                        direction: "rtl"
                    },
                    onOk() { },
                });
            }
        }
    }

    const onFinishFailed = (values) => {
        console.log(values);
        Modal.info({
            title: 'יש למלא את כל השדות',
            content: "ולנסות שוב",
            style: {
                direction: "rtl"
            },
            onOk() { },
        });
    }

    return (
        <LoginContainer>
            {loginType === 1 ?
                <ExistUser>
                    <ConfigProvider direction="rtl">
                        <StyledForm name="existUser" onFinish={onFinish} onFinishFailed={onFinishFailed}>
                            <StyledFormLine>
                                <StyledText>דואר אלקטרוני</StyledText>
                                <StyledFormItem noStyle="true" label="דואר אלקטרוני" name="email" rules={[{ required: true, message: 'שדה חובה' }]}>
                                    <StyledInput></StyledInput>
                                </StyledFormItem>
                            </StyledFormLine>
                            <StyledFormLine>
                                <StyledText>סיסמא</StyledText>
                                <StyledFormItem noStyle="true" label="סיסמא" name="password" rules={[{ required: true, message: 'שדה חובה' }]}>
                                    <StyledInputPassword></StyledInputPassword>
                                </StyledFormItem>
                            </StyledFormLine>
                            <StyledFormLine style={{ display: "flex", justifyContent: "space-between" }}>
                                <StyledFormItem noStyle="true" name="remember" valuePropName="checked">
                                    <Checkbox disabled={loading}>זכור אותי</Checkbox>
                                </StyledFormItem>
                                <Typography.Link type="danger" onClick={() => { if (!loading) { setLoginType(2) } }} disabled={loading}>משתמש חדש</Typography.Link>
                            </StyledFormLine>
                            <StyledFormLine>
                                <StyledFormItem noStyle="true">
                                    <Button type="primary" htmlType="submit" loading={loading}>
                                        היכנס
                                </Button>
                                </StyledFormItem>
                            </StyledFormLine>
                        </StyledForm>
                    </ConfigProvider>
                </ExistUser>
                : null}

            {loginType === 2 ?
                <NewUser>
                    <ConfigProvider direction="rtl">
                        <StyledForm name="existUser" onFinish={onFinish} onFinishFailed={onFinishFailed}>
                            <StyledFormLine>
                                <StyledText>שם מלא</StyledText>
                                <StyledFormItem noStyle="true" name="fullName" rules={[{ required: true }]}>
                                    <StyledInput style={{ direction: "rtl" }}></StyledInput>
                                </StyledFormItem>
                            </StyledFormLine>
                            <StyledFormLine>
                                <StyledText>דואר אלקטרוני</StyledText>
                                <StyledFormItem noStyle="true" name="email" rules={[{ required: true }]}>
                                    <StyledInput></StyledInput>
                                </StyledFormItem>
                            </StyledFormLine>
                            <StyledFormLine>
                                <StyledText>סיסמא</StyledText>
                                <StyledFormItem noStyle="true" name="password" rules={[{ required: true }]}>
                                    <StyledInputPassword></StyledInputPassword>
                                </StyledFormItem>
                            </StyledFormLine>
                            <StyledFormLine>
                                <StyledText>אימות סיסמא</StyledText>
                                <StyledFormItem noStyle="true" name="validatepassword" rules={[{ required: true }]}>
                                    <StyledInputPassword></StyledInputPassword>
                                </StyledFormItem>
                            </StyledFormLine>
                            <StyledFormLine style={{ display: "flex", justifyContent: "flex-end" }}>
                                <Typography.Link type="danger" onClick={() => { if (!loading) { setLoginType(1) } }} disabled={loading}>משתמש קיים</Typography.Link>
                            </StyledFormLine>
                            <StyledFormLine>
                                <StyledFormItem noStyle="true">
                                    <Button type="primary" htmlType="submit" loading={loading}>
                                        צור משתמש
                                </Button>
                                </StyledFormItem>
                            </StyledFormLine>
                        </StyledForm>
                    </ConfigProvider>
                </NewUser>
                : null}
        </LoginContainer>
    );
}



export default Login;

