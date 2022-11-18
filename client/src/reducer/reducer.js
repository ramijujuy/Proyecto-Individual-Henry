import { GET_ALL_DOGS, SEARCH_DOGS, FILTER_DOG_RAZA, FILTER_DOG_TEMPERAMENT, TEMPERAMENT, ORDENAMIENTO, ORDENAMIENTOPESO, NEW_DOG, GET_DOGS_DETAIL } from "../action/action";

const initialstate = {
    alldogs: [],
    dogs: [],
    temperaments:[],
    dogdetail: {},
    searchdog: []    
   
}

export  default function reducer(state = initialstate, action) {

    switch(action.type) {

        case(GET_ALL_DOGS): {
            return {
            ...state,
            dogs: action.payload,
            alldogs: action.payload
        }
    }
        case(SEARCH_DOGS): {
            return {
                ...state,
                dogs: action.payload
            }
        }

        case(FILTER_DOG_TEMPERAMENT):{
            const todosdogs = state.alldogs;
            const tempfiltrada = action.payload === "todos" ? todosdogs : todosdogs.filter(e => e.temperament?.includes(action.payload));
           
            return {
                ...state,
                dogs: tempfiltrada

            }
        }
        case(FILTER_DOG_RAZA):{
            const todosdogs = state.alldogs;
            if (action.payload === "todos") return {
                ...state,
                dogs: todosdogs
            }
            const tempfiltrada = action.payload === "EXI" ? todosdogs.filter(e => !e.valor) : todosdogs.filter(e => e.valor);
           
            return {
                ...state,
                dogs: tempfiltrada

            }
        }

        case(TEMPERAMENT):{
                   
            return {
                ...state,
                temperaments: action.payload

            }
        }

        case(ORDENAMIENTO): {
                      
            let ordenfinal = action.payload === 'asc' ? state.dogs.sort(function(a,b){
                if (a.name.toLowerCase() > b.name.toLowerCase()) {
                    return 1
                }
                if (a.name.toLowerCase() < b.name.toLowerCase()) {
                    return -1
                }
                return 0
            }) : state.dogs.sort(function(a,b){
                if (a.name.toLowerCase() > b.name.toLowerCase()) {
                    return -1
                }
                if (a.name.toLowerCase() < b.name.toLowerCase()) {
                    return 1
                }
                return 0
            })

            return {
                ...state,
                dogs: ordenfinal

            }
        }

        case(ORDENAMIENTOPESO): {
            console.log("Llego al reducer de orden peso", action.payload)
            
            let ordenfinal = action.payload === 'may' ? state.dogs.sort(function(a,b){
                if (!a.weight.metric || !b.weight.metric) return 0
                if (Number(a.weight.metric.split('-')[1]) >Number(b.weight.metric.split('-')[1])) {
                    return -1
                }
                if (Number(a.weight.metric.split('-')[1])< Number(b.weight.metric.split('-')[1])) {
                    return 1
                }
                return 0
            }) : state.dogs.sort(function(a,b){
                if (!a.weight.metric || !b.weight.metric) return 0
                if (Number(a.weight.metric.split('-')[1])> Number(b.weight.metric.split('-')[1])) {
                    return 1
                }
                if (Number(a.weight.metric.split('-')[1])< Number(b.weight.metric.split('-')[1])) {
                    return -1
                }
                return 0
            })

            console.log(ordenfinal)

            return {
                ...state,
                dogs: ordenfinal

            }




        }

        case(NEW_DOG):{

                              
            return {
                ...state,
                
            }   
            }

        case(GET_DOGS_DETAIL):{

            console.log(action.payload)
                   
            return {
                ...state,
                dogdetail: action.payload
                

            }
        }


        default: {
            return state
        }
    }



}