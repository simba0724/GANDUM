import React, { Fragment } from "react";
import { connect } from "react-redux";
import * as Yup from "yup";
import { Formik } from "formik";

import {
  Typography,
  Box,
  Container,
  Grid,
  Button,
  TextField,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import { register } from "../../utils/service_bk";

const Register = (props) => {
  const handleRegister = (values) => {
    console.log(values);
    register(
      values.first_name,
      values.last_name,
      values.company,
      values.phone,
      values.email,
      values.password
    );
  };

  return (
    <Fragment>
      <Box
        component="div"
        display="flex"
        justifyContent="center"
        alignItems="center"
        className="page-header"
      >
        <Typography variant="h1">Register</Typography>
      </Box>
      <Container
        maxWidth="sm"
        className="margin-top-3 margin-bottom-3 register-wrapper"
      >
        <Formik
          initialValues={{
            email: "",
            first_name: "",
            last_name: "",
            password: "",
            confirmPassword: "",
            phone: "",
            company: "",
          }}
          validationSchema={Yup.object().shape({
            email: Yup.string()
              .email("Must be a valid email")
              .max(255)
              .required("Email is required"),
            first_name: Yup.string()
              .max(255)
              .required("first name is required"),
            last_name: Yup.string().max(255).required("last name is required"),
            phone: Yup.string()
              .max(255)
              .required("Phone number is required")
              .matches(
                /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
              ),
            company: Yup.string().max(255),
            password: Yup.string()
              .max(255)
              .required("password is required")
              .matches(
                /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
                "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
              ),
            confirmPassword: Yup.string().oneOf(
              [Yup.ref("password"), null],
              "Passwords must match"
            ),
          })}
          onSubmit={(values) => {
            handleRegister(values);
          }}
        >
          {({
            errors,
            handleBlur,
            handleChange,
            handleSubmit,
            isSubmitting,
            touched,
            values,
          }) => (
            <form onSubmit={handleSubmit}>
              <Box mb={3}>
                <Typography color="textPrimary" variant="h2">
                  Create new account
                </Typography>
                <Typography color="textSecondary" gutterBottom variant="body2">
                  Use your email to create new account
                </Typography>
              </Box>
              {/* <div styles={{ backgroundColor: "black" }}> */}
              <TextField
                error={Boolean(touched.first_name && errors.first_name)}
                fullWidth
                helperText={touched.first_name && errors.first_name}
                label="First Name"
                margin="normal"
                name="first_name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.first_name}
                variant="outlined"
                style={{ borderColor: "green", borderWidth: 2 }}
              />
              {/* </div> */}
              <TextField
                error={Boolean(touched.last_name && errors.last_name)}
                fullWidth
                helperText={touched.last_name && errors.last_name}
                label="Last Name"
                margin="normal"
                name="last_name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.last_name}
                variant="outlined"
              />
              <TextField
                error={Boolean(touched.phone && errors.phone)}
                fullWidth
                helperText={touched.phone && errors.phone}
                type="tel"
                label="Phone number"
                margin="normal"
                name="phone"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.phone}
                variant="outlined"
              />
              <TextField
                error={Boolean(touched.company && errors.company)}
                fullWidth
                helperText={touched.company && errors.company}
                label="Comapany"
                margin="normal"
                name="company"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.company}
                variant="outlined"
              />
              <TextField
                error={Boolean(touched.email && errors.email)}
                fullWidth
                helperText={touched.email && errors.email}
                label="Email Address"
                margin="normal"
                name="email"
                onBlur={handleBlur}
                onChange={handleChange}
                type="email"
                value={values.email}
                variant="outlined"
              />
              <TextField
                error={Boolean(touched.password && errors.password)}
                fullWidth
                helperText={touched.password && errors.password}
                label="Password"
                margin="normal"
                name="password"
                onBlur={handleBlur}
                onChange={handleChange}
                type="password"
                value={values.password}
                variant="outlined"
              />
              <TextField
                error={Boolean(
                  touched.confirmPassword && errors.confirmPassword
                )}
                fullWidth
                helperText={touched.confirmPassword && errors.confirmPassword}
                label="Confirm Password"
                margin="normal"
                name="confirmPassword"
                onBlur={handleBlur}
                onChange={handleChange}
                type="password"
                value={values.confirmPassword}
                variant="outlined"
              />
              <Box my={2}>
                <Button
                  style={{
                    backgroundColor: "#37475A",
                    "--color-1": "#5e6b7a",
                    "--color-2": "#37475A",
                    background: `
                      linear-gradient(
                        170deg,
                        var(--color-1),
                        var(--color-2) 70%
                      )
                    `,
                    color: "#f8f8ff",
                  }}
                  //disabled={isSubmitting}
                  fullWidth
                  size="large"
                  type="submit"
                  variant="contained"
                >
                  Sign up now
                </Button>
              </Box>
              <Typography color="textSecondary" variant="body1">
                Have an account?{" "}
                <Link to="/login" variant="h6">
                  Sign in
                </Link>
              </Typography>
              {/* {message && (
                <div className="form-group">
                  <div className="alert alert-danger" role="alert">
                    {message}
                  </div>
                </div>
              )} */}
            </form>
          )}
        </Formik>
      </Container>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  settings: state.settings,
});

export default connect(mapStateToProps)(Register);
