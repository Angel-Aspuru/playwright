import { Pool } from 'pg';

export const pool = new Pool({
    host: 'localhost',
    port: 5432,
    user: 'cine_user',
    password: 'cine_pass',
    database: 'practica_sql_cine',
});

export async function closePool() {
    await pool.end();
};