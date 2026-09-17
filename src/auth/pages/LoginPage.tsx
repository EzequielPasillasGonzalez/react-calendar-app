import { useForm } from "@/hooks/index.ts";
import "./LoginPage.css";
import { useEffect, type SubmitEvent } from "react";
import { useAuthStore } from "@/store/index.ts";
import Swal from "sweetalert2";

const loginFormFields = {
  loginEmail: "",
  loginPassword: "",
};

const registerFormFields = {
  registerName: "",
  registerEmail: "",
  registerPassword: "",
  registerConfirmPassword: "",
};

export const LoginPage = () => {
  const {
    loginEmail,
    loginPassword,
    onInputChange: onLoginInputChange,
  } = useForm(loginFormFields);

  const {
    registerEmail,
    registerName,
    registerPassword,
    registerConfirmPassword,
    onInputChange: onRegisterInputChange,
  } = useForm(registerFormFields);

  const onStartLogin = useAuthStore((state) => state.onStartLogin);
  const onStartRegister = useAuthStore((state) => state.onStartRegister);
  const errorMessage = useAuthStore((state) => state.errorMessage);
  const onClearErrorMessage = useAuthStore(
    (state) => state.onClearErrorMessage,
  );

  const loginSubmit = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    onStartLogin(loginEmail, loginPassword);
  };

  const registerSubmit = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (registerPassword !== registerConfirmPassword) {
      Swal.fire("Error en registro", "Las contraseñas no coinciden", "error");
      return;
    }
    onStartRegister(registerName, registerEmail, registerPassword);
  };

  useEffect(() => {
    if (errorMessage !== null) {
      Swal.fire("Error en la autenticación", errorMessage, "error");
      onClearErrorMessage();
    }
  }, [errorMessage, onClearErrorMessage]);

  return (
    <div className="container login-container">
      <div className="row">
        <div className="col-md-6 login-form-1">
          <h3>Ingreso</h3>
          <form onSubmit={loginSubmit}>
            <div className="form-group mb-2">
              <input
                type="text"
                className="form-control"
                placeholder="Correo"
                name="loginEmail"
                value={loginEmail}
                onChange={onLoginInputChange}
              />
            </div>
            <div className="form-group mb-2">
              <input
                type="password"
                className="form-control"
                placeholder="Contraseña"
                name="loginPassword"
                value={loginPassword}
                onChange={onLoginInputChange}
              />
            </div>
            <div className="form-group mb-2">
              <input type="submit" className="btnSubmit" value="Login" />
            </div>
          </form>
        </div>

        <div className="col-md-6 login-form-2">
          <h3>Registro</h3>
          <form onSubmit={registerSubmit}>
            <div className="form-group mb-2">
              <input
                type="text"
                className="form-control"
                placeholder="Nombre"
                name="registerName"
                value={registerName}
                onChange={onRegisterInputChange}
              />
            </div>
            <div className="form-group mb-2">
              <input
                type="email"
                className="form-control"
                placeholder="Correo"
                name="registerEmail"
                value={registerEmail}
                onChange={onRegisterInputChange}
              />
            </div>
            <div className="form-group mb-2">
              <input
                type="password"
                className="form-control"
                placeholder="Contraseña"
                name="registerPassword"
                value={registerPassword}
                onChange={onRegisterInputChange}
              />
            </div>

            <div className="form-group mb-2">
              <input
                type="password"
                className="form-control"
                placeholder="Repita la contraseña"
                name="registerConfirmPassword"
                value={registerConfirmPassword}
                onChange={onRegisterInputChange}
              />
            </div>

            <div className="form-group mb-2">
              <input type="submit" className="btnSubmit" value="Crear cuenta" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
