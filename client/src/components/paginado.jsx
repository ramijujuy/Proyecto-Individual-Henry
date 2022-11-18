import React from "react";
import estilos from './paginado.module.css'

export default function Paginado({dogs, paginado}){
    const nrosdepagina = [] 

    for (let index = 1; index <= Math.ceil(dogs/8); index++){
        nrosdepagina.push(index);
        
    }

    return (
        <nav className={estilos.nav}>
        <ul className={estilos.ul}> 
        {nrosdepagina &&
         nrosdepagina.map(n =>(
                <li className={estilos.li}>
                <a className={estilos.a} onClick={()=> paginado(n)}>{n}</a>
                </li>
            ))}
        
        </ul>
        </nav>
    )

}