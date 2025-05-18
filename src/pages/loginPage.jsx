import React from "react";
import LoginCard from "../components/login/loginCard";
import { useUser } from "../context/userContext"

function LoginPage() {
  const { userHandle } = useUser()

  return (
    <>
      <LoginCard userHandle={userHandle}/>
    </>
  );
}

export default LoginPage;
