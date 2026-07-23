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

test('practica_sql_cine has the expected tables', async () => {
  const result = await pool.query<{ table_name: string }>(`
    SELECT DISTINCT table_name
    FROM information_schema.tables
    WHERE table_schema = 'public'
  `);

  const tableNames = result.rows.map(r => r.table_name);

  expect(tableNames).toEqual(
    expect.arrayContaining(['clientes', 'generos', 'peliculas', 'compras', 'boletos'])
  );
});
// Typed mapping: whether it's Java's record + while(rs.next()), or TypeScript's interface + pool.query<T>(...), the goal is the same — don't leave raw untyped rows floating through your test code.
// information_schema: think of it as "the database describing itself." Any time you inherit an undocumented database (very common), this is your ERD substitute.