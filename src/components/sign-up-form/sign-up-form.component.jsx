import { useState, useContext } from "react";
import {
  createAuthUserWithEmailAndPaswsword,
  createUserDoc,
} from "../../utils/firebase/firebase.utils";

import { FormInput } from "../form-input/form-input.component";
import { Button } from "../button/button.component";
import { SignUpContainer, Title } from "./sign-up-form.styles";
import { UserContext } from "../../contexts/user.context";

const formValues = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const defaultValues = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

export function SignUpForm() {
  const [formFields, setFormFields] = useState(formValues);
  const { displayName, email, password, confirmPassword } = formFields;
  const { setCurrentUser } = useContext(UserContext);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { displayName, email, password, confirmPassword } = event.target;

    if (password.value !== confirmPassword.value) {
      alert("password do not match");
      return;
    }
    try {
      const { user } = await createAuthUserWithEmailAndPaswsword(
        email.value,
        password.value
      );
      user.displayName = displayName.value;
      //DisplayName Option 1 - Create a new document into a database collection to add the displaName info
      await createUserDoc(user);
      /*DisplayName option 2 - sent the display name for the user that has been created through the form
      user.displayName = displayName;*/
      setCurrentUser(user);
      setFormFields(defaultValues);
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <SignUpContainer>
      <Title> Don't have an account?</Title>
      <span>Sign up with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="displayName"
          inputOptions={{
            type: "text",
            onChange: handleChange,
            name: "displayName",
            value: displayName,
            required: true,
          }}
        />
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
        <FormInput
          label="Confirm Password"
          inputOptions={{
            type: "password",
            onChange: handleChange,
            name: "confirmPassword",
            value: confirmPassword,
            required: true,
          }}
        />
        <Button text="Sign up" type="submit" />
      </form>
    </SignUpContainer>
  );
}

export default SignUpForm;
