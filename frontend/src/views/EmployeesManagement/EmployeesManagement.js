import React from 'react'
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
//core compontment
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/TableEmployess.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";



const styles = {
    cardCategoryWhite: {
      "&,& a,& a:hover,& a:focus": {
        color: "rgba(255,255,255,.62)",
        margin: "0",
        fontSize: "14px",
        marginTop: "0",
        marginBottom: "0"
      },
      "& a,& a:hover,& a:focus": {
        color: "#FFFFFF"
      }
    },
    cardTitleWhite: {
      color: "#FFFFFF",
      marginTop: "0px",
      minHeight: "auto",
      fontWeight: "300",
      fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
      marginBottom: "3px",
      textDecoration: "none",
      "& small": {
        color: "#777",
        fontSize: "65%",
        fontWeight: "400",
        lineHeight: "1"
      }
    }
  };

const useStyles = makeStyles(styles);

var employeesJson = {'header':['Mã nhân viên','Tên','Ngày sinh','Quê quán','Lương(VND)','Vị trí','Tình trạng hiện tại'],'data':[['20173453','Ma Việt Tùng','12/05/1999','Lạng Sơn','12.000.000','Giám đốc','Độc thân'],['20173453','Ma Việt Tùng','12/05/1999','Lạng Sơn','12.000.000','Giám đốc','Độc thân']]}

export default function EmployeesManager(){
    const classes = useStyles();
    return(
        <GridContainer>
            <GridItem xs={12} sm={12} md={12}>
                <Card>
                    <CardHeader color="primary">
                        <h4 className={classes.cardTitleWhite}>Employees Table</h4>
                        <p className={classes.cardCategoryWhite}>
                        Table show a list of Employees
                        </p>
                    </CardHeader>
                    <CardBody>
                    <Table
                        tableHeaderColor="info"
                        tableHead={employeesJson['header']}
                        tableData={employeesJson['data']}                        
                    />
                    </CardBody>
                </Card>
            </GridItem>
      </GridContainer>
    );
}