require('dotenv').config();


async function getRelatedGames(game) {
  const URL = "https://api.rawg.io/api/games?search=" + game + "&key=" + process.env.RAWG_API_KEY;

  let games = await fetch(URL);
  let json = await games.json();

  if (json.results.length === 0) {
    console.log("No existe el juego");
    return null;
  }

  if (json.results[0].name.toLowerCase() === game.toLowerCase()) {
    return await getGameById(json.results[0].id); 
  } else {
    console.log("No coincide exactamente");
    return null;
  }
}

async function getGameById(id){
    const URL = "https://api.rawg.io/api/games/" + id + "?&key=" + process.env.RAWG_API_KEY;
   
    let game = await fetch(URL);
    let json = await game.json();
    
    // console.log(json)
    return json
}

// getRelatedGames("League of Legends")

module.exports = { getRelatedGames, getGameById }
