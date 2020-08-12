import React, { useCallback } from "react";
import styled, { keyframes, css } from "styled-components";
import * as yup from "yup";
import { Formik, Form, Field } from "formik";
import * as Antd from "antd";
import { Link } from "react-router-dom";
import { SIGN_UP } from "../../mutations";
import { useMutation } from "@apollo/client";
import { signInWithJwt } from "../../services/authService";
import { AccountDetails } from "../../graphql";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import MyButton from "../common/MyButton";

interface FormValues {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

const RegisterForm: React.FC = (props) => {
  const initialValues = {
    email: "",
    password: "",
    firstName: "",
    lastName: "",
  };

  const validationSchema = yup.object().shape({
    firstName: yup
      .string()
      .min(2, "FirstName at least 2 characters")
      .required("FirstName is required"),
    lastName: yup
      .string()
      .min(2, "LastName at least 2 characters")
      .required("LastName is required"),
    email: yup
      .string()
      .min(5, "Email must have at least 5 characters")
      .required("Email is required"),
    password: yup
      .string()
      .min(5, "Password must have at least 5 characters")
      .required("Password is required"),
  });

  const [signUp, { loading, error }] = useMutation<
    { signUp: string },
    { account: AccountDetails }
  >(SIGN_UP);

  const MyField = useCallback((props) => {
    const {
      as,
      name,
      type,
      placeholder,
      prefix,
      handleChange,
      value,
      error,
      validateStatus,
      ...rest
    } = props;
    return (
      <SAntdFormItem validateStatus={validateStatus}>
        <Field
          as={as}
          name={name}
          type={type}
          placeholder={placeholder}
          prefix={prefix}
          onChange={handleChange}
          value={value}
          {...rest}
        />
        <SErrorMessage trigger={error ? true : false}>{error}</SErrorMessage>
      </SAntdFormItem>
    );
  }, []);

  const handleSubmit = async (values: FormValues): Promise<void> => {
    try {
      const response = await signUp({ variables: { account: values } });
      if (response.data) signInWithJwt(response.data.signUp);
      window.location.href = "/";
    } catch (error) {
      // Do nothing
    }
  };

  return (
    <SRegisterForm>
      <STitle>
        <Antd.Typography.Title level={4}>
          Create an account !
        </Antd.Typography.Title>
      </STitle>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, errors, touched, handleChange, handleBlur }) => (
          <Form>
            <SInfoBlock>
              <MyField
                as={Antd.Input}
                name="firstName"
                type="firstName"
                placeholder="Enter your First Name"
                prefix={<FontAwesomeIcon icon="user" />}
                size="large"
                onChange={handleChange}
                onBlur={handleBlur}
                error={
                  errors.firstName && touched.firstName ? errors.firstName : ""
                }
                value={values.firstName}
                validateStatus={
                  errors.firstName && touched.firstName ? "error" : ""
                }
              />
              <MyField
                as={Antd.Input}
                name="lastName"
                type="lastName"
                placeholder="Enter your Last Name"
                size="large"
                onChange={handleChange}
                onBlur={handleBlur}
                error={
                  errors.lastName && touched.lastName ? errors.lastName : ""
                }
                value={values.lastName}
                validateStatus={
                  errors.lastName && touched.lastName ? "error" : ""
                }
              />
            </SInfoBlock>
            <MyField
              as={Antd.Input}
              name="email"
              type="email"
              placeholder="Enter your email"
              prefix={<FontAwesomeIcon icon="at" />}
              size="large"
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.email && touched.email ? errors.email : ""}
              value={values.email}
              validateStatus={errors.email && touched.email ? "error" : ""}
            />
            <MyField
              as={Antd.Input.Password}
              name="password"
              type="password"
              placeholder="Enter your password"
              prefix={<FontAwesomeIcon icon="lock" />}
              size="large"
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.password && touched.password ? errors.password : ""}
              value={values.password}
              validateStatus={
                errors.password && touched.password ? "error" : ""
              }
            />
            <MyButton
              color="secondary"
              type="primary"
              htmlType="submit"
              block
              loading={loading}
            >
              Sign Up
            </MyButton>
            {error && <SGlobalError>{error.message}</SGlobalError>}
          </Form>
        )}
      </Formik>
      <STo>
        <p>
          <Link to={`signin`}>Already have an account ?</Link>
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

const SGlobalError = styled.div`
  width: 100%;
  text-align: center;
  margin-top: 10px;
  padding: 5px;
  background-color: ${({ theme }) => theme.palette.common.lightRed};
  text-transform: uppercase;
`;

const appear = keyframes`
  0% {
    opacity: 0;
    transform: translateY(-20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
`;

const SErrorMessage = styled.span`
  ${(p: { trigger: boolean }) => ``}

  display: block;
  color: red;
  min-height: 25px;
  ${(p) =>
    p.trigger
      ? css`
          animation: ${appear} 0.2s linear;
        `
      : ``};
`;

const SAntdFormItem = styled(Antd.Form.Item)`
  transition: 2s linear;

  &.ant-form-item {
    margin-bottom: 0;
  }
`;

export default RegisterForm;
