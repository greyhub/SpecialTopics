import React, { useState } from "react";
import PropTypes from "prop-types";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
// import { Button} from 'react-bootstrap';
import styles from "assets/jss/material-dashboard-react/components/tableStyle.js";
import AddIcon from '@material-ui/icons/Add';
import BorderColorIcon from '@material-ui/icons/BorderColor';
import DeleteIcon from '@material-ui/icons/Delete';
import axios from 'axios'
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import SaveIcon from '@material-ui/icons/Save';
import Button from '@material-ui/core/Button';


export default function EmployeesTable(props) {
  const useStyles = makeStyles(styles);
  var classTableEmployess;
  var recordEmployess;
  const inputStyle = {
    borderStyle: "hidden hidden solid hidden", 
    'font-size': "18px"
  }
  const classes = useStyles();
  const [maNV,setMaNV] = useState('');
  const [HoVT,setHT] = useState('');
  const [DateOfBirth,setDB] = useState('');
  const [QueQuan,setQQ] = useState('');
  const [Luong,setLuong] = useState('');
  const [MaVT,setVT] = useState('');
  const [DateOfJoin,setDJ] = useState('');
  const [HanHD,setHHD] = useState('');
  const [TT,setTT] = useState('');
  const [Links,setLinks] = useState('');
  const [CMND,setCMND] = useState('');
  const [TK,setTK] = useState('');
  const [Q,setQ] = useState('');
  const [MK,setMK] = useState('');
  const [lastName,setLastName] = useState();
  const EmployeesInfo = {'MaNV':maNV,'lastName':lastName,'HoVT':HoVT,'DateOfBirth':DateOfBirth,'QueQuan':QueQuan,'Luong':Luong,'MaVT':MaVT,'DateOfJoin':DateOfJoin,'HanHD':HanHD,'TT':TT,'Link':Link,'CMND':CMND,'TK':TK,'MK':MK,'Q':Q};
  const { tableHead, tableData, tableHeaderColor ,token} = props;
  classTableEmployess = classes.table;
  async function clickDelete(e,prop){
    const res = await axios({
      method: 'delete',
      url: "https://mighty-plains-90447.herokuapp.com/v1/employee/delete",
      headers:{
        'Encytpe': 'application/json',
        "Authorization": 'Bearer ' + token
      },
      data:{
        ids: [prop[0]]
      }
    }).catch(function(err){
      alert(err)
    });
    document.location.reload();
  }

  async function clickFix(e,prop){
    //alert(prop); //prop[0],prop[1],....
    e.preventDefault();
    document.getElementsByClassName(classTableEmployess)[0].setAttribute('style','display:none');
    document.getElementsByClassName('FormFixEmployees')[0].setAttribute('style','display: initial');
    const res = await axios({
      method: 'post',
      url: "https://mighty-plains-90447.herokuapp.com/v1/employee/getbyid",
      headers:{
        'Encytpe': 'application/json',
        "Authorization": 'Bearer ' + token,
      },
      data: {
         id: prop[0]
      }
    });
    setMaNV(res.data['id']);
    setHT(res.data['firstName']);
    setLastName(res.data['lastName']); 
    setDB(res.data['birthday']); 
    setQQ(res.data['address']);
    setVT(res.data['position']);
    setHHD(res.data['expireDate']);
    setCMND(res.data['cccd']);
    setTT(res.data['isActive'].toString());
    setTK(res.data['account']);
    setLuong(res.data['salary']);
    setQ(res.data['roleCode']);
    setDJ(res.data['joinDate']);
    setLinks(prop[5])
    }

    function clickAddStaff(){
    //alert(classTableEmployess)
    //alert(document.getElementsByClassName(classTableEmployess)[0]);
    document.getElementsByClassName(classTableEmployess)[0].setAttribute('style','display:none');
    document.getElementsByClassName('FormEmployees')[0].setAttribute('style','display: initial');
    setMaNV('');
    setHT('');
    setLastName(''); 
    setDB(''); 
    setQQ('');
    setVT('');
    setHHD('');
    setCMND('');
    setTT('');
    setTK('');
    setLuong('');
    setQ('');
    setDJ('');
    setLinks('');
    }

    function clickReturnToList(){
    document.getElementsByClassName(classTableEmployess)[0].setAttribute('style','display:initial');
    document.getElementsByClassName('FormEmployees')[0].setAttribute('style','display: none');
    document.getElementsByClassName('FormFixEmployees')[0].setAttribute('style','display: none');
    }

    function handleChangeInputTag(e,func){
      e.preventDefault();
      func(e.target.value);
    }

    async function handleSubmit(e,id){
      e.preventDefault();
      var input_list = document.getElementById(id).getElementsByTagName("input");
        for(var i=0; i<input_list.length;i++){
          input_list[i].removeAttribute("disabled");
      }
      var _form = document.getElementById(id);
      var _data = new FormData(_form);
      if(id == '1'){
      const res = await axios({
        method: 'put',
        url: "https://mighty-plains-90447.herokuapp.com/v1/employee/createone",
        headers:{
          'Encytpe': 'multipart/form-data',
          "Authorization": 'Bearer ' + token,
          'Content-Type': 'multipart/form-data'
        },
        data: _data
      }).then(function(res){
        alert('Submit Success');
        document.location.reload();
        return res;
      }
      ).catch(function(err){
        var input_list = document.getElementById(id).getElementsByTagName("input");
        for(var i=0; i<input_list.length;i++){
        input_list[i].getAttribute("disabled");
        }
        alert(err)
      });
    }
    else if(id == '2'){
      const res = await axios({
        method: 'put',
        url: "https://mighty-plains-90447.herokuapp.com/v1/employee/update",
        headers:{
          'Encytpe': 'multipart/form-data',
          "Authorization": 'Bearer ' + token,
          'Content-Type': 'multipart/form-data'
        },
        data: _data
      }).then(function(res){
        alert('Submit Success');
        document.location.reload();
      }).catch(function(err){
        var input_list = document.getElementById(id).getElementsByTagName("input");
        for(var i=0; i<input_list.length;i++){
        input_list[i].disabled =true;
      }
        alert(err)
      });
    }
    }
    function fixInfo(e,id){
        document.getElementById(id).removeAttribute('disabled');
    }
    return (
    <div className={classes.tableResponsive}>
    <div class='FormEmployees' style={{display:'none'}}>
        <Button variant="primary" size ="lg" onClick={clickReturnToList}>Back</Button>
        <form id='1' onSubmit={(e)=>{handleSubmit(e,'1')}}>
          <GridContainer>
          <GridItem xs={12} sm={12} md={5}>
                <br/>
                <input placeholder="Tên" size={30} style={inputStyle} type="text" name = 'firstName' value = {HoVT}  onChange={(e)=>{handleChangeInputTag(e,setHT)}}/>
            </GridItem>
            <GridItem xs={1} sm={1} md={1}></GridItem>
            <GridItem xs={12} sm={12} md={5}>
                <br/>
                <input placeholder="Tên đệm" size={30} style={inputStyle} type="text" name = 'lastName' value={lastName}  onChange={(e)=>{handleChangeInputTag(e,setLastName)}}/>
            </GridItem>
          </GridContainer>
          <GridContainer>
          <GridItem xs={12} sm={12} md={5}>
                <br/>
                <input type="text" name = 'birthday' placeholder="Ngày sinh: dd-mm-yy" size={30}  style={inputStyle} value={DateOfBirth}   onChange={(e)=>{handleChangeInputTag(e,setDB)}}/>
            </GridItem>
            <GridItem xs={1} sm={1} md={1}></GridItem>
            <GridItem xs={12} sm={12} md={5}>
                <br/>
                <input placeholder='Quê Quán' size={30}  style={inputStyle} type="text" name = 'address' value = {QueQuan}  onChange={(e)=>{handleChangeInputTag(e,setQQ)}}/>
            </GridItem>
          </GridContainer>
          <GridContainer>
          <GridItem xs={12} sm={12} md={5}>
                <br/>
                <input placeholder='Lương' size={30}  style={inputStyle} type="number" name = 'salary' value = {Luong}  onChange={(e)=>{handleChangeInputTag(e,setLuong)}}/>
            </GridItem>
            <GridItem xs={1} sm={1} md={1}></GridItem>
            <GridItem xs={12} sm={12} md={5}>
                <br/>
                <input placeholder='Vị trí' size={30}  style={inputStyle} type="text" name = 'position' value = {MaVT}  onChange={(e)=>{handleChangeInputTag(e,setVT)}}/>
            </GridItem>
          </GridContainer>
          <GridContainer>
          <GridItem xs={12} sm={12} md={5}>
                <br/>
                <input size={30}  style={inputStyle} type="text" name = 'joinDate' placeholder="Ngày tham gia: dd-mm-yy" value ={DateOfJoin} onChange={(e)=>{handleChangeInputTag(e,setDJ)}}/>
            </GridItem>
            <GridItem xs={1} sm={1} md={1}></GridItem>
            <GridItem xs={12} sm={12} md={5}>
                <br/>
                <input  size={30}  style={inputStyle} type="text" name = 'expireDate' placeholder="Ngày hết hạn hợp đồng: dd-mm-yy" value = {HanHD} onChange={(e)=>{handleChangeInputTag(e,setHHD)}}/>
            </GridItem>
          </GridContainer>
          <GridContainer>
          <GridItem xs={12} sm={12} md={5}>
                <br/>
                <input placeholder='Tình trạng: true(false)' size={30}  style={inputStyle} type="text" name = 'isActive' value={TT} onChange={(e)=>{handleChangeInputTag(e,setTT)}}/>
            </GridItem>
            <GridItem xs={1} sm={1} md={1}></GridItem>
            <GridItem xs={12} sm={12} md={5}>
                <br/>
                <input placeholder='CCCD' size={30}  style={inputStyle} type="text" name = 'cccd' value={CMND} onChange={(e)=>{handleChangeInputTag(e,setCMND)}}/>
            </GridItem>
          </GridContainer>
          <GridContainer>
          <GridItem xs={12} sm={12} md={5}>
                <br/>
                <input placeholder='Tài khoản' size={30}  style={inputStyle} type="text" name = 'account' value={TK} onChange={(e)=>{handleChangeInputTag(e,setTK)}}/>
            </GridItem>
            <GridItem xs={1} sm={1} md={1}></GridItem>
            <GridItem xs={12} sm={12} md={5}>
                <br/>
                <input placeholder='Mật khẩu' size={30}  style={inputStyle} type="text" name = 'password' value={MK} onChange={(e)=>{handleChangeInputTag(e,setMK)}}/>
            </GridItem>
          </GridContainer>
          <GridContainer>
            <GridItem xs={12} sm={12} md={5}>
                <br/>
                <input size={30}  style={inputStyle} type="file" name = 'avatar'/>
            </GridItem>
            </GridContainer>
            <input type="number" name = 'roleCode' value={1} style={{display: 'none'}}/>
            <br/>
            {/* <input type="Submit" value='Submit'/>/ */}
            <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  type="Submit"
                  className={classes.button}
                  startIcon={<SaveIcon />}
                >
                  Lưu
                </Button>
        </form>
    </div>
    <div class='FormFixEmployees' style={{display:'none'}}>
        <Button variant="info" onClick={clickReturnToList}>Back</Button>
        <form id='2' onSubmit={(e)=>{handleSubmit(e,'2')}}>
          <GridContainer>
            <GridItem xs={12} sm={12} md={5}>
                <br/>
                Mã nhân viên:
                <br/>
                <input id ="id"  size={30} disabled="disabled" style={inputStyle} type="text" name = 'id' value={maNV}/>
            </GridItem>
            <GridItem xs={12} sm={12} md={5}>
                <br/>
                Tên: 
                <br/>
                <input id="firstName"   size={30}  style={inputStyle} type="text" name = 'firstName' value={HoVT}  onChange={(e)=>{handleChangeInputTag(e,setHT)}}/>
                {/* <Button onClick={(e)=>fixInfo(e,"firstName")} ><BorderColorIcon/></Button> */}
            </GridItem>
            <GridItem xs={12} sm={12} md={5}>
                <br/>
                Tên đệm:
                <br/>
                <input id="lastName"   size={30}  style={inputStyle} type="text" name = 'lastName' value={lastName}  onChange={(e)=>{handleChangeInputTag(e,setLastName)}}/>
                {/* <Button onClick={(e)=>fixInfo(e,"lastName")} ><BorderColorIcon/></Button> */}
            </GridItem>
            <GridItem xs={12} sm={12} md={5}>
                <br/>
                Ngày sinh:
                <br/>
                <input id="dateBirth"   size={30}  style={inputStyle} type="text" name = 'birthday' value={DateOfBirth.split('-')[2]+'-'+DateOfBirth.split('-')[1]+'-'+DateOfBirth.split('-')[0]}  onChange={(e)=>{handleChangeInputTag(e,setDB)}}/>
                {/* <Button onClick={(e)=>fixInfo(e,"dateBirth")} ><BorderColorIcon/></Button> */}
            </GridItem>
            <GridItem xs={12} sm={12} md={5}>
                <br/>
                Quê Quán:
                <br/>
                <input id ="QQ"   size={30}  style={inputStyle} type="text" name = 'address' value={QueQuan}  onChange={(e)=>{handleChangeInputTag(e,setQQ)}}/>
                {/* <Button onClick={(e)=>fixInfo(e,"QQ")} ><BorderColorIcon/></Button> */}
            </GridItem>
            <GridItem xs={12} sm={12} md={5}>
                <br/>
                Lương: 
                <br/>
                <input id="luong"   size={30}  style={inputStyle} type="number" name = 'salary' value={Luong}  onChange={(e)=>{handleChangeInputTag(e,setLuong)}}/>
                {/* <Button onClick={(e)=>fixInfo(e,"luong")} ><BorderColorIcon/></Button> */}
            </GridItem>
            <GridItem xs={12} sm={12} md={5}>
                <br/>
                Vị trí:
                <br/>
                <input id="position"   size={30}  style={inputStyle} type="text" name = 'position' value={MaVT}  onChange={(e)=>{handleChangeInputTag(e,setVT)}}/>
                {/* <Button onClick={(e)=>fixInfo(e,"position")} ><BorderColorIcon/></Button> */}
            </GridItem>
            <GridItem xs={12} sm={12} md={5}>
                <br/>
                Ngày tham gia:
                <br/>
                <input id='joinDate'   size={30}  style={inputStyle} type="text" name = 'joinDate' value={DateOfJoin.split('-')[2]+'-'+DateOfJoin.split('-')[1]+'-'+DateOfJoin.split('-')[0]} onChange={(e)=>{handleChangeInputTag(e,setDJ)}}/>
            </GridItem>
            <GridItem xs={12} sm={12} md={5}>
                <br/>
                Ngày hết hạn hợp đồng:
                <br/>
                <input id='ed'   size={30}  style={inputStyle} type="text" name = 'expireDate' value={HanHD.split('-')[2]+'-'+HanHD.split('-')[1]+'-'+HanHD.split('-')[0]} onChange={(e)=>{handleChangeInputTag(e,setHHD)}}/>
                {/* <Button onClick={(e)=>fixInfo(e,"ed")} ><BorderColorIcon/></Button> */}
            </GridItem>
            <GridItem xs={12} sm={12} md={5}>
                <br/>
                Tình trạng:
                <br/>
                <input id='tt'   size={30}  style={inputStyle} type="text" name = 'isActive' value={TT}  onChange={(e)=>{handleChangeInputTag(e,setTT)}}/>
                {/* <Button onClick={(e)=>fixInfo(e,"tt")} ><BorderColorIcon/></Button> */}
            </GridItem>
            <GridItem xs={12} sm={12} md={5}>
                <br/>
                CCCD:
                <br/>
                <input id='cccd'   size={30}  style={inputStyle} type="text" name = 'cccd' value={CMND} onChange={(e)=>{handleChangeInputTag(e,setCMND)}}/>
                {/* <Button onClick={(e)=>fixInfo(e,"cccd")} ><BorderColorIcon/></Button> */}
            </GridItem>
            <GridItem xs={12} sm={12} md={5}>
                <br/>
                Quyền:
                <br/>
                <input id='role'   size={30}  style={inputStyle} type="number" name = 'roleCode' value={Q}/>
                {/* <Button onClick={(e)=>fixInfo(e,"role")} ><BorderColorIcon/></Button> */}
            </GridItem>  
            <GridItem xs={12} sm={12} md={5}>
                <br/>
                Tài khoản:
                <br/>
                <input id='tk'   size={30}  style={inputStyle} type="text" name = 'account' value={TK}/>
                {/* <Button onClick={(e)=>fixInfo(e,"tk")} ><BorderColorIcon/></Button> */}
            </GridItem>
          </GridContainer>
          <br/>
          Ảnh:
          <img src = {Links} width="200" height="200"></img>
          <br/>
          <input id='anh'   size={30}  style={inputStyle} type="file" name = 'avatar'/>
          {/* <Button onClick={(e)=>fixInfo(e,"anh")} ><BorderColorIcon/></Button> */}
          <br/>
          <div height="30">
            <br/>
                  <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  type="Submit"
                  className={classes.button}
                  startIcon={<SaveIcon />}
                >
                  Lưu
                </Button>
          {/* <input type="Submit" value='Submit'/> */}
          </div>
          
        </form>
    </div>
    <div className={classes.table}><Button id='add' onClick={()=>clickAddStaff()}><AddIcon/></Button>
      <Table className={classes.table}>
        {tableHead !== undefined ? (
          <TableHead className={classes[tableHeaderColor + "TableHeader"]}>
            <TableRow className={classes.tableHeadRow}>
              {tableHead.map((prop, key) => {
                return (
                  <TableCell
                    className={classes.tableCell + " " + classes.tableHeadCell}
                    key={key}
                  >
                    {prop}
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>
        ) : null}
        <TableBody>
          {tableData.map((prop, key) => {
            if (prop[4]=='true'){
            return (
              <TableRow key={key} className={classes.tableBodyRow}>
                {prop.map((prop, key) => {
                  if (key != 5){
                  return (
                    <TableCell className={classes.tableCell} key={key}>
                      {prop}
                    </TableCell> 
                  );
                  }else{
                    return (
                      <TableCell className={classes.tableCell} key={key}>
                        <img src={prop} width="150" height="150"></img>
                      </TableCell>  
                    );
                  }
                })}
                <TableCell>
                    <Button id='delete' onClick={(e)=>clickDelete(e,prop)}><DeleteIcon/></Button> 
                    <Button id='fix' onClick={(e)=>clickFix(e,prop)} ><BorderColorIcon/></Button>
                </TableCell>
              </TableRow>
            );
          }})}
        </TableBody>
      </Table>
    </div>
    </div>
  );
}

EmployeesTable.defaultProps = {
  tableHeaderColor: "gray"
};

EmployeesTable.propTypes = {
  tableHeaderColor: PropTypes.oneOf([
    "warning",
    "primary",
    "danger",
    "success",
    "info",
    "rose",
    "gray"
  ]),
  tableHead: PropTypes.arrayOf(PropTypes.string),
  tableData: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string))
};


