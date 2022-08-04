const Axios = require('axios');
const {Router} = require('express');
const {Videogame, Genre} = require('../db');
const {v4: uuidv4, validate: uuidValidate} = require('uuid');
require('dotenv').config();
const { API_KEY } = process.env;


const router = Router();

const findGameApi = async(attributes) => {
    const res = await Axios.get(`https://api.rawg.io/api/games/${attributes}?key=${API_KEY}`);
    const game = {
        ID: res.data.id,
        name: res.data.name,
        released: res.data.released,
        rating: res.data.rating,
        platforms: res.data.platforms.map(p => p.platform.name),
        description: res.data.description,
        genres: res.data.genres.map(g => g.name),
        image: res.data.background_image
    }
    if(game.ID){
        return game
    }
    return false
};

const getApiInfo = async () => {

    const res1 = await Axios.get(`https://api.rawg.io/api/games?key=${API_KEY}`)
    const res2 = await Axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=2`)
    const res3 = await Axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=3`)
    const res4 = await Axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=4`)
    const res5 = await Axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=5`)

    const info = res1.data.results.concat(
        res2.data.results,
        res3.data.results,
        res4.data.results,
        res5.data.results
        )

    const apiInfo = await Promise.all(info.map(async obj => {
        let id = obj.id;
        
        return await findGameApi(id);
    }))

    return apiInfo;
}

const getDbInfo = async () => {
    return await Videogame.findAll({
        include: {
            model: Genre,
            attributes: ["ID", "name"],
            through: {attributes: []}
        }
    })
}


const getAllGames = async () => {
    const apiInfo = await getApiInfo();
    const dbInfo = await getDbInfo();
    const allInfo = apiInfo.concat(dbInfo);
    return allInfo;
}

router.get('/videogames', async (req, res) => {
    const {name} = req.query;

    let games = await getAllGames();
    
    if(name){
        let gameName = games.filter(g => g.name.toLowerCase().includes(name.toLowerCase()))
        gameName.length 
        ? res.status(200).json(gameName)
        : res.status(404).send("Videogame not found")
    } else {
        res.status(200).json(games)
    }
})


router.get('/videogame/:idVideogame', async (req, res) => {
    const {idVideogame} = req.params;

    if(uuidValidate(idVideogame)) {
        const getIdDB = await Videogame.findByPk(idVideogame, {
            include: Genre
        });

        res.status(200).json(getIdDB)
    } else {
        let game = await findGameApi(idVideogame)
        res.json(game)
    }
})

router.post('/videogame', async (req, res) => {
    try {
        let {name, description, released, rating, platforms, genres} = req.body;
        let createdGame = await Videogame.create({
            name, 
            description,
            released,
            rating,
            platforms
        })

        let genreDb = await Genre.findAll({
            where: {
                name: genres
            }
        })
      await  createdGame.addGenre(genreDb);
        res.send("Created!")
    } catch (error) {
        console.log(error)
    }
})



router.get("/genres", async (req, res) => {
    try {
      let genres = await Genre.findAll();
      if (!genres.length) {
        const genresApi = await Axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`);
        genres = await genresApi.data.results.map((el) => ({
          name: el.name,
        }));
        await Genre.bulkCreate(genres);
        genres = await Genre.findAll();
      }  
      res.send(genres);
    } catch (error) {
      console.log(error);
    }
});




module.exports = router;