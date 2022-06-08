import { useRef } from "react";
import { useHistory } from "react-router-dom";
import API_URL from "../../utilities/Constants";
import classes from "./Autorization.module.css";

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

    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        body: JSON.stringify(credentials),
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include'
      });
      if (!response.ok) {
        throw new Error('Błędne dane logowania.');
      }
      history.replace('/');
      window.location.reload();
    } catch (ex) {
      alert(ex.message);
    }
  }

  function cancelHandler(event) {
    event.preventDefault();
    history.replace('/');
  }

  return (
    <section className={classes.box}>
      <h1>Logowanie</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.emailInput}>
          <label htmlFor="email">Adres e-mail</label>
          <input type="email" id="email" required ref={emailInputRef} />
        </div>
        <div className={classes.passwordInput}>
          <label htmlFor="password">Hasło</label>
          <input type="password" id="password" required ref={passwordInputRef} />
        </div>
        <div className={classes.buttons}>
          <button className={classes.button} onSubmit={submitHandler}>Zaloguj</button>
          <button className={classes.button} onClick={cancelHandler}>Anuluj</button>
        </div>
      </form>
    </section>
  );
}

export default LoginForm;