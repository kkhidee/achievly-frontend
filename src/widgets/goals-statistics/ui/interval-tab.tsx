import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/ui";

type GoalsStatisticsIntervalTabProps = {
  tabValue: string;
  handleTabChange: (value: string) => void;
};

function GoalsStatisticsIntervalTab({
  tabValue,
  handleTabChange,
}: GoalsStatisticsIntervalTabProps) {
  return (
    <Tabs value={tabValue} onValueChange={handleTabChange} className="w-full">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="weekly">Неделя</TabsTrigger>
        <TabsTrigger value="monthly">Месяц</TabsTrigger>
        <TabsTrigger value="yearly">Год</TabsTrigger>
      </TabsList>
      <TabsContent value="weekly"></TabsContent>
      <TabsContent value="monthly"></TabsContent>
      <TabsContent value="yearly"></TabsContent>
    </Tabs>
  );
}

export { GoalsStatisticsIntervalTab };
