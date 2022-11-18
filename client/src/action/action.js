export const GET_ALL_DOGS = "GET_ALL_DOGS";
export const GET_DOGS_DETAIL = "GET_DOGS_DETAIL";
export const TEMPERAMENT = "TEMPERAMENT";
export const SEARCH_DOGS = "SEARCH_DOGS";
export const NEW_DOG = "NEW_DOG";
export const FILTER_DOG_RAZA = "FILTER_DOG_RAZA";
export const FILTER_DOG_TEMPERAMENT = "FILTER_DOG_TEMPERAMENT";
export const ORDENAMIENTO = "ORDENAMIENTO";
export const ORDENAMIENTOPESO = "ORDENAMIENTOPESO";


export function getalldogs() {
   
    return function(dispatch){
        return fetch('http://localhost:3001/dogs')
               .then(res => res.json())
               .then(r => dispatch({type: GET_ALL_DOGS, payload: r}))
               .catch(error => console.log("error", error))
    } 
}

 export function searchdog(name) {
    
    return function(dispatch){
        return fetch(`http://localhost:3001/dogs?name=${name}`)
               .then(res => res.json())
               .then(r => dispatch({type: SEARCH_DOGS, payload: r}))
               .catch(error => console.log("error"))
    } 
}

export function filterdogtemp(payload){

    return {
        type: FILTER_DOG_TEMPERAMENT,
        payload
    }
    } 

export function temperament(){
   
        return function(dispatch){
            return fetch('http://localhost:3001/temperament')
                   .then(res => res.json())
                   .then(json => dispatch({type: TEMPERAMENT, payload: json}))
                   .catch(error => console.log("error"))
        } 
    }
export function postnewdog(payload){

    return function(dispatch){
        return fetch('http://localhost:3001/dogs', {
               method: "POST",
               body: JSON.stringify(payload),
               headers:{
                'Content-Type': 'application/json'
               }
             })
               .then(res => res.json())
               .then(json => dispatch({type: NEW_DOG, payload: json}))
               .catch(error => console.log("error"))
    

          

}}

export function filterdogRaza(payload){
        return {
            type: FILTER_DOG_RAZA,
            payload
        }
        }     

export function ordenname(payload) {
   
    return {
        type: ORDENAMIENTO,
        payload
    }
}
export function ordenpeso(payload) {
    console.log("llego action orden peso")
          return {
            type: ORDENAMIENTOPESO,
            payload
        }

}

export function getcharacterdetail(id){
        console.log("llego al search por id")
        return function(dispatch){
            return fetch("http://localhost:3001/dogs/" + id)
                   .then(res => res.json())
                   .then(r => dispatch({type: GET_DOGS_DETAIL, payload: r}))
                   .catch(error => console.log("error"))
        } 
    }



  

