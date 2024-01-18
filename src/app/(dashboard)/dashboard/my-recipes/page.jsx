import MyRecipeLists from "@/components/__oneTime/__Me/__MyRecipeLists";
import getCurrentUser from "@/lib/session";

const MyRecipesPage = async () => {
  const user = await getCurrentUser();
  return (
    <div>
      <MyRecipeLists user={user} />
    </div>
  );
};

export default MyRecipesPage;
