import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BACKEND_URL } from "../config";
import AutoResizeTextarea from "./AutoResizeTextareaProps";

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
  const [loading, setLoading] = useState(false);

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
    setLoading(true);
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
      navigate(`/study`);
      return data;
    } catch (error) {
      return error;
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col w-full min-h-screen bg-gradient-to-br from-gray-900 via-[#1e293b] to-black text-red px-6 md:px-12 lg:px-20 py-10 space-y-8">
      {/* Chapter Header Input */}
      <header className="text-center md:text-left">
        <input
          type="text"
          placeholder="Chapter Name"
          className="w-full bg-transparent text-3xl sm:text-4xl md:text-5xl font-bold mb-2 text-yellow-400 placeholder-yellow-600 focus:outline-none"
          value={chapter.name}
          onChange={(e) => setChapter({ ...chapter, name: e.target.value })}
        />
        <AutoResizeTextarea
          placeholder="Write chapter details..."
          className="w-full bg-transparent text-base sm:text-lg text-gray-300 placeholder-gray-500 focus:outline-none resize-none"
          value={chapter.details}
          onChange={(e) => setChapter({ ...chapter, details: e.target.value })}
        />
        <input
          type="text"
          placeholder="PDF Link (optional)"
          className="w-full bg-transparent text-sm sm:text-base text-yellow-400 underline placeholder-yellow-700 focus:outline-none mt-2"
          value={chapter.pdfLink}
          onChange={(e) => setChapter({ ...chapter, pdfLink: e.target.value })}
        />
      </header>

      {/* Blog Sections */}
      <div className="space-y-8">
        {chapter.blogs.map((blog, blogIndex) => (
          <div
            key={blogIndex}
            className="bg-gray-800 rounded-2xl shadow-md p-6 space-y-6"
          >
            <h2 className="text-xl font-semibold text-gray-400">
              Blog {blogIndex + 1}
            </h2>

            {blog.heading.map((_, i) => (
              <div key={i} className="space-y-2">
                <input
                  type="text"
                  placeholder="Blog Heading"
                  className="w-full bg-transparent text-xl sm:text-2xl font-bold text-yellow-300 placeholder-yellow-600 focus:outline-none"
                  value={blog.heading[i]}
                  onChange={(e) =>
                    handleInputChange(blogIndex, "heading", e.target.value, i)
                  }
                />
                <AutoResizeTextarea
                  placeholder="Write blog detail..."
                  className="w-full bg-transparent text-base sm:text-lg text-gray-200 placeholder-gray-500 focus:outline-none resize-none"
                  value={blog.detail[i]}
                  onChange={(e) =>
                    handleInputChange(blogIndex, "detail", e.target.value, i)
                  }
                />
                <button
                  onClick={() => removeField(blogIndex, i)}
                  className="text-red-500 text-sm hover:text-red-400"
                >
                  Remove this section
                </button>
              </div>
            ))}

            <button
              onClick={() => addField(blogIndex)}
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
            >
              ➕ Add Heading & Detail
            </button>
          </div>
        ))}

        <button
          onClick={addBlog}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-700 transition"
        >
          ➕ Add New Blog
        </button>
      </div>

      {/* Submit Button */}
      <button
        onClick={handleSubmit}
        className="bg-purple-600 text-white px-8 py-3 rounded-lg shadow-lg hover:bg-purple-700 transition w-full text-lg"
      >
        {loading ? `Adding new ${chapter.name}...` : "Submit Chapter"}
      </button>
    </div>
  );
};

export default ChapterForm;
