import { test, expect } from "@playwright/test";

test("create then read user", async ({ request }) => {
  const created = await request.post(
    "https://api.restful-api.dev/objects",
    {
      //   data: { name: "Ada", email: "jane@example.cooom", role: "admin" },
      data: {
        name: "Apple MacBook Pro 16",
        data: {
          year: 2019,
          price: 1849.99,
          "CPU model": "Intel Core i9",
          "Hard disk size": "1 TB",
        },
      },
      headers: { "Content-Type": "application/json" },
    },
  );
  expect(created.status()).toBe(200);
  const { id } = await created.json();

  const got = await request.get(
    `https://api.restful-api.dev/objects/${id}`,
  );
  expect(got.status()).toBe(200);
  expect((await got.json()).name).toBe("Ada");
});
