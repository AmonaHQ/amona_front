import * as moment from "moment";
export default class ValidatorService {
  constructor(schema) {
    this.schema = schema;
  }
  validations = {
    required: (input, name, value) => {
      if (!input && value)
        return { success: false, message: `${name} is required` };
      return true;
    },
    shouldMatch: (input, name, value) => {
      if (input !== value)
        return { success: false, message: `${name} must match` };
      return true;
    },
    maxLength: (input, name, value) => {
      if (input.length > parseInt(value, 10)) {
        return {
          success: false,
          message: `${name} should not be more than ${value} characters long`,
        };
      }
      return true;
    },
    minLength: (input, name, value) => {
      if (input.length < parseInt(value, 10)) {
        return {
          success: false,
          message: `${name} should be at least ${value} characters long`,
        };
      }
      return true;
    },
    length: (input, name, value) => {
      if (input.toString().length !== parseInt(value, 10)) {
        return {
          success: false,
          message: `${name} should be ${value} characters long`,
        };
      }
      return true;
    },

    words: (input, name, value) => {
      if (input.toString().trim().split(" ").length !== parseInt(value, 10)) {
        return {
          success: false,
          message: `${name} is invalid`,
        };
      }
      return true;
    },
    maxWords: (input, name, value) => {
      if (input.toString().trim().split(" ").length > parseInt(value, 10)) {
        return {
          success: false,
          message: `${name} should not be more than ${value} words`,
        };
      }
      return true;
    },
    minWords: (input, name, value) => {
      if (input.toString().trim().split(" ").length < parseInt(value, 10)) {
        return {
          success: false,
          message: `${name} should not be less than ${value} words`,
        };
      }
      return true;
    },
    date: (input, name, value) => {
      if (!moment(input.toString(), value, true).isValid()) {
        return {
          success: false,
          message: `${input} is not a valid ${name}`,
        };
      }
      return true;
    },
    greaterThan: (input, name, value) => {
      if (parseInt(input, 10) <= parseInt(value, 10)) {
        return {
          success: false,
          message: `${name} should be greater than ${value}`,
        };
      }
      return true;
    },
    lessThan: (input, name, value) => {
      if (parseInt(input, 10) >= parseInt(value, 10)) {
        return {
          success: false,
          message: `${name} should be less than ${value}`,
        };
      }
      return true;
    },
    inputType: (input, name, value) => {
      switch (value) {
        case "number":
          if (isNaN(input.toString())) {
            return {
              success: false,
              message: `${name} should be a number`,
            };
          }
          return true;
        case "email":
          const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          const validatedEmail = re.test(String(input).toLowerCase());
          if (!validatedEmail) {
            return {
              success: false,
              message: `A valid email is required`,
            };
          }
          return true;
        case "string":
          if (!isNaN(input.toString())) {
            return {
              success: false,
              message: `${name} should be a string`,
            };
          }
          return true;
        case "password":
          const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
          const validatePassword = passwordPattern.test(
            String(input).toLowerCase()
          );
          if (!validatePassword) {
            return {
              success: false,
              message: `Password should contain at least 8 characters, 1 number and 1 letter`,
            };
          }
          return true;

        case "date":
          return true;
        default:
          return false;
      }
    },
  };
  validateAll = (schemaKeys, schemaValues, input, name) => {
    for (let index = 0; index < schemaKeys.length; index += 1) {
      const result = this.validations[schemaKeys[index]](
        input.toString().trim(),
        name,
        schemaValues[index]
      );
      if (result !== true) {
        return {
          success: false,
          message: result.message,
          input,
        };
      }
    }
    return true;
  };
  checkValidations = (input, name) => {
    let schemaKeys = Object.keys(this.schema).filter((key) => key !== "label");
    let schemaValues = [];
    for (let index = 0; index < schemaKeys.length; index += 1) {
      schemaValues.push(this.schema[schemaKeys[index]]);
    }
    const required = schemaValues[schemaKeys.indexOf("required")];
    if (required) {
      this.schema = {
        required: schemaValues[schemaKeys.indexOf("required")],
        ...this.schema,
      };
      schemaKeys = Object.keys(this.schema).filter((key) => key !== "label");
      schemaValues = Object.values(this.schema);
      return this.validateAll(schemaKeys, schemaValues, input, name);
    } else if (!required && !input.length) return true;
    else {
      return this.validateAll(schemaKeys, schemaValues, input, name);
    }
  };
}
// sample schema

// const schema = {
//   required: true,
//   label: "countryregion",
//   minLength: 1000,
// };
// const validation = new ValidatorService(schema);
// console.log("validation2", validation.checkValidations(16, "Amount"));
