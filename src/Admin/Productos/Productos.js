import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import DataTable from 'react-data-table-component';

const Productos = () => {
    const [productos, setProductos] = useState([]);
    const [categorias, setCategorias] = useState([]);
    const [proveedores, setProveedores] = useState([]);
    const [busqueda, setBusqueda] = useState();
    const [error, setError] = useState(null);
    const navigate = useNavigate();

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

    const descargarPdf = () => {
        axios.get(`${process.env.REACT_APP_API_URL}/api/v1/productos/reporte`, {
            responseType: 'blob',
            timeout: 60000
        })
            .then((response) => {
                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', 'Productos.pdf');
                document.body.appendChild(link);
                link.click();
            })
            .catch((error) => {
                if (error.code === 'ECONNABORTED') {
                    console.error('Tiempo de espera agotado al descargar el PDF');
                } else {
                    console.error('Error al descargar el PDF:', error);
                }
            });
    };


    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/api/v1/productos`)
            .then(response => {
                setProductos(response.data);
                setBusqueda(response.data);
            })
            .catch(() => setError("Error al cargar los productos o no hay productos registrados."));

        // Cargar categorías
        axios.get(`${process.env.REACT_APP_API_URL}/api/v1/categorias/categorias`)
            .then(response => {
                setCategorias(response.data);
            })
            .catch(error => {
                console.error('Error al cargar categorías:', error);
            });

        // Cargar proveedores
        axios.get(`${process.env.REACT_APP_API_URL}/api/v1/proveedores/proveedores`)
            .then(response => {
                setProveedores(response.data);
            })
            .catch(error => {
                console.error('Error al cargar proveedores:', error);
            });
    }, []);

    const cambiarEstadoProducto = (id, estadoActual) => {
        axios.patch(`${process.env.REACT_APP_API_URL}/api/v1/productos/${id}/estado`)
            .then(() => {
                setProductos(prevProductos =>
                    prevProductos.map(producto =>
                        producto.id === id
                            ? { ...producto, estado: !estadoActual }
                            : producto
                    )
                );
                window.location.reload(); // Reload
            }
            )
            .catch(() => {
                setError(`Error al ${estadoActual ? 'deshabilitar' : 'habilitar'} el producto.`);
            });
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('correoLogin');
        alert("Cerrando sesión...");
        navigate('/');
    };

    const getCategoryName = (categoriaId) => {
        const categoria = categorias.find(cat => cat.categoriaId === categoriaId);
        return categoria ? categoria.name : 'No asignada';
    };

    const getProviderName = (proveedorId) => {
        const proveedor = proveedores.find(prov => prov.proveedorId === proveedorId);
        return proveedor ? proveedor.name : 'No asignado';
    };

    const search = (e) => {
        const query = e.target.value.toLowerCase();
        if (query === '') {
            setBusqueda(productos);
        } else {
            const filteredData = productos.filter(producto =>
                producto.name.toLowerCase().includes(query) ||
                getCategoryName(producto.categoria?.categoriaId).toLowerCase().includes(query) ||
                getProviderName(producto.proveedores?.proveedorId).toLowerCase().includes(query)
            );
            setBusqueda(filteredData);
        }
    };


    const columns = [
        {
            name: 'ID',
            selector: row => row.id,
            sortable: true,
        },
        {
            name: 'Nombre',
            selector: row => row.name,
            sortable: true,
        },
        {
            name: 'Imagen',
            cell: row => <img src={row.imagen} alt={row.name} width="50" height="50" style={{ borderRadius: '5px' }} />,
        },
        {
            name: 'Categoría',
            selector: row => getCategoryName(row.categoria?.categoriaId),
            sortable: true,
        },
        {
            name: 'Proveedor',
            selector: row => getProviderName(row.proveedores?.proveedorId),
            sortable: true,
        },
        {
            name: 'Stock',
            selector: row => row.stock,
            sortable: true,
        },
        {
            name: 'Precio',
            selector: row => `$${row.precio}`,
            sortable: true,
        },
        {
            name: 'Estado',
            selector: row => row.estado ? 'Activo' : 'Inactivo',
            sortable: true,
            cell: row => (
                <span className={`badge ${row.estado ? 'bg-success text-white' : 'bg-danger text-white'}`}>
                    {row.estado ? 'Activo' : 'Inactivo'}
                </span>
            ),
        },
        {
            name: 'Acciones',
            cell: (row) => (
                <div className="d-flex gap-2">
                    <Link to={`/admin/productos/${row.id}`} className="btn btn-sm btn-warning texto">Editar</Link>
                    <button
                        onClick={() => cambiarEstadoProducto(row.id, row.estado)}
                        className={`btn btn-sm ${row.estado ? 'btn-danger texto' : 'btn-success texto'}`}
                    >
                        {row.estado ? 'Deshabilitar' : 'Habilitar'}
                    </button>
                </div>
            ),
        }
    ];

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

            {/* CONTENT */}
            <section id="content">
                {/* NAVBAR */}
                <nav>
                    <i className='bx bx-menu'></i>
                    <form action="#">
                        <div className="form-input">
                            <input type="text" placeholder="Búsqueda..." />
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
                            <h1>Productos</h1>
                            <ul className="breadcrumb">
                                <li>
                                    <a href="#">Administrador</a>
                                </li>
                                <li><i className='bx bx-chevron-right'></i></li>
                                <li>
                                    <a className="active" href="#">Productos</a>
                                </li>
                            </ul>
                        </div>
                        <Link to="/admin/productos/crear" className="btn btn-primary mb-3">Agregar Productos</Link>
                    </div>

                    {/* Botón reporte */}
                    <div className="mb-3">
                        <button onClick={descargarPdf} className="btn btn-secondary">Descargar Reporte PDF</button>
                    </div>

                    {error && <div className="alert alert-danger">{error}</div>}

                    <input type="text" onChange={search} className="form-control mb-3" placeholder="Buscar..." />

                    <div className="table-data">
                        <a href='/admin/stockhistorial' className='btn btn-success'>Historial Stock</a>
                        <DataTable
                            title="Lista de Productos"
                            columns={columns}
                            data={busqueda}
                            pagination
                            responsive
                            highlightOnHover
                            striped
                            subHeaderComponent
                        />
                    </div>
                </main>
            </section>
            <Toaster />
        </div>
    );
};

export default Productos;