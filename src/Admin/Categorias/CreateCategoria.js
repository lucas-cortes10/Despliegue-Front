import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate, Link } from 'react-router-dom';

const CreateCategoria = () => {
    const [name, setName] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    const notificacionNombreObligatorio = () => toast.error('El nombre de la categoría es requerido.');
    const notificacionSololetras = () => toast.error('El nombre de la categoría solo puede contener letras.');
    const notificacionExitoso = () => toast.success('Categoría creada exitosamente.');
    const mayora = () => toast.error('La categoria debe tener más de 4 caracteres');

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
        //Verifica si es admin o no
        if (!token || !correoLogin || !correoLogin.includes("adminCentury")) {
            navigate('/');
        }
    }, [navigate]);


    const handleChange = (e) => {
        setName(e.target.value);
    };


    const handleSubmit = (e) => {
        e.preventDefault();

        let tempErrors = {};
        if (!name) {
            return notificacionNombreObligatorio();
        } else if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(name)) {
            return notificacionSololetras();
        } else if (name.length < 5) {
            mayora();
            return;
        }


        axios.post(`${process.env.REACT_APP_API_URL}/api/v1/categorias/categorias`, { name })
            .then(response => {
                notificacionExitoso();
                setError('');
                setName('');
                setTimeout(() => {
                    navigate("/admin/categorias");
                }, 1000);
            })
            .catch(error => {
                setError('Hubo un error al crear la categoría. Intenta nuevamente.');
                setSuccess('');
            });
    };

    return (
        <div className="ds-container">
            {/* SIDEBAR */}
            <section id="sidebar" >
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
                    <li className="active">
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
                            <input type="search" placeholder="Busqueda..." />
                            <button type="submit" className="search-btn"><i className='bx bx-search'></i></button>
                        </div>
                    </form>
                    <input type="checkbox" id="switch-mode" hidden />
                    <label htmlFor="switch-mode" className="switch-mode"></label>
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
                            <h1>Crear Categoría</h1>
                            <ul className="breadcrumb">
                                <li>
                                    <a href="#">Administrador</a>
                                </li>
                                <li><i className='bx bx-chevron-right'></i></li>
                                <li>
                                    <a href="#">Categorias</a>
                                </li>
                                <li><i className='bx bx-chevron-right'></i></li>
                                <li>
                                    <a className="active" href="#">Crear Categoría</a>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="table-data">
                        <div className="container-categorias">
                            <h1>Crear Nueva Categoría</h1>

                            {/* Aviso */}
                            {success && <div className="alert alert-success">{success}</div>}
                            {error && <div className="alert alert-danger">{error}</div>}

                            {/* Formu*/}
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="name" className="form-label">Nombre de la Categoría</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="name"
                                        name="name"
                                        value={name}
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

export default CreateCategoria;
