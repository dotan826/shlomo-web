import React from 'react';
import styled from 'styled-components';
import { Button, Modal } from 'antd';
import { base } from '../TestingData.js';
import axios from 'axios';

import { useSelector, useDispatch } from 'react-redux';
import { setCurrentPage } from '../redux/actions/webStatusActions.js';

const MenuPageContainer = styled.div`
    display: flex;

    background-color: rgba(255, 255, 255, 0.5);
    border: solid;

    @media only screen and (max-width: 415px) {  // On Mobile
        flex-direction: column-reverse;
    }

    @media only screen and (min-width: 416px) {  // On Computer

    }
`;

const StyledButton = styled(Button)`
    margin: 20px;
    background-color: #3D9970;
    font-weight: bold;
    color: black;
    border: none;

    &:hover{
        background-color: #39CCCC;
    }

    @media only screen and (max-width: 415px) {  // On Mobile
        
    }

    @media only screen and (min-width: 416px) {  // On Computer
        width: 150px;
        height: 50px;
    }
`;

const MenuPage = (props) => {

    const userID = useSelector(state => state.webStatus.userID);
    const dispatch = useDispatch();

    const checkForSuppliers = () => {
        axios.post(base + '/suppliers', { userID: userID }).then((documents) => {
            if(documents.data.length > 0){
                dispatch(setCurrentPage("Parts"));
            }
            else{
                Modal.info({
                    title: 'לא קיימים ספקים',
                    content: "צור ספקים חדשים ונסה שוב",
                    style: {
                      direction: "rtl"
                    },
                    onOk() { },
                  });
            }
        });
    }

    return(
        <MenuPageContainer>
            <StyledButton type="primary" onClick={()=>{dispatch(setCurrentPage("Orders"))}}>הזמנות</StyledButton>
            <StyledButton type="primary" onClick={()=>{checkForSuppliers()}}>טבלאות חלקים</StyledButton>
            <StyledButton type="primary" onClick={()=>{dispatch(setCurrentPage("Manufacturers"))}}>יצרנים</StyledButton>
            <StyledButton type="primary" onClick={()=>{dispatch(setCurrentPage("Suppliers"))}}>ספקים</StyledButton>
            <StyledButton type="primary" onClick={()=>{dispatch(setCurrentPage("Clients"))}}>לקוחות</StyledButton>
        </MenuPageContainer>
    );
}

export default MenuPage;

