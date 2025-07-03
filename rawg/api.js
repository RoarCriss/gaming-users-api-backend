require('dotenv').config();




async function searchGameByName(game) {
  const URL = "https://api.rawg.io/api/games?search=" + game + "&key=" + process.env.RAWG_API_KEY;
  let games = await fetch(URL);
  let json = await games.json();
  const results = await json.results

  if (json.results.length === 0) {
    console.log("No existe el juego");
    return null;
  }
  console.log(results.slice(0,3))
  return results.slice(0,5)
}



// Por ahora, a la hora de añadir un juego se usan estas dos funciones
async function getRelatedGames(game) {
  const URL = "https://api.rawg.io/api/games?search=" + game + "&key=" + process.env.RAWG_API_KEY;

  let games = await fetch(URL);
  let json = await games.json();

  if (json.results.length === 0) {
    console.log("No existe el juego");
    return null;
  }

  if (json.results[0].name.toLowerCase() === game.toLowerCase()) {
    return await searchGameById(json.results[0].id); 
  } else {
    console.log("No coincide exactamente");
    return null;
  }
}

async function searchGameById(id){
    const URL = "https://api.rawg.io/api/games/" + id + "?&key=" + process.env.RAWG_API_KEY;
   
    let game = await fetch(URL);
    let json = await game.json();
    
    // console.log(json)
    return json
}

// getRelatedGames("League of Legends")
// searchGames("The Legend of Zelda Twilight")

module.exports = { getRelatedGames, getRelatedGames, searchGameById }











// Versión que puede devolver una sola ocurrencia

// async function getRelatedGamesNew(game) {
//   const URL = "https://api.rawg.io/api/games?search=" + game + "&key=" + process.env.RAWG_API_KEY;
//   let games = await fetch(URL);
//   let json = await games.json();
//   const results = await json.results

//   if (json.results.length === 0) {
//     console.log("No existe el juego");
//     return null;
//   }

//   // Devuelve solamente el juego exacto en caso de que coincida con el título 
//   // Podría hacerse que directamente siempre devolviera 5 coincidencias para elegir la que sea correcta, porque por ejemplo
//   // al buscar "Crash Bandicoot", solo devolverá una ocurrencia ya que coincide exactamente con el nombre del primer título,
//   // y sería interesante que al buscar el nombre de una saga, te salieran los distintos juegos. (Crash Bandicoot, Resident Evil, etc)
//   const multipleMatch = results.slice(0,5)
//   const uniqueMatch = results.filter(element => element.name === game);

//   if (uniqueMatch.length === 1){
//     console.log(uniqueMatch)
//     return uniqueMatch
//   }
//   else {
//     console.log(multipleMatch)
//     return multipleMatch
//   }
// }