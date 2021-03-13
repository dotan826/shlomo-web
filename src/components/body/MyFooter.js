import React from 'react';
import { Layout, Row, Typography } from 'antd';
import styled from 'styled-components';

const { Footer } = Layout;
const { Text, Link } = Typography;

const StyledFooter = styled(Footer)`
    background-color: rgba(255, 255, 255, 0.5);
    padding: 5px;
    
    @media only screen and (max-width: 415px) {  // On Mobile
        
    }
    
    @media only screen and (min-width: 416px) {  // On Computer
        
    }
`;

const StyledRow = styled(Row)`
    justify-content: center;
    direction: rtl;
`;

const StyledText = styled(Text)`
    text-align: center;
    margin: 5px;
`;

const StyledLink = styled(Link)`
    text-align: center;
    margin: 5px;
`;

const MyFooter = (props) => {
    return(
        <StyledFooter>
            <StyledRow>
                <StyledText strong={true}>
                    כל הזכויות שמורות לשלמה מחשוב הייצור בע"מ.
                </StyledText>
                <StyledLink strong={true} href="https://www.redboxteams.com/" target="_blank">האתר תוכנן ונבנה ע"י דותן צרפתי</StyledLink>
            </StyledRow>
        </StyledFooter>
    );
}

export default MyFooter;

