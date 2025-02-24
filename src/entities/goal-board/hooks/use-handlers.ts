import { HabitEntity, TaskEntity } from "@/shared/api";
import { useState } from "react";

export const useGoalBoardHandlers = () => {
  const [openHabitDrawer, setOpenHabitDrawer] = useState<boolean>(false);

  const [habitDrawerData, setHabitDrawerData] = useState<HabitEntity>();

  const [openTaskDrawer, setOpenTaskDrawer] = useState<boolean>(false);

  const [taskDrawerData, setTaskDrawerData] = useState<TaskEntity>();

  const [currentGoalId, setCurrentGoalId] = useState<number>();

  const onHabitDrawerOpen = (goalId: number, habit: HabitEntity) => {
    setOpenHabitDrawer(true);
    setHabitDrawerData(habit);
    setCurrentGoalId(goalId);
  };

  const onHabitDrawerClose = () => {
    setOpenHabitDrawer(false);
  };

  const onTaskDrawerOpen = (goalId: number, task: TaskEntity) => {
    setOpenTaskDrawer(true);
    setTaskDrawerData(task);
    setCurrentGoalId(goalId);
  };

  const onTaskDrawerClose = () => {
    setOpenTaskDrawer(false);
  };

  return {
    openHabitDrawer,
    habitDrawerData,
    openTaskDrawer,
    taskDrawerData,
    currentGoalId,
    onHabitDrawerOpen,
    onHabitDrawerClose,
    onTaskDrawerOpen,
    onTaskDrawerClose,
  };
};
