import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/ui/dropdown-menu";
import { Button } from "@/shared/ui/button";
import { Plus } from "lucide-react";
import { Link } from "react-router-dom";
import { RoutesEnum } from "@/app/constants/core";

export function CreateGoalDropdown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="absolute bottom-[120px] right-4 flex size-[40px] rounded-full bg-amber-500 text-white [&_svg]:size-5">
          <Plus />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end">
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <Link to={RoutesEnum.GoalCreate}>Создать цель самостоятельно</Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
