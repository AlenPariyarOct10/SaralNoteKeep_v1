import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Popconfirm, Spin } from "antd";

export default function NoteCard({ title, body, created_at, id, handleDelete, handleEdit }) {
    const [loading, setLoading] = useState(false);

    const monthNumToWord = (month) => {
        const monthsWord = [
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];
        return monthsWord[month];
    }

    const handleDeleteClick = async () => {
        setLoading(true);
        try {
            await handleDelete(id);
        } catch (error) {
            console.error("Error deleting note:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="rounded overflow-hidden shadow-2xl shadow-slate-400 p-5 cursor-pointer hover:shadow-lg hover:bg-slate-100">
            <div className="px-6 py-4">
                <h3 className="font-semibold text-lg inline-block hover:text-indigo-600 transition duration-500 ease-in-out">
                    {title}
                </h3>
                <p className="text-gray-500 text-sm">{body}</p>
            </div>
            <div className="px-6 py-4 flex flex-row items-center">
                <span className="py-1 text-sm font-regular text-gray-900 mr-1 flex flex-row items-center">
                    <svg
                        height="13px"
                        width="13px"
                        version="1.1"
                        id="Layer_1"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512"
                    >
                        <g>
                            <g>
                                <path
                                    d="M256,0C114.837,0,0,114.837,0,256s114.837,256,256,256s256-114.837,256-256S397.163,0,256,0z M277.333,256
              c0,11.797-9.536,21.333-21.333,21.333h-85.333c-11.797,0-21.333-9.536-21.333-21.333s9.536-21.333,21.333-21.333h64v-128
              c0-11.797,9.536-21.333,21.333-21.333s21.333,9.536,21.333,21.333V256z"
                                />
                            </g>
                        </g>
                    </svg>
                    <span className="ml-1">
                        {new Date(created_at).getFullYear() + ", "}
                        {monthNumToWord(new Date(created_at).getMonth()) + " "}
                        {new Date(created_at).getDate()}
                    </span>
                </span>
            </div>
            
            <button onClick={()=>handleEdit({id, title, body})} className="p-2 m-1 bg-green-500 rounded text-white">Edit</button>

            <Popconfirm
                title="Delete the note"
                description="Are you sure to delete this note?"
                placement="bottom"
                okText="Yes"
                cancelText="No"
                onConfirm={handleDeleteClick}
            >
                <button  className="p-2 m-1 bg-red-500 rounded text-white">
                    {loading ? <Spin /> : "Delete"}
                </button>
            </Popconfirm>
        </div>
    );
}
