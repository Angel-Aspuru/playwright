import { test, expect } from "@playwright/test";
import { readCsv } from "../../../utils/csv-reader";

interface ObjectData {
  id: string;
  expectedName: string;
}

interface Product {
  name: string;
  year: string;
  price: string;
}

interface EndpointData {
  endpoint: string;
  statusCode: string;
}

const objects = readCsv<ObjectData>(`${process.env.DATA_PATH}/objects.csv`);
const products = readCsv<Product>(`${process.env.DATA_PATH}/products.csv`);
const endpoints = readCsv<EndpointData>(
  `${process.env.DATA_PATH}/endpoints.csv`,
);

for (const object of objects) {
  test(`Validate object ${object.id}`, async ({ request }) => {
        const response2 = await request.get(
        "https://api.restful-api.dev/objects/1",
        {
            headers: {
            "x-api-key": process.env.API_KEY!,
            },
        },
        );

    console.log(await response2.json());

    const response = await request.get(
      `https://api.restful-api.dev/objects/${object.id}`,
      {
        headers: {
          "x-api-key": process.env.API_KEY!,
        },
      },
    );

    expect(response.ok()).toBeTruthy();

    const body = await response.json();

    expect(body.name).toBe(object.expectedName);
  });
}

for (const product of products) {
  test(`Create ${product.name}`, async ({ request }) => {
    const response = await request.post("https://api.restful-api.dev/collections/products/objects/", {
      data: {
        name: product.name,
        data: {
          year: Number(product.year),
          price: Number(product.year),
        },
      },
      headers: {
        "x-api-key": process.env.API_KEY!,
      },
    });

    expect(response.status()).toBe(200);

    const body = await response.json();

    expect(body.name).toBe(product.name);
  });
}

for (const endpoint of endpoints) {
  test(`Validate ${endpoint.endpoint}`, async ({ request }) => {
    const response = await request.get(`https://api.restful-api.dev/${endpoint.endpoint}`, {
      headers: {
        "x-api-key": process.env.API_KEY!,
      },
    });

    expect(response.status()).toBe(Number(endpoint.statusCode));
  });
}
