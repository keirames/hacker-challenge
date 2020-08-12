import React, { useCallback } from "react";
import styled, { keyframes, css } from "styled-components";
import * as yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Link } from "react-router-dom";
import { LOGIN, LoginUserDetails } from "../../mutations";
import { useMutation } from "@apollo/client";
import { signInWithJwt } from "../../services/authService";
import MyButton from "../common/MyButton";
import * as Antd from "antd";
import { STheme } from "../../theme/theme";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface FormValues {
  email: string;
  password: string;
}

const LoginForm: React.FC = (props) => {
  const initialValues: FormValues = {
    email: "",
    password: "",
  };

  const validationSchema = yup.object().shape({
    email: yup
      .string()
      .min(5, "Email must have at least 5 character")
      .required("Email is required"),
    password: yup
      .string()
      .min(5, "Password must have at least 5 character")
      .required("Password is required"),
  });

  const [login, { loading, error }] = useMutation<
    { login: any },
    LoginUserDetails
  >(LOGIN);

  const handleSubmit = async (values: FormValues) => {
    const { email, password } = values;

    try {
      const response = await login({ variables: { email, password } });
      signInWithJwt(response.data?.login);
      window.location.href = "/";
    } catch (error) {
      // Do nothing
    }
  };

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

  return (
    <SLoginForm>
      <STitle>
        <Antd.Typography.Title level={4}>Welcome back !</Antd.Typography.Title>
        <span>We're so excited to see you again !</span>
      </STitle>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, errors, touched, handleChange, handleBlur }) => (
          <Form>
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
              Sign In
            </MyButton>
            {error && <SGlobalError>{error.message}</SGlobalError>}
          </Form>
        )}
      </Formik>
      <STo>
        <p>
          Need an account ? <Link to={`signup`}>Register</Link>
        </p>
      </STo>
    </SLoginForm>
  );
};

const SLoginForm = styled.div`
  width: 400px;
  background-color: ${({ theme }: { theme: STheme }) =>
    theme.palette.common.white};
  padding: 20px;
  border-radius: 5px;
`;

const STitle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  color: ${({ theme }: { theme: STheme }) => theme.palette.common.black};
  margin-bottom: 10px;
`;

const SField = styled(Field)`
  margin: 10px 0;
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

export default LoginForm;
