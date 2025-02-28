import React, { useEffect, useState } from 'react';
import './Ds.css';
import toast, { Toaster } from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';

const Ds = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); 
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
    // Verifica si es admin o no
    if (!token || !correoLogin || !correoLogin.includes("adminCentury")) {
      navigate('/'); 
    }
  }, [navigate]);

  return (
    <div className={`ds-container ${isSidebarOpen ? '' : 'sidebar-closed'}`}>
      {/* SIDEBAR */}
      <section id="sidebar" className={isSidebarOpen ? '' : 'hide'}>
        <a href="#" className="brand">
          <i className='bx bxs-face-mask'></i>
          <span className="text">CENTURY</span>
        </a>
        <ul className="side-menu top">
          <li className="active">
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
            <a href="#">
              <i className='bx bxs-cog'></i>
              <span className="text">Configuracion</span>
            </a>
          </li>
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
          <i className='bx bx-menu' onClick={() => setIsSidebarOpen(!isSidebarOpen)}></i>
          <form action="#">
            <div className="form-input">
              <input type="search" placeholder="Busqueda..." />
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

        {/* MAIN */}
        <main>
          <div className="head-title">
            <div className="left">
              <h1>Inicio</h1>
              <ul className="breadcrumb">
                <li>
                  <a href="#">Administrador</a>
                </li>
                <li><i className='bx bx-chevron-right'></i></li>
                <li>
                  <a className="active" href="#">Inicio</a>
                </li>
              </ul>
            </div>
          </div>

          <ul className="box-info">
            <li>
              <i className='bx bxs-calendar-check'></i>
              <span className="text">
                <h3>102</h3>
                <p>Ordenes Nuevas</p>
              </span>
            </li>
            <li>
              <i className='bx bxs-group'></i>
              <span className="text">
                <h3>1425</h3>
                <p>Visitantes</p>
              </span>
            </li>
            <li>
              <i className='bx bxs-dollar-circle'></i>
              <span className="text">
                <h3>$2.000.000</h3>
                <p>Ventas Totales</p>
              </span>
            </li>
          </ul>

          <div className="table-data">
            <div className="order">
              <div className="head">
                <h3>Ordenes</h3>
                <i className='bx bx-search'></i>
                <i className='bx bx-filter'></i>
              </div>
              <table>
                <thead>
                  <tr>
                    <th>Usuarios</th>
                    <th>Fecha de Orden</th>
                    <th>Estado</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Christopher Cardenas</td>
                    <td>29-11-2024</td>
                    <td><span className="status pending">Pendiente</span></td>
                  </tr>
                  <tr>
                    <td>Lucas Cortes</td>
                    <td>30-11-2024</td>
                    <td><span className="status completed">Completo</span></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </section>

      <Toaster />
    </div>
  );
};

export default Ds;
