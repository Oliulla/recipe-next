export const configuration = {
    env: process?.env?.NODE_ENV,

    next_auth: {
        client_id: process?.env?.GOOGLE_CLENT_ID,
        client_secret: process?.env?.GOOGLE_CLENT_SECRET,
    },
}
