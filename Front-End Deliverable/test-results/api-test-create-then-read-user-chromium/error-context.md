# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: api-test.spec.ts >> create then read user
- Location: tests\api-test.spec.ts:3:5

# Error details

```
Error: expect(received).toBe(expected) // Object.is equality

Expected: "Ada"
Received: "Apple MacBook Pro 16"
```

# Test source

```ts
  1  | import { test, expect } from "@playwright/test";
  2  | 
  3  | test("create then read user", async ({ request }) => {
  4  |   const created = await request.post(
  5  |     "https://api.restful-api.dev/objects",
  6  |     {
  7  |       //   data: { name: "Ada", email: "jane@example.cooom", role: "admin" },
  8  |       data: {
  9  |         name: "Apple MacBook Pro 16",
  10 |         data: {
  11 |           year: 2019,
  12 |           price: 1849.99,
  13 |           "CPU model": "Intel Core i9",
  14 |           "Hard disk size": "1 TB",
  15 |         },
  16 |       },
  17 |       headers: { "Content-Type": "application/json" },
  18 |     },
  19 |   );
  20 |   expect(created.status()).toBe(200);
  21 |   const { id } = await created.json();
  22 | 
  23 |   const got = await request.get(
  24 |     `https://api.restful-api.dev/objects/${id}`,
  25 |   );
  26 |   expect(got.status()).toBe(200);
> 27 |   expect((await got.json()).name).toBe("Ada");
     |                                   ^ Error: expect(received).toBe(expected) // Object.is equality
  28 | });
  29 | 
```