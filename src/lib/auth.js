import GoogleProvider from "next-auth/providers/google";

const authOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
    ],
    callbacks: {
        async signIn({ user, account }) {

            if (account.provider === "google") {
                const { name, email, image } = user;
                try {
                    const res = await fetch("http://localhost:3000/api/users", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            userName: name,
                            imgUrl: image,
                            email: email,
                        })
                    })
                    if (res.ok) {
                        return user;
                    }
                } catch (error) {
                    console.log(error)
                }
            }

            return user
        },
    }
};

export default authOptions;
