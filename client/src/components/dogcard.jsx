import React  from "react";
import { Link } from "react-router-dom";
import estilos from './dogcard.module.css'


export default function DogCard({name, image, temperament, weight,id, valor, temperaments}){

    return (

        <div className={estilos.div}>
            
            <img className={estilos.img} src={image} alt={name} width="390px" height="310px" />
           <div>
            <Link className={estilos.link} to={'/dogs/detail/' + id}><p> {name} </p></Link>
            <h5 className={estilos.h5}>Temperamento: {!valor ? temperament : temperaments.map(e => e.namet + ", ")}</h5>
            <h5>Peso: {!valor ? weight.metric : weight}</h5>
            </div>
            
        </div>
    )

 }