import React from 'react';
import { Link } from 'react-router-dom';
import dog from '../dog.png';
import estilos from './bienvenida.module.css'


export default function Bienvenidas() {

  return (
    <div className={estilos.fondo}>

      <div>
      
   
      <Link to='/home/'><h1> <img className={estilos.img} src={dog} alt="logo" text="hola" /></h1></Link>
      <div>
        <br></br>
        <br></br>
        <h1 className={estilos.h1}> Dogs Cards </h1>
      
      </div>
   
       
      </div>
    </div>
   
  );
}