import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Compra = () => {
    const [carrito, setCarrito] = useState([]);
    const [total, setTotal] = useState(0);
    const [stock, setStock] = useState({});
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        const correoLogin = localStorage.getItem('correoLogin'); 
        if (!token || !correoLogin) {
            navigate('/registro'); 
        } else {
            navigate('');
        }
    }, [navigate]);

    useEffect(() => {
        // Cargar carrito desde localStorage
        const carritoGuardado = localStorage.getItem('carrito');
        try {
            const carritoInicial = carritoGuardado ? JSON.parse(carritoGuardado) : [];
            setCarrito(carritoInicial);
        } catch (error) {
            console.error('Error al cargar el carrito:', error);
            setCarrito([]);
        }

        // Obtener stock de productos
        axios.get(`${process.env.REACT_APP_API_URL}/api/v1/productos`)
            .then(response => {
                const stockData = {};
                response.data.forEach(producto => {
                    stockData[producto.id] = producto.stock;
                });
                setStock(stockData);
            })
            .catch(error => {
                console.error('Error al obtener stock:', error);
                alert('Error al cargar el stock de productos');
            });
    }, []);

    // Actualizar total cuando cambia el carrito
    useEffect(() => {
        const nuevoTotal = carrito.reduce(
            (acc, producto) => acc + producto.precio * producto.cantidad,
            0
        );
        setTotal(nuevoTotal);
    }, [carrito]);

    const incrementarCantidad = (id) => {
        const nuevoCarrito = carrito.map((producto) => {
            if (producto.id === id) {
                const stockDisponible = stock[id] || 0;
                if (producto.cantidad < stockDisponible) {
                    return { ...producto, cantidad: producto.cantidad + 1 };
                }
            }
            return producto;
        });
        actualizarCarrito(nuevoCarrito);
    };

    const decrementarCantidad = (id) => {
        const nuevoCarrito = carrito.map((producto) => {
            if (producto.id === id && producto.cantidad > 1) {
                return { ...producto, cantidad: producto.cantidad - 1 };
            }
            return producto;
        });
        actualizarCarrito(nuevoCarrito);
    };

    const eliminarProducto = (id) => {
        const nuevoCarrito = carrito.filter((producto) => producto.id !== id);
        actualizarCarrito(nuevoCarrito);
    };

    const actualizarCarrito = (nuevoCarrito) => {
        setCarrito(nuevoCarrito);
        localStorage.setItem('carrito', JSON.stringify(nuevoCarrito));
    };

    const iniciarProcesoCompra = () => {
        setLoading(true);
        
        const correo = localStorage.getItem('correoLogin');
        
        
        axios.post(`${process.env.REACT_APP_API_URL}/api/v1/mercadopago/crear-preferencia`, {
            correo: correo,
            total: total
        })
        .then(response => {
            console.log("Preferencia creada correctamente:", response.data);
            
            if (response.data && response.data.init_point) {
                localStorage.removeItem('carrito');
                setCarrito([]);
                window.location.href = response.data.init_point;
            } else {
                setLoading(false);
                alert("Error: No se recibió el enlace de pago. Contacte al administrador.");
                console.error("Respuesta sin init_point:", response.data);
            }
        })
        .catch(error => {
            setLoading(false);
            console.error("Error al crear preferencia de pago:", error);
            alert("Error al procesar el pago. Intenta nuevamente.");
        });
    };
    

    return (
        <div className="container mt-5">
            <h2>Carrito de Compras</h2>
            {carrito.length === 0 ? (
                <div>
                    <p>Tu carrito está vacío</p>
                    <button 
                        className="btn btn-primary"
                        onClick={() => navigate('/usuario/productos')}
                    >
                        Ver Productos
                    </button>
                </div>
            ) : (
                <div>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Producto</th>
                                <th>Imagen</th>
                                <th>Precio</th>
                                <th>Cantidad</th>
                                <th>Total</th>
                                <th>Stock</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {carrito.map((producto) => (
                                <tr key={producto.id}>
                                    <td>{producto.name}</td>
                                    <td>
                                        <img 
                                            src={producto.imagen} 
                                            alt={producto.name} 
                                            width="50"
                                            onError={(e) => {
                                                e.target.onerror = null;
                                                e.target.src = '/placeholder-image.jpg';
                                            }}
                                        />
                                    </td>
                                    <td>${producto.precio.toLocaleString()}</td>
                                    <td>
                                        <button
                                            className="btn btn-sm btn-secondary me-2"
                                            onClick={() => decrementarCantidad(producto.id)}
                                            disabled={producto.cantidad <= 1}
                                        >
                                            -
                                        </button>
                                        {producto.cantidad}
                                        <button
                                            className="btn btn-sm btn-secondary ms-2"
                                            onClick={() => incrementarCantidad(producto.id)}
                                            disabled={producto.cantidad >= (stock[producto.id] || 0)}
                                        >
                                            +
                                        </button>
                                    </td>
                                    <td>${(producto.precio * producto.cantidad).toLocaleString()}</td>
                                    <td>{stock[producto.id] || 0}</td>
                                    <td>
                                        <button
                                            className="btn btn-sm btn-danger"
                                            onClick={() => eliminarProducto(producto.id)}
                                        >
                                            Eliminar
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="row mt-4">
                        <div className="col-6">
                            <button
                                className="btn btn-secondary"
                                onClick={() => navigate('/usuario/productos')}
                            >
                                Seguir Comprando
                            </button>
                        </div>
                        <div className="col-6 text-end">
                            <h4>Total: ${total.toLocaleString()}</h4>
                            <button
                                className="btn btn-primary"
                                onClick={iniciarProcesoCompra}
                                disabled={loading}
                            >
                                <img src='https://i0.wp.com/www.academiadeinglesdelnorte.com/wp-content/uploads/2024/09/Mercado-Pago.png?fit=300%2C218&ssl=1' height={30}></img>
                                {loading ? 'Procesando...' : 'Pagar con Mercado Pago'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Compra;