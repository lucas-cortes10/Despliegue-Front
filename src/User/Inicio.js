import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

const Inicio = () => {

    useEffect(() => {
        const token = localStorage.getItem('token');
        const correoLogin = localStorage.getItem('correoLogin'); 
        if (!token || !correoLogin) {
          navigate(''); 
        }else{
          navigate('/usuario/inicio');
        }
      }, [navigate]);


    const navigate = useNavigate();
    
    return (
        <>
            {/* Barra Navegación */}
            <nav className="navbar navbar-expand-lg fixed-top">
                <div className="container-fluid">
                    <a className="navbar-brand me-auto logoa" href="#"><img src="../img/5.png" alt="" className="logopag" /></a>
                    <div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
                        <div className="offcanvas-header">
                            <h5 className="offcanvas-title" id="offcanvasNavbarLabel">Menu</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                        </div>
                        <div className="offcanvas-body">
                            <ul className="navbar-nav justify-content-center flex-grow-1 pe-3">
                                <li className="nav-item">
                                    <a className="nav-link active" aria-current="page" href="/">Inicio</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link mx-lg-2" href="/registro">Productos</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link mx-lg-2" href="/registro">Nosotros</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link mx-lg-2" href="#slider">Marcas</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link mx-lg-2" href="/registro"><i className="fa-solid fa-cart-shopping"></i></a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <a href="/registro" className="boton-login">Iniciar Sesion</a>
                    <button className="navbar-toggler pe-0" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                </div>
            </nav>

            {/* Sección principal */}
            <section className="main">
                <div className="container d-flex align-items-center justify-content-center fs-1 text-white flex-column">
                    <h1>Tienda Hardware</h1>
                    <h2>Bogota , Colombia</h2>
                </div>
            </section>

            <section className="sec2">
                <p className="h3 titprodu text-center">Productos Recomendados 🔥</p>
                <div className="container grid">
                    <div className="row">
                        {/* Producto 1 */}
                        <div className="col-12 col-lg-4">
                            <div className="row">
                                <div className="col-12">
                                    <div className="card shadow">
                                        <img src="img/productos/audifonos.png" width="289" height="311" alt="Logitech G435" />
                                        <div className="card-footer border-top border-gray-300 p-4">
                                            <a href="#" className="h5">Logitech G435</a>
                                            <h3 className="h6 fw-light text-gray mt-2">
                                                Auriculares con cable para videojuegos, micrófono abatible, conector de audio de 3.5 mm, para PC, Playstation, Xbox
                                            </h3>
                                            <div className="d-flex mt-3">
                                                <span className="star fas fa-star text-warning me-1"></span>
                                                <span className="star fas fa-star text-warning me-1"></span>
                                                <span className="star fas fa-star text-warning me-1"></span>
                                                <span className="star fas fa-star text-warning me-1"></span>
                                                <span className="star fas fa-star text-warning"></span>
                                                <span className="badge ms-2">4.5</span>
                                            </div>
                                            <div className="d-flex justify-content-between align-items-center mt-3">
                                                <span className="h5 mb-0 text-gray">$382.000</span>
                                                <a className="btn btn-xs btn-tertiary add" href="/registro">
                                                    <span className="fas fa-cart-plus me-2"></span> Agregar al Carrito
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Producto 2 */}
                        <div className="col-12 col-lg-4">
                            <div className="row">
                                <div className="col-12">
                                    <div className="card shadow">
                                        <img src="img/productos/logitech733.png" width="289" height="311" alt="Logitech 733" />
                                        <div className="card-footer border-top border-gray-300 p-4">
                                            <a href="#" className="h5">Logitech 733</a>
                                            <h3 className="h6 fw-light text-gray mt-2">
                                                Auriculares inalámbricos G733 Lightspeed para juegos, con diadema de suspensión, Lightsync RGB
                                            </h3>
                                            <div className="d-flex mt-3">
                                                <span className="star fas fa-star text-warning me-1"></span>
                                                <span className="star fas fa-star text-warning me-1"></span>
                                                <span className="star fas fa-star text-warning me-1"></span>
                                                <span className="star fas fa-star text-warning"></span>
                                                <span className="badge ms-2">4</span>
                                            </div>
                                            <div className="d-flex justify-content-between align-items-center mt-3">
                                                <span className="h5 mb-0 text-gray">$502.000</span>
                                                <a className="btn btn-xs btn-tertiary add" href="/registro">
                                                    <span className="fas fa-cart-plus me-2"></span> Agregar al Carrito
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Producto 3 */}
                        <div className="col-12 col-lg-4">
                            <div className="row">
                                <div className="col-12">
                                    <div className="card shadow">
                                        <img src="img/productos/grafi.png" width="289" height="311" alt="RTX 3050" />
                                        <div className="card-footer border-top border-gray-300 p-4">
                                            <a href="#" className="h5">RTX 3050</a>
                                            <h3 className="h6 fw-light text-gray mt-2">
                                                GIGABYTE Tarjeta gráfica Eagle OC 6G, 2 ventiladores WINDFORCE, 6 GB GDDR6 96 bits GDDR6
                                            </h3>
                                            <div className="d-flex mt-3">
                                                <span className="star fas fa-star text-warning me-1"></span>
                                                <span className="star fas fa-star text-warning me-1"></span>
                                                <span className="star fas fa-star text-warning me-1"></span>
                                                <span className="star fas fa-star text-warning me-1"></span>
                                                <span className="star fas fa-star text-warning"></span>
                                                <span className="badge ms-2">5</span>
                                            </div>
                                            <div className="d-flex justify-content-between align-items-center mt-3">
                                                <span className="h5 mb-0 text-gray">$1.000.000</span>
                                                <a className="btn btn-xs btn-tertiary add" href="/registro">
                                                    <span className="fas fa-cart-plus me-2"></span> Agregar al Carrito
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            
            </section>

            {/* Marcas */}
            <h4 className="text-center mt-5 mb-0 marca" id="slider"> Marcas</h4>
            <section className="sec3 mt-5 d-flex justify-content-between">
                <div className="row row-cols-1 row-cols-md-3 g-4 a">
                    <div className="col">
                        <div className="card carta">
                            <img src="img/marcas/NVIDIA.jpg" className="card-img-top" alt="Nvidia" />
                        </div>
                    </div>
                    <div className="col">
                        <div className="card carta">
                            <img src="img/marcas/amd.webp" className="card-img-top" alt="AMD" />
                        </div>
                    </div>
                    <div className="col">
                        <div className="card carta">
                            <img src="img/marcas/msi.jpg" className="card-img-top" alt="MSI" />
                        </div>
                    </div>
                    <div className="col">
                        <div className="card carta">
                            <img src="img/marcas/tuf.jpg" className="card-img-top" alt="TUF" />
                        </div>
                    </div>

                    <div className="col">
                        <div className="card carta">
                            <img src="img/marcas/reddragon.jpg" className="card-img-top" alt="RedDragon" />
                        </div>
                    </div>

                    <div className="col">
                        <div className="card carta">
                            <img src="img/marcas/intel.webp" className="card-img-top" alt="Logitech" />
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-dark-gradient footer">
                <div className="footer-top">
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-6 col-lg-3 my-4">
                                <div className="mb-4">
                                    <img
                                        src="/img/5.jpg"
                                        alt="CenturyTech Logo"
                                        className="footer-logo"
                                        width={100}
                                    />
                                </div>
                                <div className="text-white-65 mb-4 text-white ">
                                    Conoce la mejor Tienda de HARDWARE en sus Redes Sociales
                                </div>
                                <div className="nav footer-social-icon ms-5 me-3">
                                    <a href="#" className="social-icon ">
                                        <i className="fab fa-facebook-f"></i>
                                    </a>
                                    <a href="#" className="social-icon ms-5 me-5">
                                        <i className="fab fa-twitter"></i>
                                    </a>
                                    <a href="#" className="social-icon">
                                        <i className="fab fa-instagram"></i>
                                    </a>
                                </div>
                            </div>
                            <div className="ms-5 me-5 col-sm-6 col-lg-2 my-4">
                                <h5 className="text-white h6 mb-4">Productos</h5>
                                <ul className="list-unstyled white-link footer-links">
                                    <li className="text-white">RAM</li>
                                    <li className="text-white">Gráficas</li>
                                    <li className="text-white">Procesadores</li>
                                    <li className="text-white">Monitores</li>
                                </ul>
                            </div>
                            <div className="ms-5 col-sm-6 col-lg-2 my-4 me-5">
                                <h5 className="text-white h6 mb-4">Compañía</h5>
                                <ul className="list-unstyled white-link footer-links">
                                    <li className="text-white">Sobre Nosotros</li>
                                    <li className="text-white">Puntos Físicos</li>
                                    <li className="text-white">Términos y Condiciones</li>
                                    <li className="text-white">Devoluciones</li>
                                </ul>
                            </div>
                            <div className="ms-5 col-sm-6 col-lg-2 my-4">
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3976.6010550975952!2d-74.06066512416356!3d4.665002041964236!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e3f9a5f3f535297%3A0xf509f2cb0f590c3!2sUnilago.!5e0!3m2!1ses-419!2sco!4v1712113587078!5m2!1ses-419!2sco"
                                    title="CenturyTech Location"
                                    width="400"
                                    height="300"
                                    style={{ border: 0 }}
                                    allowFullScreen
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                ></iframe>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="footer-bottom footer-border-top light py-3">
                    <div className="container text-center">
                        <p className="m-0 text-white">© {new Date().getFullYear()} CenturyTech</p>
                    </div>
                </div>
            </footer>
        </>
    );
}

export default Inicio;
