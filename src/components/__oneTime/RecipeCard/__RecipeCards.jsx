import { SingleCard } from "./__SingleCard";

export function RecipeCards({ recipes, fromWhere, setIsUpdated }) {
  return (
    <div className="grid grid-cols-3 gap-4">
      {recipes?.length > 0 &&
        recipes?.map((recipe, idx) => (
          <SingleCard
            key={recipe.id}
            recipe={recipe}
            fromWhere={fromWhere}
            setIsUpdated={setIsUpdated}
          />
        ))}
    </div>
  );
}
