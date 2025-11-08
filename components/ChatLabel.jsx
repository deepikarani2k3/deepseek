import { assets } from "@/assets/assets";
import Image from "next/image";
import React from "react";

const ChatLabel = ({ openMenu = { open: false }, setOpenMenu }) => {
  return (
    <div className="flex items-center justify-between p-2 text-white/80 hover:bg-white/10 rounded-lg text-sm group cursor-pointer">
      {/* Chat name */}
      <p className="group-hover:max-w-[83%] truncate">Chat Name Here</p>

      {/* Menu */}
      <div
        className="relative flex items-center justify-center h-6 w-6 hover:bg-black/80 rounded-lg"
        onClick={() =>
          setOpenMenu && setOpenMenu({ open: !openMenu.open })
        }
      >
        <Image
          src={assets.three_dots}
          alt="menu"
          className={`w-4 ${openMenu?.open ? "" : "hidden"} group-hover:block`}
        />

        {/* Hidden menu appears on hover */}
        <div
          className={`absolute ${
            openMenu?.open ? "block" : "hidden"
          } -right-36 top-6 bg-gray-700 rounded-xl w-max p-2`}
        >
          <div className="flex items-center gap-3 hover:bg-white/10 px-3 py-2 rounded-lg">
            <Image src={assets.pencil_icon} alt="rename" className="w-4" />
            <p>Rename</p>
          </div>
          <div className="flex items-center gap-3 hover:bg-white/10 px-3 py-2 rounded-lg">
            <Image src={assets.delete_icon} alt="delete" className="w-4" />
            <p>Delete</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatLabel;
