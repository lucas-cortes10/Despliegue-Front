import React, { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import NavbarIndex from "../Components/IndexComponents/NavbarIndex";
import Sectionprincipal from '../Components/IndexComponents/Sectionprincipal';
import Productos from '../Components/IndexComponents/Productos';
import Footer from '../Components/IndexComponents/Footer';
import "../normal.css";




const Index = () => {

  const navigate = useNavigate();

  useEffect(() => {
      const token = localStorage.getItem('token');
      const correoLogin = localStorage.getItem('correoLogin'); 
      if (!token || !correoLogin) {
        navigate('/registro'); 
      }else{
        navigate('/usuario/inicio');
      }
    }, [navigate]);

    return (
    <>
      <NavbarIndex />
      <Sectionprincipal />
      <Productos />
      <Footer />
    </>
    );
}

export default Index;
