import React, { useRef, useEffect, useState } from "react";
import UsuarioService from "../services/UsuarioService";
import { useNavigate } from "react-router-dom";
import emailjs from "emailjs-com";
import toast, { Toaster } from 'react-hot-toast';
import '../registro.css';

const Registro = () => {

  const navigate = useNavigate();

  useEffect(() => {
        const token = localStorage.getItem('token');
        const correoLogin = localStorage.getItem('correoLogin'); 
        if (!token || !correoLogin) {
          navigate('/registro'); 
        }else{
          navigate('/usuario/inicio');
        }
      }, [navigate]);


  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
 

  const notificacionRegistroExitoso = () => toast.success('Registrado Con Exito.');  
  const notificacionLoginExitoso = () => toast.success('Inicio de Sesión Exitoso.');

  const notificacionNombreObligatorio = () => toast.error('El nombre es obligatorio.');

  const notificacionCorreoObligatorio = () => toast.error('El correo electrónico es obligatorio.');
  const notificacionCorreoInvalido = () => toast.error('El correo electrónico no es válido.');

  const notificacionContraseñaObligatoria = () => toast.error('La contraseña es obligatoria.');
  const notificacionContraseñaCorta = () => toast.error('La contraseña debe tener al menos 6 caracteres.');


  const [correoLogin, setCorreoLogin] = useState("");
  const [passwordLogin, setPasswordLogin] = useState("");

  // Validaciones 
  
  const validacionRegistro = () => {
    let tempErrors = {};

    if (!nombre) {
      notificacionNombreObligatorio();
      tempErrors.nombre = "El nombre es obligatorio.";
    } else if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(nombre)) {
      tempErrors.nombre = "El nombre solo puede contener letras y espacios.";
    }

    if (!correo) {
      notificacionCorreoObligatorio();
      tempErrors.correo = "El correo electrónico es obligatorio.";
    } else if (!/\S+@\S+\.\S+/.test(correo)) {
      tempErrors.correo = "El correo electrónico no es válido.";
      notificacionCorreoInvalido();
    }

    if (!password) {
      tempErrors.password = "La contraseña es obligatoria.";
      notificacionContraseñaObligatoria();
    } else if (password.length < 6) {
      notificacionContraseñaCorta();
      tempErrors.password = "La contraseña debe tener al menos 6 caracteres.";
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const validacionIniciosesion = () => {
    let tempErrors = {};
    if (!correoLogin) {
      notificacionCorreoObligatorio();
      tempErrors.correoLogin = "El correo electrónico es obligatorio.";
    } else if (!/\S+@\S+\.\S+/.test(correoLogin)) {
      notificacionCorreoInvalido();
      tempErrors.correoLogin = "El correo electrónico no es válido.";
    }
    if (!passwordLogin) {
      notificacionContraseñaObligatoria();
      tempErrors.passwordLogin = "La contraseña es obligatoria.";
    }else if (passwordLogin.length < 6) {
      notificacionContraseñaCorta();
      tempErrors.passwordLogin = "La contraseña debe tener al menos 6 caracteres.";
    }
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  // Correo
  const enviarEmail = (usuario) => {
    const templateParams = {
      sendername: usuario.nombre,
      to: usuario.correo,
      subject: "¡Bienvenido a CenturyTech!",
      message: "Gracias por registrarte. Ahora puedes comprar los mejores componentes de hardware.",
    };

    emailjs
      .send(
        "service_f1x62jx",
        "template_7mipcpf",
        templateParams,
        "vKHEVTg3jbWVr5Lkn"
      )
      .then(
        (response) => {
          console.log("Correo enviado exitosamente:", response.status, response.text);
        },
        (error) => {
          console.error("Error al enviar el correo:", error);
        }
      );
  };

  // Inicio de sesión
  const loginUsuario = (e) => {
    e.preventDefault();
    if (validacionIniciosesion()) {
      const usuarioLogin = { correo: correoLogin, password: passwordLogin };
      UsuarioService.loginUsuario(usuarioLogin)
        .then((response) => {
          notificacionLoginExitoso();
          console.log("Login exitoso:", response.data);

          localStorage.setItem("nombreUsuario", response.data.nombre);
          localStorage.setItem("userId", response.data.userId);


          localStorage.setItem("token", response.data.token);
          localStorage.setItem("correoLogin", correoLogin);

          setTimeout(() => {
            if (correoLogin.includes("adminCentury")) {
              navigate("/admin");
            } else {
              navigate("/usuario/inicio");
            }
          }, 1000);
        })
        .catch((error) => {
          console.error("Error de autenticación:", error);
        });
    }
  };

  // Registro
  const saveUsuario = (e) => {
    e.preventDefault();
    if (validacionRegistro()) {
      const usuario = { nombre, correo, password };
      UsuarioService.saveUsuario(usuario)
        .then((response) => {
          console.log("Usuario registrado:", response.data);
          
          // Enviar email de bienvenida
          enviarEmail(usuario);
  
          // Limpiar formulario
          setNombre("");
          setCorreo("");
          setPassword("");
  
          notificacionRegistroExitoso(); 
  
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        })
        .catch((error) => {
          console.log("Error al registrar usuario:", error);
          // Verificar si es un error de correo duplicado
          if (error.response && error.response.status === 400) {
            toast.error('Este correo electrónico ya está registrado');
            setErrors(prev => ({
              ...prev,
              correo: "Este correo electrónico ya está registrado"
            }));
          } else {
            
            toast.error('Error al registrar el usuario');
          }
        });
    }
  };

  // Manejo de formularios
  const containerRef = useRef(null);
  const signUpButtonRef = useRef(null);
  const signInButtonRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const signUpButton = signUpButtonRef.current;
    const signInButton = signInButtonRef.current;

    const handleSignUpClick = () => {
      container.classList.add("panel-derecho-activo");
    };

    const handleSignInClick = () => {
      container.classList.remove("panel-derecho-activo");
    };

    signUpButton.addEventListener("click", handleSignUpClick);
    signInButton.addEventListener("click", handleSignInClick);

    return () => {
      signUpButton.removeEventListener("click", handleSignUpClick);
      signInButton.removeEventListener("click", handleSignInClick);
    };
  }, []);

  return (
    <div className="login-cuerpo">
      <div className="login-contenedor" ref={containerRef}>
        {/* Contenedor de Registro */}
        <div className="login-contenedor-formulario login-contenedor-registrarse">
          <form className="login-formulario" onSubmit={saveUsuario}>
            <h1 className="login-titulo-1">Crear Cuenta</h1>
            <input
              type="text"
              className="login-input"
              min={6}
              max={20}
              placeholder="Nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />
            {errors.nombre && <span className="error">{errors.nombre}</span>}
            <input
              type="email"
              className="login-input"
              placeholder="Correo Electrónico"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
            />
            {errors.correo && <span className="error">{errors.correo}</span>}
            <input
              type="password"
              className="login-input"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {errors.password && <span className="error">{errors.password}</span>}
            <button type="submit" className="login-boton">Registrarse</button>
          </form>
        </div>

        {/* Contenedor de Inicio de Sesión */}
        <div className="login-contenedor-formulario login-contenedor-iniciar">
          <form className="login-formulario" onSubmit={loginUsuario}>
            <h1 className="login-titulo-1">Iniciar Sesión</h1>
            <input
              type="email"
              className="login-input"
              placeholder="Correo Electrónico"
              value={correoLogin}
              onChange={(e) => setCorreoLogin(e.target.value)}
            />
            {errors.correoLogin && <span className="error">{errors.correoLogin}</span>}
            <input
              type="password"
              className="login-input"
              placeholder="Contraseña"
              value={passwordLogin}
              onChange={(e) => setPasswordLogin(e.target.value)}
            />
            {errors.passwordLogin && <span className="error">{errors.passwordLogin}</span>}
            <button type="submit" className="login-boton">Iniciar Sesión</button>
            <a href="/recuperar-contraseña" className="login-enlace">
              ¿Olvidaste tu contraseña?
            </a>
          </form>
        </div>

        {/* Contenedor del Overlay */}
        <div className="login-contenedor-overlay">
          <div className="login-overlay">
            <div className="login-panel-overlay login-overlay-izquierdo">
              <h1 className="login-titulo-1">¡Bienvenido!</h1>
              <p className="login-parrafo">
                Inicia Sesion , para poder Comprar en nuestra Web
              </p>
              <button className="login-boton login-boton-fantasma" ref={signInButtonRef}>
                Iniciar Sesión
              </button>
            </div>
            <div className="login-panel-overlay login-overlay-derecho">
              <h1 className="login-titulo-1">¡Hola, Amigo!</h1>
              <p className="login-parrafo">
                Ingresa tus datos personales y comienza tu viaje con nosotros
              </p>
              <button className="login-boton login-boton-fantasma" ref={signUpButtonRef}>
                Registrarse
              </button>
            </div>
          </div>
        </div>
      </div>

      
      <Toaster />
    </div>
  );
};

export default Registro;
