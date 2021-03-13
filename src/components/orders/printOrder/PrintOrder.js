import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as orderActions from '../../redux/actions/orderActions.js';
import { Page, Text, View, Document, StyleSheet, PDFViewer, Font, Image } from '@react-pdf/renderer';
import fontSource from '../../../fonts/Varela_Round/VarelaRound-Regular.ttf';
import shlomoLogo from '../../../images/PNGlogo.png'; // logo
import { Button } from 'antd';

// Register font
Font.register({ family: 'VarelaRound', src: fontSource });

// Create styles
const styles = StyleSheet.create({
    page: {
        display: "flex",
        justifyContent: "space-between",
        fontFamily: "VarelaRound",
        fontWeight: "bold",
        fontSize: 15,
        backgroundColor: "#F0F8FF",

    },

});

const dateObj = new Date();
const month = dateObj.getUTCMonth() + 1; //months from 1-12
const day = dateObj.getUTCDate();
const year = dateObj.getUTCFullYear();

const todayDateObj = day + "/" + month + "/" + year;

const supplierDetailsList = [
    // "שם",     >>>> add it as independet !
    // "חפ",
    // "רחוב",
    // "עיר",
    // "מיקוד",
    // "תד",
    "טלפון",
    "פלאפון",
    "פקס",
    // "מייל",
    // "סוג פעילות",
    // "הערות"
]

const clientDetailsList = [
    "שם",
    // "חפ",
    "רחוב",
    "עיר",
    "מיקוד",
    "תד",
    // "טלפון",
    // "פלאפון",
    // "פקס",
    // "מייל",
    // "סוג פעילות",
    // "הערות"
]

const affixingColumns = [
    // "_id",
    "מקט פנימי",
    "תת קטגוריה",
    "סוג",
    "חברה",
    "סוג משנה",
    "גימור",
    "מידות",
    "משקל",
    // "שיטת חישוב",
    // "מחיר יחידה",
    "ספק",
    // "מקט ספק",
    "דגם",
    // "תאריך עדכון",
    // "הערות",
    // "_uid",
    // "_sid",
    // "key"
];

const plywoodColumns = [
    // "_id",
    "מקט פנימי",
    "תת קטגוריה",
    "סוג",
    "תת סוג",
    "סוג משנה",
    "ציפוי",
    // "שיטת חישוב",
    "מידות",
    // "מחיר יחידה",
    // "ספק",
    // "תאריך עדכון",
    // "הערות",
    // "_uid",
    // "_sid",
    // "key",
];

const woodColumns = [
    // "_id",
    "מקט פנימי",
    "תת קטגוריה",
    "מבנה החומר",
    "שם החומר",
    "עובי",
    "עובי בממ",
    // "שיטת חישוב",
    // "דרך חישוב",
    // "מחיר יחידה",
    // "מחיר יחידה בשח",
    // "ספק",
    // "תאריך עדכון",
    // "הערות",
    // "_uid",
    // "_sid",
    // "key"
];

const PrintOrder = (props) => {
    const orderTypePage = useSelector(state => state.order.orderTypePage); // 1 = Select Order, 2 = New Order, 3 = Exist Order, 4 = Loading

    const selectedOrder = useSelector(state => state.order.selectedOrder); // Selected Order Type
    const selectedSupplierName = useSelector(state => state.order.selectedSupplierName); // Selected Supplier Name
    const selectedSupplierID = useSelector(state => state.order.selectedSupplierID); // Selected Supplier ID
    const selectedClientName = useSelector(state => state.order.selectedClientName); // Selected Client Name
    const selectedClientID = useSelector(state => state.order.selectedClientID); // Selected Client ID
    const projectName = useSelector(state => state.order.projectName); // Project Name
    const projectSupplyDate = useSelector(state => state.order.projectSupplyDate); // Project Supply Date

    const orderNotes = useSelector(state => state.order.orderNotes); // Project Supply Date
    const orderSupplyNotes = useSelector(state => state.order.orderSupplyNotes); // Project Supply Date

    const tableList = useSelector(state => state.order.tableList); // Project Supply Date
    const tableListAmount = useSelector(state => state.order.tableListAmount); // Project Supply Date

    const [supplierString, setSupplierString] = useState("");
    const [clientString, setClientString] = useState("");
    const tableStrings = []; // all table rows with Parts, Prices, Amounts and Sum !
    const [tableStringsJSXRender, setTableStringsJSXRender] = useState([]);

    const [loading, setLoading] = useState(true);

    useEffect(()=>{

        // Get Supplier Details
        for(let x of props.listsForPrinting.suppliersList){
            if(x["_id"].localeCompare(selectedSupplierID) === 0){ // we found our supplier ! and he is an object !
                let temp = "";
                for(let y of supplierDetailsList){
                    temp = temp.concat(x[y] + " ");
                }
                setSupplierString(temp);
            }
        }

        // Get Client Details
        for(let x of props.listsForPrinting.clientsList){
            if(x["_id"].localeCompare(selectedClientID) === 0){ // we found our client ! and he is an object !
                let temp = "";
                for(let y of clientDetailsList){
                    temp = temp.concat(x[y] + " ");
                }
                setClientString(temp);
            }
        }

        // Get Parts and Prices Details
        if(selectedOrder.localeCompare("פרזול") === 0){
            let i = 0;
            for(let part of tableList){
                let temp = "";
                for(let column of affixingColumns){
                    if(part[column].localeCompare("") !== 0){
                        temp = temp + part[column] + ", ";
                    }
                }
                tableStrings.push({ key: i+1, partString: temp, partPrice: part["מחיר יחידה"], partAmount: tableListAmount[i], partSum: (part["מחיר יחידה"] * tableListAmount[i]) });
                i = i + 1;
            }
        }
        else if(selectedOrder.localeCompare("לבידים") === 0){
            let i = 0;
            for(let part of tableList){
                let temp = "";
                for(let column of plywoodColumns){
                    temp = temp + part[column] + ", ";
                }
                tableStrings.push({ key: i+1, partString: temp, partPrice: part["מחיר יחידה"], partAmount: tableListAmount[i], partSum: (part["מחיר יחידה"] * tableListAmount[i]) });
                i = i + 1;
            }
        }
        else if(selectedOrder.localeCompare("עץ") === 0){
            let i = 0;
            for(let part of tableList){
                let temp = "";
                for(let column of woodColumns){
                    temp = temp + part[column] + ", ";
                }
                tableStrings.push({ key: i+1, partString: temp, partPrice: part["מחיר יחידה"], partAmount: tableListAmount[i], partSum: (part["מחיר יחידה"] * tableListAmount[i]) });
                i = i + 1;
            }
        }

        // Convert everything before Render !
        setTableStringsJSXRender(current => [...current, (
            <View key={0} style={{ display: "flex", flexDirection: "row", justifyContent: "center", margin: 5 }}>
                <View style={{ display: "flex", flexDirection: "row", justifyContent: "center", width: 80 }}>
                    <Text style={{ textDecoration: "underline" }}>סיכום בש״ח</Text>
                </View>
                <View style={{ display: "flex", flexDirection: "row", justifyContent: "center", width: 80}}>
                    <Text style={{ textDecoration: "underline" }}>מחיר יחידה</Text>
                </View>
                <View style={{ display: "flex", flexDirection: "row", justifyContent: "center", width: 50 }}>
                    <Text style={{ textDecoration: "underline" }}>כמות</Text>
                </View>
                <View style={{ display: "flex", flexDirection: "row", justifyContent: "center", width: 240 }}>
                    <Text style={{ textDecoration: "underline" }}>שם החלק</Text>
                </View>
            </View>
        )]);
        let allPartsSum = 0;
        for(let line of tableStrings){
            setTableStringsJSXRender(current => [...current, (
                <View key={line.key} style={{ display: "flex", flexDirection: "row", justifyContent: "center", margin: 5 }}>
                    <View style={{ display: "flex", flexDirection: "row", justifyContent: "center", alignContent: "center", alignItems: "center", width: 80 }}>
                        <Text style={{  }}>{line.partSum}</Text>
                    </View>
                    <View style={{ display: "flex", flexDirection: "row", justifyContent: "center", alignContent: "center", alignItems: "center", width: 80 }}>
                        <Text style={{  }}>{line.partPrice}</Text>
                    </View>
                    <View style={{ display: "flex", flexDirection: "row", justifyContent: "center", alignContent: "center", alignItems: "center", width: 50 }}>
                        <Text style={{  }}>{line.partAmount}</Text>
                    </View>
                    <View style={{ display: "flex", flexDirection: "row", justifyContent: "center", alignContent: "center", alignItems: "center", width: 240 }}>
                        <Text style={{ textAlign: "center" }}>{line.partString}</Text>
                    </View>
                </View>
            )]);
            allPartsSum = allPartsSum + line.partSum;
        }
        setTableStringsJSXRender(current => [...current, (
            <View key={-1} style={{ display: "flex", flexDirection: "row", justifyContent: "center", margin: 5 }}>
                <View style={{ display: "flex", flexDirection: "row", justifyContent: "center", alignContent: "center", alignItems: "center", width: 80 }}>
                    <Text style={{ textDecoration: "underline", color: "red" }}>{allPartsSum}</Text>
                </View>
                <View style={{ display: "flex", flexDirection: "row", justifyContent: "center", alignContent: "center", alignItems: "center", width: 80 }}>
                    <Text style={{ textDecoration: "underline", color: "red" }}>סה״כ</Text>
                </View>
                <View style={{ display: "flex", flexDirection: "row", justifyContent: "center", alignContent: "center", alignItems: "center", width: 50 }}>
                    <Text style={{  }}></Text>
                </View>
                <View style={{ display: "flex", flexDirection: "row", justifyContent: "center", alignContent: "center", alignItems: "center", width: 240 }}>
                    <Text style={{  }}></Text>
                </View>
            </View>
        )]);
        
        
        setLoading(false);
    }, []);

    const dispatch = useDispatch();

    return (
        <div>
            <div>
                {loading ? <div>loading</div> :
                <PDFViewer style={{ width: "700px", height: "700px" }}>
                    <Document>
                        <Page size="A4" style={styles.page}>

                            <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", margin: 10, marginRight: 30 }}>
                                <Text>בס״ד</Text>
                                <Image src={shlomoLogo} style={{ width: 90, height: 50 }}></Image>
                            </View>

                            <View style={{ margin: 10, display: "flex", flexDirection: "row", justifyContent: "center", fontSize: 30 }}>
                                <View style={{ display: "flex", flexDirection: "row", justifyContent: "flex-end", width: 200 }}>
                                    <Text style={{ color: "red", margin: 5 }}>{selectedOrder}</Text>
                                </View>
                                <View style={{ display: "flex", flexDirection: "row", justifyContent: "center", width: 300}}>
                                    <Text style={{ margin: 5 }}>טופס הזמנת חומרים : </Text>
                                </View>
                            </View>

                            <View style={{ display: "flex", flexDirection: "row", justifyContent: "center", margin: 5 }}>
                                <View style={{display: "flex", flexDirection: "row", justifyContent: "flex-end", width: 380 }}>
                                    <Text style={{ color: "red" }}>{supplierString}</Text>
                                    <Text style={{ color: "red" }}>{selectedSupplierName + " "}</Text>
                                </View>
                                <View style={{display: "flex", flexDirection: "row", justifyContent: "flex-end", width: 120 }}>
                                    <Text style={{ textDecoration: "underline" }}>ספק</Text>
                                </View>
                            </View>

                            <View style={{ display: "flex", flexDirection: "row", justifyContent: "center", margin: 5 }}> 
                                <View style={{display: "flex", flexDirection: "row", justifyContent: "flex-end", width: 380}}> 
                                    <Text style={{ color: "red" }}>{clientString}</Text>
                                </View>
                                <View style={{display: "flex", flexDirection: "row", justifyContent: "flex-end", width: 120 }}>
                                    <Text style={{ textDecoration: "underline" }}>הזמנה עבור</Text>
                                </View>
                            </View>

                            <View style={{ display: "flex", flexDirection: "row", justifyContent: "center", margin: 5 }}>
                                <View style={{display: "flex", flexDirection: "row", justifyContent: "flex-end", width: 380 }}>
                                    <Text style={{ color: "red" }}>{projectName}</Text>
                                </View>
                                <View style={{display: "flex", flexDirection: "row", justifyContent: "flex-end", width: 120 }}>
                                    <Text style={{ textDecoration: "underline" }}>שם פרוייקט</Text>
                                </View>
                            </View>

                            <View style={{ display: "flex", flexDirection: "row", justifyContent: "center", margin: 5 }}>
                                <View style={{display: "flex", flexDirection: "row", justifyContent: "flex-end", width: 380}}>
                                    <Text style={{ color: "red" }}>{projectSupplyDate}</Text>
                                </View>
                                <View style={{display: "flex", flexDirection: "row", justifyContent: "flex-end", width: 120 }}>
                                    <Text style={{ textDecoration: "underline" }}>תאריך אספקה</Text>
                                </View>
                            </View>

                            <View style={{ marginTop: 20, marginBottom: 20, display: "flex", flexDirection: "row", justifyContent: "center" }}>
                                <View style={{ width: "80vw", height: "30vh", backgroundColor: "#CFE2F3", border: 2 }}>
                                    {tableStringsJSXRender}
                                </View>
                            </View>

                            <View style={{ display: "flex", flexDirection: "row", justifyContent: "center", margin: 5 }}>
                                <View style={{display: "flex", flexDirection: "row", justifyContent: "flex-end", width: 380}}>
                                    <Text style={{ color: "red" }}>{orderNotes}</Text>
                                </View>
                                <View style={{display: "flex", flexDirection: "row", justifyContent: "flex-end", width: 120 }}>
                                    <Text style={{ textDecoration: "underline" }}>הערות</Text>
                                </View>
                            </View>

                            <View style={{ display: "flex", flexDirection: "row", justifyContent: "center", margin: 5 }}>
                                <View style={{display: "flex", flexDirection: "row", justifyContent: "flex-end", width: 380}}>
                                    <Text style={{ color: "red" }}>{orderSupplyNotes}</Text>
                                </View>
                                <View style={{display: "flex", flexDirection: "row", justifyContent: "flex-end", width: 120 }}>
                                    <Text style={{ textDecoration: "underline" }}>אספקה</Text>
                                </View>
                            </View>

                            <View style={{ display: "flex", flexDirection: "row", justifyContent: "center", margin: 5 }}>
                                <View style={{display: "flex", flexDirection: "row", justifyContent: "flex-end", width: 380}}>
                                    <Text style={{ color: "red" }}>{todayDateObj}</Text>
                                </View>
                                <View style={{display: "flex", flexDirection: "row", justifyContent: "flex-end", width: 120 }}>
                                    <Text style={{ textDecoration: "underline" }}>תאריך הזמנה</Text>
                                </View>
                            </View>

                            <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", margin: 5, fontSize: 10 }}>
                                <View style={{display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", width: 150}}>
                                    <Text>כל הזכויות שמורות</Text>
                                </View>
                                <View style={{display: "flex", flexDirection: "column", alignItems: "center", width: 300 }}>
                                    <Text>שלמה - שירות למחשוב מערך הייצור</Text>
                                    <Text>נייד : 050-7656465 , פקס : 03-6310304</Text>
                                    <Text>Mail : Ceo@shlomo-m.co.il    Site : www.shlomo-m.co.il</Text>
                                </View>
                            </View>

                        </Page>
                    </Document>
                </PDFViewer>
                }
            </div>
            <div style={{ display: "flex", justifyContent: "center", margin: "10px" }}>
                <Button type="primary" size="large" danger onClick={() => { dispatch(orderActions.setOrderTypePage(2)) }}>חזור לדף הזמנה</Button>
            </div>
        </div>
    );
}

export default PrintOrder;



