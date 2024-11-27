import {
  signInWithGooglePopUp,
  validateAuthUserWithEmailAndPaswsword,
} from "../../utils/firebase/firebase.utils";

import { Button, BUTTON_TYPE_CLASSES } from "../button/button.component";
import { FormInput } from "../form-input/form-input.component";
import { useState } from "react";

import {
  SignInContainer,
  Title,
  ButtonsContainer,
} from "./sign-in-form.styles";

const userLoginInfo = {
  email: "",
  password: "",
};

const defaultValues = {
  email: "",
  password: "",
};

export function SignInForm() {
  const [formFields, setFormFields] = useState(userLoginInfo);
  const { email, password } = formFields;

  const GooglePopupAccess = async () => {
    await signInWithGooglePopUp();
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await validateAuthUserWithEmailAndPaswsword(email, password);
      setFormFields(defaultValues);
    } catch (error) {
      switch (error.code) {
        case "auth/invalid-credential":
          alert("Email or password is invalid");
          break;
        default:
          console.log(error);
      }
    }
  };
  return (
    <SignInContainer>
      <Title>SignIn</Title>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Email"
          inputOptions={{
            type: "email",
            onChange: handleChange,
            name: "email",
            value: email,
            required: true,
          }}
        />
        <FormInput
          label="Password"
          inputOptions={{
            type: "password",
            onChange: handleChange,
            name: "password",
            value: password,
            required: true,
          }}
        />
        <ButtonsContainer>
          <Button text="SIGN IN" type="submit" />
          <Button
            type="button"
            text="GOOGLE SIGN IN"
            buttonType={BUTTON_TYPE_CLASSES.google}
            onClick={GooglePopupAccess}
          />
        </ButtonsContainer>
      </form>
    </SignInContainer>
  );
}
