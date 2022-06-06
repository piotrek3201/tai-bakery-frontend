import { useCallback, useEffect } from "react";
import { Redirect } from "react-router-dom";
import LoginForm from "../components/Authorization/LoginForm";
import API_URL from "../utilities/Constants";



function LogoutPage() {

  const logoutHandler = useCallback(async () => {
    try {
      const response = await fetch(`${API_URL}/auth/logout`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        credentials: 'include'
      });

      const responseData = await response.json();

    } catch (error) {
      alert(error.message);
    }

    window.location.reload();
  }, []);

  useEffect(() => {
    logoutHandler();
  }, [logoutHandler]);

  return (
    <Redirect to='/' />
  );
}

export default LogoutPage;