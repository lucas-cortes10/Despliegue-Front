import React, { useState , useEffect } from 'react';
import emailjs from 'emailjs-com';
import { Link, useNavigate } from 'react-router-dom';

const EnviarCorreos = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        const correoLogin = localStorage.getItem('correoLogin'); 
       //Verifica si es admin o no
        if (!token || !correoLogin || !correoLogin.includes("adminCentury")) {
          navigate('/'); 
        }
      }, [navigate]);


    const [formData, setFormData] = useState({
        sendername: '',
        to: '',
        subject: '',
        replyto: '',
        message: ''
    });

    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [id]: value
        }));
    };

    const sendMail = (e) => {
        e.preventDefault();

        emailjs.init("vKHEVTg3jbWVr5Lkn");

        const params = {
            sendername: formData.sendername,
            to: formData.to,
            subject: formData.subject,
            replyto: formData.replyto,
            message: formData.message,
        };

        const serviceID = "service_f1x62jx";
        const templateID = "template_gqh1pzd";

        emailjs.send(serviceID, templateID, params)
            .then(res => {
                setSuccess('Correo enviado con éxito.');
                setError('');
                setFormData({
                    sendername: '',
                    to: '',
                    subject: '',
                    replyto: '',
                    message: ''
                });
            })
            .catch(err => {
                console.error(err);
                setError('Hubo un error al enviar el correo. Intenta nuevamente.');
                setSuccess('');
            });
    };

    return (
        <div className="ds-container">
            {/* SIDEBAR */}
            <section id="sidebar">
                <a href="#" className="brand">
                    <i className='bx bxs-face-mask'></i>
                    <span className="text">CENTURY</span>
                </a>
                <ul className="side-menu top">
                    <li >
                        <a href="/admin">
                            <i className='bx bxs-dashboard'></i>
                            <span className="text">Inicio</span>
                        </a>
                    </li>
                    <li>
                        <Link to="/admin/categorias">
                            <i className='bx bxs-shopping-bag-alt'></i>
                            <span className="text">Categorias</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/admin/productos">
                            <i className='bx bxs-doughnut-chart'></i>
                            <span className="text">Productos</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/admin/proveedores">
                            <i className='bx bxs-truck'></i>
                            <span className="text">Proveedores</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/admin/usuarios">
                            <i className='bx bxs-user-pin'></i>
                            <span className="text">Usuarios</span>
                        </Link>
                    </li>
                    <li className="active">
                        <Link to="/admin/correos">
                            <i className='bx bxs-envelope'></i>
                            <span className="text">Correos</span>
                        </Link>
                    </li>
                </ul>
                <ul className="side-menu">
                    <li>
                        <a href="#">
                            <i className='bx bxs-cog'></i>
                            <span className="text">Configuración</span>
                        </a>
                    </li>
                    <li>
                        <a href="#" className="logout">
                            <i className='bx bxs-log-out-circle'></i>
                            <span className="text">Cerrar Sesión</span>
                        </a>
                    </li>
                </ul>
            </section>

            <section id="content">
                {/* NAVBAR */}
                <nav>
                    <i className='bx bx-menu'></i>
                    <form action="#">
                        <div className="form-input">
                            <input type="search" placeholder="Buscar..." />
                            <button type="submit" className="search-btn"><i className='bx bx-search'></i></button>
                        </div>
                    </form>
                    <a href="#" className="notification">
                        <i className='bx bxs-bell'></i>
                    </a>
                    <a href="#" className="profile">
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSk0BdVNH3bs3y3lMxPhbZXMJBhn2Qj5JCHXA&s" alt="foto" />
                    </a>
                </nav>

                <main>
                    <div className="head-title">
                        <div className="left">
                            <h1>Enviar Correo</h1>
                            <ul className="breadcrumb">
                                <li>
                                    <a href="#">Administrador</a>
                                </li>
                                <li><i className='bx bx-chevron-right'></i></li>
                                <li>
                                    <a href="#">Correos</a>
                                </li>
                                <li><i className='bx bx-chevron-right'></i></li>
                                <li>
                                    <a className="active" href="#">Enviar Correo</a>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="table-data">
                        <div className="container-proveedores">
                            <h1>Formulario de Envío</h1>

                            {/* Avisos */}
                            {success && <div className="alert alert-success">{success}</div>}
                            {error && <div className="alert alert-danger">{error}</div>}

                            {/* Formulario */}
                            <form onSubmit={sendMail}>
                                <div className="mb-3">
                                    <label htmlFor="sendername" className="form-label">Quien Lo Envia</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="sendername"
                                        value={formData.sendername}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="to" className="form-label">Correo Destinatario</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        id="to"
                                        value={formData.to}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="subject" className="form-label">Asunto</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="subject"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="replyto" className="form-label">Responder a</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        id="replyto"
                                        value={formData.replyto}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="message" className="form-label">Mensaje</label>
                                    <textarea
                                        className="form-control"
                                        id="message"
                                        rows="5"
                                        value={formData.message}
                                        onChange={handleChange}
                                        required
                                    ></textarea>
                                </div>
                                <button type="submit" className="btn btn-primary">Enviar</button>
                            </form>
                        </div>
                    </div>
                </main>
            </section>
        </div>
    );
};

export default EnviarCorreos;
