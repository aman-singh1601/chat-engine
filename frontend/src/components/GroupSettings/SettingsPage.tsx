import MainNav from "../ChatsComponents/MainNav";
import { GroupSettings } from "./GroupSettings";

export const SettingsPage = () => {
  // @ts-ignore
  const user = JSON.parse(localStorage.getItem("profile"));
  return (
    <div className="flex flex-col ">
      <MainNav
        name={user?.result?.name}
        email={user?.result?.email}
        pic={user?.result?.pic}
      />
      <div className="flex mt-4 ">
        <GroupSettings />
      </div>
    </div>
  );
};
