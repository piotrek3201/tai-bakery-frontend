import { useRef } from "react";
import { useHistory } from "react-router-dom";
import API_URL from "../../utilities/Constants";
import classes from "./Autorization.module.css";

function RegisterForm() {
  const history = useHistory();

  const emailInputRef = useRef();
  const passwordInputRef= useRef();
  const password2InputRef= useRef();
  const nameInputRef = useRef();

  async function submitHandler(event) {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredName = nameInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    const enteredPassword2 = password2InputRef.current.value;
    if (enteredPassword !== enteredPassword2) {
      alert("Hasło musi być identyczne.");
      return;
    }

    try {
      const response = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        body: JSON.stringify({
          name: enteredName,
          email: enteredEmail,
          password: enteredPassword
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (!response.ok) {
        throw new Error('Nie udało się zarejestrować konta.');
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
      <h1>Rejestracja</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.emailInput}>
          <label htmlFor="email">Adres e-mail</label>
          <input type="email" id="email" required ref={emailInputRef} />
        </div>
        <div className={classes.nameInput}>
          <label htmlFor="name">Imię i nazwisko</label>
          <input type="text" id="name" required ref={nameInputRef} />
        </div>
        <div className={classes.passwordInput}>
          <label htmlFor="password">Hasło</label>
          <input type="password" id="password" required ref={passwordInputRef} />
        </div>
        <div className={classes.passwordInput}>
          <label htmlFor="password2">Powtórz hasło</label>
          <input type="password" id="password2" required ref={password2InputRef} />
        </div>
        <div className={classes.buttons}>
          <button className={classes.button} onSubmit={submitHandler}>Zarejestruj</button>
          <button className={classes.button} onClick={cancelHandler}>Anuluj</button>
        </div>
      </form>
    </section>
  );
}

export default RegisterForm;