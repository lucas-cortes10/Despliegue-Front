import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Index from "./Index/Index";
import Registro from "./User/Registro";
import Inicio from "./User/Inicio";
import Ds from "./Admin/Ds";
import Categorias from "./Admin/Categorias/Categorias";
import CreateCategoria from "./Admin/Categorias/CreateCategoria";
import EditCategoria from "./Admin/Categorias/EditarCategoria";
import Productos from "./Admin/Productos/Productos";
import Productos2 from "./Index/Productos";
import CreateProductos from "./Admin/Productos/CreateProductos";
import EditarProductos from "./Admin/Productos/EditarProductos";
import Proveedores from "./Admin/Proveedores/Proveedores";
import CreateProveedores from "./Admin/Proveedores/CreateProveedores";
import EditProveedores from "./Admin/Proveedores/EditarProveedores";
import EnviarCorreos from "./Admin/Email/EnviarCorreos";
import Usuarios from "./Admin/Usuarios/Usuarios";
import StockHistorial from "./Admin/Stock/StockHistorial";

import Compra from "./Index/Compra";
import ErrorPago from "./Index/ErrorPago";


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>

           {/* Rutas Sin Registrar */}
          <Route exact path="/" element={<Inicio/>}></Route>
          <Route path="/registro" element={<Registro />}></Route>
          
  
          {/* Rutas Admin */}
          <Route path="/admin" element={<Ds/>}></Route>

          <Route path="/admin/categorias" element={<Categorias/>}></Route>
          <Route path="/admin/categorias/crear" element={<CreateCategoria/>}></Route>
          <Route path="/admin/categorias/:id" element={<EditCategoria/>}></Route>

          <Route path="/admin/productos" element={<Productos/>}></Route>
          <Route path="/admin/productos/crear" element={<CreateProductos/>}></Route>
          <Route path="/admin/productos/:id" element={<EditarProductos/>}></Route>

          <Route path="/admin/proveedores" element={<Proveedores/>}></Route>
          <Route path="/admin/proveedores/crear" element={<CreateProveedores/>}></Route>
          <Route path="/admin/proveedores/:id" element={<EditProveedores/>}></Route>

          <Route path="/admin/stockhistorial" element={<StockHistorial/>}></Route>
          
          <Route path="/admin/correos" element={<EnviarCorreos/>}></Route>

          <Route path="/admin/usuarios" element={<Usuarios/>}></Route>

    


         {/* Rutas Usuario Registrado */}
          <Route path="/usuario/inicio" element={<Index />}></Route>
          <Route exact path="/usuario/productos" element={<Productos2/>}></Route>
          <Route exact path="/usuario/compra" element={<Compra/>}></Route>
          <Route path="/usuario/errorpago" element={<ErrorPago/>}></Route>

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
