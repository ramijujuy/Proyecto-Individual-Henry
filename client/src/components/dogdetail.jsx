import React  from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getcharacterdetail} from "../action/action";
import estilos from "./dogdetail.module.css"




 export default function Detail(props) {

 console.log(props)   
 
 const dispatch = useDispatch();
   
    
    useEffect(()=>{
        dispatch(getcharacterdetail(props.match.params.id))
    }, [dispatch])

    const detalledog = useSelector(state => state.dogdetail)
    console.log(props.match.params.id)
   console.log("aqui estoy")
   return (
    
           <div className={estilos.div}>
            { detalledog.length > 0 ? 
            <div className={estilos.div2}>
           <img src={detalledog[0].image} alt={detalledog[0].name}  width="570px" height="390px" />
            <h2 className={estilos.h2}>{detalledog[0].name}</h2>
            <h5>Peso:{!detalledog[0].valor ? detalledog[0].weight.metric : detalledog[0].weight }</h5>
            <h5>Altura:{!detalledog[0].valor ? detalledog[0].height.metric : detalledog[0].height}</h5>
            <h5>Años de vida: {detalledog[0].life_span}</h5>
            <h5>Temperamento : {!detalledog[0].valor ? detalledog[0].temperament : detalledog[0].temperaments.map (e => e.namet + " , ")}</h5>

            <Link to="/home"><button className={estilos.button}>Home</button></Link>
            </div> : <p>Loading...</p>

            

            }
           
            
        </div>
  
    )
}