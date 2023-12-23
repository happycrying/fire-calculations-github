import React from 'react';
import { Page, Text, View, Document, StyleSheet, Font, Image } from "@react-pdf/renderer";
import fontTex from "../../assets/fonts/texgyreschola-regular.otf"
import fontTexBold from "../../assets/fonts/texgyreschola-bold.otf"
import { IParameters, IResults } from "~/pages/pnp/PNP";
import logo_fsv from '../../assets/logo_FSv_zkratka.jpg'
import { IBasicInfo } from "~/pages/category/Category";

Font.register({family:"TeXRegular", src:fontTex})
Font.register({family:"TeXBold", src:fontTexBold})

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: 'white',
    fontFamily: "TeXRegular"
  },
  title: {
    fontFamily: "TeXBold",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems:"center",
    marginTop: 10
  },
  protokol: {
    fontSize:30,
    fontWeight: 8000,
  },
  bezpecnost: {
    fontSize:24,
    fontWeight: 800,
  },
  pnp: {
    fontSize:10,
    fontWeight: 700,
  },
  legislavita: {
    fontSize:10,
    fontWeight: 300,
    margin: 20,
    marginBottom: 5,
    marginTop: 10
  },
  table: {
    borderWidth: "2px",
    margin: 10,
    marginBottom: 5
  },
  tableTitle: {
    backgroundColor: "black",
    color: "white",
    padding: 10,
    fontSize: 10
  },
  tableInner: {
    backgroundColor: "white",
    color:"black",
    display:"flex",
    flexDirection:"row",
    justifyContent:"space-around",
    fontSize: 10
  },
  tableImportant: {
    color:"red",
    fontSize:10
  },
  tableSection: {
    width: "45%",
    margin: 10
  },
  resultSection: {
    margin: 10,
    fontSize: 10,
    display:"flex",
    flexDirection:"column",
    gap: 15,
    justifyContent:"space-between"
  },
  resultImportant: {
    color:"black",
    fontSize:10,
    paddingTop: 15,
    borderTopWidth: "1px"
  },
  underText: {
    fontSize:7,
    verticalAlign:"sub",
  },
  logo: {
    width: "50px",
    height: "50px"
  },
  head: {
    margin: 10,
    marginBottom:0,
    display:"flex",
    flexDirection:"row",
    width: "70%",
    gap: 10,
    fontFamily: "TeXBold",
    justifyContent: "center",
    alignItems: "center",
    fontSize: 15
  },
  actionInfo: {
    display: "flex",
    gap: 15,
    flexDirection:"row",
    alignItems:"center",
    width: "100%",
    marginLeft: 20,
    fontSize:12
  },
  actionImportant: {
    color:"red",
    fontSize:10,
    width:"80%"
  },
  usedSymbols: {
    fontSize:10,
    fontWeight: 300,
    margin: 20,
    marginTop: 10,
    display: "flex",
    flexDirection: "column",
    height: "12%",
    flexWrap:"wrap",
    alignContent:"flex-start",
    width:"100%",
    gap:4
  },
});

interface IPnpPDFProps extends IParameters, IResults, IBasicInfo {
  pvEdit: number
}

// Create Document Component
const PnpPDF = (props: IPnpPDFProps) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.head}>
        <Image src={logo_fsv} style={styles.logo}></Image>
        <Text>ČESKĚ VYSOKÉ UČENÍ TECHNICKÉ V PRAZE FAKULTA STAVEBNÍ</Text>
      </View>
      <View style={styles.title}>
        <Text style={styles.protokol}>PROTOKOL</Text>
        <Text style={styles.bezpecnost}>POŽÁRNÍ BEZPEČNOST STAVBY</Text>
        <Text style={styles.pnp}>STANOVENÍ POŽÁRNĚ NEBEZPEČNÉHO PROSTORU</Text>
      </View>
      <View  style={styles.legislavita}>
        <Text style={{fontFamily: "TeXBold"}}>Legislativa:</Text>
        <Text>Zákon č. 133/1985 Sb., Zákon České národnírady o požární ochraně veznění pozdějšíšch předpisů</Text>
        <Text>Vyhláškač. 23/2008 Sb., Vyhláška o technických podmínkách požární ochrany staveb veznění pozdějšíšch předpisů</Text>
        <Text>Vyhláškač. 246/2001 Sb., Vyhláška Ministerstva vnitra o stanovení podmínek požární bezpečnostia výkonu státního požárního dozoru (vyhláška o požární
          prevenci) veznění pozdějšíšch předpisů</Text>
        <Text>ČSN 73 0802 ed. 2; Požární bezpečnoststaveb - Nevýrobní objekty</Text>
        <Text>ČSN 73 0804 ed. 2; Požární bezpečnoststaveb - Výrobní objekty</Text>
      </View>

      <View>
        <View style={styles.actionInfo}>
          <Text>Název akce:</Text>
          <Text style={styles.actionImportant}>{props.name}</Text>
        </View>

        <View style={styles.actionInfo}>
          <Text>Místo akce:</Text>
          <Text style={styles.actionImportant}>{props.place}</Text>
        </View>

        <View style={styles.actionInfo}>
          <Text>Investor akce:</Text>
          <Text style={styles.actionImportant}>{props.investor}</Text>
        </View>
      </View>


      <View style={styles.table}>
        <Text style={styles.tableTitle}>Označení požárního úseku</Text>
        <View style={styles.tableInner}>
          <View style={styles.tableSection}>
            <Text>Požární úsek:</Text>
            <Text style={styles.tableImportant}>{props.windowName}</Text>
          </View>
          <View style={styles.tableSection}>
            <Text>Výpočtové požární zatížení p<Text style={styles.underText}>v</Text> [kg/m&sup2; ]:</Text>
            <Text style={styles.tableImportant}>{Math.floor(props.pv * 100) / 100}</Text>
          </View>
        </View>
      </View>

      <View style={styles.table}>
        <Text style={styles.tableTitle}>Charakteristika požárního úseku</Text>
        <View style={styles.tableInner}>
          <View style={styles.tableSection}>
            <Text>Konstrukční systém:</Text>
            <Text style={styles.tableImportant}>{props.system}</Text>
          </View>
          <View style={styles.tableSection}>
            <Text>Upravené výpočtové požární zatížení p'<Text style={styles.underText}>v</Text> [kg/m&sup2; ]</Text>
            <Text style={styles.tableImportant}>{props.pvEdit}</Text>
          </View>
        </View>
      </View>

      <View style={styles.table}>
        <Text style={styles.tableTitle}>Výpočet</Text>
        <View style={styles.tableInner}>
          <View style={styles.resultSection}>
            <Text style={{width:"15%"}}>Označení otvoru</Text>
            <Text style={styles.resultImportant}>{props.windowName}</Text>
          </View>
          <View style={styles.resultSection}>
            <Text style={{width:"8%"}}>q<Text style={styles.underText}>crit</Text> [kW/m&sup2; ]</Text>
            <Text style={styles.resultImportant}>{props.critValue}</Text>
          </View>
          <View style={styles.resultSection}>
            <Text style={{width:"3%"}}>b [m]</Text>
            <Text style={styles.resultImportant}>{props.width}</Text>
          </View>
          <View style={styles.resultSection}>
            <Text style={{width:"3%"}}>h [m]</Text>
            <Text style={styles.resultImportant}>{props.height}</Text>
          </View>
          <View style={styles.resultSection}>
            <Text style={{width:"3%"}}>p<Text style={styles.underText}>o</Text> [%]</Text>
            <Text style={styles.resultImportant}>{props.openness}</Text>
          </View>
          <View style={styles.resultSection}>
            <Text style={{width:"3%"}}>d [m]</Text>
            <Text style={styles.resultImportant}>{Math.floor(props.d_prima * 100) / 100}</Text>
          </View>
          <View style={styles.resultSection}>
            <Text style={{width:"3%"}}>d' [m]</Text>
            <Text style={styles.resultImportant}>{Math.floor(props.d_bocni * 100 * 2) / 100}</Text>
          </View>
          <View style={styles.resultSection}>
            <Text style={{width:"3%"}}>d'<Text style={styles.underText}>s</Text> [m]</Text>
            <Text style={styles.resultImportant}>{Math.floor(props.d_bocni * 100) / 100}</Text>
          </View>
        </View>
      </View>
      <Text style={{fontFamily: "TeXBold", width:"30%", fontSize: 10, marginLeft: 20}}>Používané symboly:</Text>
      <View style={styles.usedSymbols}>
        <Text style={{width:"30%"}}>p<Text style={styles.underText}>v</Text> : výpočtové požární zatížení</Text>
        <Text style={{width:"30%"}}>p'<Text style={styles.underText}>v</Text> : upravené výpočtové požární zatížen </Text>
        <Text style={{width:"30%"}}>h : výška otvoru</Text>
        <Text style={{width:"30%"}}>b : šířka otvoru</Text>
        <Text style={{width:"30%"}}>p<Text style={styles.underText}>o</Text> : procento otevřenosti</Text>
        <Text style={{width:"30%"}}>q<Text style={styles.underText}>crit</Text> : kritická hustota tepelného toku</Text>
        <Text style={{width:"30%"}}>d : vzdálenost odstupové vzdálenosti v přímémsměru vestředu otvoru</Text>
        <Text style={{width:"30%"}}>d': vzdálenost odstupové vzdálenosti v přímémsměru v kraji otvoru</Text>
        <Text style={{width:"30%"}}>d'<Text style={styles.underText}>s</Text> : vzdálenost kolmé odstupové vzdálenosti v kraji otvoru
        </Text>
      </View>

    </Page>
  </Document>
);

export default PnpPDF;