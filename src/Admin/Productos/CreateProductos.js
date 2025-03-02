import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

const API_URL = `${process.env.REACT_APP_API_URL}/api/v1/productos`;
const CATEGORIAS_URL = `${process.env.REACT_APP_API_URL}/api/v1/categorias/categorias`;
const PROVEEDORES_URL = `${process.env.REACT_APP_API_URL}/api/v1/proveedores/proveedores`;

const CrearProducto = () => {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [imagen, setImagen] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [stock, setStock] = useState('');
    const [precio, setPrecio] = useState('');
    const [categoriaId, setCategoriaId] = useState('');
    const [proveedorId, setProveedorId] = useState('');

    const [categorias, setCategorias] = useState([]);
    const [proveedores, setProveedores] = useState([]);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
   
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

    const nombreobligarotio = () => toast.error('El nombre es obligatorio');
    const nombreInvalido = () => toast.error('El nombre solo puede contener letras, números y espacios');
    const nombreCorto = () => toast.error('El nombre tiene que tener mas de 4 caracteres');

    const imagenObligatoria = () => toast.error('La imagen es obligatoria');
    const imagenInvalida = () => toast.error('El URL de la imagen debe ser un enlace válido ');

    const descripcionObligatoria = () => toast.error('La descripción es obligatoria');
    const descripcionInvalida = () => toast.error('La descripción debe tener entre 10 y 300 caracteres');

    const stockObligatorio = () => toast.error('El stock es obligatorio');
    const stockDecimal = () => toast.error('El stock debe ser un número entero');
    const stockNegativo = () => toast.error('El stock no puede ser negativo');

    const precioObligatorio = () => toast.error('El precio es obligatorio');
    const precioMayor = () => toast.error('El precio debe ser mayor 10.000');
    const precioNegativo = () => toast.error('El precio no puede ser negativo');

    const productoActualizado = (nombre, nuevoStock) => toast.success(`El producto "${nombre}" ya existe. No fue creado, pero se actualizó su stock a ${nuevoStock} unidades.`);
    const productoCreado = (nombre) => toast.success(`Producto "${nombre}" creado exitosamente`);

    useEffect(() => {
        const token = localStorage.getItem('token');
        const correoLogin = localStorage.getItem('correoLogin');
        //Verifica si es admin o no
        if (!token || !correoLogin || !correoLogin.includes("adminCentury")) {
            navigate('/');
        }
    }, [navigate]);

    useEffect(() => {
        axios.get(CATEGORIAS_URL)
            .then(response => {
                setCategorias(response.data);
            })
            .catch(error => {
                console.error('Error al cargar las categorías:', error);
            });
    }, []);

    useEffect(() => {
        axios.get(PROVEEDORES_URL)
            .then(response => {
                setProveedores(response.data);
            })
            .catch(error => {
                console.error('Error al cargar los proveedores:', error);
            });
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Validaciones
        if (!name || name.trim().length === 0) {
            nombreobligarotio();
            return;
        } else if (name.length < 4) {
            nombreCorto();
            return;
        } else if (!/^[a-zA-Z0-9 ]+$/.test(name)) {
            nombreInvalido();
            return;
        }

        if (!imagen || imagen.trim().length === 0) {
            imagenObligatoria();
            return;
        } else if (!/^https:\/\/.+/i.test(imagen)) {
            imagenInvalida();
            return;
        }

        if (!descripcion || descripcion.trim().length === 0) {
            descripcionObligatoria();
            return;
        } else if (descripcion.length < 10 || descripcion.length > 300) {
            descripcionInvalida();
            return;
        }

        if (!stock) {
            stockObligatorio();
            return;
        } else if (isNaN(stock) || parseInt(stock) <= 0) {
            stockNegativo();
            return;
        } else if (!Number.isInteger(parseFloat(stock))) {
            stockDecimal();
            return;
        }

        if (!precio) {
            precioObligatorio();
            return;
        } else if (isNaN(precio) || parseFloat(precio) <= 0) {
            precioNegativo();
            return;
        } else if (parseFloat(precio) < 10000) {
            precioMayor();
            return;
        }

        try {
            // Verificamos producto , categoria y proveedor
            const response = await axios.get(`${API_URL}`);
            const productos = response.data;


            // Buscar un producto existente que coincida
            const productoExistente = productos.find(p => {
                console.log("Comparando producto:", p);
                console.log("Nombre coincide:", p.name === name);
                console.log("Categoría actual:", p.categoria);
                console.log("Proveedor actual:", p.proveedores);

                return p.name === name &&
                    p.categoria && p.categoria.categoriaId === parseInt(categoriaId) &&
                    p.proveedores && p.proveedores.proveedorId === parseInt(proveedorId);
            });

            console.log("Producto existente encontrado:", productoExistente);

            if (productoExistente) {

                console.log("Estructura del producto encontrado:", JSON.stringify(productoExistente, null, 2));

                // Sumar el stock actual con el nuevo
                const nuevoStock = parseInt(productoExistente.stock) + parseInt(stock);


                if (!productoExistente.id && !productoExistente.productoId) {
                    console.log("El producto existe pero no tiene ID, creando uno nuevo");

                    // Crear nuevo producto con stock acumulado
                    const producto = {
                        name,
                        imagen,
                        descripcion,
                        stock: nuevoStock,
                        precio: parseFloat(precio),
                        categoria: { categoriaId: parseInt(categoriaId) },
                        proveedores: { proveedorId: parseInt(proveedorId) }
                    };

                    await axios.post(API_URL, producto);
                    setSuccess(`Producto "${name}" creado con stock actualizado a ${nuevoStock} unidades.`);
                    productoCreado(name);
                } else {

                    const id = productoExistente.productoId || productoExistente.id;
                    console.log("ID a utilizar:", id);

                    if (!id) {
                        throw new Error('No se pudo determinar el ID del producto');
                    }

                    // Actualizamos el producto existente
                    await axios.put(`${API_URL}/${id}`, {
                        productoId: id,
                        name: productoExistente.name,
                        imagen: productoExistente.imagen,
                        descripcion: productoExistente.descripcion,
                        stock: nuevoStock,
                        precio: productoExistente.precio,
                        estado: productoExistente.estado,
                        categoria: { categoriaId: parseInt(categoriaId) },
                        proveedores: { proveedorId: parseInt(proveedorId) }
                    });

                    setSuccess(`El producto "${name}" ya existe. No fue creado, pero se actualizó su stock a ${nuevoStock} unidades.`);
                    productoActualizado(name, nuevoStock);
                }
            } else {
                // Si el producto no existe, creamos uno nuevo
                const producto = {
                    name,
                    imagen,
                    descripcion,
                    stock: parseInt(stock),
                    precio: parseFloat(precio),
                    categoria: { categoriaId: parseInt(categoriaId) },
                    proveedores: { proveedorId: parseInt(proveedorId) }
                };

                console.log("Creando nuevo producto:", producto);
                await axios.post(API_URL, producto);
                setSuccess(`Producto "${name}" creado exitosamente`);
                productoCreado(name);
            }

            setError('');

            // Limpiar formulario
            setName('');
            setImagen('');
            setDescripcion('');
            setStock('');
            setPrecio('');
            setCategoriaId('');
            setProveedorId('');
        } catch (error) {
            console.error('Error operando con producto:', error);
            setError('Hubo un error al procesar el producto: ' + (error.response?.data?.message || error.message));
            setSuccess('');
        }
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
                    <li className="active">
                        <Link to="/admin/productos">
                            <i className='bx bxs-doughnut-chart'></i>
                            <span className="text">Productos</span>
                        </Link>
                    </li>
                    <li >
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
                </nav>

                <main>
                    <div className="head-title">
                        <div className="left">
                            <h1>Crear Producto</h1>
                            <ul className="breadcrumb">
                                <li><a href="#">Administrador</a></li>
                                <li><i className='bx bx-chevron-right'></i></li>
                                <li><a href="#">Productos</a></li>
                                <li><i className='bx bx-chevron-right'></i></li>
                                <li><a className="active" href="#">Crear Producto</a></li>
                            </ul>
                        </div>
                    </div>

                    <div className="table-data">
                        <div className="container-proveedores">
                            <h1>Registrar Nuevo Producto</h1>

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
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="imagen" className="form-label">Imagen</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="imagen"
                                        value={imagen}
                                        onChange={(e) => setImagen(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="descripcion" className="form-label">Descripción</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="descripcion"
                                        value={descripcion}
                                        onChange={(e) => setDescripcion(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="stock" className="form-label">Stock</label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        id="stock"
                                        value={stock}
                                        onChange={(e) => setStock(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="precio" className="form-label">Precio</label>
                                    <input
                                        type="number"
                                        step="0.01"
                                        className="form-control"
                                        id="precio"
                                        value={precio}
                                        onChange={(e) => setPrecio(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="categoriaId" className="form-label">Categoría</label>
                                    <select
                                        className="form-control"
                                        value={categoriaId}
                                        onChange={(e) => setCategoriaId(e.target.value)}
                                        required
                                    >
                                        <option value="">Selecciona una categoría</option>
                                        {categorias.map((categoria) => (
                                            <option key={categoria.categoriaId} value={categoria.categoriaId}>
                                                {categoria.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="proveedorId" className="form-label">Proveedor</label>
                                    <select
                                        className="form-control"
                                        value={proveedorId}
                                        onChange={(e) => setProveedorId(e.target.value)}
                                        required
                                    >
                                        <option value="">Selecciona un proveedor</option>
                                        {proveedores.map((proveedor) => (
                                            <option key={proveedor.proveedorId} value={proveedor.proveedorId}>
                                                {proveedor.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <button type="submit" className="btn btn-primary">Crear Producto</button>
                            </form>
                        </div>
                    </div>
                </main>
            </section>
            <Toaster />
        </div>
    );
};

export default CrearProducto;