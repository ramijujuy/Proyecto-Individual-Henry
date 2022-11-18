import React, {useEffect}  from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { getalldogs } from "../action/action";

export default function Home() {

    const dispatch = useDispatch();
    const alldogs = useSelector(state => state.alldogs)
    useEffect(()=>{
        dispatch(getalldogs())
    },[] )

    console.log(alldogs)
    return (
        
          <div>
           {alldogs && alldogs.map(p => {
            return (
                <li key={p.id}><img src={p.image.url} alt={p.name} />
                <Link to={'/detail/' + p.id}><p>{p.name}</p></Link>
                <button>FAV</button></li>
            )
           })}
          </div>
         
    )
}









/* 
export default function Home() {
    console.log("llego a home")
    return (
        <div>
            Holla Home
        </div>
    )
} */