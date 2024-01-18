import { SingleCard } from "./__SingleCard";

export function RecipeCards({ recipes }) {


  return (
    <div className="grid grid-cols-3 gap-4">
      {recipes?.map((recipe, idx) => (
        <SingleCard key={recipe.id} recipe={recipe} />
      ))}
    </div>
  );
}
