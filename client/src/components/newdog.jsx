import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { postnewdog } from "../action/action";
import estilos from "./newdog.module.css"

function validador(input){

    let errores={}
      if (!input.name) {errores.name = "Debe ingresar nombre de Raza"}
      if (!input.heightmax && !input.heightmin) {errores.heightmax = "Ingrese una altura"}
      if (!input.weightmax && !input.weightmin) {errores.weightmax = "Ingrese un peso"}

      return errores

  }



export default function NewDog(){
    const dispatch = useDispatch()
    const tempera = useSelector(state=>state.temperaments)
    const [input, setinput] = useState({
        name:"",
        heightmax:"",
        heightmin:"",
        weightmax:"",
        weightmin:"",
        life_span:"",
        temperament:[]
    })

    const [inputfin, setinputfin] = useState({
        name:"",
        height:"",
        weight:"",
        life_span:"",
        temperament:[]
    })

    const [error, seterror] = useState({})

 
    

   function handleChange(e){
        setinput({
            ...input,
            [e.target.name] : e.target.value
                })
        seterror(validador({
            ...input,
            [e.target.name] : e.target.value
            
        }))        
         
        setinputfin({
                    ...inputfin,
                    name:input.name,
                    height:input.heightmax + "-" + input.heightmin,
                    weight:input.weightmax + "-" + input.weightmin,
                    life_span:input.life_span,
                                              
                })
            
         console.log(input)
          
            
    }

    function handleSelect(e){
        setinput({
            ...input,
            temperament:[...input.temperament, e.target.value]
        })
        setinputfin({
            ...inputfin,
            temperament:input.temperament
                   
        })

    }
    
    function handleSubmit(e){
        e.preventDefault()
        if(!error.name && !error.heightmax && !error.weightmax) {
        dispatch(postnewdog(inputfin))
        setinput({
        name:"",
        heightmax:"",
        heightmin:"",
        weightmax:"",
        weightmin:"",
        life_span:"",
        temperament:[]})
    }

    else {
        alert("complete los datos obligatorios")
    }
}

    return (
        <div className={estilos.div}>
            
            <form  className={estilos.form} onSubmit={(e) =>handleSubmit(e)}>
            <Link className={estilos.link} to="/home"><button className={estilos.button1}>Home</button></Link>
            <h1 className={estilos.h1}>Alta de Raza</h1>
                <div>
                    <label className={estilos.label} >Nombre:</label>
                    <input className={estilos.input} type="text" value={input.name} name="name" onChange={e => handleChange(e)}/>
                    {error.name && (<h2 className={estilos.h2}>{error.name}</h2>)}
                </div>
                <div> Altura  :
                    <label className={estilos.label} > min:</label>
                    <input className={estilos.input} type="text" value={input.heightmin} name="heightmin" onChange={e => handleChange(e)}/>
                    <label className={estilos.label} > max:</label>
                    <input className={estilos.input} type="text" value={input.heightmax} name="heightmax" onChange={e => handleChange(e)}/>
                    {error.heightmax && (<h3 className={estilos.h3}>{error.heightmax}</h3>)}
                </div>
               
                <div> Peso  : 
                    <label className={estilos.label} > min:</label>
                    <input className={estilos.input} type="text" value={input.weightmin} name="weightmin" onChange={e => handleChange(e)}/>
                    <label className={estilos.label} >  max:</label>
                    <input className={estilos.input} type="text" value={input.weightmax} name="weightmax" onChange={e => handleChange(e)}/>
                    {error.weightmax && (<h3 className={estilos.h3}>{error.weightmax}</h3>)}
                </div>
              
                <div>
                    <label className={estilos.label} >Años de Vida:</label>
                    <input className={estilos.input} type="text" value={input.life_span} name="life_span" onChange={e => handleChange(e)}/>
                </div>
                               
                   <div> Temperamento:
                      <select className={estilos.select} onChange={e =>handleSelect(e)}> 
                    
                    {tempera.map((r) =>{
                        return (
                        <option value={r.namet}>
                            {r.namet}
                            </option>)})}
                      </select>
                      </div>
                      <ul><li className={estilos.li}>{input.temperament.map(e => e + ",")}</li></ul>
                      <button className={estilos.button2} type="submit">Agregar Raza</button>
                


            </form>
        </div>
    )

}

