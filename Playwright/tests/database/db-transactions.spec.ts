import { pool } from '../../utils/db';
import { test, expect } from '@playwright/test';

test('a new purchase is correctly linked to the customer', async () => {
    const client = await pool.connect();

    try {
        await client.query('BEGIN');

        // Insert a new customer
        await client.query('INSERT INTO clientes (cliente_id, nombre, ciudad, fecha_registro) VALUES ($1, $2, $3, $4)', [999, 'Test User', 'Tokyo', '2029-09-01']);
        //insert a purchase into the customer
        await client.query('INSERT INTO compras (compra_id, cliente_id, fecha_compra) VALUES ($1, $2, $3)', [999, 999, '2029-09-01']);
        // run the actual check
        const result = await client.query('SELECT * FROM compras WHERE cliente_id = $1', [999]);

        expect(result.rows.length).toBe(1);
        
    } finally {
        await client.query('ROLLBACK');//undo evertyhing db clean again
        client.release(); //return the connection to the pool
    }
})

test('buying tickets updates boletos correctly for a new compra', async () => {
  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    // Setup: a new compra for an existing customer (Ana, cliente_id 1)
    await client.query(
      'INSERT INTO compras (compra_id, cliente_id, fecha_compra) VALUES ($1, $2, $3)',
      [999, 1, '2024-06-01']
    );

    // Action: Ana buys 2 tickets for "Furia Extrema" (pelicula_id 1)
    await client.query(
      'INSERT INTO boletos (boleto_id, compra_id, pelicula_id, cantidad) VALUES ($1, $2, $3, $4)',
      [999, 999, 1, 2]
    );

    // Verify: total sold for "Furia Extrema" temporarily includes these 2 extra tickets
    const result = await client.query(`
      SELECT SUM(b.cantidad) AS total
      FROM boletos b
      JOIN peliculas p ON b.pelicula_id = p.pelicula_id
      WHERE p.nombre_pelicula = $1
    `, ['Furia Extrema']);

    expect(Number(result.rows[0].total)).toBe(6); // 4 original + 2 new

  } finally {
    await client.query('ROLLBACK');
    client.release();
  }
});

// const client = await pool.connect(); // reserve one specific connection
// // ... client.query(...) for everything in the transaction
// client.release(); // give it back when done