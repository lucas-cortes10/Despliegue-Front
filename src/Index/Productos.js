import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

// Componente de Filtros
const Filtros = ({ 
    busqueda, 
    setBusqueda, 
    categoriaId, 
    setCategoriaId, 
    ordenamiento, 
    setOrdenamiento,
    precioMinimo,
    setPrecioMinimo,
    precioMaximo,
    setPrecioMaximo,
    limpiarFiltros
}) => {
    const [categorias, setCategorias] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_API_URL}/api/v1/categorias/categorias`)
            .then((response) => {
                setCategorias(response.data);
            })
            .catch((error) => {
                setError('Error al cargar las categorías.');
            });
    }, []);

    return (
        <div className="container">
            <div className="row g-3 contenedor-filtros">
                <div className="col-12 col-md-4">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Buscar productos..."
                        value={busqueda}
                        onChange={(e) => setBusqueda(e.target.value)}
                    />
                </div>

                <div className="col-12 col-md-4">
                    <select
                        className="form-select"
                        value={categoriaId}
                        onChange={(e) => setCategoriaId(e.target.value)}
                    >
                        <option value="">Seleccionar categoría</option>
                        {categorias.map((categoria) => (
                            <option key={categoria.categoriaId} value={categoria.categoriaId}>
                                {categoria.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="col-12 col-md-4">
                    <select
                        className="form-select"
                        value={ordenamiento}
                        onChange={(e) => setOrdenamiento(e.target.value)}
                    >
                        <option value="">Ordenar por...</option>
                        <option value="precio-asc">Precio: Menor a Mayor</option>
                        <option value="precio-desc">Precio: Mayor a Menor</option>
                        <option value="nombre-asc">Nombre: A-Z</option>
                        <option value="nombre-desc">Nombre: Z-A</option>
                    </select>
                </div>

                <div className="col-12 col-md-4">
                    <input
                        type="number"
                        className="form-control"
                        placeholder="Precio mínimo"
                        value={precioMinimo}
                        onChange={(e) => setPrecioMinimo(e.target.value)}
                    />
                </div>

                <div className="col-12 col-md-4">
                    <input
                        type="number"
                        className="form-control"
                        placeholder="Precio máximo"
                        value={precioMaximo}
                        onChange={(e) => setPrecioMaximo(e.target.value)}
                    />
                </div>

                <div className="col-12 col-md-4">
                    <button 
                        className="btn btn-secondary w-100"
                        onClick={limpiarFiltros}
                    >
                        Limpiar filtros
                    </button>
                </div>
            </div>
        </div>
    );
};

const ProductosUser = () => {
    const [productos, setProductos] = useState([]);
    const [productosFiltrados, setProductosFiltrados] = useState([]);
    const [error, setError] = useState(null);
    const [carrito, setCarrito] = useState([]);
    const [busqueda, setBusqueda] = useState('');
    const [categoriaId, setCategoriaId] = useState('');
    const [ordenamiento, setOrdenamiento] = useState('');
    const [precioMinimo, setPrecioMinimo] = useState('');
    const [precioMaximo, setPrecioMaximo] = useState('');
    
    const nombreUsuario = localStorage.getItem("nombreUsuario");
    const navigate = useNavigate();

    // Verificación de autenticación
    useEffect(() => {
        const token = localStorage.getItem('token');
        const correoLogin = localStorage.getItem('correoLogin');
        if (!token || !correoLogin) {
            navigate('/registro');
        }
    }, [navigate]);

    // Cargar productos
    useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_API_URL}/api/v1/productos`)
            .then((response) => {
                const productosActivos = response.data.filter(producto => producto.estado === true);
                setProductos(productosActivos);
                setProductosFiltrados(productosActivos);
            })
            .catch((error) => {
                setError('Error al cargar los productos o no hay productos registrados.');
            });
    }, []);

    const limpiarFiltros = () => {
        setBusqueda('');
        setCategoriaId('');
        setOrdenamiento('');
        setPrecioMinimo('');
        setPrecioMaximo('');
        setProductosFiltrados(productos);
    };

    // Aplicar filtros
    useEffect(() => {
        let resultados = [...productos];

        // Filtro de búsqueda
        if (busqueda) {
            resultados = resultados.filter(producto =>
                producto.name.toLowerCase().includes(busqueda.toLowerCase()) ||
                producto.descripcion.toLowerCase().includes(busqueda.toLowerCase())
            );
        }

        // Filtro de categoría
        if (categoriaId) {
            resultados = resultados.filter(producto => 
                String(producto.categoriaId) === String(categoriaId)
            );
        }

        // Filtro de precio mínimo
        if (precioMinimo) {
            resultados = resultados.filter(producto => 
                producto.precio >= parseFloat(precioMinimo)
            );
        }

        // Filtro de precio máximo
        if (precioMaximo) {
            resultados = resultados.filter(producto => 
                producto.precio <= parseFloat(precioMaximo)
            );
        }

        // Ordenamiento
        switch (ordenamiento) {
            case 'precio-asc':
                resultados.sort((a, b) => a.precio - b.precio);
                break;
            case 'precio-desc':
                resultados.sort((a, b) => b.precio - a.precio);
                break;
            case 'nombre-asc':
                resultados.sort((a, b) => a.name.localeCompare(b.name));
                break;
            case 'nombre-desc':
                resultados.sort((a, b) => b.name.localeCompare(a.name));
                break;
            default:
                break;
        }

        setProductosFiltrados(resultados);
    }, [busqueda, categoriaId, ordenamiento, precioMinimo, precioMaximo, productos]);

    // Cargar carrito desde localStorage
    useEffect(() => {
        const carritoGuardado = JSON.parse(localStorage.getItem('carrito')) || [];
        setCarrito(carritoGuardado);
    }, []);

    const agregarAlCarrito = (producto) => {
        setCarrito((prevCarrito) => {
            const productoExistente = prevCarrito.find((item) => item.id === producto.id);
            let nuevoCarrito;
            
            if (productoExistente) {
                nuevoCarrito = prevCarrito.map((item) =>
                    item.id === producto.id
                        ? { ...item, cantidad: item.cantidad + 1 }
                        : item
                );
            } else {
                nuevoCarrito = [...prevCarrito, { ...producto, cantidad: 1 }];
            }

            localStorage.setItem('carrito', JSON.stringify(nuevoCarrito));
            return nuevoCarrito;
        });
    };

    const navegarAlCarrito = () => {
        localStorage.setItem('carrito', JSON.stringify(carrito));
        window.location.href = '/compra';
    };

    return (
        <div>
            <nav className="navbar navbar-expand-lg fixed-top">
                <div className="container-fluid">
                    <a className="navbar-brand me-auto logoa" href="#">
                        <img src="../img/5.png" alt="" className="logopag" />
                    </a>
                    <div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
                        <div className="offcanvas-header">
                            <h5 className="offcanvas-title" id="offcanvasNavbarLabel">Menu</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                        </div>
                        <div className="offcanvas-body">
                            <ul className="navbar-nav justify-content-center flex-grow-1 pe-3">
                                <li className="nav-item">
                                    <a className="nav-link" aria-current="page" href="/usuario/inicio">Inicio</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link active mx-lg-2" href="/usuario/productos">Productos</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link mx-lg-2" href="#">Nosotros</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link mx-lg-2" href="/usuario/inicio">Marcas</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link mx-lg-2" href="/usuario/compra" onClick={navegarAlCarrito}>
                                        <i className="fa-solid fa-cart-shopping"></i>
                                        <span className="badge bg-danger">
                                            {carrito.reduce((total, item) => total + item.cantidad, 0)}
                                        </span>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <a href="" className="boton-login">{nombreUsuario}</a>
                    <button 
                        className="navbar-toggler pe-0" 
                        type="button" 
                        data-bs-toggle="offcanvas" 
                        data-bs-target="#offcanvasNavbar" 
                        aria-controls="offcanvasNavbar" 
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                </div>
            </nav>

            <div style={{ paddingTop: '180px' }}>
                <div className="container">
                    <h2 className="mb-4">Productos Disponibles</h2>

                    <div className="mb-4">
                        <Filtros
                            busqueda={busqueda}
                            setBusqueda={setBusqueda}
                            categoriaId={categoriaId}
                            setCategoriaId={setCategoriaId}
                            ordenamiento={ordenamiento}
                            setOrdenamiento={setOrdenamiento}
                            precioMinimo={precioMinimo}
                            setPrecioMinimo={setPrecioMinimo}
                            precioMaximo={precioMaximo}
                            setPrecioMaximo={setPrecioMaximo}
                            limpiarFiltros={limpiarFiltros}
                        />
                    </div>

                    <div className="row">
                        {productosFiltrados.map((producto) => (
                            <div className="col-12 col-md-6 col-lg-4 mb-4" key={producto.id}>
                                <div className="card shadow">
                                    <img
                                        src={producto.imagen}
                                        className="card-img-top"
                                        alt={producto.name}
                                        width="289px"
                                        height="311px"
                                    />
                                    <div className="card-footer border-top border-gray-300 p-4">
                                        <a href="#" className="h5">{producto.name}</a>
                                        <h3 className="h6 fw-light text-gray mt-2">
                                            {producto.descripcion}
                                        </h3>
                                        <div className="d-flex mt-3">
                                            <span className="star fas fa-star text-warning me-1"></span>
                                            <span className="star fas fa-star text-warning me-1"></span>
                                            <span className="star fas fa-star text-warning me-1"></span>
                                            <span className="star fas fa-star text-warning me-1"></span>
                                            <span className="star fas fa-star text-warning"></span>
                                            <span className="badge ms-2">4.5</span>

                                            <span className='ms-5'>Stock:</span>
                                            <span className='fw-bold ms-2'>{producto.stock}</span>
                                        </div>
                                        <div className="d-flex justify-content-between align-items-center mt-3">
                                            <span className="h5 mb-0 text-gray">
                                                ${producto.precio.toLocaleString()}
                                            </span>
                                            <button
                                                className="btn btn-xs btn-tertiary add"
                                                onClick={() => agregarAlCarrito(producto)}
                                            >
                                                <span className="fas fa-cart-plus me-2"></span> Agregar al Carrito
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductosUser;