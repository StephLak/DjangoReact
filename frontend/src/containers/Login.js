import React from "react";
import { Form, Input, Button, Spin } from "antd";
import { LoadingOutlined, UserOutlined, LockOutlined } from "@ant-design/icons";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import * as actions from "../store/actions/auth";

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

class NormalLoginForm extends React.Component {
  onFinish = (values) => {
    this.props.onAuth(values.username, values.password);
    console.log("Received values of form", values);
    this.props.history.push("/");
  };

  render() {
    let errorMessage = null;
    if (this.props.error) {
      errorMessage = <p>{this.props.error.message}</p>;
    }

    return (
      <div>
        {errorMessage}
        {this.props.loading ? (
          <Spin indicator={antIcon} />
        ) : (
          <Form onFinish={this.onFinish}>
            <Form.Item
              name="username"
              label="Username"
              validateFirst="true"
              rules={[
                { required: true, message: "Please input your username!" },
              ]}
            >
              <Input
                prefix={<UserOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
                placeholder="Username"
              />
            </Form.Item>

            <Form.Item
              name="password"
              label="Password"
              rules={[
                {
                  required: true,
                  message: "Password must not be less than 8",
                  min: 8,
                },
              ]}
              hasFeedback
            >
              <Input.Password
                prefix={<LockOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
                placeholder="Password"
              />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                style={{ marginRight: "10px" }}
              >
                Login
              </Button>
              Or
              <NavLink style={{ marginRight: "10px" }} to="/signup/">
                {" "}
                Signup
              </NavLink>
            </Form.Item>
          </Form>
        )}
      </div>
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
    onAuth: (username, password) =>
      dispatch(actions.authLogin(username, password)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NormalLoginForm);
