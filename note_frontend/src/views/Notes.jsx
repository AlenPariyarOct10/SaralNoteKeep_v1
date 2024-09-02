import React, { useEffect, useRef, useState } from "react";
import server from "../server/server";
import { useAuth } from "../contexts/AuthContext";
import NoteCard from "../component/NoteCard";
import { Button, Modal, Spin, message } from "antd";
import EditNoteModal from "../component/EditNoteModal";

export default function Notes() {
  const [messageApi, contextHolder] = message.useMessage();
  const titleref = useRef(null);
  const bodyref = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [noteToEdit, setNoteToEdit] = useState(null);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setNoteToEdit(null);
  };

  const showMessage = (type, msg) => {
    messageApi.open({
      type: type,
      content: msg,
    });
  };

  const { user, token } = useAuth();
  
  document.title =(user?.name)?user?.name +" - Note 🗒️": "Welcome";

  const fetchNotes = async () => {
    setLoading(true);
    try {
      const response = await server.get("index", {
        params: { author_id: user?.id },
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      setNotes(response.data);
    } catch (error) {
      showMessage("error", "Failed to fetch notes");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    setLoading(true);
    try {
      await server.delete(`/destroy/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      fetchNotes();
      showMessage("success", "Note deleted successfully!");
    } catch (error) {
      showMessage("error", "Failed to delete note!");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (note) => {
    setNoteToEdit(note);
    setIsModalOpen(true);
    console.log("note",note);
  };

  const onEditSubmit = async (editedNote) => {
    const token = localStorage.getItem('token');
    console.log("edited", editedNote);
    try{
      await server.put(`/update/${editedNote.id}`,{
        title: editedNote.title,
        body: editedNote.body
      },{
        headers: {
          "Authorization":`Bearer ${token}`,
        }
      });
      showMessage("success", "Note updated succesfully!");

    }catch(error)
    {
      showMessage("error", "Unable to update note!");
    }finally{
      closeModal();
      fetchNotes();
    }
  

    
      


  }

  const onSubmit = async (form) => {
    form.preventDefault();
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const userId = user?.id;

      if (!token || !userId) {
        console.error('Token or User ID missing');
        return;
      }

      await server.post(
        '/store',
        {
          title: titleref.current.value,
          body: bodyref.current.value,
          author_id: userId,
        },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        }
      );
      fetchNotes();
      closeModal();
      showMessage("success", "Note added successfully!");
    } catch (error) {
      showMessage("error", "Unable to add note!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user && token) {
      fetchNotes();
    }
  }, [user, token]);

  return (
    <>
      {contextHolder}
      <Modal title="Create Note" open={isModalOpen} onCancel={closeModal} footer={[]}>
        <form onSubmit={onSubmit} className="bg-white rounded px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
              Title
            </label>
            <input
              ref={titleref}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="title"
              type="text"
              placeholder="Title"
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="body">
              Body
            </label>
            <textarea
              ref={bodyref}
              id="body"
              rows="4"
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Write your thoughts here..."
            ></textarea>
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              {loading ? <Spin /> : "Create"}
            </button>
          </div>
        </form>
      </Modal>


      <div className="ml-5 mt-2">
        <button
          className="bg-yellow-500 pt-2 pb-2 pl-6 pr-6 rounded font-medium hover:bg-yellow-400"
          onClick={showModal}
        >
          Create
        </button>
      </div>
      <div className="max-w-screen-xl mx-auto p-5 sm:p-10 md:p-16">
        {loading ? (
          <Spin size="large" className="w-full h-full justify-center align-middle" />
        ) : notes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 sm:grid-cols-2 gap-10">
            {notes.map((item) => (
              <NoteCard
                handleDelete={handleDelete}
                handleEdit={handleEdit}
                title={item.title}
                body={item.body}
                created_at={item.created_at}
                key={item.id}
                id={item.id}
              />
            ))}

            {isModalOpen && noteToEdit && (
              <EditNoteModal
                isModalOpen={isModalOpen}
                closeModal={closeModal}
                onEditSubmit={onEditSubmit}
                title={noteToEdit.title}
                body={noteToEdit.body}
                id={noteToEdit.id}
              />
            )}
          </div>
        ) : (
          <div className="text-center text-gray-500">No notes available</div>
        )}

      </div>
    </>
  );
}
