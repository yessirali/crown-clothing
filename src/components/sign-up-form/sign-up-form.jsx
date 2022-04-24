import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";
import { useState } from "react";

import FormInput from "../form-input/form-input";

import Button from '../button/button'

import "./sign-up-form.styles.scss";

// we could have tracked in different states but in object it's easy
const defaultFormFields = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SignUpForm = () => {
  // we set object of defaultFormFields in formFields State
  const [formFields, setFormFields] = useState(defaultFormFields);
  //   then Destructure  The reason why is because we're going to use these values somewhere inside of our code.
  const { displayName, email, password, confirmPassword } = formFields;

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };
  const handleSubumit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match");

      return;
    }

    try {
      const { user } = await createAuthUserWithEmailAndPassword(
        email,
        password
      );

      await createUserDocumentFromAuth(user, { displayName });
      resetFormFields();
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        alert("Cannot create user, email already in use");
      } else {
        console.log("user creation encountered an error", error);
      }
    }
  };
  /*
And then what I'm going to do next is I am now going to actually figure out what happens whenever these

values change so that I can update my form fields here.

I'm going to create a function called handle change.

And this is going to be a general function that takes that input event whenever the text changes.
  */

  /*
However, in order for us to make this function generic, there's a couple of things we need to be able

to do so by generic, I mean that we essentially want to pass this into our input as the on change handler

for every single one of our inputs.




*/
  const handleChange = (event) => {
    const { name, value } = event.target;

    /*
The main reason for using this object was so that we could generate size.

This handle change and primarily what we're trying to do is that we want to spread in this object and

then modify one value on this object.

And we knew this worked because all of these form fields are essentially duplicated versions of the

same state.

Their only difference is which of these inputs are being targeted inside of this object.
    */
    setFormFields({ ...formFields, [name]: value });
  };
  return (
    <div className="sign-up-container">
      <h2>Don't have an account?</h2>
      <span>Sign Up With Your Email And Password</span>
      <form onSubmit={handleChange}>
        <FormInput
          type="text"
          label="Display Name"
          required
          onChange={handleSubumit}
          name="displayName"
          value={displayName}
        />

        <FormInput
          label="Email"
          type="email"
          required
          onChange={handleChange}
          name="email"
          value={email}
        />

        <FormInput
          label="Password"
          type="password"
          required
          onChange={handleChange}
          name="password"
          value={password}
        />

        <FormInput
          type="password"
          label="Confirm Password"
          required
          onChange={handleChange}
          name="confirmPassword"
          value={confirmPassword}
        />
        <Button type="submit">Sign Up</Button>
      </form>
    </div>
  );
};

export default SignUpForm;
