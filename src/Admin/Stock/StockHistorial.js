import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

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
                setLoading(false);
            } catch (error) {
                console.error('Error al cargar el historial:', error);
                setError('Error al cargar el historial de cambios de stock');
                setLoading(false);
            }
        };
        
        fetchHistorial();
    }, []);
    
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleString();
    };
    
    return (
        <div className="ds-container">
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
                    <li>
                        <Link to="/admin/productos">
                            <i className='bx bxs-shopping-bag-alt'></i>
                            <span className="text">Productos</span>
                        </Link>
                    </li>
                    <li className="active">
                        <Link to="/admin/stockhistorial">
                            <i className='bx bx-history'></i>
                            <span className="text">Historial de Stock</span>
                        </Link>
                    </li>
                </ul>
            </section>

            <section id="content">
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
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Producto</th>
                                            <th>Stock Anterior</th>
                                            <th>Stock Nuevo</th>
                                            <th>Cambio</th>
                                            <th> Id Administrador</th>
                                            <th>Administrador</th>
                                            <th>Fecha y Hora</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {historial.length === 0 ? (
                                            <tr>
                                                <td colSpan="6" className="text-center">No hay registros de cambios de stock</td>
                                            </tr>
                                        ) : (
                                            historial.map(item => (
                                                <tr key={item.id}>
                                                    <td>{item.productoNombre}</td>
                                                    <td>{item.stockAnterior}</td>
                                                    <td>{item.stockNuevo}</td>
                                                    <td className={item.stockNuevo > item.stockAnterior ? 'text-success' : 'text-danger'}>
                                                        {item.stockNuevo > item.stockAnterior ? '+' : ''}{item.stockNuevo - item.stockAnterior}
                                                    </td>
                                                    <td>{item.administradorId}</td>
                                                    <td>{item.administradorCorreo}</td>
                                                    <td>{formatDate(item.fechaCambio)}</td>
                                                </tr>
                                            ))
                                        )}
                                    </tbody>
                                </table>
                            )}
                        </div>
                    </div>
                </main>
            </section>
        </div>
    );
};

export default StockHistorial;