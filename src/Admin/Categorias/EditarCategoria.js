import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams, Link } from 'react-router-dom';

const EditCategoria = () => {
    const [name, setName] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();
    const { id } = useParams();  

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

       
        if (!name) {
            setError('El nombre de la categoría es requerido.');
            return;
        }


        const categoryData = { name };


        axios.put(`${process.env.REACT_APP_API_URL}/api/v1/categorias/categorias/${id}`, categoryData)
            .then(response => {
                setSuccess('Categoría actualizada con éxito!');
                setError('');
                setTimeout(() => {
                    navigate("/admin/categorias"); 
                }, 2000);
            })
            .catch(error => {
                setError('Hubo un error al actualizar la categoría. Intenta nuevamente.');
                setSuccess('');
            });
    };

    
    useEffect(() => {
        if (id) {
            axios.get(`${process.env.REACT_APP_API_URL}/api/v1/categorias/categorias/${id}`)
                .then(response => {
                    setName(response.data.name); 
                })
                .catch(error => {
                    setError('No se pudo cargar la categoría.');
                });
        }
    }, [id]);

    return (
        <div className="ds-container">
            {/* SIDEBAR */}
            <section id="sidebar">
                <a href="#" className="brand">
                    <i className='bx bxs-face-mask'></i>
                    <span className="text">CENTURY</span>
                </a>
                <ul className="side-menu top">
                    <li>
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
                    {/* Otras rutas */}
                </ul>
                <ul className="side-menu">
                    <li>
                        <a href="#">
                            <i className='bx bxs-cog'></i>
                            <span className="text">Configuración</span>
                        </a>
                    </li>
                    <li>
                        <a href="#" className="logout" onClick={() => {}}>
                            <i className='bx bxs-log-out-circle'></i>
                            <span className="text">Cerrar Sesión</span>
                        </a>
                    </li>
                </ul>
            </section>

            {/* CONTENT */}
            <section id="content">
                <nav>
                    
                </nav>

                <main>
                    <div className="head-title">
                        <div className="left">
                            <h1>Editar Categoría</h1>
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
                                    <a className="active" href="#">Editar Categoría</a>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="table-data">
                        <div className="container-categorias">
                            <h1>Editar Categoría</h1>

                            {/* Mensajes de éxito y error */}
                            {success && <div className="alert alert-success">{success}</div>}
                            {error && <div className="alert alert-danger">{error}</div>}

                            {/* Formulario de edición */}
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
                                <button type="submit" className="btn btn-primary">Actualizar</button>
                            </form>
                        </div>
                    </div>
                </main>
            </section>
        </div>
    );
};

export default EditCategoria;
