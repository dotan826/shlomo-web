import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { ConfigProvider, Typography, Select, Button, Modal } from 'antd';
import axios from 'axios';
import { base } from '../../TestingData.js';
import AffixingTable from './AffixingTable.js';
import WoodTable from './WoodTable.js';
import PlywoodTable from './PlywoodTable.js';

import { useSelector, useDispatch } from 'react-redux';
import { setCurrentPage } from '../../redux/actions/webStatusActions.js';

const { Option } = Select;

const PartsContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;

    background-color: rgba(255, 255, 255, 0.5);
    border-radius: 25px;
    border: solid;

    @media only screen and (max-width: 415px) {  // On Mobile
        width: 300px;
        height: 200px;
    }
    
    @media only screen and (min-width: 416px) {  // On Computer
        width: 400px;
        height: 250px;
    }
`;

const StyledLine = styled.div`
    display: flex;

    justify-content: space-evenly;

    @media only screen and (max-width: 415px) {  // On Mobile
        width: 300px;

    }
    
    @media only screen and (min-width: 416px) {  // On Computer
        width: 300px;

    }
`;

const StyledTitle = styled(Typography.Title)`

`;

const StyledSelect = styled(Select)`
    min-width: 150px;
`;

const StyledOption = styled(Option)`

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

const Parts = (props) => {

    const currentPage = useSelector(state => state.webStatus.currentPage);
    const userID = useSelector(state => state.webStatus.userID);
    const dispatch = useDispatch();
    
    const [currentPartPage, setCurrentPartPage] = useState(currentPage); // Current Part Page

    const [suppliersList, setSuppliersList] = useState(null); // Suppliers List

    const [selectedParts, setSelectedParts] = useState(0); // Selected Parts from the list
    const [selectedSupplier, setSelectedSupplier] = useState(null); // Selected Supplier from the list

    const partStatus = {
        resetSelected: () => {
            setSelectedParts(0);
            setSelectedSupplier(null);
        },
        setCurrentPartPage: (value) => {
            setCurrentPartPage(value);
        },
        getSelectedSupplier: () => {
            return selectedSupplier;
        }
    }

    const handlePartClick = (value) => { // Affixing = 1 , Plywood = 2, Wood = 3
        setSelectedParts(value);
    }

    const handleSupplierClick = (value) => { // value is _id of supplier
        setSelectedSupplier(value);
    }

    const handleChoiceClick = () => {
        if(selectedSupplier !== null){
            if (selectedParts === 1) {
                setCurrentPartPage("Affixing");
            }
            else if (selectedParts === 2) {
                setCurrentPartPage("Plywood");
            }
            else if (selectedParts === 3) {
                setCurrentPartPage("Wood");
            }
        }
        else{
            Modal.info({
                title: 'נא לבחור חלק וספק',
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
    }

    useEffect(() => {
        reloading();
    });

    return (
        <div>

            {currentPartPage.localeCompare("Parts") === 0 ?
                <PartsContainer>
                    <ConfigProvider direction="rtl">
                        <StyledLine>
                            <StyledTitle level={3}>בחר ספק וטבלת חלקים</StyledTitle>
                        </StyledLine>
                        <StyledLine>
                            <StyledSelect defaultValue="" style={{ width: 120, fontWeight: "bold" }} onChange={handlePartClick}>
                                <StyledOption style={{ fontWeight: "bold" }} value={1}>פרזול</StyledOption>
                                <StyledOption style={{ fontWeight: "bold" }} value={2}>לבידים</StyledOption>
                                <StyledOption style={{ fontWeight: "bold" }} value={3}>עץ</StyledOption>
                            </StyledSelect>
                            <span style={{ fontWeight: "bold" }}>חלק</span>
                        </StyledLine>
                        <StyledLine>
                            <StyledSelect defaultValue="" style={{ width: 120, fontWeight: "bold" }} onChange={handleSupplierClick}>
                                {suppliersList ?
                                    suppliersList.map((value, index) => {
                                        return (<StyledOption style={{ fontWeight: "bold" }} key={value["key"]} value={value["_id"]}>{value["שם"]}</StyledOption>);
                                    })
                                    : null}

                            </StyledSelect>
                            <span style={{ fontWeight: "bold" }}>ספק</span>
                        </StyledLine>
                        <StyledLine>
                            <StyledButton type="primary" danger onClick={() => { dispatch(setCurrentPage("Menu")) }}>חזרה לתפריט</StyledButton>
                            <StyledButton type="primary" onClick={() => { handleChoiceClick() }}>בחר</StyledButton>
                        </StyledLine>
                    </ConfigProvider>
                </PartsContainer>
                : null}

            {currentPartPage.localeCompare("Affixing") === 0 ?
                <AffixingTable partStatus={partStatus}></AffixingTable>
                : null}

            {currentPartPage.localeCompare("Wood") === 0 ?
                <WoodTable partStatus={partStatus}></WoodTable>
                : null}

            {currentPartPage.localeCompare("Plywood") === 0 ?
                <PlywoodTable partStatus={partStatus}></PlywoodTable>
                : null}

        </div>

    );
}


export default Parts;


