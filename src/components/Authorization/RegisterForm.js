import { useRef } from "react";
import { useHistory } from "react-router-dom";
import API_URL from "../../utilities/Constants";

function RegisterForm() {
  const history = useHistory();

  const emailInputRef = useRef();
  const passwordInputRef= useRef();
  const nameInputRef = useRef();

  async function submitHandler(event) {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredName = nameInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

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
    <section>
      <h1>Rejestracja</h1>
      <form onSubmit={submitHandler}>
        <div>
          <label htmlFor="email">Adres e-mail</label>
          <input type="email" id="email" required ref={emailInputRef} />
        </div>
        <div>
          <label htmlFor="name">Imię i nazwisko</label>
          <input type="text" id="name" required ref={nameInputRef} />
        </div>
        <div>
          <label htmlFor="password">Hasło</label>
          <input type="password" id="password" required ref={passwordInputRef} />
        </div>
        <button onSubmit={submitHandler}>Zarejestruj</button>
        <button onClick={cancelHandler}>Anuluj</button>
      </form>
    </section>
  );
}

export default RegisterForm;