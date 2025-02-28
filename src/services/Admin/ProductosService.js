import axios from 'axios';

const API_URL = 'http://localhost:8080/api/v1/productos';

export const crearProducto = async (producto) => {
    try {
        const response = await axios.post(API_URL, producto);
        return response.data;
    } catch (error) {
        console.error('Error creando producto:', error);
    }
};

export const obtenerProductos = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        console.error('Error obteniendo productos:', error);
    }
};

export const obtenerProductoPorId = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error obteniendo producto:', error);
    }
};

export const actualizarProducto = async (id, producto) => {
    try {
        const response = await axios.put(`${API_URL}/${id}`, producto);
        return response.data;
    } catch (error) {
        console.error('Error actualizando producto:', error);
    }
};

export const eliminarProducto = async (id) => {
    try {
        await axios.delete(`${API_URL}/${id}`);
    } catch (error) {
        console.error('Error eliminando producto:', error);
    }
};
