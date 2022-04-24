import {
  signInWithGooglePopup,
  createUserDocumentFromAuth,
  signInAuthUserWithEmailAndPassword,
} from "../../utils/firebase/firebase.utils";
import { useState } from "react";

import FormInput from "../form-input/form-input";

import Button from "../button/button";

import "./sign-in-form.scss";

// we could have tracked in different states but in object it's easy
const defaultFormFields = {
  email: "",
  password: "",
};

const SignInForm = () => {
  const signInWithGoogle = async () => {
    const response = await signInWithGooglePopup();
    // We will get access token after successfully sign in
    // We are calling createUserDocumentFromAuth with response user we get after googleSignIN

    await createUserDocumentFromAuth(response.user);
  };

  // we set object of defaultFormFields in formFields State
  const [formFields, setFormFields] = useState(defaultFormFields);
  //   then Destructure  The reason why is because we're going to use these values somewhere inside of our code.
  const { email, password } = formFields;

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await signInAuthUserWithEmailAndPassword(
        email,
        password
      );
      console.log(response);
      resetFormFields();
    } catch (error) {
      switch (error.code) {
        case "auth/wrong-password":
          alert("Incorrect password for email");
          break;
        case "auth/user-not-found":
          alert("no user associated with this email");
          break;
        default:
          console.log(error);
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
      <h2>Already have an account?</h2>
      <span>Sign In With Your Email And Password</span>
      <form onSubmit={handleSubmit}>
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
        <div className="buttons-container">
          <Button type="submit">Sign In</Button>
          {/* 
No user associated with this email, which we know is our error that we see for an associated email.
But why is it that when I hit the Google sign in this form also tried to submit?
The reason for this is because by default, buttons are of typed submit inside of forms for us.
To prevent this from happening, we have to just say that the type of this button is just a button.
 */}
          <Button type="button" buttonType="google" onClick={signInWithGoogle}>
            Google Sign In
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SignInForm;
