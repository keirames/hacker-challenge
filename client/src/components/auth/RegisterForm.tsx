import React from "react";
import styled from "styled-components";
import * as yup from "yup";
import { Typography, TextField, Button } from "@material-ui/core";
import { Formik, Form, Field } from "formik";
import { Link } from "react-router-dom";
import { REGISTER, NewUserDetails } from "../../mutations";
import { useMutation } from "@apollo/react-hooks";
import { loginWithJwt } from "../../services/authService";

interface FormValues {
  firstname: string;
  lastname: string;
  username: string;
  password: string;
}

const RegisterForm: React.FC = (props) => {
  const initialValues = {
    firstname: "",
    lastname: "",
    username: "",
    password: "",
  };

  const validationSchema = yup.object().shape({
    firstname: yup
      .string()
      .min(2, "Firstname at least 2 characters")
      .required("Firstname is required"),
    lastname: yup
      .string()
      .min(2, "Lastname at least 2 characters")
      .required("Lastname is required"),
    username: yup
      .string()
      .min(5, "Username must have at least 5 characters")
      .required("Username is required"),
    password: yup
      .string()
      .min(5, "Password must have at least 5 characters")
      .required("Password is required"),
  });

  const [register, { loading, error }] = useMutation<
    { register: any },
    { user: NewUserDetails }
  >(REGISTER);

  const handleSubmit = async (values: FormValues): Promise<void> => {
    try {
      const response = await register({ variables: { user: values } });
      loginWithJwt(response.data?.register.token);
      window.location.href = "/";
    } catch (error) {
      // Do nothing
    }
  };

  return (
    <SRegisterForm>
      <STitle>
        <Typography variant="h5">Create an account !</Typography>
      </STitle>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, errors, touched, handleChange, handleBlur }) => (
          <Form>
            <SInfoBlock>
              <SField
                component={TextField}
                name="firstname"
                id="firstname"
                value={values.firstname}
                onChange={handleChange}
                onBlur={handleBlur}
                variant="outlined"
                label="Enter your firstname"
                error={errors.firstname && touched.firstname ? true : false}
                helperText={
                  errors.firstname && touched.firstname
                    ? errors.firstname
                    : null
                }
              />
              <SField
                component={TextField}
                name="lastname"
                id="lastname"
                value={values.lastname}
                onChange={handleChange}
                onBlur={handleBlur}
                variant="outlined"
                label="Enter your lastname"
                error={errors.lastname && touched.lastname ? true : false}
                helperText={
                  errors.lastname && touched.lastname ? errors.lastname : null
                }
              />
            </SInfoBlock>
            <SField
              component={TextField}
              name="username"
              id="username"
              value={values.username}
              onChange={handleChange}
              onBlur={handleBlur}
              variant="outlined"
              label="Enter your username"
              fullWidth
              error={errors.username && touched.username ? true : false}
              helperText={
                errors.username && touched.username ? errors.username : null
              }
            />
            <SField
              component={TextField}
              name="password"
              id="password"
              type="password"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.password}
              variant="outlined"
              label="Enter your password"
              fullWidth
              error={errors.password && touched.password ? true : false}
              helperText={
                errors.password && touched.password ? errors.password : null
              }
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              style={{ marginTop: "10px" }}
              disabled={loading}
            >
              Sign Up
            </Button>
            {error && <SError>{error.message}</SError>}
          </Form>
        )}
      </Formik>
      <STo>
        <p>
          <Link to={`login`}>Already have an account ?</Link>
        </p>
      </STo>
    </SRegisterForm>
  );
};

const SRegisterForm = styled.div`
  width: 500px;
  background-color: ${({ theme }) => theme.palette.common.white};
  padding: 20px;
  border-radius: 5px;

  /* -webkit-box-shadow: ${({ theme }) => theme.shadows[2]};
  -moz-box-shadow: ${({ theme }) => theme.shadows[2]};
  box-shadow: ${({ theme }) => theme.shadows[2]}; */
`;

const STitle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  color: ${({ theme }) => theme.palette.common.black};
  margin-bottom: 10px;
`;

const SField = styled(Field)`
  margin: 10px 0;
`;

const SInfoBlock = styled.div`
  display: flex;
  flex-direction: "row";

  & > div:first-child {
    margin-right: 20px;
  }
`;

const STo = styled.div`
  margin-top: 10px;
`;

const SError = styled.div`
  width: 100%;
  text-align: center;
  margin-top: 10px;
  padding: 5px;
  background-color: ${({ theme }) => theme.palette.common.lightRed};
  text-transform: uppercase;
`;

export default RegisterForm;
