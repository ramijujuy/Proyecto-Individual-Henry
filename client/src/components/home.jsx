import React, {useState} from "react";
import { useSelector, useDispatch } from "react-redux";
import { filterdogRaza, filterdogtemp, getalldogs, ordenname, searchdog, temperament, ordenpeso, getiddog } from "../action/action";
import { Link } from "react-router-dom";
import Paginado from "./paginado";
import { useEffect } from "react";
import DogCard from "./dogcard";
import estilos from './home.module.css';



export default function Searchbar() {

    const [search, setsearch] = useState('') 
    const [orden, setorden] = useState('')
    const [ordenp, setordenpeso] = useState('')

    const dogs = useSelector(state=>state.dogs)
    const tempera = useSelector(state=>state.temperaments)
    const razas = useSelector(state=> state.alldogs)
   

    const dispatch = useDispatch()

    const [pagina, setpagina] = useState(1)
    const ultdogenpagina = pagina * 8
    const pridogenpagina = ultdogenpagina - 8
    const dogmostrando = dogs.slice(pridogenpagina, ultdogenpagina)

   const paginado= function(nropagina) {
        setpagina(nropagina)
    }

    useEffect(()=>{
        dispatch(getalldogs());
        dispatch(temperament())
        },[dispatch])



    function handleChange(e) {
              
              setsearch(e.target.value)
       }

     function handleSubmit(event)  {
        event.preventDefault()
        dispatch(searchdog(search))
        setsearch("")
        
     }

     function handleFilter(e) {
        dispatch(filterdogtemp(e.target.value))
     }
     function handleFilterRaza(e){
        dispatch(filterdogRaza(e.target.value))
        setpagina(1)

     }

     function handleOrden(e){
        e.preventDefault()
        dispatch(ordenname(e.target.value))
        setpagina(1)
        setorden(`ordenamiendo ${e.target.value}`)
     }

     function handlePeso(e){
        console.log("llego al peso")
        e.preventDefault()
        dispatch(ordenpeso(e.target.value))
        setpagina(1)
        setordenpeso(`ordenamiento peso ${e.target.value}`)
     }


    return (

        <div className={estilos.TodoContenido}>
            

            <form className={estilos.form} onSubmit={handleSubmit}>
                <input className={estilos.input} type="text" value={search} onChange={handleChange} />
                <button type="submit"> Buscar y Limpiar filtros</button>
            </form>
            <p></p> 
            <Link className={estilos.link} to= '/dogs'>Crear Raza</Link>
           

            <div className={estilos.div2}> ORDENAMIENTO: 
                <select onChange={e => handleOrden(e)}>
                    <option value="asc" >a-z Ascendente</option>
                    <option value="desc">z-a Descendente</option>
                </select>
                <select onChange={e => handlePeso(e)}>
                    <option value="pes">Por Peso</option>
                    <option value="may">Mayor Peso</option>
                    <option value="men">Menor peso</option>
                </select>
                <p className={estilos.p}> Pagina: {pagina}</p>
                </div>

                <div> FILTRADO: 
                <select onChange={e => handleFilter(e)}>
                    <option value="todos">Temperamentos</option>
                    {tempera.map((r) =>{
                        return (
                        <option value={r.namet} key={r.id}>
                            {r.namet}
                            </option>)})}
                </select>
                <select onChange={e => handleFilterRaza(e)}>
                    <option value="todos">Razas</option>
                    <option value="EXI">EXISTENTES</option>
                    <option value="AGR">AGREGADAS</option>

                   
                </select>
                
            </div>

            
                        
            <Paginado 
            dogs={dogs.length}
            paginado= {paginado}/>

            {dogmostrando && dogmostrando.map(p => {
                return (
            <DogCard name={p.name} image={p.image} temperament={p.temperament} weight ={p.weight} id={p.id} valor={p.valor} temperaments={p.temperaments}/>)
            
           }) }
        </div>
    )

}





