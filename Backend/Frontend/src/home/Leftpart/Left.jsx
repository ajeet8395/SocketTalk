import React from "react";
import Search from "./Search";
import Users from "./Users";
import { IoSettingsSharp } from "react-icons/io5";
import UserEditModal from "./UserEditModal";
import useConversation from "../../statemanage/useConversation.js";
import { AuthContext } from "../../context/AuthProvider";


function Left() {
  const { selectedConversation } = useConversation();

  return (
    <div className="w-[30%] bg-black border-r text-gray-300">
      <div className="flex py-2 items-center justify-between px-2">
        <h1 className="font-bold text-3xl">Chats</h1>
        <button className="btn bg-black" onClick={() => document.getElementById('my_modal_3').showModal()}><IoSettingsSharp /></button>
        <dialog id="my_modal_3" className="modal">
          <div className="modal-box">
            <form method="dialog">
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
              {selectedConversation && (
                <div>
                  <h2 className="text-lg font-bold">{selectedConversation.fullname}</h2>
                  <p>{selectedConversation.email}</p>
                </div>
              )}
            </form>
          </div>
        </dialog>
      </div>
      <Search />
      <div
        className=" flex-1 overflow-y-auto"
        style={{ minHeight: "calc(84vh - 10vh)" }}
      >
        <Users />
      </div>

    </div>

  );
}

export default Left;
