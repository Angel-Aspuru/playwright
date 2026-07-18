import { test, expect } from "@playwright/test";
import { getAccessToken } from "../../../utils/auth";

test(`call protected API`, async ({ request }) => {
  const body = await getAccessToken(request);

  expect(body).toHaveProperty("access_token");
  expect(body.token_type).toBe("Bearer");
  expect(body).toHaveProperty("expires_in");

  const response = await request.get(`https:httpbin.org/bearer`, {
    headers: {
      Authorization: `Bearer ${body.access_token}`,
    },
  });

  expect(response.ok()).toBeTruthy();

});
