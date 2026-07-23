import { expect, test } from '@playwright/test';
import { pool, closePool } from '../../utils/db';

test.afterAll(async () => {
    await closePool();
});

test('clientes table has expected costumers', async () => {
    const result = await pool.query('SELECT * FROM clientes WHERE nombre = $1', ['Ana']);

    expect(result.rows.length).toBe(1);
    expect(result.rows[0].ciudad).toBe('Madrid');
});

test('a purchase shows correct customer and movie names', async () => {
  const result = await pool.query(`
    SELECT cl.nombre AS cliente, p.nombre_pelicula, b.cantidad
    FROM clientes cl
    JOIN compras c ON cl.cliente_id = c.cliente_id
    JOIN boletos b ON c.compra_id = b.compra_id
    JOIN peliculas p ON b.pelicula_id = p.pelicula_id
    WHERE c.compra_id = 1
  `);

  expect(result.rows).toEqual([
    { cliente: 'Ana', nombre_pelicula: 'Furia Extrema', cantidad: 1 },
    { cliente: 'Ana', nombre_pelicula: 'Risa Sin Fin', cantidad: 2 },
  ]);
});


test('total tickets sold for "Furia Extrema" matches expected value', async () => {
  const result = await pool.query(`
    SELECT SUM(b.cantidad) AS total
    FROM boletos b
    JOIN peliculas p ON b.pelicula_id = p.pelicula_id
    WHERE p.nombre_pelicula = $1
  `, ['Furia Extrema']);

  const total = Number(result.rows[0].total);
  expect(total).toBe(3); // 1 (compra 1) + 2 (compra 12)
});