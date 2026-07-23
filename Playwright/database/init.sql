--CREATE DATABASE practica_sql_cine;

-- Clientes (espectadores que compran boletos)
CREATE TABLE clientes (
  cliente_id INT PRIMARY KEY,
  nombre VARCHAR(100),
  ciudad VARCHAR(100),
  fecha_registro DATE
);

-- Géneros de películas 
CREATE TABLE generos (
  genero_id INT PRIMARY KEY,
  nombre_genero VARCHAR(100)
);

-- Películas 
CREATE TABLE peliculas (
  pelicula_id INT PRIMARY KEY,
  nombre_pelicula VARCHAR(100),
  genero_id INT,
  precio DECIMAL(10,2),
  FOREIGN KEY (genero_id)
    REFERENCES generos(genero_id)
);

-- Compras (una transacción de un cliente)
CREATE TABLE compras (
  compra_id INT PRIMARY KEY,
  cliente_id INT,
  fecha_compra DATE,
  FOREIGN KEY (cliente_id)
    REFERENCES clientes(cliente_id)
);

-- Boletos 
CREATE TABLE boletos (
  boleto_id INT PRIMARY KEY,
  compra_id INT,
  pelicula_id INT,
  cantidad INT,
  FOREIGN KEY (compra_id)
    REFERENCES compras(compra_id),
  FOREIGN KEY (pelicula_id)
    REFERENCES peliculas(pelicula_id)
);

-- ============================================================
-- Datos (aprox. el doble de filas que el original en cada tabla)
-- ============================================================

INSERT INTO clientes VALUES
(1,'Ana','Madrid','2023-01-10'),
(2,'Luis','Barcelona','2023-02-15'),
(3,'Marta','Valencia','2023-03-20'),
(4,'Pedro','Madrid','2023-04-05'),
(5,'Sofia','Sevilla','2023-05-12'),
(6,'Carlos','Bilbao','2023-06-01'),
(7,'Elena','Zaragoza','2023-06-20'),
(8,'Javier','Malaga','2023-07-15'),
(9,'Lucia','Madrid','2023-08-02'),
(10,'Diego','Valencia','2023-08-25');

INSERT INTO generos VALUES
(1,'Acción'),
(2,'Comedia'),
(3,'Terror'),
(4,'Drama'),
(5,'Animación'),
(6,'Ciencia Ficción');

INSERT INTO peliculas VALUES
(1,'Furia Extrema',1,9.50),
(2,'Explosion Total',1,10.00),
(3,'Risa Sin Fin',2,7.50),
(4,'Locos por el Amor',2,8.00),
(5,'Noche de Terror',3,9.00),
(6,'La Casa Maldita',3,8.50),
(7,'Lagrimas de Otoño',4,7.00),
(8,'El Ultimo Adios',4,7.50),
(9,'Mundo de Juguetes',5,6.50),
(10,'Aventura Animada',5,6.00),
(11,'Viaje a las Estrellas',6,11.00),
(12,'Robots del Futuro',6,10.50),
(13,'Amor en Paris',4,8.00),
(14,'Carrera Mortal',1,9.75);

INSERT INTO compras VALUES
(1,1,'2024-01-10'),
(2,2,'2024-01-11'),
(3,1,'2024-01-15'),
(4,3,'2024-02-01'),
(5,4,'2024-02-10'),
(6,5,'2024-02-15'),
(7,6,'2024-03-01'),
(8,7,'2024-03-05'),
(9,8,'2024-03-10'),
(10,9,'2024-03-15'),
(11,10,'2024-03-20'),
(12,2,'2024-04-01');

INSERT INTO boletos VALUES
(1,1,1,1),
(2,1,3,2),
(3,2,2,1),
(4,2,5,3),
(5,3,6,1),
(6,4,7,4),
(7,4,3,2),
(8,5,4,1),
(9,6,1,1),
(10,6,2,2),
(11,7,9,2),
(12,7,11,1),
(13,8,12,3),
(14,8,8,1),
(15,9,10,2),
(16,9,13,1),
(17,10,14,2),
(18,10,5,1),
(19,11,6,3),
(20,12,1,2);

----------------------------------------------------------------------------------
--WHERE clauses
----------------------------------------------------------------------------------
--Find all clients who live in "Madrid".
SELECT * FROM clientes
WHERE ciudad = 'Madrid';

--Find all movies with a precio greater than 9.00.
SELECT * FROM peliculas
WHERE precio > 9.00;    

--Find all purchases (compras) made after '2024-02-01'.
SELECT * FROM compras
WHERE fecha_compra > '2024-02-01';

--Find all movies that belong to the "Terror" genre (using genero_id directly, no join).
SELECT * FROM Peliculas
WHERE genero_id = 3;
----------------------------------------------------------------------------------
--JOINS types
----------------------------------------------------------------------------------
--List each purchase along with the customer's name (clientes + compras).
SELECT c.compra_id, c.fecha_compra, cl.nombre 
from compras c
join clientes cl on c.cliente_id = cl.cliente_id;

--List each ticket (boletos) along with the movie name it belongs to.
SELECT b.boleto_id, b.cantidad, p.nombre_pelicula
FROM boletos b
JOIN peliculas p ON b.pelicula_id = p.pelicula_id;

--List every movie along with its genre name, including movies that might not have a matching genre (use a LEFT JOIN).
SELECT p.nombre_pelicula, g.nombre_genero
FROM peliculas p
LEFT JOIN generos g ON p.genero_id = g.genero_id;

--List every genre along with any movies in that genre, including genres that have no movies at all (use a LEFT JOIN, think about which table goes first).
SELECT g.nombre_genero, p.nombre_pelicula
FROM generos g
LEFT JOIN peliculas p ON g.genero_id = p.genero_id;

--Combine clientes, compras, boletos, and peliculas in one query to show: customer name, movie name, and quantity purchased.
SELECT cl.nombre, c.fecha_compra, p.nombre_pelicula, b.cantidad
FROM clientes cl
JOIN compras c ON cl.cliente_id = c.cliente_id
JOIN boletos b ON c.compra_id = b.compra_id
JOIN peliculas p ON b.pelicula_id = p.pelicula_id

----------------------------------------------------------------------------------
--Aggregate functions
----------------------------------------------------------------------------------
--Count how many customers are registered in total.
SELECT COUNT(*) AS total_clientes
FROM clientes;

--Find the average ticket price (precio) across all movies.
SELECT AVG(precio) AS precio_promedio
FROM peliculas;

--Find the most expensive movie (MAX).
SELECT MAX(precio) AS pelicula_mas_cara
FROM peliculas; 

--Find the total quantity of tickets sold across all boletos.
SELECT SUM(cantidad) AS total_boletos_vendidos
FROM boletos;

----------------------------------------------------------------------------------
--GROUP BY
----------------------------------------------------------------------------------
--Show the total number of movies per genre.
SELECT g.nombre_genero, COUNT(p.pelicula_id) AS cantidad_peliculas
FROM generos g
LEFT JOIN peliculas p ON g.genero_id = p.genero_id
GROUP BY g.nombre_genero;

--Show the total quantity of tickets sold per movie.
SELECT p.nombre_pelicula, SUM(b.cantidad) AS total_boletos_vendidos
FROM peliculas p
LEFT JOIN boletos b ON p.pelicula_id = b.pelicula_id
GROUP BY p.nombre_pelicula;

--Show the total quantity of tickets sold per customer.
SELECT cl.nombre, SUM(b.cantidad) as total_boletos_comprados
from clientes cl
left join compras c on cl.cliente_id = c.cliente_id
left join boletos b on c.compra_id = b.compra_id
group by cl.nombre;

--Show the total amount spent (price × quantity) per customer.
SELECT cl.nombre, sum(p.precio * b.cantidad) as total_gastado
from clientes cl
left join compras c on cl.cliente_id = c.cliente_id
left join boletos b on c.compra_id = b.compra_id
left join peliculas p on b.pelicula_id = p.pelicula_id
group by cl.nombre;
--Show the number of purchases made per city (clientes.ciudad).
select cl.ciudad, SUM(b.cantidad) as total_boletos_vendidos
from clientes cl
left join compras c on cl.cliente_id = c.cliente_id
left join boletos b on c.compra_id = b.compra_id
group by cl.ciudad;

----------------------------------------------------------------------------------
--Combined (WHERE + GROUP BY + HAVING)
----------------------------------------------------------------------------------
--Show genres that have more than 2 movies.
select g.nombre_genero, COUNT(p.pelicula_id) AS cantidad_peliculas
from generos g
left join peliculas p on g.genero_id = p.genero_id
group by g.nombre_genero
having count(p.pelicula_id) > 2;

--Show customers who have bought more than 3 tickets in total.
select cl.nombre, sum(b.cantidad) as total_boletos_comprados
from clientes cl
left join compras c on cl.cliente_id = c.cliente_id
left join boletos b on c.compra_id = b.compra_id
group by cl.nombre
having sum(b.cantidad) > 3;
--Show movies that have sold more than 2 tickets, ordered from highest to lowest quantity.
select p.nombre_pelicula, sum(b.cantidad) as total_boletos_vendidos
from peliculas p
left join boletos b on p.pelicula_id = b.pelicula_id
group by p.nombre_pelicula
having sum(b.cantidad) > 2
order by total_boletos_vendidos desc;