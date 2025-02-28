import React from 'react';

const Footer = () => {
    return (
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
                                style={{border: 0}} 
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
    );
}

export default Footer;