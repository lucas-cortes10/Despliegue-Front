import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

const CreateProveedores = () => {
    const navigate = useNavigate();

    const numeroigual = () => toast.error("Número debe tener 10 Digitos");
    const solonumero = () => toast.error("Solo admite Numeros");

    const notificacionLogout = () => toast('Cerrando Sesion!', {
        icon: '🚪',
      });
    
      const logout = () => {
        // Eliminar Datos
        localStorage.removeItem("nombreUsuario");
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
    
        notificacionLogout();
    
        setTimeout(() => {
          navigate("/"); 
        }, 2000); 
    };

    useEffect(() => {
        const token = localStorage.getItem('token');
        const correoLogin = localStorage.getItem('correoLogin');

        if (!token || !correoLogin || !correoLogin.includes("adminCentury")) {
            navigate('/');
        }
    }, [navigate]);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        telefono: '',
        servicios: '',
    });

    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!formData.name || !formData.email || !formData.telefono || !formData.servicios) {
            setError('Todos los campos son obligatorios.');
            return;
        }

        if (formData.telefono.length < 10 || formData.telefono.length >= 11) {
            numeroigual();
            return;
        } else if ((/[^0-9]/g.test(formData.telefono))) {
            solonumero();
            return;
        }


        axios.post(`${process.env.REACT_APP_API_URL}/api/v1/proveedores/proveedores`, formData)


            .then(response => {
                setSuccess('Proveedor creado con éxito!');
                setError('');
                setFormData({ name: '', email: '', telefono: '', servicios: '' });
                setTimeout(() => {
                    navigate('/admin/proveedores');
                }, 500);
            })
            .catch(error => {
                setError('Hubo un error al crear el proveedor. Intenta nuevamente.');
                setSuccess('');
            });
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('correoLogin');
        alert("Cerrando sesión...");
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
                        <a href="#">
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
                    <li className="active">
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
                    <li>
                        <Link to="/admin/correos">
                            <i className='bx bxs-envelope'></i>
                            <span className="text">Correos</span>
                        </Link>
                    </li>
                </ul>
                <ul className="side-menu">
                    <li>
                        <a href="#" className="logout" onClick={logout}>
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
                            <h1>Crear Proveedor</h1>
                            <ul className="breadcrumb">
                                <li>
                                    <a href="#">Administrador</a>
                                </li>
                                <li><i className='bx bx-chevron-right'></i></li>
                                <li>
                                    <a href="#">Proveedores</a>
                                </li>
                                <li><i className='bx bx-chevron-right'></i></li>
                                <li>
                                    <a className="active" href="#">Crear Proveedor</a>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="table-data">
                        <div className="container-proveedores">
                            <h1>Registrar Nuevo Proveedor</h1>

                            {/* Avisos */}
                            {success && <div className="alert alert-success">{success}</div>}
                            {error && <div className="alert alert-danger">{error}</div>}

                            {/* Formulario */}
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="name" className="form-label">Nombre</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">Correo</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="telefono" className="form-label">Teléfono</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="telefono"
                                        name="telefono"
                                        value={formData.telefono}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="servicios" className="form-label">Servicios</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="servicios"
                                        name="servicios"
                                        value={formData.servicios}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <button type="submit" className="btn btn-primary">Guardar</button>
                            </form>
                        </div>
                    </div>
                </main>
            </section>
            <Toaster />
        </div>
    );
};

export default CreateProveedores;
