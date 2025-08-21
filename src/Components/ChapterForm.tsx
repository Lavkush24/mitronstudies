import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BACKEND_URL } from "../config";

interface Blog {
  heading: string[];
  detail: string[];
}

interface ChapterData {
  name: string;
  details: string;
  pdfLink: string;
  subjectId: number;
  blogs: Blog[];
}

const ChapterForm: React.FC = () => {
  const navigate = useNavigate();
  const { subjectId } = useParams();

  const [chapter, setChapter] = useState<ChapterData>({
    name: "",
    details: "",
    pdfLink: "",
    subjectId: Number(subjectId) || 1,
    blogs: [],
  });

  useEffect(() => {
    if (subjectId) {
      setChapter((prev) => ({ ...prev, subjectId: Number(subjectId) }));
    }
  }, [subjectId]);

  const addBlog = () => {
    setChapter((prev) => ({
      ...prev,
      blogs: [...prev.blogs, { heading: [""], detail: [""] }],
    }));
  };

  const addField = (blogIndex: number) => {
    const newBlogs = [...chapter.blogs];
    newBlogs[blogIndex].heading.push("");
    newBlogs[blogIndex].detail.push("");
    setChapter({ ...chapter, blogs: newBlogs });
  };

  const handleInputChange = (
    blogIndex: number,
    field: "heading" | "detail",
    value: string,
    index: number
  ) => {
    const newBlogs = [...chapter.blogs];
    newBlogs[blogIndex][field][index] = value;
    setChapter({ ...chapter, blogs: newBlogs });
  };

  const removeField = (blogIndex: number, index: number) => {
    const newBlogs = [...chapter.blogs];
    newBlogs[blogIndex].heading.splice(index, 1);
    newBlogs[blogIndex].detail.splice(index, 1);
    setChapter({ ...chapter, blogs: newBlogs });
  };

  const handleSubmit = async () => {
    const token = sessionStorage.getItem("token");

    try {
      const res = await fetch(`${BACKEND_URL}/api/v1/chapter/addchapter`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(chapter),
      });

      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      const data = await res.json();
      navigate("/study");
      return data;
    } catch (error) {
      return error;
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6 font-sans">
      <h1 className="text-3xl font-bold text-gray-800">Add New Chapter</h1>

      <div className="space-y-4">
        <input
          type="text"
          placeholder="Chapter Name"
          className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500"
          value={chapter.name}
          onChange={(e) => setChapter({ ...chapter, name: e.target.value })}
        />
        <textarea
          placeholder="Chapter Details"
          className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500"
          value={chapter.details}
          onChange={(e) => setChapter({ ...chapter, details: e.target.value })}
        />
        <input
          type="text"
          placeholder="PDF Link"
          className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500"
          value={chapter.pdfLink}
          onChange={(e) => setChapter({ ...chapter, pdfLink: e.target.value })}
        />
      </div>

      <button
        onClick={addBlog}
        className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition"
      >
        ➕ Add Blog
      </button>

      {chapter.blogs.map((blog, blogIndex) => (
        <div
          key={blogIndex}
          className="bg-white rounded-xl shadow p-4 space-y-4 border border-gray-200"
        >
          <h2 className="text-lg font-semibold text-gray-700">Blog {blogIndex + 1}</h2>
          {blog.heading.map((_, i) => (
            <div
              key={i}
              className="flex flex-col md:flex-row md:space-x-4 space-y-2 md:space-y-0"
            >
              <input
                type="text"
                placeholder="Heading"
                className="flex-1 p-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400"
                value={blog.heading[i]}
                onChange={(e) =>
                  handleInputChange(blogIndex, "heading", e.target.value, i)
                }
              />
              <input
                type="text"
                placeholder="Detail"
                className="flex-1 p-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400"
                value={blog.detail[i]}
                onChange={(e) =>
                  handleInputChange(blogIndex, "detail", e.target.value, i)
                }
              />
              <button
                onClick={() => removeField(blogIndex, i)}
                className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            onClick={() => addField(blogIndex)}
            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
          >
            ➕ Add Heading & Detail
          </button>
        </div>
      ))}

      <button
        onClick={handleSubmit}
        className="bg-purple-600 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-purple-700 transition w-full text-lg"
      >
        ✅ Submit Chapter
      </button>
    </div>
  );
};

export default ChapterForm;
