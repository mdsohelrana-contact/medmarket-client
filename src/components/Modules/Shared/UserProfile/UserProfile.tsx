"use client";

import { ChevronsUpDown, Edit2Icon, LogOut } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import ProfileModal from "./ProfileModal";

export function UserProfile({
  user,
  logoutFn,
}: {
  user: IUser;
  logoutFn: () => void;
}) {
  const fallbackLetters = user?.name
    ? user?.name.substring(0, 2).toUpperCase()
    : "NN";

  // State to control dialog visibility
  const [isProfileDialogOpen, setIsProfileDialogOpen] = useState(false);

  // Handle logout
  const handleLogout = () => {
    logoutFn();
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="flex items-center gap-2 p-2 rounded-md ">
            <Avatar className="h-8 w-8 rounded-lg">
              <AvatarImage src={user?.profileImg} alt={user?.name} />
              <AvatarFallback className="rounded-lg font-description">
                {fallbackLetters}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col text-left text-sm">
              <span className="font-semibold font-description">
                {user?.name}
              </span>
              <span className="text-xs font-description">{user?.email}</span>
            </div>
            <ChevronsUpDown className="ml-auto" />
          </button>
        </DropdownMenuTrigger>

        <DropdownMenuContent className="min-w-[200px] rounded-lg p-2  shadow-lg">
          <DropdownMenuLabel className="text-sm font-semibold">
            <div className="flex items-center gap-2 text-sm">
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage src={user?.profileImg} alt={user?.name} />
                <AvatarFallback className="rounded-lg font-description">
                  {fallbackLetters}
                </AvatarFallback>
              </Avatar>
              <div className="text-left">
                <span className="font-semibold font-description">
                  {user?.name}
                </span>
                <br />
                <span className="text-xs font-description">{user?.email}</span>
              </div>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuItem
            onClick={() => setIsProfileDialogOpen(true)}
            className="cursor-pointer text-lg flex items-center gap-2  font-description"
          >
            <Edit2Icon className="w-4 h-4" />
            Profile
          </DropdownMenuItem>

          {/* Logout option */}
          <DropdownMenuItem
            onClick={handleLogout}
            className="cursor-pointer text-sm flex items-center gap-2  font-description"
          >
            <LogOut className="w-4 h-4" />
            Log out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <ProfileModal
        isOpen={isProfileDialogOpen}
        onOpenChange={setIsProfileDialogOpen}
        user={user}
      />
    </>
  );
}
