import React from "react";
import { Form, Input, Button } from "antd";
import Axios from "axios";

const FormItem = Form.Item;

class CustomForm extends React.Component {
  state = {
    credentials: { title: "", content: "" },
  };

  handleFormSubmit = (event, requestType, articleID) => {
    event.preventDefault();
    console.log(this.state.credentials);

    switch (requestType) {
      case "post":
        Axios.post("http://127.0.0.1:8000/api/articles", this.state.credentials)
          .then(() => {
            this.props.resetState();
          })
          .then(console.log(this.state.credentials))
          .catch((error) => console.error(error));
        break;
      case "put":
        Axios.put(
          `http://127.0.0.1:8000/api/articles/${articleID}`,
          this.state.credentials
        )
          .then(() => {
            this.props.resetState();
          })
          .then(console.log(this.state.credentials))
          .catch((error) => console.error(error));
        break;
      case "delete":
        Axios.delete(
          `http://127.0.0.1:8000/api/articles/${articleID}`,
          this.state.credentials
        )
          .then(() => {
            this.props.resetState();
          })
          .then(console.log(this.state.credentials))
          .catch((error) => console.error(error));
        break;
      default:
        break;
    }
  };

  inputChanged = (event) => {
    const cred = this.state.credentials;
    cred[event.target.name] = event.target.value;
    this.setState({ credentials: cred });
  };

  render() {
    return (
      <div>
        <Form
          onSubmitCapture={(event) =>
            this.handleFormSubmit(
              event,
              this.props.requestType,
              this.props.articleID
            )
          }
        >
          <FormItem label="Title">
            <Input
              name="title"
              type="text"
              placeholder="Enter a title"
              value={this.state.credentials.title}
              onChange={this.inputChanged}
            />
          </FormItem>
          <FormItem label="Content">
            <Input
              name="content"
              type="text"
              placeholder="Enter some content"
              value={this.state.credentials.content}
              onChange={this.inputChanged}
            />
          </FormItem>
          <FormItem>
            <Button type="primary" htmlType="submit">
              {this.props.btnText}
            </Button>
          </FormItem>
        </Form>
      </div>
    );
  }
}

export default CustomForm;
