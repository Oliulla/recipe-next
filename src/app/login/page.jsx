import AuthForm from "@/components/__oneTime/__authForm";
import getCurrentUser from "@/lib/session";

const LoginPage = async() => {
  const user = await getCurrentUser();

  return (
    <div>
      <AuthForm user={user}/>
    </div>
  );
};

export default LoginPage;
