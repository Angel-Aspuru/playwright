import { pool } from './db';

//defining data type that matches the structure of the "clientes" table in the database
export interface Cliente {
    cliente_id: number;
    nombre: string;
    ciudad: string;
    fecha_registro: string;
};

export interface Pelicula {
    pelicula_id: number;
    nombre_pelicula: string;
    genero_id: number;
    precio: string; // pg returns DECIMAL as string by default
}

export async function getClienteByName(nombre: string): Promise<Cliente | null> {
    const result = await pool.query('SELECT * FROM clientes WHERE nombre = $1', [nombre]);

    return result.rows[0] ?? null;
};

export async function getPeliculasByGenero(generoId: number): Promise<Pelicula[]> {
    const result = await pool.query<Pelicula>(
        'SELECT * FROM peliculas WHERE genero_id = $1',
        [generoId]
    );

    return result.rows;
}

export async function getTotalBoletosVendidos(nombrePelicula: string): Promise<number | null> {
    const result = await pool.query<{ total: string }>(
        `SELECT SUM(b.cantidad) AS total
     FROM boletos b
     JOIN peliculas p ON b.pelicula_id = p.pelicula_id
     WHERE p.nombre_pelicula = $1`,
        [nombrePelicula]
    );

    const row = result.rows[0];
    if (!row || row.total === null) return null;

    return Number(row.total);
}