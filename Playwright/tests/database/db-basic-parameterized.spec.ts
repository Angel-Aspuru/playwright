import { test, expect } from '@playwright/test';
import { closePool } from '../../utils/db';
import { getClienteByName, getPeliculasByGenero, getTotalBoletosVendidos } from '../../utils/queries';

test.afterAll(async () => {
    await closePool();
});

test('getClienteByName returns correct client data', async () => {
    const cliente = await getClienteByName('Ana');
    expect(cliente).not.toBeNull();
    expect(cliente?.ciudad).toBe('Madrid');
});

test('there are movies in the "Accion" genre', async () => {
    const peliculas = await getPeliculasByGenero(1); // Assuming 1 is the ID for "Accion"
    expect(peliculas.length).toBeGreaterThan(0);
});

test('Furia extrema sold the expected number of tickets', async () => {
    const total = await getTotalBoletosVendidos('Furia Extrema');

    expect(total).toBe(4);
})