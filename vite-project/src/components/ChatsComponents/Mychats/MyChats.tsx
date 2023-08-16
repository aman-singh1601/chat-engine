import { Button } from "@/components/ui/button";
import axios from "@/axios";
import { Plus } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Chats, chatsGetAll } from "@/features/chatSlice";
import { MemoizedUserCard } from "./UserCard";
import { UserCardSkeleton } from "./UserCardSkeleton";
import { CreateGroupChat } from "./CreateGroup";
import { toast } from "react-hot-toast";

const MyChats = () => {
  const [groupCreated, setGroupCreated] = useState(false);
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);
  const getUsers = async () => {
    try {
      const { data } = await axios.get("/chats/fetchChats");
      dispatch(chatsGetAll(data));
    } catch (err: any) {
      toast.error("Error in Fetching Chats. Please reload");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getUsers();
  }, [groupCreated]);

  var userChats = useSelector((state: Chats) => state.chats);
  const memoizedChats = useMemo(() => userChats, [userChats]);

  return (
    <div className=" basis-[40%] lg:basis-[30%] bg-muted flex flex-col ">
      <div className="flex justify-between mt-2 ">
        <div className="font-medium text-xs sm:text-3xl ml-4 md:ml-6">
          My Chats
        </div>
        <CreateGroupChat
          setGroupCreated={setGroupCreated}
          groupCreated={groupCreated}
        >
          <Button variant="outline" className=" mr-2  md:mr-4 h-10">
            <span className="text-xs"> Group Chat</span>
            <Plus className="h-8 w-8 pl-2" />
          </Button>
        </CreateGroupChat>
      </div>
      <div className="w-[90%] mt-4 m-auto h-[600px] rounded-sm overflow-y-auto no-scrollbar">
        {!loading ? (
          //@ts-ignore
          memoizedChats?.chats?.map((userChat, index) => {
            let chat = userChat;
            return <MemoizedUserCard key={index} chat={chat} />;
          })
        ) : (
          <UserCardSkeleton />
        )}
      </div>
    </div>
  );
};

export default MyChats;
