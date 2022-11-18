import React, {useState} from "react";
import { useSelector, useDispatch } from "react-redux";
import { searchbar } from "../action/action";
import { Link } from "react-router-dom";



export default function Searchbar() {

    const [search, setsearch] = useState('')

    const dogs = useSelector(state=>state.searchdog)

    const dispatch = useDispatch()

    function handleChange(e) {
              // el preventdefault es para el submit  e.preventdefault()
              setsearch(e.target.value)
       }

     function handleSubmit(event)  {
        event.preventDefault()
        dispatch(searchbar(search))
        setsearch("")
        
     }

    return (

        <div>
            <form onSubmit={handleSubmit}>
                <input type="text" value={search} onChange={handleChange} />
                <button type="submit"> Buscar Raza </button>
            </form>

            {dogs && dogs.map(p => {
            return (
                <div key={p.id}  >
                <img src={p.image} alt={p.name} />
                <Link to={'/detail/' + p.id}><p>{p.name}</p></Link>
                </div>
            )
           })}
        </div>
    )

}