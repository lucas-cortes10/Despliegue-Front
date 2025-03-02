import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate, useParams, Link } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

const EditarProductos = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [originalStock, setOriginalStock] = useState(0);

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

    const [formData, setFormData] = useState({
        name: '',
        descripcion: '',
        stock: '',
        precio: '',
        categoriaId: '',
        proveedorId: '',
        imagen: '',
        estado: true
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [categorias, setCategorias] = useState([]);
    const [proveedores, setProveedores] = useState([]);
    const [categoriaInfo, setCategoriaInfo] = useState(null);
    const [proveedorInfo, setProveedorInfo] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        const correoLogin = localStorage.getItem('correoLogin');
        if (!token || !correoLogin || !correoLogin.includes("adminCentury")) {
            navigate('/');
        }
    }, [navigate]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });

        if (name === 'categoriaId') {
            fetchCategoriaInfo(value);
        } else if (name === 'proveedorId') {
            fetchProveedorInfo(value);
        }
    };

    const fetchCategoriaInfo = async (categoriaId) => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/v1/categorias/categorias/${categoriaId}`);
            setCategoriaInfo(response.data);
        } catch (error) {
            console.error('Error al buscar la información de la categoría:', error);
            setError('Error al buscar la información de la categoría.');
        }
    };

    const fetchProveedorInfo = async (proveedorId) => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/v1/proveedores/proveedores/${proveedorId}`);
            setProveedorInfo(response.data);
        } catch (error) {
            console.error('Error al buscar la información del proveedor:', error);
            setError('Error al buscar la información del proveedor.');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!categoriaInfo || !proveedorInfo) {
            setError('Debe seleccionar una categoría y un proveedor válidos');
            return;
        }

        try {
            const productoActualizado = {
                id: id,
                name: formData.name,
                descripcion: formData.descripcion,
                stock: Number(formData.stock),
                precio: Number(formData.precio),
                imagen: formData.imagen,
                estado: formData.estado,
                categoria: categoriaInfo,
                proveedores: proveedorInfo
            };

            Swal.fire({
                title: '¿Estás seguro?',
                text: '¿Quieres actualizar este producto?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Sí, actualizar',
                cancelButtonText: 'Cancelar'
            }).then((result) => {
                if (result.isConfirmed) {
                    axios.put(`${process.env.REACT_APP_API_URL}/api/v1/productos/${id}`, productoActualizado)
                        .then(() => {
                            Swal.fire('Actualizado', 'El producto ha sido actualizado.', 'success');
                            navigate("/admin/productos");
                        })
                        .catch(() => {
                            Swal.fire('Error', 'Problema al actualizar.', 'Error');
                        });
                }
            });



            if (Number(formData.stock) !== originalStock) {
                try {
                    // User ID
                    const userId = localStorage.getItem('userId') || "0";
                    const correoLogin = localStorage.getItem('correoLogin') || "sistema";


                    const stockChange = {
                        productoId: Number(id),
                        productoNombre: formData.name,
                        stockAnterior: originalStock,
                        stockNuevo: Number(formData.stock),
                        administradorId: userId,
                        administradorCorreo: correoLogin,
                        fechaCambio: new Date().toISOString().slice(0, 19)
                    };

                    console.log("Enviando historial de stock:", stockChange);


                    const stockResponse = await axios.post(`${process.env.REACT_APP_API_URL}/api/v1/stockhistorial`, stockChange);
                    console.log("Historial de stock registrado con éxito:", stockResponse.data);
                } catch (stockError) {
                    console.error('Error al registrar historial de stock:', stockError);
                    if (stockError.response) {
                        console.error('Detalles del error:', stockError.response.data);
                        console.error('Código de estado:', stockError.response.status);
                    } else if (stockError.request) {
                        console.error('No se recibió respuesta del servidor');
                    } else {
                        console.error('Error al configurar la solicitud:', stockError.message);
                    }
                }
            }

            setSuccess('Producto actualizado con éxito!');
            setError('');
            setTimeout(() => {
                navigate("/admin/productos");
            }, 2000);
        } catch (error) {
            console.error('Error:', error);
            setError('Hubo un error al actualizar el producto.');
        }
    };

    useEffect(() => {
        const cargarDatos = async () => {
            try {
                if (id) {
                    const productoRes = await axios.get(`${process.env.REACT_APP_API_URL}/api/v1/productos/${id}`);
                    const producto = productoRes.data;


                    setOriginalStock(producto.stock);

                    setFormData({
                        name: producto.name,
                        descripcion: producto.descripcion,
                        stock: producto.stock,
                        precio: producto.precio,
                        imagen: producto.imagen,
                        estado: producto.estado,
                        categoriaId: producto.categoria.categoriaId,
                        proveedorId: producto.proveedores.proveedorId
                    });

                    setCategoriaInfo(producto.categoria);
                    setProveedorInfo(producto.proveedores);
                }

                const categoriasRes = await axios.get(`${process.env.REACT_APP_API_URL}/api/v1/categorias/categorias`);
                const proveedoresRes = await axios.get(`${process.env.REACT_APP_API_URL}/api/v1/proveedores/proveedores`);

                setCategorias(categoriasRes.data);
                setProveedores(proveedoresRes.data);
            } catch (error) {
                console.error('Error al cargar los datos:', error);
                setError('Error al cargar los datos');
            }
        };

        cargarDatos();
    }, [id]);

    return (
        <div className="ds-container">
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
                <main>
                    <div className="head-title">
                        <div className="left">
                            <h1>Editar Producto</h1>
                        </div>
                    </div>

                    <div className="table-data">
                        <div className="container-productos">
                            <h1>Editar Producto</h1>


                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="name" className="form-label">Nombre</label>
                                    <input type="text" className="form-control" id="name" name="name" value={formData.name} onChange={handleChange} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="imagen" className="form-label">Imagen</label>
                                    <input type="text" className="form-control" id="imagen" name="imagen" value={formData.imagen} onChange={handleChange} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="descripcion" className="form-label">Descripción</label>
                                    <input type="text" className="form-control" id="descripcion" name="descripcion" value={formData.descripcion} onChange={handleChange} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="stock" className="form-label">Stock</label>
                                    <input type="number" className="form-control" id="stock" name="stock" value={formData.stock} onChange={handleChange} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="precio" className="form-label">Precio</label>
                                    <input type="number" step="0.01" className="form-control" id="precio" name="precio" value={formData.precio} onChange={handleChange} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="estado" className="form-label">Estado</label>
                                    <div className="form-check">
                                        <input
                                            type="checkbox"
                                            className="form-check-input"
                                            id="estado"
                                            name="estado"
                                            checked={formData.estado}
                                            onChange={handleChange}
                                        />
                                        <label className="form-check-label" htmlFor="estado">
                                            Producto activo
                                        </label>
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="categoriaId" className="form-label">Categoría</label>
                                    <select className="form-control" id="categoriaId" name="categoriaId" value={formData.categoriaId} onChange={handleChange} required>
                                        <option value="">Selecciona una categoría</option>
                                        {categorias.map(categoria => (
                                            <option key={categoria.categoriaId} value={categoria.categoriaId}>{categoria.name}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="proveedorId" className="form-label">Proveedor</label>
                                    <select className="form-control" id="proveedorId" name="proveedorId" value={formData.proveedorId} onChange={handleChange} required>
                                        <option value="">Selecciona un proveedor</option>
                                        {proveedores.map(proveedor => (
                                            <option key={proveedor.proveedorId} value={proveedor.proveedorId}>{proveedor.name}</option>
                                        ))}
                                    </select>
                                </div>

                                <button type="submit" className="btn btn-primary">Actualizar</button>
                            </form>
                        </div>
                    </div>
                </main>
            </section>
            <Toaster />
        </div>
    );
};

export default EditarProductos;