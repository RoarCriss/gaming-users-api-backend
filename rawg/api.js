require('dotenv').config();


async function getRelatedGames(game) {
    const URL = "https://api.rawg.io/api/games?search=" + game + "&key=" + process.env.RAWG_API_KEY;

    let games = await fetch(URL);
    let json = await games.json();

    game === json.results[0].name ? getGameById(json.results[0].id) : console.log("No existe el juego");

}

async function getGameById(id){
    const URL = "https://api.rawg.io/api/games/" + id + "?&key=" + process.env.RAWG_API_KEY;
   
    let game = await fetch(URL);
    let json = await game.json();
    console.log(json)
}

getRelatedGames("The Witcher");
