## Workflow añadir juego a la bbdd si no existe

1 - Usuario añade juego a su perfil
2 - Backend comprueba si ese juego ya está añadido a la tabla "games".
    
    Si lo está: 
                 - Crea la relación entre "user_id" y "game_id" correspondientes en la tabla "user_games".

    Si no lo está:
                 - Hace una petición con el nombre del juego a la API de Rawg y recibe un JSON con las coincidencias del juego.
                 - Si hay coincidencia exacta del nombre del juego, añade los datos de ese juego en concreto a la tabla "games".
                 - Crea la relación entre "user_id" y "game_id" correspondientes en la tabla "user_games".



## SQL:

## CREAR TABLA

CREATE TABLE tabla (
    id SERIAL PRIMARY KEY, -- Identificador único autoincremental
    nombre VARCHAR(50) NOT NULL, -- Columna de texto con máximo 50 caracteres
    edad INT, -- Columna para números enteros
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP -- Fecha y hora por defecto
);

## INSERTAR DATOS

INSERT INTO tabla (nombre, edad)
VALUES ('Juan', 30), ('Ana', 25);

## CONSULTAR DATOS

SELECT * FROM tabla;

SELECT nombre, edad FROM tabla WHERE edad > 20;

## ACTUALIZAR DATOS

UPDATE tabla
SET edad = 35
WHERE nombre = 'Juan';

## ELIMINAR DATOS

DELETE FROM tabla WHERE edad < 30;


## MODIFICAR ESTRUCTURA DE UNA TABLA

##### Agregar columna

ALTER TABLE tabla
ADD COLUMN genero VARCHAR(10);


##### Modificar tipo columna

ALTER TABLE tabla
ALTER COLUMN edad TYPE TEXT;

##### Renombrar columna

ALTER TABLE tabla
RENAME COLUMN nombre TO nombre_completo;

## ELIMINAR COLUMNA

ALTER TABLE tabla
DROP COLUMN genero;

## ELIMINAR TABLA

DROP TABLE tabla;

## SELECCIONAR DATOS DE DOS TABLAS

##### Inner join

SELECT tabla1.campo, tabla2.campo
FROM tabla1
JOIN tabla2 ON tabla1.id =tabla2.id;

// Devuelve solo las filas que tienen coincidencias en ambas tablas.

##### Left join (Todo de la izquierda + Coincidencias de la derecha)

SELECT users.username, user_info.age
FROM users
LEFT JOIN user_info ON users.id = user_info.user_id;

// Devuelve todas las filas de users, incluso si no hay coincidencias en user_info. Las columnas de user_info serán NULL para las filas sin coincidencia.

##### Right join (Todo de la derecha + Coincidencias de la izquierda)

SELECT users.username, user_info.age
FROM users
RIGHT JOIN user_info ON users.id = user_info.user_id;

// Devuelve todas las filas de user_info, incluso si no hay coincidencias en users. Las columnas de users serán NULL para las filas sin coincidencia.

##### Full outer join (Todo de ambas tablas)

SELECT users.username, user_info.age
FROM users
FULL OUTER JOIN user_info ON users.id = user_info.user_id;

// Devuelve todas las filas de ambas tablas. Si no hay coincidencias, las columnas faltantes tendrán NULL.

##### Subconsulta

SELECT username, email
FROM users
WHERE id IN (
    SELECT user_id
    FROM user_info
    WHERE age > 25
);

// Selecciona usuarios cuyos id están presentes en el resultado de la subconsulta.

##### Alias para simplificar

SELECT u.username, i.age
FROM users AS u
JOIN user_info AS i ON u.id = i.user_id;

##### Combinar datos no relacionados

SELECT u.username, i.preferences
FROM users AS u, user_info AS i;

// Combina cada fila de users con cada fila de user_info. Genera un producto cartesiano.

##### Filtrar resultados

SELECT users.username, user_info.age
FROM users
JOIN user_info ON users.id = user_info.user_id
WHERE user_info.age > 25 AND user_info.preferences LIKE '%coding%';

