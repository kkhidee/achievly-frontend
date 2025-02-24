import { useGetProfile } from "@/shared/api";
import {
  Avatar,
  AvatarImage,
  Button,
  Card,
  CardContent,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Loader,
} from "@/shared/ui";
import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { RoutesEnum } from "@/app/constants/core";

function ProfilePage() {
  const { data: profile, isLoading } = useGetProfile();

  const navigate = useNavigate();

  if (isLoading) {
    return <Loader />;
  }

  const onLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    navigate(RoutesEnum.Auth);
  };

  return (
    <div className="flex flex-col gap-y-6 px-4 sm:px-0">
      <Card className="bg-neutral-900">
        <CardContent className="p-4">
          <div className="flex gap-x-4">
            <Avatar>
              <AvatarImage src={profile?.picture} />
            </Avatar>

            <div className="flex flex-col gap-y-2">
              <span className="font-medium">{profile?.username}</span>
              <span className="text-sm">{profile?.email}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-neutral-900">
        <CardContent className="p-2">
          <div className="flex gap-x-4">
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  variant="ghost"
                  className="w-full justify-start text-red-600 transition ease-in hover:bg-red-600"
                >
                  <LogOut />
                  Выйти из аккаунта
                </Button>
              </DialogTrigger>
              <DialogContent className="w-[95%] sm:w-full">
                <DialogHeader>
                  <DialogTitle className="sm:max-w-[90%]">
                    Вы уверены, что хотите выйти из своей учетной записи?
                  </DialogTitle>
                  <DialogDescription>
                    После выхода из учётной записи вам нужно будет повторно
                    авторизоваться
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter className="flex gap-2">
                  <DialogClose asChild>
                    <Button>Отменить</Button>
                  </DialogClose>
                  <Button variant="destructive" onClick={onLogout}>
                    Выйти
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default ProfilePage;
