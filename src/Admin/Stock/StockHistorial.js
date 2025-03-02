import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import DataTable from 'react-data-table-component';

const StockHistorial = () => {
    const [historial, setHistorial] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        const correoLogin = localStorage.getItem('correoLogin');
        if (!token || !correoLogin || !correoLogin.includes("adminCentury")) {
            navigate('/');
        }
    }, [navigate]);

    useEffect(() => {
        const fetchHistorial = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/v1/stockhistorial`);
                setHistorial(response.data);
            } catch (error) {
                console.error('Error al cargar el historial:', error);
                setError('Error al cargar el historial de cambios de stock');
            } finally {
                setLoading(false);
            }
        };
        fetchHistorial();
    }, []);

    const logout = () => {
        localStorage.removeItem("nombreUsuario");
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        toast('Cerrando Sesión!', { icon: '🚪' });
        setTimeout(() => navigate("/"), 2000);
    };

    const formatDate = (dateString) => new Date(dateString).toLocaleString();

    const columns = [
        { name: "Producto", selector: row => row.productoNombre, sortable: true },
        { name: "Stock Anterior", selector: row => row.stockAnterior, sortable: true },
        { name: "Stock Nuevo", selector: row => row.stockNuevo, sortable: true },
        {
            name: "Cambio",
            selector: row => row.stockNuevo - row.stockAnterior,
            sortable: true,
            cell: row => (
                <span className={row.stockNuevo > row.stockAnterior ? 'text-success' : 'text-danger'}>
                    {row.stockNuevo > row.stockAnterior ? '+' : ''}{row.stockNuevo - row.stockAnterior}
                </span>
            )
        },
        { name: "ID Administrador", selector: row => row.administradorId, sortable: true },
        { name: "Administrador", selector: row => row.administradorCorreo, sortable: true },
        { name: "Fecha y Hora", selector: row => formatDate(row.fechaCambio), sortable: true }
    ];

    return (
        <div className="ds-container">
            {/* Sidebar */}
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
                    <li className="active">
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
                    <li >
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

            {/* Contenido */}
            <section id="content">
                {/* Navbar */}
                <nav>
                    <i className='bx bx-menu'></i>
                    <form action="#">
                        <div className="form-input">
                            <input type="search" placeholder="Búsqueda..." />
                            <button type="submit" className="search-btn"><i className='bx bx-search'></i></button>
                        </div>
                    </form>
                    <input type="checkbox" id="switch-mode" hidden />
                    <label htmlFor="switch-mode" className="switch-mode"></label>
                    <a href="#" className="notification"><i className='bx bxs-bell'></i></a>
                    <a href="#" className="profile">
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSk0BdVNH3bs3y3lMxPhbZXMJBhn2Qj5JCHXA&s" alt="foto" />
                    </a>
                </nav>

                {/* Contenido Principal */}
                <main>
                    <div className="head-title">
                        <div className="left">
                            <h1>Historial de Cambios de Stock</h1>
                        </div>
                    </div>

                    <div className="table-data">
                        <div className="order">
                            <div className="head">
                                <h3>Registro de Cambios</h3>
                            </div>
                            {loading ? (
                                <p>Cargando historial...</p>
                            ) : error ? (
                                <div className="alert alert-danger">{error}</div>
                            ) : (
                                <DataTable
                                    columns={columns}
                                    data={historial}
                                    pagination
                                    highlightOnHover
                                    striped
                                    responsive
                                />
                            )}
                        </div>
                    </div>
                </main>
            </section>
            <Toaster />
        </div>
    );
};

export default StockHistorial;
