"use client";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../config";
import { useParams } from "react-router-dom";

interface Blog {
  id: number;
  heading: string[];
  detail: string[];
}

interface Chapter {
  id: number;
  name: string;
  details: string;
  pdfLink?: string;
  blog: Blog[];
}

export default function ChapterBlog() {
  const { id, chapterName } = useParams();
  const [chapter, setChapter] = useState<Chapter | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [currentBlogIndex, setCurrentBlogIndex] = useState(0);

  useEffect(() => {
    const fetchChapter = async () => {
      try {
        const res = await fetch(`${BACKEND_URL}/api/v1/chapter/${chapterName}/${id}`);
        if (!res.ok) throw new Error("Failed to fetch chapter");

        const data = await res.json();
        setChapter(data.response);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchChapter();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen text-gray-300">
        ⏳ Loading chapter...
      </div>
    );
  }

  if (error || !chapter) {
    return (
      <div className="flex justify-center items-center min-h-screen text-red-400">
        Error: {error || "Chapter not found"}
      </div>
    );
  }

  const blogs = chapter.blog;
  const currentBlog = blogs[currentBlogIndex];

  return (
    <div className="flex flex-col w-full min-h-screen bg-gradient-to-br from-gray-900 via-[#1e293b] to-black text-white p-10">
      {/* Chapter Header */}
      <header className="mb-10">
        <h1 className="text-5xl font-bold mb-2 text-yellow-400 drop-shadow-lg">
          {chapter.name}
        </h1>
        <p className="text-lg text-gray-300">{chapter.details}</p>
        {chapter.pdfLink && (
          <a
            href={chapter.pdfLink}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-block text-sm text-yellow-400 underline"
          >
            View PDF
          </a>
        )}
      </header>

      {/* Blog Content */}
      <div className="flex-1 bg-gray-800 rounded-2xl shadow-md p-8">

        <div className="space-y-8">
          {currentBlog.heading.map((h, idx) => (
            <div key={idx}>
              <h3 className="text-2xl font-bold text-yellow-300 mb-2">{h}</h3>
              <p className="text-lg text-gray-200">{currentBlog.detail[idx]}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Blog Navigation */}
      <footer className="mt-10 flex justify-between text-sm text-gray-400">
        <button
          onClick={() =>
            setCurrentBlogIndex((i) => Math.max(0, i - 1))
          }
          disabled={currentBlogIndex === 0}
          className={`px-4 py-2 rounded-lg transition ${
            currentBlogIndex === 0
              ? "opacity-40 cursor-not-allowed"
              : "hover:text-yellow-400"
          }`}
        >
          ⬅ Previous Blog
        </button>
        <button
          onClick={() =>
            setCurrentBlogIndex((i) => Math.min(blogs.length - 1, i + 1))
          }
          disabled={currentBlogIndex === blogs.length - 1}
          className={`px-4 py-2 rounded-lg transition ${
            currentBlogIndex === blogs.length - 1
              ? "opacity-40 cursor-not-allowed"
              : "hover:text-yellow-400"
          }`}
        >
          Next Blog ➡
        </button>
      </footer>
    </div>
  );
}
