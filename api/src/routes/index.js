const {Dog, Temperament} = require("../db")
const axios= require("axios");
const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
//instalar axios y llamarlo si no no funciona

const consultaurl = async () => {
    const consulurl = await axios.get("https://api.thedogapi.com/v1/breeds");
    const infurl = await consulurl.data.map(e => {
        return {
            id : e.id,
            image: e.image.url,
            name: e.name,
            temperament: e.temperament,
            height: e.height,
            weight: e.weight,
            life_span: e.life_span
        
        }

        
    })
    return infurl

}

const consultabase = async () => {
    return await Dog.findAll({
        include: {
            model: Temperament,
            attributes: ["namet"],
          through: {
                attributes: [],
            }, 
        }
    })

} 

const consultotal = async () =>{
    const urltotal = await consultaurl();
    const basetotal = await consultabase();
    const infototal = urltotal.concat(basetotal)
    return infototal

}




router.get('/dogs', async(req, res) => {
    const name  = req.query.name
    let totaldogs = await consultotal();
    
   
    if (name) {

        let buscardog = await totaldogs.filter(e => e.name.toLowerCase().includes(name.toLowerCase()))
        buscardog.length ? res.status(200).send(buscardog) : res.status(404).send(buscardog)
    }
    
    else {
        return res.status(200).send(totaldogs)


    }
 
     })   

router.post('/dogs', async function (req, res) {
       try {
        const { name, height, weight, life_span,temperament} = req.body;
        let newDog = await Dog.create({
                name,
                height,
                weight,
                life_span,
                                          
            })

                           
  
     let tempbase = await Temperament.findAll({
            where: {
               namet : temperament
            }
        }) 
         let tempbase1 = tempbase.map(p =>p.toJSON())
             console.log(tempbase1)
          let tempbase2 = tempbase1.map(t=> t.namet)
          console.log(tempbase2)   
         newDog.addTemperament(tempbase) 
            res.send("Dog agregado con exito")
    } catch(error){
        res.status(401).send(error + " No se cargo Dog")

    } 
    
         
        
    })

 router.get('/dogs/:id', async (req,res) =>{
    console.log("toy en dog id")
    const { id } = req.params
    console.log(id.length)
   

    let totaldogs = await consultotal();
    
    if (id.length < 4) {

       let buscardog = totaldogs.filter(e => Number.parseInt(e.id) === Number.parseInt(id))
       buscardog ? res.status(200).json(buscardog) : res.status(404).send("NO EXISTE LA RAZA BUSCADA")
    }
   else {
        let buscardog = totaldogs.filter(e => e.id === id)
        buscardog ? res.status(200).json(buscardog) : res.status(404).send("NO EXISTE LA RAZA BUSCADA")
    } 
})


/*     router.get('/dogs/?name=', async (req,res) =>{
        console.log("toy en dog name")
        const { name } = req.params
        console.log(name.length)
       
    
        let totaldogs = await consultotal();
        
        if (name) {
    
           let buscardog = totaldogs.filter(e => e.name === name)
           buscardog ? res.status(200).json(buscardog) : res.status(404).send("NO EXISTE LA RAZA BUSCADA")
        }
       else {
            let buscardog = totaldogs.filter(e => e.id === id)
            buscardog ? res.status(200).json(buscardog) : res.status(404).send("NO EXISTE LA RAZA BUSCADA")
        } 
    



 })   
  */
  

 router.get('/temperament', async function (req, res) {
    const temperamentapi = await axios.get("https://api.thedogapi.com/v1/breeds");
    const tempe = temperamentapi.data.map(e => e.temperament)
   
    for (let index = 0; index < tempe.length; index++) {
        if (tempe[index]) {
        let element = tempe[index].split(", ")
      
        for (let j = 0; j < element.length; j++) {
           
            Temperament.findOrCreate({
                where : {
                    namet: element[j]
                }
            
        })
        
        }

    }}              
      
        const todostemp = await Temperament.findAll();
        res.send(todostemp)
                
    }) 
    
   
         
        
    





module.exports = router;
