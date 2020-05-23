import React from "react";
import styled from "styled-components";
import * as yup from "yup";
import { Typography, TextField, Button } from "@material-ui/core";
import { Formik, Form, Field } from "formik";
import { Link } from "react-router-dom";
import { LOGIN, LoginUserDetails } from "../../mutations";
import { useMutation } from "@apollo/client";
import { signInWithJwt } from "../../services/authService";

interface FormValues {
  username: string;
  password: string;
}

const LoginForm: React.FC = (props) => {
  const initialValues: FormValues = {
    username: "",
    password: "",
  };

  const validationSchema = yup.object().shape({
    username: yup
      .string()
      .min(5, "Username must have at least 5 character")
      .required("Username is required"),
    password: yup
      .string()
      .min(5, "Password must have at least 5 character")
      .required("Password is required"),
  });

  const [login, { loading, error }] = useMutation<
    { login: any },
    LoginUserDetails
  >(LOGIN);

  const handleSubmit = async (values: FormValues): Promise<void> => {
    const { username, password } = values;

    try {
      const response = await login({ variables: { username, password } });
      signInWithJwt(response.data?.login);
      window.location.href = "/";
    } catch (error) {
      // Do nothing
    }
  };

  return (
    <SLoginForm>
      <STitle>
        <Typography variant="h5">Welcome back !</Typography>
        <span>We're so excited to see you again !</span>
      </STitle>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, errors, touched, handleChange, handleBlur }) => (
          <Form>
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
              Sign In
            </Button>
            {error && <SError>{error.message}</SError>}
          </Form>
        )}
      </Formik>
      <STo>
        <p>
          Need an account ? <Link to={`register`}>Register</Link>
        </p>
      </STo>
    </SLoginForm>
  );
};

const SLoginForm = styled.div`
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

export default LoginForm;
