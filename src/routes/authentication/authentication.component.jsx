import { SignInForm } from "../../components/sign-in-form/sing-in-form.component";
import SignUpForm from "../../components/sign-up-form/sign-up-form.component";
import { AuthContainer } from "./authentication.styles";

export default function Authentication() {
  console.log("entro");
  return (
    <AuthContainer>
      <SignInForm />
      <SignUpForm />
    </AuthContainer>
  );
}
