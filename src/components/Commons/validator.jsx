import React, { Component } from "reactn";
import PropTypes from "prop-types";
import ValidatorService from "../../utilities/validations";

export default class Validator extends Component {
  state = {
    lastInput: "",
    errorMessages: {},
    disableButton: true,
  };
  checkValidation = async (event) => {
    const schema = JSON.parse(event.target.getAttribute("schema"));
    if (schema) {
      const validation = new ValidatorService(schema);
      const validated = validation.checkValidations(
        event.target.value || this.state.lastInput,
        schema.label
      );
      console.log("schema", schema, validated, event.target.value);

      const { errorMessages } = { ...this.state };
      errorMessages[`${event.target.name}Error`] = !validated.success
        ? validated.message
        : "";
      this.props.setValidationMessage(errorMessages);
      console.log("error", errorMessages);
      const query = document.querySelectorAll("[type=password]");
      if (query.length === 2 && event.target.name === query[0].name) {
        if (query[1].value && query[1].value.length) {
          const event = new Event("blur");
          setTimeout(() => {
            query[1].dispatchEvent(event);
          }, 10);
        }
      }
      this.setState({ errorMessages });
      this.setState({
        disableButton:
          this.shouldDisableButton("input") &&
          this.shouldDisableButton("select"),
      });
    }
  };
  shouldDisableButton = async (type) => {
    const validatedAllFields = [];
    const allInputs = document.querySelectorAll(type);
    for (let index = 0; index < allInputs.length; index += 1) {
      const schema = JSON.parse(allInputs[index].getAttribute("schema"));
      if (schema) {
        const { value } = allInputs[index];
        const validation = new ValidatorService(schema);
        const validated = await validation.checkValidations(
          value,
          schema.label
        );

        validatedAllFields.push(validated);
      }
    }
    const isValidated = validatedAllFields.filter(
      (validation) => validation !== true
    );
    this.props.toggleButtonDisable(isValidated.length !== 0);
    return isValidated.length !== 0;
  };
  handleChange = (event) => {
    this.checkValidation(event);

    this.setGlobal({
      [event.target.name]: event.target.value,
      lastInput: event.target.value,
    });
  };
  attachListeners = (query, type) => {
    if (query) {
      for (let index = 0; index < query.length; index += 1) {
        if (type === "input") {
          query[index].addEventListener("keyup", this.handleChange);
          query[index].addEventListener("blur", this.checkValidation);
          query[index].addEventListener("change", this.checkValidation);
        }
        if (type === "select") {
          query[index].addEventListener("keypress", this.handleChange);
          query[index].addEventListener("blur", this.checkValidation);
          query[index].addEventListener("select", this.handleChange);
          query[index].addEventListener("click", this.checkValidation);
        }
      }
    }
  };
  componentDidMount = () => {
    const inputFields = document.querySelectorAll("input");
    const selectFields = document.querySelectorAll("select");
    this.attachListeners(inputFields, "input");
    this.attachListeners(selectFields, "select");
    this.setState({
      disableButton:
        this.shouldDisableButton("input") && this.shouldDisableButton("select"),
    });
  };

  render() {
    return <div>{this.props.children}</div>;
  }
}

Validator.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.element.isRequired,
  ]),
};
