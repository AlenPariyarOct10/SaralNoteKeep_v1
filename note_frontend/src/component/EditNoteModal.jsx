import React, { useState, useRef } from "react";
import { Modal, Spin } from "antd";

export default function EditNoteModal({ isModalOpen, closeModal, onEditSubmit, title, body, id }) {
  const titleref = useRef(title);
  const bodyref = useRef(body);
  const [loading, setLoading] = useState(false);

  console.log(title, body);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    onEditSubmit({
      title: titleref.current.value,
      body: bodyref.current.value,
      id: id,
    }).finally(() => setLoading(false));
  };

  return (
    <Modal title="Edit Note" open={isModalOpen} onCancel={closeModal} footer={[]}>
      <form onSubmit={handleSubmit} className="bg-white rounded px-8 pt-6 pb-8 mb-4">
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
            defaultValue={title}
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
            defaultValue={body}
          ></textarea>
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            {loading ? <Spin /> : "Save"}
          </button>
        </div>
      </form>
    </Modal>
  );
}
