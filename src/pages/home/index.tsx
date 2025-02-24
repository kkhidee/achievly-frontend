import { CreateGoalDropdown } from "@/shared/ui";
import { GoalBoard } from "@/entities/goal-board";

function HomePage() {
  return (
    <div className="h-full">
      <GoalBoard />

      <CreateGoalDropdown />
    </div>
  );
}

export default HomePage;
