import { CoreLayout } from "@/shared/ui";
import { GoalPersonal } from "@/entities/goal-personal";

function GoalCreatePage() {
  return (
    <CoreLayout className="justify-between">
      <GoalPersonal />
    </CoreLayout>
  );
}

export default GoalCreatePage;
