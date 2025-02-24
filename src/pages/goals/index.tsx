import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/ui";
import { GoalDtoStatusEnum } from "@/shared/api";
import { GoalList } from "@/features/goal-list";

function GoalsPage() {
  return (
    <Tabs
      defaultValue="ongoing"
      className="size-full max-h-full overflow-y-hidden"
    >
      <TabsList className="mb-6 grid w-full grid-cols-2">
        <TabsTrigger value="ongoing">Текущие</TabsTrigger>
        <TabsTrigger value="achieved">Выполненные</TabsTrigger>
      </TabsList>
      <TabsContent value="ongoing" className="goal-list">
        <GoalList status={GoalDtoStatusEnum.ongoing} />
      </TabsContent>
      <TabsContent value="achieved" className="goal-list">
        <GoalList status={GoalDtoStatusEnum.achieved} />
      </TabsContent>
    </Tabs>
  );
}

export default GoalsPage;
