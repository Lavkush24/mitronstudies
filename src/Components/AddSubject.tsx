import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../config";

export function AddSubject() {
  const [subjectName, setSubjectName] = useState("");
  const [chapterName, setChapterName] = useState("");
  const [details, setDetails] = useState("");
  const [pdfLink, setPdfLink] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newContent = {
      subjectName,
      chapterName,
      details,
      pdfLink,
    };

    const token = sessionStorage.getItem("token");

    await fetch(`${BACKEND_URL}/api/v1/subject/addsubject`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(newContent),
    });

    navigate("/");
  };

  return (
    <div className="max-w-lg w-full mx-auto mt-10 sm:mt-16 px-4 sm:px-6 md:px-8">
      <div className="relative p-6 sm:p-8 md:p-10 rounded-3xl border border-white/10 backdrop-blur-md bg-white/5 shadow-2xl">
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-blue-500 to-purple-500 opacity-20 blur-3xl pointer-events-none"></div>

        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-6 tracking-wide text-center">
          Add New Study Content
        </h2>

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Subject Name"
            value={subjectName}
            onChange={(e) => setSubjectName(e.target.value)}
            className="p-3 sm:p-4 rounded-xl bg-gray-900/60 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-400"
            required
          />

          <input
            type="text"
            placeholder="Chapter Name"
            value={chapterName}
            onChange={(e) => setChapterName(e.target.value)}
            className="p-3 sm:p-4 rounded-xl bg-gray-900/60 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-400 placeholder-gray-400"
            required
          />

          <textarea
            placeholder="Details"
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            rows={4}
            className="p-3 sm:p-4 rounded-xl bg-gray-900/60 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-pink-400 placeholder-gray-400"
            required
          ></textarea>

          <input
            type="url"
            placeholder="PDF Link"
            value={pdfLink}
            onChange={(e) => setPdfLink(e.target.value)}
            className="p-3 sm:p-4 rounded-xl bg-gray-900/60 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-400 placeholder-gray-400"
            required
          />

          <button
            type="submit"
            className="mt-4 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-purple-500 hover:to-blue-500 text-white font-bold py-3 sm:py-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-2xl"
          >
            Save
          </button>
        </form>
      </div>
    </div>
  );
}
