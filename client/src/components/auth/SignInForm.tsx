import React, { useCallback, useState } from 'react';
import styled, { keyframes, css } from 'styled-components';
import * as yup from 'yup';
import { Formik, Form, Field, FormikHelpers } from 'formik';
import { Link } from 'react-router-dom';
import * as Antd from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { signIn } from '../../services/authService';
import MyButton from '../common/MyButton';
import { STheme } from '../../theme/theme';

export interface SignInInput {
  email: string;
  password: string;
}

const SignInForm: React.FC = (props) => {
  const [loading, setLoading] = useState<boolean>(false);

  const initialValues: SignInInput = {
    email: '',
    password: '',
  };

  const validationSchema = yup.object().shape({
    email: yup
      .string()
      .min(5, 'Email must have at least 5 character')
      .required('Email is required'),
    password: yup
      .string()
      .min(5, 'Password must have at least 5 character')
      .required('Password is required'),
  });

  const handleSubmit: (
    values: SignInInput,
    options: FormikHelpers<SignInInput>
  ) => Promise<void> = async (values, options) => {
    const { email, password } = values;

    try {
      options.setStatus();
      setLoading(true);
      await signIn({ email, password });
      window.location.href = '/';
    } catch (error) {
      if (error.response.data.message instanceof Array)
        options.setStatus({ message: [error.response.data.message] });
      else options.setStatus({ message: error.response.data.message });
    }
    setLoading(false);
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
        <SErrorMessage trigger={!!error}>{error}</SErrorMessage>
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
        {({ values, errors, touched, status, handleChange, handleBlur }) => (
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
              error={errors.email && touched.email ? errors.email : ''}
              value={values.email}
              validateStatus={errors.email && touched.email ? 'error' : ''}
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
              error={errors.password && touched.password ? errors.password : ''}
              value={values.password}
              validateStatus={
                errors.password && touched.password ? 'error' : ''
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
            <SGlobalError>{status ? status.message : ''}</SGlobalError>
          </Form>
        )}
      </Formik>
      <STo>
        <p>
          Need an account ? <Link to="signup">Sign Up</Link>
        </p>
      </STo>
    </SLoginForm>
  );
};

const SLoginForm = styled.div`
  width: 400px;
  background-color: ${({ theme }: { theme: STheme }) =>
    theme.palette.common.white};
  padding: 20px 20px 0 20px;
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

const STo = styled.div`
  margin-top: 5px;
`;

const SGlobalError = styled.div`
  min-height: 25px;
  color: red;
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

export default SignInForm;
