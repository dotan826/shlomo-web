import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Button, Table, ConfigProvider, Typography, Modal } from 'antd';
import EditRow from '../../EditRow.js';
import { testingAffixingData, base } from '../../TestingData.js'; // TESTING
import axios from 'axios';
import { ObjectID } from 'mongodb';

import { useSelector } from 'react-redux';

const AffixingContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    // background-color: rgba(255, 255, 255, 0.5);
    // border: solid;

    @media only screen and (max-width: 415px) {  // On Mobile
        
        width: 300px;
    }

    @media only screen and (min-width: 416px) {  // On Computer
        width: 1200px;
    }
`;

const StyledTitle = styled(Typography.Title)`
    display: flex;
    justify-content: center;
    

    @media only screen and (max-width: 415px) {  // On Mobile
      
    }

    @media only screen and (min-width: 416px) {  // On Computer
      
    }
`;

const TableSection = styled.div`
    @media only screen and (max-width: 415px) {  // On Mobile
      margin-top: 20px;
      margin-bottom: 20px;
      width: 350px;
    }

    @media only screen and (min-width: 416px) {  // On Computer
      width: 1200px;
    }
`;

const StyledTable = styled(Table)`

  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 25px;
    
  @media only screen and (max-width: 415px) {  // On Mobile
      // #styledTable{
        
      // }
  }

  @media only screen and (min-width: 416px) {  // On Computer
    // #styledTable{
    //   display: none;
    // }
  }
`;

const ButtonsSection = styled.div`
    display: flex;

    @media only screen and (max-width: 415px) {  // On Mobile
        margin-top: 20px;
        margin-bottom: 20px;
        flex-wrap: wrap;
        justify-content: center;
    }

    @media only screen and (min-width: 416px) {  // On Computer
        justify-content: center;
    }
`;

const StyledButton = styled(Button)`
    background-color: #3D9970;
    font-weight: bold;
    color: black;
    border: none;

    &:hover{
        background-color: #39CCCC;
    }

    @media only screen and (max-width: 415px) {  // On Mobile
        margin: 10px;
        // width: 100px;
        // height: 30px;
    }

    @media only screen and (min-width: 416px) {  // On Computer
        margin: 20px;
        height: 50px;
    }
`;

const columns = [
  {
    title: <Typography.Text strong>????"?? ??????????</Typography.Text>,                      // Title of the Column
    dataIndex: '?????? ??????????',                  // Data Index (something like unique description)
    // render: (text) => {<a>{text}</a>}, // Render JSX into each cell in this column
    width: 100,
  },
  {
    title: <Typography.Text strong>????-??????????????</Typography.Text>,
    dataIndex: '???? ??????????????',
    width: 100,
  },
  {
    title: <Typography.Text strong>??????</Typography.Text>,
    dataIndex: '??????',
    width: 100,
  },
  {
    title: <Typography.Text strong>????????</Typography.Text>,
    dataIndex: '????????',
    width: 100,
  },
  {
    title: <Typography.Text strong>?????? ????????</Typography.Text>,
    dataIndex: '?????? ????????',
    width: 100,
  },
  {
    title: <Typography.Text strong>??????????</Typography.Text>,
    dataIndex: '??????????',
    width: 100,
  },
  {
    title: <Typography.Text strong>??????????</Typography.Text>,
    dataIndex: '??????????',
    width: 100,
  },
  {
    title: <Typography.Text strong>????????</Typography.Text>,
    dataIndex: '????????',
    width: 100,
  },
  {
    title: <Typography.Text strong>???????? ??????????</Typography.Text>,
    dataIndex: '???????? ??????????',
    width: 120,
  },
  {
    title: <Typography.Text strong>???????? ??????????</Typography.Text>,
    dataIndex: '???????? ??????????',
    width: 100,
  },
  {
    title: <Typography.Text strong>??????</Typography.Text>,
    dataIndex: '??????',
    width: 100,
  },
  {
    title: <Typography.Text strong>????"?? ??????</Typography.Text>,
    dataIndex: '?????? ??????',
    width: 100,
  },
  {
    title: <Typography.Text strong>??????</Typography.Text>,
    dataIndex: '??????',
    width: 100,
  },
  {
    title: <Typography.Text strong>?????????? ??????????</Typography.Text>,
    dataIndex: '?????????? ??????????',
    width: 100,
  },
  {
    title: <Typography.Text strong>??????????</Typography.Text>,
    dataIndex: '??????????',
    width: 500,
  }
];

const AffixingTable = (props) => {

  const userID = useSelector(state => state.webStatus.userID);

  const newRow = { // New Row Template when adding new row
    // "_id" = no need for this field because MongoDB will add it automaticaly ! (it's a new document!)
    "_uid": userID,
    "_sid": props.partStatus.getSelectedSupplier(),
    "key": new ObjectID().toHexString(),
    "?????? ??????????": "",
    "???? ??????????????": "",
    "??????": "",
    "????????": "",
    "?????? ????????": "",
    "??????????": "",
    "??????????": "",
    "????????": "",
    "???????? ??????????": "",
    "???????? ??????????": "",
    "??????": "",
    "?????? ??????": "",
    "??????": "",
    "?????????? ??????????": "",
    "??????????": ""
  }

  const [currentSelectedRow, setCurrentSelectedRow] = useState(null); // Current Selected Row Data
  const [loadingData, setLoadingData] = useState(false); // True when loading data from server
  const [showEditOrNewRow, setShowEditOrNewRow] = useState(false); // True when we Edit or Adding a Row
  const [tableData, setTableData] = useState(null); // set Table Data from Server
  const [actionType, setActionType] = useState(null); // set Action Type (Edit / Delete / Add)

  const loadTableData = () => { // Get Table Data from Server
    setLoadingData(true);
    axios.post(base + '/affixing', { userID: userID, supplierID: props.partStatus.getSelectedSupplier() }).then((documents) => {
      setTableData(documents.data);
      setLoadingData(false);
    });
  }

  useEffect(() => { // Initiate Table Data when page is starting
    loadTableData();
  }, []);

  const affixingActions = { // All Actions on Clients Page
    backToMenuPage: () => { // Go Back to Menu Page
      props.partStatus.resetSelected();
      props.partStatus.setCurrentPartPage("Parts");
    },
    setShowEditOrNewRow: (value) => { // Show Edit Selected Row Page
      setShowEditOrNewRow(value);
    },
    editRow: () => { // Edit Selected Row
      if (currentSelectedRow !== null) {
        setActionType("Edit");
        setShowEditOrNewRow(true);
      }
      else {
        Modal.info({
          title: '???? ?????????? ????????',
          content: "",
          style: {
            direction: "rtl"
          },
          onOk() { },
        });
      }
    },
    deleteRow: () => { // Delete Selected Row
      if (currentSelectedRow !== null) {
        //console.log("Delete Row (Key) : ", currentSelectedRow);
        axios.post(base + '/remove', { collectionName: "Affixing", deleteDocumentKey: currentSelectedRow.key }).then((deleteResult) => {
          if (deleteResult.data) {
            loadTableData();
          }
          else {
            Modal.info({
              title: '??????????',
              content: "???? ?????? ???????? ??????????, ?????? ???????? ???????? ?????? ??????????.",
              style: {
                direction: "rtl"
              },
              onOk() { },
            });
          }
        });
      }
      else {
        Modal.info({
          title: '???? ?????????? ????????',
          content: "",
          style: {
            direction: "rtl"
          },
          onOk() { },
        });
      }
    },
    createRow: () => { // Create New Row
      setActionType("Add");
      setCurrentSelectedRow(newRow);
      setShowEditOrNewRow(true);
    },
    saveEditRow: (oldDocument, updatedDocument) => {
      axios.post(base + '/edit', { collectionName: "Affixing", queryKey: oldDocument.key, updatedDocument: updatedDocument }).then((editResult) => {
        if (editResult.data) {
          loadTableData();
        }
        else {
          Modal.info({
            title: '??????????',
            content: "???? ?????? ???????? ??????????, ?????? ???????? ???????? ?????? ??????????.",
            style: {
              direction: "rtl"
            },
            onOk() { },
          });
        }
      });
    },
    saveCreateRow: (newDocument) => {
      axios.post(base + '/add', { collectionName: "Affixing", newDocument: newDocument }).then((insertResult) => {
        if (insertResult.data) {
          loadTableData();
        }
        else {
          Modal.info({
            title: '??????????',
            content: "???? ?????? ???????? ??????????, ?????? ???????? ???????? ?????? ??????????.",
            style: {
              direction: "rtl"
            },
            onOk() { },
          });
        }
      });
    },
    resetCurrentSelectedRow: () => { // Reset Current Selected Row
      setCurrentSelectedRow(null);
    },
    getCurrentSelectedRow: () => { // Get Current Selected Row
      return currentSelectedRow;
    },
    getActionType: () => { // get Action Type (Edit / Delete / Add)
      return actionType;
    }
  }

  return (
    <AffixingContainer>
      {showEditOrNewRow ? <EditRow actions={affixingActions} ></EditRow> :
        <div>
          <TableSection>
            <StyledTitle type={"danger"}>??????????</StyledTitle>
            <ConfigProvider direction="rtl">
              <StyledTable
                columns={columns}
                dataSource={tableData}
                scroll={{ scrollToFirstRowOnChange: true, x: "max-content" }}
                pagination={{ pageSize: 10, onChange: () => { setCurrentSelectedRow(null) }, position: ["bottomCenter"] }}
                size="small"
                rowSelection={{ type: "radio", onSelect: (record, selected, selectedRows, nativeEvent) => { setCurrentSelectedRow(record) } }}
                loading={loadingData}
              ></StyledTable>
            </ConfigProvider>
          </TableSection>
          <ButtonsSection>
            <StyledButton type="primary" danger onClick={() => { affixingActions.backToMenuPage() }}>???????? ???????????? ????????</StyledButton>
            <StyledButton type="primary" onClick={() => { affixingActions.createRow() }}>??????</StyledButton>
            <StyledButton type="primary" danger onClick={() => { affixingActions.deleteRow() }}>??????</StyledButton>
            <StyledButton type="primary" onClick={() => { affixingActions.editRow() }}>????????</StyledButton>
          </ButtonsSection>
        </div>
      }
    </AffixingContainer>
  );
}

export default AffixingTable;


