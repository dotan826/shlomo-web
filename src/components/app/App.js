import React, { useEffect, useState } from 'react';
import './App.less';
import { Layout } from 'antd';
import styled from 'styled-components';
import MyHeader from '../body/MyHeader.js';
import MyFooter from '../body/MyFooter.js';
import Login from '../body/Login.js';
import MenuPage from '../menu/MenuPage.js';
import Clients from '../menu/Clients.js';
import Suppliers from '../menu/Suppliers.js';
import Manufacturers from '../menu/Manufacturers.js';
import Parts from '../menu/parts/Parts.js';
import Orders from '../orders/Orders.js';

import OrderCreate from '../orders/OrderCreate.js';

import { useSelector, useDispatch } from 'react-redux';
import { setConnected, setUserName, setUserID, setCurrentPage } from '../redux/actions/webStatusActions.js'

const { Content } = Layout;

const StyledLayout = styled(Layout)`
    min-height: 100vh;
    background-color: transparent;

`;

const StyledContent = styled(Content)`
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 10px;
`;

function App() {

  const isConnected = useSelector(state => state.webStatus.isConnected); // True = user is connected. False = otherwise.
  const userName = useSelector(state => state.webStatus.userName); // Current User Name
  const userID = useSelector(state => state.webStatus.userID); // Current User ID

  const currentPage = useSelector(state => state.webStatus.currentPage); // Current Active Page
  // Pages : Menu / Clients / Suppliers / Manufacturers / Exist Order / New Order

  const dispatch = useDispatch();

  useEffect(() => {
    if (window.localStorage.length > 0) {
      dispatch(setUserName(window.localStorage.getItem("userName")));
      dispatch(setUserID(window.localStorage.getItem("userID")));
      dispatch(setConnected(true));
      dispatch(setCurrentPage("Menu"));
    }
  }, []);

  return (
      <StyledLayout>

        <MyHeader></MyHeader>

        <StyledContent>
          {isConnected ?
            (String(currentPage).localeCompare("Menu") === 0 ? <MenuPage></MenuPage> : null) ||
            (String(currentPage).localeCompare("Clients") === 0 ? <Clients></Clients> : null) ||
            (String(currentPage).localeCompare("Suppliers") === 0 ? <Suppliers></Suppliers> : null) ||
            (String(currentPage).localeCompare("Manufacturers") === 0 ? <Manufacturers></Manufacturers> : null) ||
            (String(currentPage).localeCompare("Parts") === 0 ? <Parts></Parts> : null) ||
            (String(currentPage).localeCompare("Orders") === 0 ? <Orders></Orders> : null) ||
            (String(currentPage).localeCompare("OrderCreate") === 0 ? <OrderCreate></OrderCreate> : null)
            : null}

          {isConnected ? null : <Login></Login>}

        </StyledContent>

        <MyFooter></MyFooter>

      </StyledLayout>
  );
}

export default App;
