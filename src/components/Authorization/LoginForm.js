import { useState, useRef } from "react";
import { useHistory } from "react-router-dom";
import API_URL from "../../utilities/Constants";

function LoginForm() {
  const history = useHistory();

  const emailInputRef = useRef();
  const passwordInputRef= useRef();

  async function submitHandler(event) {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    const credentials = {
      email: enteredEmail,
      password: enteredPassword
    };

    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      body: JSON.stringify(credentials),
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include'
    });
    if (!response.ok) {
      throw new Error('Nie udało się zalogować.');
    }
    console.log(credentials);
    console.log(response);
    history.replace('/');
    window.location.reload();
  }

  function cancelHandler(event) {
    event.preventDefault();
    history.replace('/');
  }

  return (
    <section>
      <h1>Logowanie</h1>
      <form onSubmit={submitHandler}>
        <div>
          <label htmlFor="email">Adres e-mail</label>
          <input type="email" id="email" required ref={emailInputRef} />
        </div>
        <div>
          <label htmlFor="password">Hasło</label>
          <input type="password" id="password" required ref={passwordInputRef} />
        </div>
        <button onSubmit={submitHandler}>Zaloguj</button>
        <button onClick={cancelHandler}>Anuluj</button>
      </form>
    </section>
  );
}

export default LoginForm;