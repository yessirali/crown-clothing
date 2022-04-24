/*
Default

Inverted

Google Sign-In

*/

/*
We have our inverted button.

We have our default button.

And then we have our Google sign in button.

So how do we leverage this button type in order to show styling for three different kinds of buttons?

Well, what we can do is we know that we're really just modifying this one button styling.

So really, perhaps we can control the styling by a class so we can have default styling for a button,

inverted styling as well as Google sign in styling.

And how we can do that is we can create some kind of variable, let's call it our button types, for

example.

And here we know that what we're telling it to apply is classes so we can even do button type classes

as the name of this object.

*/

import "./button.styles.scss";

const BUTTON_TYPE_CLASSES = {
  google: "google-sign-in",
  inverted: "inverted",
};
const Button = ({ children, buttonType, ...otherProps }) => {
  return (
    <button
      className={`button-container ${BUTTON_TYPE_CLASSES[buttonType]}`}
      {...otherProps}
    >
      {children}
    </button>
  );
};

export default Button;
