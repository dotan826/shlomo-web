import React from 'react';
import { Row, Col, Button, Typography, Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import shlomoLogo from '../../images/PNGlogo.png';

import { useSelector, useDispatch } from 'react-redux';
import { setConnected, setCurrentPage } from '../redux/actions/webStatusActions.js';

const StyledHeader = styled.div`
    background-color: rgba(255, 255, 255, 0.5);
    border-radius: 0px 0px 25px 25px;
`;

const StyledRow = styled(Row)`
    justify-content: space-evenly;


    @media only screen and (max-width: 415px) {  // On Mobile
        flex-direction: column-reverse;
        align-items: center;
    }
    
    @media only screen and (min-width: 416px) {  // On Computer
        
    }
`;

const StyledLeftCol = styled(Col)`
    margin: 5px;
    display: flex;
    justify-content: center;
    align-items: center;

    // background-color: green;

    @media only screen and (max-width: 415px) {  // On Mobile
        width: 300px;
    }

    @media only screen and (min-width: 416px) {  // On Computer
        width: 900px;

    }
`;

const StyledRightCol = styled(Col)`
    margin: 5px;
    display: flex;
    justify-content: center;

    // background-color: blue;

    @media only screen and (max-width: 415px) {  // On Mobile
        width: 300px;
    }

    @media only screen and (min-width: 416px) {  // On Computer
        width: 200px;

    }
`;

const WebLogo = styled.img`

    @media only screen and (max-width: 415px) {  // On Mobile
        width: 100px;
    }

    @media only screen and (min-width: 416px) {  // On Computer
        width: 150px;

    }
`;

const WebPageInteraction = styled.div`
    display: flex;
    justify-content: space-evenly;
    align-items: center;

    @media only screen and (max-width: 415px) {  // On Mobile
        width: 300px;
        height: 60px;
    }

    @media only screen and (min-width: 416px) {  // On Computer
        width: 500px;
        height: 80px;
        border: solid;
    }
`;

const UserDetailsAndStatus = styled.div`
    margin: 5px;
`;

const WebPageActions = styled.div`
    margin: 5px;
`;

const MyHeader = (props) => {

    const dispatch = useDispatch();
    const isConnected = useSelector(state => state.webStatus.isConnected);
    const userName = useSelector(state => state.webStatus.userName);
    

    // Disconnect User
    const disconnectUser = () => {
        dispatch(setConnected(false));
        dispatch(setCurrentPage("Menu"));
        window.localStorage.clear();
    }

    return (
        <StyledHeader>
            <StyledRow>
                {isConnected ?
                    <StyledLeftCol>
                        <WebPageInteraction>
                            <WebPageActions>
                                <Button type="primary" size="large" danger onClick={()=>{disconnectUser()}}>התנתק</Button>
                            </WebPageActions>
                            <UserDetailsAndStatus>
                                <Typography.Text strong={true} style={{ margin: "5px" }}>{userName}</Typography.Text>
                                <Avatar icon={<UserOutlined />} style={{ margin: "5px" }}></Avatar>
                            </UserDetailsAndStatus>
                        </WebPageInteraction>
                    </StyledLeftCol>
                    : null}
                <StyledRightCol>
                    <WebLogo src={shlomoLogo}></WebLogo>
                </StyledRightCol>
            </StyledRow>

        </StyledHeader>
    );
}


export default MyHeader;


