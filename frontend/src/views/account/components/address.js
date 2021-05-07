import React, { Fragment, useState, useEffect } from "react";
import {
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Icon,
  Collapse,
  TextField,
  CardHeader,
  Divider,
  Fade,
  FormControlLabel,
  Checkbox,
  Tooltip,
} from "@material-ui/core";
import Rating from "@material-ui/lab/Rating";
import {
  addressbookAddAction,
  customerAction,
  updateAddress
} from "../../../store/action/customerAction";
import { connect, useDispatch } from "react-redux";
import Auth from "../../../utils/auth";
import EmailIcon from '@material-ui/icons/Email';
import BusinessIcon from '@material-ui/icons/Business';

import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const Address = (props) => {
  const [editMode, setEditMode] = useState(false);
  const [addMode, setAddMode] = useState(false);
  const [addrId, setAddrId] = useState("");
  const [custId, setCustId] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [company, setCompany] = useState("");
  const [phone, setPhone] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [pincode, setPincode] = useState("");
  const [defaultAddress, setDefaultAddress] = useState("");
  const [custInfo, setcustInfo] = useState([]); //customer info receive via props

  const classes = useStyles();

  const dispatch = useDispatch();

  useEffect(() => {
    const customer_id = Auth.getUserId();
    const customer = Auth.getUser();
    setCustId(customer_id);
    // props.customerAction(customer_id);
    if (customer_id) {
      if(customer.address.length > 0){
        setcustInfo(customer.address);
      }
    }
  }, []);
  const addressInput = (label, name, type, value, setFunction) => {
    return (
      <TextField
        type={type}
        label={label}
        name={name}
        variant="outlined"
        size="small"
        value={value}
        onChange={(e) => {
          setFunction(e.target.value);
        }}
        className="width-100"
      />
    );
  };
  const addAddress = () => {
    setAddMode(true);
    setEditMode(false);
  };

  const editAddress = (adress) => {
    console.log(adress);
    setEditMode(true);
    setAddMode(false);
  };

  const setMainAddress = (id) => {
    const custInfoBody = {
      id: Auth.getUserId(),
      _id: custInfo[id]._id,
      index: id,
      first_name: custInfo[id].first_name,
      last_name: custInfo[id].last_name,
      company: custInfo[id].company,
      phone: custInfo[id].phone,
      address_line1: custInfo[id].address_line1,
      address_line2: custInfo[id].address_line2,
      city: custInfo[id].city,
      country: custInfo[id].country,
      state: custInfo[id].state,
      pincode: custInfo[id].pincode,
      default_address: true
    };
    props.updateAddress(custInfoBody);
  };

  const addNewAddress = () => {
    const custInfoBody = {
      id: Auth.getUserId(),
      first_name: firstName,
      last_name: lastName,
      company: company,
      phone: phone,
      address_line1: address1,
      address_line2: address2,
      city: city,
      country: country,
      state: state,
      pincode: pincode,
      default_address: defaultAddress,
    };
    props.addressbookAddAction(custInfoBody);

    setAddMode(false);
    setEditMode(false);
    setFirstName("");
    setLastName("");
    setCompany("");
    setPhone("");
    setAddress1("");
    setAddress2("");
    setCity("");
    setCountry("");
    setState("");
    setPincode("");
  };

  const deleteAddressBook = (_id) => {
    console.log("delete");
  };

  const cancelAddress = () => {
    setEditMode(false);
    setAddMode(false);
  };

  return (
    <Fragment>
      <Grid container spacing={2} className="margin-bottom-2">
        <Grid item md={12} xs={12}>
          <Collapse in={editMode || addMode ? true : false}>
            <Card>
              <CardHeader title={`${editMode ? "Edit" : "Add"} Adress`} />
              <Divider />
              <CardContent>
                <Grid container spacing={2}>
                  <Grid item md={3} xs={12}>
                    {addressInput(
                      "First Name",
                      "first_name",
                      "text",
                      firstName,
                      setFirstName
                    )}
                  </Grid>
                  <Grid item md={3} xs={12}>
                    {addressInput(
                      "Last Name",
                      "last_name",
                      "text",
                      lastName,
                      setLastName
                    )}
                  </Grid>
                  <Grid item md={3} xs={12}>
                    {addressInput(
                      "Company",
                      "company",
                      "text",
                      company,
                      setCompany
                    )}
                  </Grid>
                  <Grid item md={3} xs={12}>
                    {addressInput("Phone", "phone", "tel", phone, setPhone)}
                  </Grid>
                  <Grid item md={12} xs={12}>
                    {addressInput(
                      "Address line1",
                      "address_line1",
                      "text",
                      address1,
                      setAddress1
                    )}
                  </Grid>
                  <Grid item md={12} xs={12}>
                    {addressInput(
                      "Address line2",
                      "address_line2",
                      "text",
                      address2,
                      setAddress2
                    )}
                  </Grid>
                  <Grid item md={3} xs={12}>
                    {addressInput("City", "city", "text", city, setCity)}
                  </Grid>
                  <Grid item md={3} xs={12}>
                    {addressInput(
                      "Country",
                      "country",
                      "text",
                      country,
                      setCountry
                    )}
                  </Grid>
                  <Grid item md={3} xs={12}>
                    {addressInput("State", "state", "text", state, setState)}
                  </Grid>
                  <Grid item md={3} xs={12}>
                    {addressInput(
                      "Pincode",
                      "pincode",
                      "text",
                      pincode,
                      setPincode
                    )}
                  </Grid>
                  <Grid item md={12} xs={12}>
                    <FormControlLabel
                      control={<Checkbox name="checkedB" color="primary" />}
                      label="Make it Default Address"
                      onChange={(e) => {
                        setDefaultAddress(e.target.checked);
                      }}
                    />
                  </Grid>
                </Grid>
              </CardContent>
              <CardActions>
                <Button
                  size="small"
                  color="primary"
                  onClick={editMode ? addNewAddress : addNewAddress}
                  variant="contained"
                >
                  {editMode ? "Update" : "Add"}
                </Button>
                <Button
                  size="small"
                  onClick={cancelAddress}
                  variant="contained"
                >
                  Cancel
                </Button>
              </CardActions>
            </Card>
          </Collapse>
          <Fade in={!addMode} className={editMode ? "margin-top-2" : ""}>
            <Button
              size="small"
              color="primary"
              onClick={addAddress}
              variant="contained"
            >
              Add New Address
            </Button>
          </Fade>
        </Grid>

        <Grid item md={12} xs={12}>
          <Card>
            <CardContent>
              <TableContainer className="width-100" component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell align="center">
                        No
                      </TableCell>
                      <TableCell align="center">
                        <Icon>home</Icon> Address
                      </TableCell>
                      <TableCell align="center">
                        <BusinessIcon /> Company
                      </TableCell>
                      <TableCell align="center">
                        <Icon>call</Icon> Call
                      </TableCell>
                      <TableCell align="center">
                        <EmailIcon /> Email
                      </TableCell>
                      <TableCell align="center">Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {
                      custInfo?
                        custInfo.length > 0 ?
                          custInfo.map((a, i) => (
                            <TableRow key={i}>
                              <TableCell align="center">{i + 1}</TableCell>
                              <TableCell align="center">{a.address_line1}, {a.address_line2}</TableCell>
                              <TableCell align="center">{a.company}</TableCell>
                              <TableCell align="center">{a.phone}</TableCell>
                              <TableCell align="center">{Auth.getUser().email}</TableCell>
                              <TableCell align="center">
                                {a.default_address == true ?"main":(
                                  <Button variant="outlined" color="primary" onClick={() => setMainAddress(i)}>
                                    set main
                                  </Button>
                                )}
                              </TableCell>
                            </TableRow>
                          ))
                        :null
                      :null
                    }
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
            <CardActions>
              <Button
                size="small"
                color="primary"
                onClick={() => editAddress("address")}
              >
                ADD
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </Fragment>
  );
};
const mapStateToProps = (state) => {
  return {
    customer: state.customer.customer.address_book,
  };
};
const mapDispatchToProps = {
  addressbookAddAction,
  customerAction,
  updateAddress
};

export default connect(mapStateToProps, mapDispatchToProps)(Address);
