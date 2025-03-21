"use client";

import { ChevronsUpDown, LogOut } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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

  // handle logout
  const handleLogout = () => {
    logoutFn();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-200">
          <Avatar className="h-8 w-8 rounded-lg">
            <AvatarImage src={user?.profileImg} alt={user?.name} />
            <AvatarFallback className="rounded-lg font-description">
              {fallbackLetters}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col text-left text-sm">
            <span className="font-semibold font-description">{user?.name}</span>
            <span className="text-xs text-gray-500 font-description">
              {user?.email}
            </span>
          </div>
          <ChevronsUpDown className="ml-auto" />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="min-w-[200px] rounded-lg p-2 bg-white shadow-lg">
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
              <span className="text-xs text-gray-500 font-description">
                {user?.email}
              </span>
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuItem
          onClick={handleLogout}
          className="cursor-pointer text-sm flex items-center gap-2 text-gray-700 font-description"
        >
          <LogOut className="w-4 h-4" />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
