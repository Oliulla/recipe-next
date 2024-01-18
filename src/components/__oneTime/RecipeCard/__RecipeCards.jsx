import { SingleCard } from "./__SingleCard";

export function RecipeCards() {
  return (
    <div className="grid grid-cols-3 gap-4">
      {[1, 2, 3, 4, 5, 6].map((recipe, idx) => (
        <SingleCard key={idx} />
      ))}
    </div>
  );
}
