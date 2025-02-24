import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/ui";

type StatisticsIntervalTabProps = {
  tabValue: string;
  handleTabChange: (value: string) => void;
};

export function StatisticsIntervalTab({
  tabValue,
  handleTabChange,
}: StatisticsIntervalTabProps) {
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
