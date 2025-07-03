function nameToSlug(gameName){
    return gameName.toLowerCase()
                   .normalize("NFD")                // elimina tildes
                   .replace(/[\u0300-\u036f]/g, "") // elimina diacríticos
                   .replace(/ñ/g, "n")              // reemplaza ñ 
                   .replace(/[^a-z\s-]/g, "")     // elimina caracteres especiales
                   .trim()                          
                   .replace(/\s+/g, "-");  
}

module.exports = {nameToSlug}

