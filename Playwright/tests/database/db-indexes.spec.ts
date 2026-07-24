import {test, expect} from '@playwright/test';
import {closePool, pool} from '../../utils/db';

test.afterAll(async () => {
    await closePool();
});

test('inspect query plan for a slow-looking query', async () => {
    const result = await pool.query(`
        EXPLAIN ANALYZE
        SELECT * FROM boletos WHERE compra_id = $1
        `, [4]);

    console.log(result.rows.map(r => r['QUERY PLAN']).join('\n'));
});