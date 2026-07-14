import {test, expect} from '@playwright/test'

test('create then read user', async ({ request }) => {
    const created = await request.post('https://reqres.in/api/test-suite/collections/users/records', {
        data: { name: 'Ada',email: 'jane@example.cooom', role: 'admin' }
    });
    expect(created.status()).toBe(201);
    const { id } = await created.json();

    const got = await request.get(`https://reqres.in/api/test-suite/collections/users/records/${id}`);
    expect(got.status()).toBe(200);
    expect((await got.json()).name).toBe('Ada');
});