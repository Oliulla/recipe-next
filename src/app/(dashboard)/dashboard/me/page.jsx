import MyProfileCardComponent from "@/components/__oneTime/__Me/__MyProfileCard";
import getCurrentUser from "@/lib/session";

const MyProfilePage = async () => {
  const user = await getCurrentUser();

  return (
    <div className="w-full flex justify-center h-full">
      <MyProfileCardComponent user={user} />
    </div>
  );
};

export default MyProfilePage;
