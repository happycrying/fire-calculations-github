import React from 'react';
import { Page, Text, View, Document, StyleSheet, Font, Image } from '@react-pdf/renderer';
import fontTex from '../../assets/fonts/texgyreschola-regular.otf';
import fontTexBold from '../../assets/fonts/texgyreschola-bold.otf';
import logo_fsv from '../../assets/logo_FSv_zkratka.jpg';
import {
  IBasicInfo,
  IBuildingInformation,
  IBuildingSpecification,
  ICategoryZeroInputs
} from "~/pages/category/Category";

Font.register({ family: 'TeXRegular', src: fontTex });
Font.register({ family: 'TeXBold', src: fontTexBold });

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: 'white',
    fontFamily: 'TeXRegular',
  },
  title: {
    fontFamily: 'TeXBold',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  protokol: {
    fontSize: 30,
    fontWeight: 8000,
  },
  bezpecnost: {
    fontSize: 24,
    fontWeight: 800,
  },
  pnp: {
    fontSize: 10,
    fontWeight: 700,
  },
  legislavita: {
    fontSize: 10,
    fontWeight: 300,
    margin: 20,
    marginBottom: 5,
    marginTop: 10,
  },
  tableClassification: {
    borderWidth: '2px',
    paddingBottom: -10,
    margin: 10,
    height: '12%'
  },
  tableTitle: {
    backgroundColor: 'black',
    color: 'white',
    padding: 5,
    paddingBottom: 15,
    fontSize: 10,
  },
  tableInnerClassification: {
    backgroundColor: 'white',
    height: '90%',
    color: 'black',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    fontSize: 8,
  },
  tableImportant: {
    color: 'red',
    fontSize: 15,

  },
  tableSection: {
    width: '45%',
    height: '60%',
    display:"flex",
    flexDirection:"column",
    justifyContent:"space-between",
    margin: 15,
    marginTop: 5,
    gap: 20
  },
  resultSection: {
    margin: 10,
    fontSize: 10,
    display: 'flex',
    flexDirection: 'column',
    gap: 15,
    justifyContent: 'space-between',
  },
  resultImportant: {
    color: 'black',
    fontSize: 10,
    paddingTop: 15,
    borderTopWidth: '1px',
  },
  underText: {
    fontSize: 7,
    verticalAlign: 'sub',
  },
  logo: {
    width: '50px',
    height: '50px',
  },
  head: {
    margin: 10,
    marginBottom: 0,
    display: 'flex',
    flexDirection: 'row',
    width: '70%',
    gap: 10,
    fontFamily: 'TeXBold',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 15,
  },
  actionInfo: {
    display: 'flex',
    gap: 15,
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginLeft: 20,
    fontSize: 12,
  },
  actionImportant: {
    color: 'red',
    fontSize: 10,
    width: '80%',
  },
  usedSymbols: {
    fontSize: 10,
    fontWeight: 300,
    margin: 20,
    marginTop: 10,
    display: 'flex',
    flexDirection: 'column',
    height: '12%',
    flexWrap: 'wrap',
    alignContent: 'flex-start',
    width: '100%',
    gap: 4,
  },
  tableKat0: {
    borderWidth: '2px',
    margin: 10,
    height:'45%'
  },
  tableInner: {
    backgroundColor: 'white',
    color: 'black',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    fontSize: 8,
  },
  tablePart: {
    width: "100%",
    backgroundColor: "white",
    height: '14%',
    display: "flex",
    flexDirection: "row",
    borderBottomWidth: "1px",
  },
  tableSectionBig: {
    width: '70%',
    height: '100%',
    display: "flex",
    flexDirection: "row",
    borderRightWidth: "1px",
  },
  tableSectionSmall: {
    width: '30%',
    height: '100%',
    display: "flex",
    flexDirection: "row"
  },
  tableContentText: {
    width: '90%',
    justifyContent:"center",
    padding: 5,
    borderRightWidth: "1px",
  },
  tableContentInput: {
    alignSelf:"center",
    padding: 8,
    justifyContent:"center"
  },
  tableClass: {
    borderWidth: '2px',
    margin: 10,
    height: '25%'
  },
  tableClassInner: {
    backgroundColor: 'white',
    color: 'black',
    display: 'flex',
    flexDirection: 'column',
    fontSize: 8,
  },
  tableClassSection : {
    width: '50%',
    height: '100%',
    display: "flex",
    flexDirection: "row",
    borderRightWidth: "1px",
  },
  tableClassContentText: {
    width: '80%',
    justifyContent:"center",
    borderRightWidth: "1px",
    padding: 8
  },
  tableClassPart: {
    width: "100%",
    backgroundColor: "white",
    height: '20%',
    display: "flex",
    flexDirection: "row",
    borderBottomWidth: "1px",
  },
  tableClassContentInput: {
    alignSelf:"center",
    justifyContent:"center",
    width: '20%',
    paddingLeft: 15
  },

  tableKats: {
    borderWidth: '2px',
    margin: 10,
    height: '50%'
  },
  tableKatsPart: {
    width: "100%",
    backgroundColor: "white",
    height: '9.1%',
    display: "flex",
    flexDirection: "row",
    borderBottomWidth: "1px",
  },
});

interface ICategoryPDFProps extends ICategoryZeroInputs, IBasicInfo, IBuildingInformation, IBuildingSpecification {
  _class: number,
  category: string
}

// Create Document Component
const CategoryPDF = (props: ICategoryPDFProps) => (
  <Document>
    <Page size='A4' style={styles.page}>
      <View style={styles.head}>
        <Image src={logo_fsv} style={styles.logo}></Image>
        <Text>ČESKĚ VYSOKÉ UČENÍ TECHNICKÉ V PRAZE FAKULTA STAVEBNÍ</Text>
      </View>
      <View style={styles.title}>
        <Text style={styles.protokol}>PROTOKOL</Text>
        <Text style={styles.bezpecnost}>POŽÁRNÍ BEZPEČNOST STAVBY</Text>
        <Text style={styles.pnp}>STANOVENÍ KATEGORIE STAVBY A TŘÍDY VYUŽITÍ</Text>
      </View>
      <View style={styles.legislavita}>
        <Text style={{ fontFamily: 'TeXBold' }}>Legislativa:</Text>
        <Text>Zákon č. 133/1985 Sb., Zákon České národní rady o požární ochraně</Text>
        <Text>
          Zákon č. 415/2021 Sb., Zákon, kterým se mění zákon č. 133/1985 Sb., o požární ochraně, ve
          znění pozdějších předpisů,a zákon č. 239/2000 Sb., o integrovaném záchranném systému a o
          změně některých zákonů, veznění pozdějších předpisů
        </Text>
        <Text>
          Vyhláškač. 460/2021 Sb., Vyhláška o kategorizaci staveb z hlediska požární bezpečnosti a
          ochrany obyvatelstva
        </Text>
      </View>


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


      <View style={styles.tableClassification}>
        <Text style={styles.tableTitle}>Zatřídění</Text>
        <View style={styles.tableInnerClassification}>
          <View style={styles.tableSection}>
            <Text>
              Předpokládaná kategorie stavby (podle § 39 odst. 2 zákona č. 133/1985 Sb.,):
            </Text>
            <Text style={styles.tableImportant}>Kategorie {props.category}</Text>
          </View>
          <View style={styles.tableSection}>
            <Text>Předpokládaná třída využití (podle § 5 odst. 3 vyhlášky č. 460/2021 Sb.,) :</Text>
            <Text style={styles.tableImportant}>Třída využití {props._class !== -1 ? props._class : 'nestanovuje se'}</Text>
          </View>
        </View>
        <View style={{alignSelf:"center", paddingBottom: 20}}>
          <Text style={{color:"red", fontSize:13}}>
            STAVBA {(props.category === '0' || props.category === "I") ? "NEPODLÉHÁ" : "PODLÉHÁ"} STÁTNÍMU POŽÁRNÍMU DOZORU
          </Text>
        </View>
      </View>

      <View>
        <Text style={{fontSize: 10, marginLeft: 10}}>Seznam podmínek:</Text>
      </View>

      <View style={styles.tableKat0}>
        <Text style={styles.tableTitle}>Část I - Kategorie 0</Text>
        <View style={styles.tableInner}>

          <View style={styles.tablePart}>
            <View style={styles.tableSectionBig}>
              <Text style={styles.tableContentText}>
                Vodní dílo, včetně vodní cesty, s výjimkou budovy nádrž nebo zásobník na vodu nebo
                jinou nehořlavou kapalinu a exteriérový bazén, pokud se nejedná o zdroj požární vody:
              </Text>
              <Text style={styles.tableContentInput}>{props.a ? "ANO" : "NE"}</Text>
            </View>
            <View style={styles.tableSectionSmall}>
              <Text style={styles.tableContentText}>Informační a reklamní zařízení, pokud není umístěno v rámci budovy:</Text>
              <Text style={styles.tableContentInput}>{props.b ? "ANO" : "NE"}</Text>
            </View>
          </View>


          <View style={styles.tablePart}>
            <View style={styles.tableSectionBig}>
            <Text style={styles.tableContentText}>
              Stožár,anténa,základnová stanice radio komunikačních a telekomunikačních provozů s
              výjimkou budovy:
            </Text>
            <Text style={styles.tableContentInput}>{props.c ? "ANO" : "NE"}</Text>
          </View>
            <View style={styles.tableSectionSmall}>
              <Text style={styles.tableContentText}>Zeď, oplocení: </Text>
              <Text style={styles.tableContentInput}>{props.d ? "ANO" : "NE"}</Text>
            </View>
          </View>


          <View style={styles.tablePart}>
            <View style={styles.tableSectionBig}>
            <Text style={styles.tableContentText}>
              Sportovnía dětské hřiště, umístěné mimo budovu, s výjimkou hřiště, které je součástí
              budovy:
            </Text>
            <Text style={styles.tableContentInput}>{props.e ? "ANO" : "NE"}</Text>
          </View>
            <View style={styles.tableSectionSmall}>
              <Text style={styles.tableContentText}>Mycí rampa: </Text>
              <Text style={styles.tableContentInput}>{props.f ? "ANO" : "NE"}</Text>
            </View>
          </View>


          <View style={styles.tablePart}>
            <View style={styles.tableSectionBig}>
            <Text style={styles.tableContentText}>
              Podzemní vedení distribuční soustavy v elektroenergetice a v plynárenství,elektronická
              a optická síť, rozvod nétepelné zařízení, s výjimkou budovy:
            </Text>
            <Text style={styles.tableContentInput}>{props.g ? "ANO" : "NE"}</Text>
          </View>
            <View style={styles.tableSectionSmall}>
              <Text style={styles.tableContentText}>Stavba dráhy s výjimkou budovy nebo tunelu:</Text>
              <Text style={styles.tableContentInput}>{props.i ? "ANO" : "NE"}</Text>
            </View>
          </View>


          <View style={styles.tablePart}>
            <View style={styles.tableSectionBig}>
              <Text style={styles.tableContentText}>
                Pozemní komunikace nebo zpevněná plocha s výjimkou dálnice nebo stavby pozemní
                komunikace nebo zpevněné plochy plnící funkci přístupové komunikace nebo nástupní
                plochy pro požární techniku:
              </Text>
              <Text style={styles.tableContentInput}>{props.j ? "ANO" : "NE"}</Text>
            </View>
            <View style={styles.tableSectionSmall}>
              <Text style={styles.tableContentText}>Parkoviště s výjimkou budovy:</Text>
              <Text style={styles.tableContentInput}>{props.k ? "ANO" : "NE"}</Text>
            </View>
          </View>


          <View style={styles.tablePart}>
            <View style={styles.tableSectionBig}>
              <Text style={styles.tableContentText}>
                Vedení sítě veřejného osvětlení včetněstožárů a systémů řídící,zabezpečovací,
                informační a telekomunikační techniky:
              </Text>
              <Text style={styles.tableContentInput}>{props.l ? "ANO" : "NE"}</Text>
            </View>
            <View style={styles.tableSectionSmall}>
              <Text style={styles.tableContentText}>Samostatně stojící skleník:</Text>
              <Text style={styles.tableContentInput}>{props.m ? "ANO" : "NE"}</Text>
            </View>
          </View>


          <View style={styles.tablePart}>
            <View style={styles.tableSectionBig}>
              <Text style={styles.tableContentText}>
                Vodovodní, kanalizační a energetická přípojka a přípojka elektronických komunikací:
              </Text>
              <Text style={styles.tableContentInput}>{props.n ? "ANO" : "NE"}</Text>
            </View>
            <View style={styles.tableSectionSmall}>
              <Text style={styles.tableContentText}>Stavba mostní váhy: </Text>
              <Text style={styles.tableContentInput}>{props.o ? "ANO" : "NE"}</Text>
            </View>
          </View>

          <View style={styles.tablePart}>
            <Text style={styles.tableContentText}>
              Udržovací práce nebo stavební úpravy, pokud jejich provedení negativně neovlivní
              požární bezpečnost stavby nebo nezasáhne trvalý ochranný prostor stálého úkrytu:
            </Text>
            <Text style={styles.tableContentInput}>{props.p ? "ANO" : "NE"}</Text>
          </View>
        </View>
      </View>
    </Page>

    <Page size='A4' style={styles.page}>
      <View style={styles.head}>
        <Image src={logo_fsv} style={styles.logo}></Image>
        <Text>ČESKĚ VYSOKÉ UČENÍ TECHNICKÉ V PRAZE FAKULTA STAVEBNÍ</Text>
      </View>
      <View style={styles.tableClass}>
        <Text style={styles.tableTitle}>Část II - Třída využití</Text>
        <View style={styles.tableClassInner}>
          <View style={styles.tableClassPart}>
            <View style={styles.tableClassSection}>
              <Text style={styles.tableClassContentText}>
                Zastavěná plocha stavby [m&sup2;]:
              </Text>
              <Text style={styles.tableClassContentInput}>{props.area}</Text>
            </View>
            <View style={styles.tableClassSection}>
              <Text style={styles.tableClassContentText}>Počet nadzemních podlaží: </Text>
              <Text style={styles.tableClassContentInput}>{props.aboveground}</Text>
            </View>
          </View>
          <View style={styles.tableClassPart}>
            <View style={styles.tableClassSection}>
              <Text style={styles.tableClassContentText}>
                Výška stavby [m]:
              </Text>
              <Text style={styles.tableClassContentInput}>{props.buildingHeight}</Text>
            </View>
            <View style={styles.tableClassSection}>
              <Text style={styles.tableClassContentText}>Počet podzemních podlaží:</Text>
              <Text style={styles.tableClassContentInput}>{props.underground}</Text>
            </View>
          </View>
          <View style={styles.tableClassPart}>
            <View style={styles.tableClassSection}>
              <Text style={styles.tableClassContentText}>
                Světlá výška podlaží u jednopodlažních objektů [m]:
              </Text>
              <Text style={styles.tableClassContentInput}>{props.oneFloorHeight}</Text>
            </View>
            <View style={styles.tableClassSection}>
              <Text style={styles.tableClassContentText}>Prostory určené ke spánku: </Text>
              <Text style={styles.tableClassContentInput}>{props.sleepPlaces ? "ANO" : "NE"}</Text>
            </View>
          </View>
          <View style={styles.tableClassPart}>
            <View style={styles.tableClassSection}>
              <Text style={styles.tableClassContentText}>
                Prostory pro osoby vyžadující asistenci při evakuaci:
              </Text>
              <Text style={styles.tableClassContentInput}>{props.asistancePlaces ? "ANO" : "NE"}</Text>
            </View>
            <View style={styles.tableClassSection}>
              <Text style={styles.tableClassContentText}>Počet osob vyžadujících asistenci [osob]:</Text>
              <Text style={styles.tableClassContentInput}>{props.assistancePeople}</Text>
            </View>
          </View>
          <View style={styles.tableClassPart}>
            <Text style={styles.tableClassContentText}>
              Prostory určené pro veřejnost:
            </Text>
            <Text style={styles.tableClassContentInput}>{props.publicPlaces ? "ANO" : "NE"}</Text>
          </View>
        </View>
      </View>

      <View style={styles.tableKats}>
        <Text style={styles.tableTitle}>Část III - Kategorie I, II, III</Text>
        <View style={styles.tableClassInner}>
          <View style={styles.tableKatsPart}>
            <View style={styles.tableClassSection}>
              <Text style={styles.tableClassContentText}>
                Stavba určena výhradně k bydlení::
              </Text>
              <Text style={styles.tableClassContentInput}>{props.forLiving ? "ANO" : "NE"}</Text>
            </View>
            <View style={styles.tableClassSection}>
              <Text style={styles.tableClassContentText}>Projektovaný počet osob: </Text>
              <Text style={styles.tableClassContentInput}>{props.projPeople}</Text>
            </View>
          </View>
          <View style={styles.tableKatsPart}>
            <View style={styles.tableClassSection}>
              <Text style={styles.tableClassContentText}>
                Pobytové místnosti v podzemním podlaží:
              </Text>
              <Text style={styles.tableClassContentInput}>{props.placesUnderground ? "ANO" : "NE"}</Text>
            </View>
            <View style={styles.tableClassSection}>
              <Text style={styles.tableClassContentText}>Počet ubytovaných osob:</Text>
              <Text style={styles.tableClassContentInput}>{props.livingPeople}</Text>
            </View>
          </View>
          <View style={styles.tableKatsPart}>
            <View style={styles.tableClassSection}>
              <Text style={styles.tableClassContentText}>
                Budova, která je kulturní památkou:
              </Text>
              <Text style={styles.tableClassContentInput}>{props.culturalBuilding ? "ANO" : "NE"}</Text>
            </View>
            <View style={styles.tableClassSection}>
              <Text style={styles.tableClassContentText}>Hořlavé kapaliny ve stavbě [m&sup3;]:</Text>
              <Text style={styles.tableClassContentInput}>{props.flammableLiquids.present ? props.flammableLiquids.value : "NE"}</Text>
            </View>
          </View>
          <View style={styles.tableKatsPart}>
            <View style={styles.tableClassSection}>
              <Text style={styles.tableClassContentText}>
                Stavba zdroje požární vody, nejedná-li se o budovu:
              </Text>
              <Text style={styles.tableClassContentInput}>{props.waterSource ? "ANO" : "NE"}</Text>
            </View>
            <View style={styles.tableClassSection}>
              <Text style={styles.tableClassContentText}>Hořlavé nebo hoření podporující plyny [m&sup3;]: </Text>
              <Text style={styles.tableClassContentInput}>{props.flammableGas.present ? props.flammableGas.value : "NE"}</Text>
            </View>
          </View>
          <View style={styles.tableKatsPart}>
            <View style={styles.tableClassSection}>
              <Text style={styles.tableClassContentText}>
                Přístupová komunikace nebo nástupní plocha:
              </Text>
              <Text style={styles.tableClassContentInput}>{props.communication ? "ANO" : "NE"}</Text>
            </View>
            <View style={styles.tableClassSection}>
              <Text style={styles.tableClassContentText}>Zásobník hořlavých, hoření podporujících plynů [m&sup3;]: </Text>
              <Text style={styles.tableClassContentInput}>{props.gasTank.present ? props.gasTank.value : "NE"}</Text>
            </View>
          </View>
          <View style={styles.tableKatsPart}>
            <View style={styles.tableClassSection}>
              <Text style={styles.tableClassContentText}>
                Stavba, ve které se skladují pyrotechnické výrobky:
              </Text>
              <Text style={styles.tableClassContentInput}>{props.pyrotechnic ? "ANO" : "NE"}</Text>
            </View>
            <View style={styles.tableClassSection}>
              <Text style={styles.tableClassContentText}>Silniční nebo železniční tunel [m]:</Text>
              <Text style={styles.tableClassContentInput}>{props.highwayTunnel.present ? props.highwayTunnel.value : "NE"}</Text>
            </View>
          </View>
          <View style={styles.tableKatsPart}>
            <View style={styles.tableClassSection}>
              <Text style={styles.tableClassContentText}>Stavba, ve které se vyskytují látky s akutní toxicitou: [kg]:</Text>
              <Text style={styles.tableClassContentInput}>{props.toxicTanks.present ? "ANO" : "NE"}</Text>
            </View>
            <View style={styles.tableClassSection}>
              <Text style={styles.tableClassContentText}>
                Velkoobjemového nádrže pro hořlavé kapaliny [m&sup3;]:
              </Text>
              <Text style={styles.tableClassContentInput}>{props.bigTanks.present ? props.bigTanks.value : "NE"}</Text>
            </View>
          </View>
          <View style={styles.tableKatsPart}>
            <View style={styles.tableClassSection}>
              <Text style={styles.tableClassContentText}>
                Kategorie I [kg]
              </Text>
              <Text style={styles.tableClassContentInput}>{ props.toxicTanks.present ? props.toxicTanks.category1 : 0}</Text>
            </View>
            <View style={styles.tableClassSection}>
              <Text style={styles.tableClassContentText}>Sklad střeliva [ks]: </Text>
              <Text style={styles.tableClassContentInput}>{props.ammunition.present ? props.ammunition.value : "NE"}</Text>
            </View>
          </View>
          <View style={styles.tableKatsPart}>
            <View style={styles.tableClassSection}>
              <Text style={styles.tableClassContentText}>
                Kategorie II [kg]
              </Text>
              <Text style={styles.tableClassContentInput}>{props.toxicTanks.present ? props.toxicTanks.category2 : 0}</Text>
            </View>
            <View style={styles.tableClassSection}>
              <Text style={styles.tableClassContentText}>Stavba určená k nakládání s výbušninami:</Text>
              <Text style={styles.tableClassContentInput}>{props.explosives ? "ANO" : "NE"}</Text>
            </View>
          </View>
          <View style={styles.tableKatsPart}>
            <View style={styles.tableClassSection}>
              <Text style={styles.tableClassContentText}>
                Stavba, ve které se nachází stálý úkryt:
              </Text>
              <Text style={styles.tableClassContentInput}>{props.shelter ? "ANO" : "NE"}</Text>
            </View>
            <View style={styles.tableClassSection}>
              <Text style={styles.tableClassContentText}>Tunel metra nebo stanice metra:</Text>
              <Text style={styles.tableClassContentInput}>{props.metro ? "ANO" : "NE"}</Text>
            </View>
          </View>
          <View style={styles.tableKatsPart}>
            <Text style={styles.tableClassContentText}>
              Stavba o výšce maximálně 9 m, nebo 22,5m jedná-li se o stavbu s 1. třídou využití nebo není určená pro nejvýše 400 osob:
            </Text>
            <Text style={styles.tableClassContentInput}>{props.complex ? "ANO" : "NE"}</Text>
          </View>
        </View>
      </View>

    </Page>
  </Document>
);

export default CategoryPDF;