import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { AlignJustify, LogOut, PencilLine } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { activeChatProps } from "@/features/activeChat";
import { Chat } from "@/features/chatSlice";
import { useState } from "react";
import { useSelector } from "react-redux";

interface currentChatProps {
  activeChat: activeChatProps;
}

export function UpdateGroup() {
  const { activeChat } = useSelector(
    (state: currentChatProps) => state.activeChat
  );

  const [name, setName] = useState(activeChat?.chatName);
  return (
    <Dialog>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <AlignJustify className="h-6 w-6 duration-200 hover:text-white cursor-pointer" />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DialogTrigger asChild>
            <DropdownMenuItem>
              <span className="flex">
                <PencilLine className="mr-1 h-4 w-4" />
                Update Group
              </span>
            </DropdownMenuItem>
          </DialogTrigger>
          <DropdownMenuItem>
            <LogOut className="mr-2 h-4 w-4" />
            Leave Group
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Update Group</DialogTitle>
          <DialogDescription>Make changes to your group.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input id="name" value={name} className="col-span-3" />
          </div>
          {/* <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Username
            </Label>
            <Input id="username" value="@peduarte" className="col-span-3" />
          </div> */}
        </div>
        <DialogFooter>
          <DialogTrigger>
            <Button type="submit">Save changes</Button>
          </DialogTrigger>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
