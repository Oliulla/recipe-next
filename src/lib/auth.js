import GithubProvider from "next-auth/providers/github";
import configuration from "../config/index";

const authOptions = {
    providers: [
        GithubProvider({
            clientId: configuration.client_id,
            clientSecret: configuration.client_secret,
        }),
    ],
    pages: {
        signIn: "/",
    },
};

export default authOptions;
