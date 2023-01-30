import { useCallback, useEffect } from "react";
import { Redirect } from "react-router-dom";
import API_URL from "../utilities/Constants";

function LogoutPage() {

  const logoutHandler = useCallback(async () => {
    try {
      await fetch(`${API_URL}/auth/logout`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        //credentials: 'include'
      });

    } catch (error) {
      alert(error.message);
    }
    localStorage.removeItem("jwt");

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