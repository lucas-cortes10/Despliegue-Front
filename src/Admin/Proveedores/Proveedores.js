import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import DataTable from 'react-data-table-component';

const Proveedores = () => {
    const [proveedores, setProveedores] = useState([]);
    const [error, setError] = useState(null);

    const navigate = useNavigate(); 

    useEffect(() => {
        const token = localStorage.getItem('token');
        const correoLogin = localStorage.getItem('correoLogin'); 
       //Verifica si es admin o no
        if (!token || !correoLogin || !correoLogin.includes("adminCentury")) {
          navigate('/'); 
        }
      }, [navigate]);

    const descargarPdf = () => {
      axios.get(`${process.env.REACT_APP_API_URL}/api/v1/proveedores/reporte`, {
          responseType: 'blob', //archivo bin
      })
      .then((response) => {
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', 'proveedores.pdf'); // Cambia el nombre del archivo a "proveedores.pdf"
          document.body.appendChild(link);
          link.click();
      })
      .catch((error) => {
          console.error('Error al descargar el PDF:', error);
      });
   };

    
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/api/v1/proveedores/proveedores`)
            .then(response => {
                setProveedores(response.data);
                setTimeout(() => {
                  navigate('/admin/proveedores'); 
              }, 500);
            })
            .catch(() => {
                setError("Error al cargar los proveedores o no hay proveedores registrados.");
            });
    }, []);

    
    const eliminarProveedor = (id) => {
        axios.delete(`${process.env.REACT_APP_API_URL}/api/v1/proveedores/proveedores/${id}`)
            .then(() => {
                setProveedores(prevProveedores => prevProveedores.filter(proveedor => proveedor.proveedorId !== id));
            })
            .catch(() => {
                setError("Error al eliminar el proveedor.");
            });
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('correoLogin');
        alert("Cerrando sesión...");
      };

      const columns = [
        {
          name: 'ID',
          selector: row => row.proveedorId,
          sortable: true,
        },
        {
          name: 'Nombre',
          selector: row => row.name,
          sortable: true,
        },
        {
          name: 'Correo',
          selector: row => row.email,
          sortable: true,
        },
        {
          name: 'Teléfono',
          selector: row => row.telefono,
          sortable: true,
        },
        {
          name: 'Servicios',
          selector: row => row.servicios,
          sortable: true,
        },
        {
          name: 'Acciones',
          cell: row => (
            <div>
              <Link to={`/admin/proveedores/${row.proveedorId}`} className="btn btn-warning btn-sm">Editar</Link>
              <button onClick={() => eliminarProveedor(row.proveedorId)} className="btn btn-danger btn-sm">Eliminar</button>
            </div>
          ),
        },
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
            <a href="/admin">
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
          <li className="active">
            <Link to="/admin/proveedores">
              <i className='bx bxs-truck'></i>
              <span className="text">Proveedores</span>
            </Link>
          </li>
          <li>
            <Link to="/admin/usuarios">
              <i class='bx bxs-user-pin' ></i>
              <span className="text">Usuarios</span>
            </Link>
          </li>
          <li>
            <Link to="/admin/correos">
               <i class='bx bxs-envelope' ></i>
              <span className="text">Correos</span>
            </Link>
          </li>
        </ul>
        <ul className="side-menu">
          <li>
            <a href="#">
              <i className='bx bxs-cog'></i>
              <span className="text">Configuracion</span>
            </a>
          </li>
          <li>
            <a href="#" className="logout" onClick={handleLogout}>
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
                            <h1>Proveedores</h1>
                        </div>
                        <Link to="/admin/proveedores/crear" className="btn btn-primary mb-3">Agregar Proveedor</Link>
                    </div>

                     {/* Boton reporte*/}
                     <div>
                        <button onClick={descargarPdf} className="btn btn-secondary">Descargar Reporte PDF</button>
                    </div>

                    {error && <div className="alert alert-danger">{error}</div>}

                    <div className="table-data">
                        <DataTable
                            title="Lista de Proveedores"
                            columns={columns}
                            data={proveedores}
                            pagination
                            responsive
                            highlightOnHover
                            striped
                            subHeaderComponent
                        />
                    </div>
                </main>
            </section>
        </div>
    );
};

export default Proveedores;
