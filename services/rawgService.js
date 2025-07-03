//Busca juegos en RAWG por nombre
const searchNameInRawgByName = async (name) => {
 const response = await fetch(
      `https://api.rawg.io/api/games?search=${encodeURIComponent(name)}&key=${process.env.RAWG_API_KEY}`
    );
    //                            Búsqueda limitada a 5 ocurrencias
    const data = (await response.json()).results.slice(0, 5);

    return data.map(item => ({ name: item.name, id: item.id }));
}


// Busca details de juego en RAWG por ID
const searchGameInRawgById = async (id) => {
  const response = await fetch(
    `https://api.rawg.io/api/games/${id}?&key=${process.env.RAWG_API_KEY}`
  );
  const data = await response.json();
  
  // console.log(data)
  return {
    "name": data.name,
    "slug": data.slug
  }
}

module.exports = {searchGameInRawgById, searchNameInRawgByName}