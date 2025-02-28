import axios from "axios";

const USUARIO_BASE_REST_API_URL = "https://centurydeployment-production.up.railway.app/api/v1/usuarios";

const USUARIO_BASE_REST_API_URL_LOGIN = "https://centurydeployment-production.up.railway.app/api/v1/login";

class UsuarioService {
    
    getAuthHeaders() {
        const token = localStorage.getItem('token');
        return {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        };
    }

    getAllUsuarios() {
        return axios.get(USUARIO_BASE_REST_API_URL, this.getAuthHeaders());
    }

    saveUsuario(usuario) {
        
        return axios.post(USUARIO_BASE_REST_API_URL, usuario);
    }

    loginUsuario(usuarioLogin) {
        return axios.post(USUARIO_BASE_REST_API_URL_LOGIN, usuarioLogin);
    }
}

export default new UsuarioService();