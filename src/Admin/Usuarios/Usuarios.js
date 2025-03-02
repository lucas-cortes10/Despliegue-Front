import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import DataTable from 'react-data-table-component';

const Usuarios = () => {
    const [usuarios, setUsuarios] = useState([]);
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
       //Verifica si es admin o no
        if (!token || !correoLogin || !correoLogin.includes("adminCentury")) {
          navigate('/'); 
        }
      }, [navigate]);

      useEffect(() => {
        console.log("API URL:", process.env.REACT_APP_API_URL);
        
        axios.get(`${process.env.REACT_APP_API_URL}/api/v1/usuarios`)
            .then(response => {
                setUsuarios(response.data);
            })
            .catch(error => {
                console.error("Error en la petición:", error);
                setError("Error al cargar los usuarios o no hay usuarios registrados.");
            });
    }, []);
    

    

    

    const columns = [
        {
            name: 'ID',
            selector: row => row.id,
            sortable: true
        },
        {
            name: 'Rol',
            selector: row => row.role ? 'Admin' : ' Usuario',  
            sortable: true,
            cell: row => (
                <span className={`badge ${row.role ? 'bg-warning text-gray' : 'bg-primary text-white'}`}>
                    {row.role ? 'Admin' : 'Usuario'} 
                </span>
            ),
        },
        {
            name: 'Nombre',
            selector: row => row.nombre,
            sortable: true
        },
        {
            name: 'Correo',
            selector: row => row.correo,
            sortable: true
        }
    ]

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
                     <li className="active">
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
                            <input type="search" placeholder="Búsqueda..." />
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
                            <h1>Usuarios</h1>
                            <ul className="breadcrumb">
                                <li>
                                    <a href="#">Administrador</a>
                                </li>
                                <li><i className='bx bx-chevron-right'></i></li>
                                <li>
                                    <a className="active" href="#">Usuarios</a>
                                </li>
                            </ul>
                        </div>
                       
                    </div>

                    {error && <div className="alert alert-danger">{error}</div>}

                    <div className="table-data">
                        <DataTable
                            title="Lista de Usuarios"
                            columns={columns}
                            data={usuarios}
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

export default Usuarios;
