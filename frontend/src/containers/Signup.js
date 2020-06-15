import React from "react";
import { Form, Input, Button } from "antd";
import { NavLink } from "react-router-dom";
import * as actions from "../store/actions/auth";
import { connect } from "react-redux";
import { UserOutlined, LockOutlined, MailOutlined } from "@ant-design/icons";

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

const FormItem = Form.Item;

class RegistrationForm extends React.Component {
  handleSubmit = (values) => {
    this.props.onAuth(
      values.username,
      values.email,
      values.password1,
      values.password2
    );
    this.props.history.push("/login");
    console.log("Received values of form", values);
  };

  handleSubmitFailed = ({ errorFields }) => {
    this.props.form.scrollToField(errorFields[0].name);
  };

  onFinish = (values) => {
    console.log("Received values of form: ", values);
  };
  render() {
    return (
      <Form
        {...formItemLayout}
        name="register"
        onFinish={this.handleSubmit}
        scrollToFirstError
      >
        <FormItem
          name="username"
          label="Username"
          rules={[
            {
              required: true,
              message: "Please input your username!",
              whitespace: true,
            },
          ]}
        >
          <Input
            prefix={<UserOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
          />
        </FormItem>
        <FormItem
          name="email"
          label="E-mail"
          rules={[
            {
              type: "email",
              message: "The input is not valid E-mail!",
            },
            {
              required: true,
              message: "Please input your E-mail!",
            },
          ]}
        >
          <Input
            prefix={<MailOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
          />
        </FormItem>

        <FormItem
          name="password1"
          label="Password"
          rules={[
            {
              required: true,
              min: 8,
              message: "Password must not be less than 8",
            },
          ]}
          hasFeedback
        >
          <Input.Password
            prefix={<LockOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
          />
        </FormItem>

        <FormItem
          name="password2"
          label="Confirm Password"
          dependencies={["password"]}
          hasFeedback
          rules={[
            {
              required: true,
              message: "Please confirm your password!",
            },
            ({ getFieldValue }) => ({
              validator(rule, value) {
                if (!value || getFieldValue("password1") === value) {
                  return Promise.resolve();
                }

                return Promise.reject(
                  "The two passwords that you entered do not match!"
                );
              },
            }),
          ]}
        >
          <Input.Password
            prefix={<LockOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
          />
        </FormItem>
        <FormItem {...tailFormItemLayout}>
          <Button
            type="primary"
            htmlType="submit"
            style={{ marginRight: "10px" }}
          >
            Register
          </Button>
          Or
          <NavLink style={{ marginRight: "10px" }} to="/login/">
            {" "}
            Login
          </NavLink>
        </FormItem>
      </Form>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.loading,
    error: state.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAuth: (username, email, password1, password2) =>
      dispatch(actions.authSignup(username, email, password1, password2)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RegistrationForm);
