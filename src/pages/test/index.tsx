import { useGetAllUsers } from "@/shared/api";
import { Button } from "@/shared/ui";

function TestPage() {
  const testAccessToken = localStorage.getItem("testAccessToken");

  const { data: users } = useGetAllUsers();

  if (!testAccessToken) {
    return null;
  }

  return (
    <div className="flex flex-col gap-y-2">
      {users?.map((user) => (
        <div key={user.id} className="rounded-md border p-2">
          {user.username}
          <Button
            onClick={() => {
              navigator.clipboard.writeText(JSON.stringify(user));
            }}
          >
            Скопировать json
          </Button>
        </div>
      ))}
    </div>
  );
}

export default TestPage;
