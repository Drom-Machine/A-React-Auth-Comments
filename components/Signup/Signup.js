//-------------------------------------------------------------- Brings in React
import React, { Component } from "react";
//------------------------------------------------------------------------------- Brings in Validator Functions
import { isAlpha, isEmail, isAlphanumeric, isStrongPassword } from "validator";
//------------------------------------------------------------------------------- Brings in CSS stylesheet
import "./Signup.css";
//------------------------------------------------------------------------------- Creates a react component called Signup
export class Signup extends Component {
  state = {
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    firstNameError: "",
    lastNameError: "",
    usernameError: "",
    emailError: "",
    passwordError: "",
    confirmPasswordError: "",
  };

  //---------------------------------------------------------------------------- Function created to handle input fields and store in signup class
  handleOnChange = (event) => {
    this.setState(
      {
        [event.target.name]: event.target.value,
      },
      () => { //---------------------------------------------------------------- Callback functions to detect input fields when the user is typing
        if (
          event.target.name === "firstName" ||
          event.target.name === "lastName"
        ) {
          this.handleFirstNameAndLastNameInput(event);
        }

        if (event.target.name === "email") {
          this.handleEmailInput();
        }

        if (event.target.name === "username") {
          this.handleUsernameInput();
        }
        if (event.target.name === "password") {
          this.handlePasswordInput();
        }

        if (event.target.name === "confirmPassword") {
          this.handleConfirmPasswordInput();
        }
      }
    );
  };
  //------------------------------------------------------------------------------- Function to check password input matches.
  handleConfirmPasswordInput = () => {
    if (this.state.password !== this.state.confirmPassword) {
      this.setState({
        confirmPasswordError: "Password does not match!",
        isButtonDisabled: true,
      });
    } else {
      this.setState({
        confirmPasswordError: "",
      });
    }
  };
  //------------------------------------------------------------------------------- Function to handle Password input and check if password is already confirmed
  handlePasswordInput = () => {
    if (this.state.confirmPasswordOnFocus) {
      if (this.state.password !== this.state.confirmPassword) {
        this.setState({
          confirmPasswordError: "Password does not match",
          isButtonDisabled: true,
        });
      } else {
        this.setState({
          confirmPasswordError: "",
        });
      }
    }
    if (this.state.password.length === 0) {
      this.setState({
        passwordError: "Password cannot be empty",
        isButtonDisabled: true,
      });
    } else {
      if (isStrongPassword(this.state.password)) {
        this.setState({
          passwordError: "",
        });
      } else {
        this.setState({
          passwordError:
            "Password must contains 1 uppercase, 1 lowercase, 1 special character, 1 number and minimul of 8 charactors long",
          isButtonDisabled: true,
        });
      }
    }
  };
  //------------------------------------------------------------------------------- Function to handle if Email input if empty or not
  handleEmailInput = () => {
    if (this.state.email.length === 0) {
      this.setState({
        emailError: "Email cannot be empty",
        isButtonDisabled: true,
      });
    } else {
      if (isEmail(this.state.email)) {
        this.setState({
          emailError: "",
        });
      } else {
        this.setState({
          emailError: "Please, enter a valid email!",
          isButtonDisabled: true,
        });
      }
    }
  };
  //------------------------------------------------------------------------------- Function to check if First and Last name inputs are empty.
  handleFirstNameAndLastNameInput = (event) => {
    if (this.state[event.target.name].length > 0) {
      if (isAlpha(this.state[event.target.name])) {
        this.setState({
          [`${event.target.name}Error`]: "",
        });
      } else {
        this.setState({
          [`${event.target.name}Error`]: `${event.target.placeholder} can only have alphabet`,
          isButtonDisabled: true,
        });
      }
    } else {
      this.setState({
        [`${event.target.name}Error`]: `${event.target.placeholder} cannot be empty`,
        isButtonDisabled: true,
      });
    }
  };
  //------------------------------------------------------------------------------- Function to check is user name is empty
  handleUsernameInput = () => {
    if (this.state.username.length === 0) {
      this.setState({
        usernameError: "Username cannot be empty",
        isButtonDisabled: true,
      });
    } else {
      if (isAlphanumeric(this.state.username)) {
        this.setState({
          usernameError: "",
        });
      } else {
        this.setState({
          usernameError: "Username can only have alphabet and number",
          isButtonDisabled: true,
        });
      }
    }
  };
  //------------------------------------------------------------------------------- Function to press submit button
  handleOnSubmit = async (event) => {
    event.preventDefault();
    console.log(this.state);
  };

  //------------------------------------------------------------------------------- Function that triggers when user leaves input field
  handleOnBlur = (event) => {
    console.log(event.target.name);
    console.log("handle onBlur Triggered");

    if (this.state[event.target.name].length === 0) {
      this.setState({
        [`${event.target.name}Error`]: `${event.target.placeholder} cannot be empty`,
      });
    }
  };

  //------------------------------------------------------------------------------- Sets password focus to true
  handleInputOnFocus = (event) => {
    if (!this.state[`${event.target.name}OnFocus`]) {
      this.setState({
        [`${event.target.name}OnFocus`]: true,
      });
    }
  };
  //------------------------------ Function that renders all components
  render() {
    const {
      firstName,
      lastName,
      username,
      email,
      password,
      confirmPassword,
      firstNameError,
      lastNameError,
      usernameError,
      emailError,
      passwordError,
      confirmPasswordError,
    } = this.state;

    

    return (
      <div className="container">
        <div className="form-text">Sign up</div>

        <div className="form-div">
          <form className="form" onSubmit={this.handleOnSubmit}> 
            <div className="form-group-inline">
              <div className="inline-container">
                <label htmlFor="firstName">First Name</label>
                <input
                  type="text"
                  id="firstName"
                  value={firstName}
                  placeholder="First Name"
                  name="firstName"
                  onChange={this.handleOnChange}
                  autoFocus
                  onBlur={this.handleOnBlur}
                  onFocus={this.handleInputOnFocus}
                />
                <div className="errorMessage">
                  {firstNameError && firstNameError}
                </div>
              </div>

              <div className="inline-container">
                <label htmlFor="lastName">Last Name</label>
                <input
                  type="text"
                  id="lastName"
                  value={lastName}
                  placeholder="Last Name"
                  name="lastName"
                  onChange={this.handleOnChange}
                  onBlur={this.handleOnBlur}
                  onFocus={this.handleInputOnFocus}
                />
                <div className="errorMessage">
                  {lastNameError && lastNameError}
                </div>
              </div>
            </div>

            <div className="form-group-block">
              <div className="block-container">
                <label htmlFor="email">Email</label>
                <input
                  type="text"
                  id="email"
                  value={email}
                  placeholder="Email"
                  onChange={this.handleOnChange}
                  name="email"
                  onBlur={this.handleOnBlur}
                  onFocus={this.handleInputOnFocus}
                />
                <div className="errorMessage">{emailError && emailError}</div>
              </div>
            </div>

            <div className="form-group-block">
              <div className="block-container">
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  id="username"
                  value={username}
                  placeholder="Username"
                  onChange={this.handleOnChange}
                  name="username"
                  onBlur={this.handleOnBlur}
                  onFocus={this.handleInputOnFocus}
                />
                <div className="errorMessage">
                  {usernameError && usernameError}
                </div>
              </div>
            </div>

            <div className="form-group-block">
              <div className="block-container">
                <label htmlFor="password">Password</label>
                <input
                  type="text"
                  id="password"
                  value={password}
                  placeholder="Password"
                  onChange={this.handleOnChange}
                  name="password"
                  onBlur={this.handleOnBlur}
                  onFocus={this.handleInputOnFocus}
                />
                <div className="errorMessage">
                  {passwordError && passwordError}
                </div>
              </div>
            </div>

            <div className="form-group-block">
              <div className="block-container">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input
                  type="text"
                  id="confirmPassword"
                  value={confirmPassword}
                  placeholder="Confirm Password"
                  onChange={this.handleOnChange}
                  name="confirmPassword"
                  onBlur={this.handleOnBlur}
                  onFocus={this.handleInputOnFocus}
                />
                <div className="errorMessage">
                  {confirmPasswordError && confirmPasswordError}
                </div>
              </div>
            </div>

            <div className="button-container">
              <button type="submit" disabled={this.state.isButtonDisabled}>
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
//------------------------------------------------------------------------------- Exports Signup 
export default Signup;