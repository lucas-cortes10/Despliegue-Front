import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams, Link } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

const EditProveedores = () => {

    const numeroigual = ()=>toast.error("Número debe tener 10 Digitos");
    const solonumero = ()=>toast.error("Solo admite Numeros");
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
        name: '',
        email: '',
        telefono: '',
        servicios: ''
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
   
    const { id } = useParams();  

    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    
    const handleSubmit = (e) => {
        e.preventDefault();

        
        if (!formData.name || !formData.email || !formData.telefono || !formData.servicios) {
            setError('Todos los campos son obligatorios.');
            return;
        }

        if(formData.telefono.length < 10 || formData.telefono.length >= 11){
            numeroigual();
            return;
        }else if((/[^0-9]/g.test(formData.telefono))){
            solonumero();
            return;
        }

        
        axios.put(`${process.env.REACT_APP_API_URL}/api/v1/proveedores/proveedores/${id}`, formData)
            .then(response => {
                setSuccess('Proveedor actualizado con éxito!');
                setError('');
                setTimeout(() => {
                    navigate("/admin/proveedores"); 
                }, 2000);
            })
            .catch(error => {
                setError('Hubo un error al actualizar el proveedor. Intenta nuevamente.');
                setSuccess('');
            });
    };

    
    useEffect(() => {
        if (id) {
            axios.get(`http://localhost:8080/api/v1/proveedores/proveedores/${id}`)
                .then(response => {
                    setFormData(response.data);
                })
                .catch(error => {
                    setError('No se pudo cargar el proveedor.');
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
                        <Link to="/admin/proveedores">
                            <i className='bx bxs-shopping-bag-alt'></i>
                            <span className="text">Proveedores</span>
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
                        <a href="#" className="logout" onClick={() => {}}>
                            <i className='bx bxs-log-out-circle'></i>
                            <span className="text">Cerrar Sesión</span>
                        </a>
                    </li>
                </ul>
            </section>

            {/* CONTENT */}
            <section id="content">
                <main>
                    <div className="head-title">
                        <div className="left">
                            <h1>Editar Proveedor</h1>
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
                                    <a className="active" href="#">Editar Proveedor</a>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="table-data">
                        <div className="container-proveedores">
                            <h1>Editar Proveedor</h1>

                            {/* Mensajes de éxito y error */}
                            {success && <div className="alert alert-success">{success}</div>}
                            {error && <div className="alert alert-danger">{error}</div>}

                            {/* Formulario de edición */}
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
                                <button type="submit" className="btn btn-primary">Actualizar</button>
                            </form>
                        </div>
                    </div>
                </main>
            </section>
            < Toaster />
        </div>
    );
};

export default EditProveedores;
