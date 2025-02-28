import React from 'react';
import { useNavigate } from 'react-router-dom';

const PagoFallido = () => {
    const navigate = useNavigate();

    return (
        <div className="container text-center mt-5">
            <h2 className="text-danger">¡Pago Fallido!</h2>
            <p>Hubo un problema con tu pago. Inténtalo nuevamente o revisa tu método de pago.</p>
            <img 
                src="https://cdn-icons-png.flaticon.com/512/190/190406.png" 
                alt="Error de pago"
                width="150"
                className="mb-3"
            />
            <div>
                <button className="btn btn-primary me-2" onClick={() => navigate('/usuario/productos')}>
                    Volver a la tienda
                </button>
            </div>
        </div>
    );
};

export default PagoFallido;
