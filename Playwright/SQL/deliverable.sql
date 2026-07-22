-- ============================================================
-- Base de datos temática: Cines / Películas
-- Misma estructura relacional que el ejemplo original,
-- con nombres adaptados al tema de cine y datos duplicados.
-- ============================================================

CREATE DATABASE practica_sql_cine;

-- Clientes (espectadores que compran boletos)
CREATE TABLE clientes (
  cliente_id INT PRIMARY KEY,
  nombre VARCHAR(100),
  ciudad VARCHAR(100),
  fecha_registro DATE
);

-- Géneros de películas (equivalente a "categorías")
CREATE TABLE generos (
  genero_id INT PRIMARY KEY,
  nombre_genero VARCHAR(100)
);

-- Películas (equivalente a "productos")
CREATE TABLE peliculas (
  pelicula_id INT PRIMARY KEY,
  nombre_pelicula VARCHAR(100),
  genero_id INT,
  precio DECIMAL(10,2),
  FOREIGN KEY (genero_id)
    REFERENCES generos(genero_id)
);

-- Compras (equivalente a "pedidos": una transacción de un cliente)
CREATE TABLE compras (
  compra_id INT PRIMARY KEY,
  cliente_id INT,
  fecha_compra DATE,
  FOREIGN KEY (cliente_id)
    REFERENCES clientes(cliente_id)
);

-- Boletos (equivalente a "detalle_pedidos": qué película y cuántos boletos por compra)
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

Select * FROM clientes;