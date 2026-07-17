export async function getAccessToken(request: any) {
    const response = await request.post(`https://${process.env.AUTH0_DOMAIN}/oauth/token`,
        {
            data: {
                client_id: process.env.AUTH0_CLIENT_ID,
                client_secret: process.env.AUTH0_CLIENT_SECRET,
                audience: process.env.AUTH0_AUDIENCE,
                grant_type: 'client_credentials',
            },
        }
    );

    return await response.json();
}