import React from 'react';
import { useNavigate } from 'react-router-dom';


const Productos = () => {
    return (
        <>
            <section className="sec2">
            <p className="h3 titprodu text-center">Productos Recomendados 🔥</p>
            <div className="container grid">
                <div className="row">
                    {/* Producto 1 */}
                    <div className="col-md">
                        <div className="row">
                            <div className="col-12 col-md-6">
                                <div className="card shadow">
                                    <img src="/img/productos/audifonos.png" width="289px" height="311px" alt="" />
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
                                            <a className="btn btn-xs btn-tertiary add" href="/usuario/productos">
                                                <span className="fas fa-cart-plus me-2"></span> Agregar al Carrito
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Producto 2 */}
                    <div className="col-md">
                        <div className="row">
                            <div className="col-12 col-md-6">
                                <div className="card shadow">
                                    <img src="/img/productos/logitech733.png" width="289px" height="311px" alt="" />
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
                                            <a className="btn btn-xs btn-tertiary add" href="/usuario/productos">
                                                <span className="fas fa-cart-plus me-2"></span> Agregar al Carrito
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Producto 3 */}
                    <div className="col-md">
                        <div className="row">
                            <div className="col-12 col-md-6">
                                <div className="card shadow">
                                    <img src="/img/productos/grafi.png" width="289px" height="311px" alt="" />
                                    <div className="card-footer border-top border-gray-300 p-4">
                                        <a href="#" className="h5">RTX 3050</a>
                                        <h3 className="h6 fw-light text-gray mt-2">GIGABYTE Tarjeta gráfica Eagle OC 6G, 2 ventiladores WINDFORCE, 6 GB GDDR6 96 bits GDDR6</h3>
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
                                            <a className="btn btn-xs btn-tertiary add" href="/usuario/productos">
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
                            <img src="/img/marcas/NVIDIA.jpg" className="card-img-top" alt="Nvidia" />
                        </div>
                    </div>
                    <div className="col">
                        <div className="card carta">
                            <img src="/img/marcas/amd.webp" className="card-img-top" alt="AMD" />
                        </div>
                    </div>
                    <div className="col">
                        <div className="card carta">
                            <img src="/img/marcas/msi.jpg" className="card-img-top" alt="MSI" />
                        </div>
                    </div>
                    <div className="col">
                        <div className="card carta">
                            <img src="/img/marcas/tuf.jpg" className="card-img-top" alt="TUF" />
                        </div>
                    </div>

                    <div className="col">
                        <div className="card carta">
                            <img src="/img/marcas/reddragon.jpg" className="card-img-top" alt="RedDragon" />
                        </div>
                    </div>

                    <div className="col">
                        <div className="card carta">
                            <img src="/img/marcas/intel.webp" className="card-img-top" alt="Logitech" />
                        </div>
                    </div>
                </div>
            </section>

    </>
    );
}

export default Productos;
