import { useParams, useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../config";

interface Chapter {
  id: number;
  name: string;
  details: string;
  pdfLink: string;
}

type PageStatus = "loading" | "loaded" | "error";

export function SubjectDetailPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const token = sessionStorage.getItem("token");

  const [chapters, setChapters] = useState<Chapter[] | null>(null);
  const [status, setStatus] = useState<PageStatus>("loading");
  const [errMsg, setErrMsg] = useState<string | null>(null);

  const [deletingSubject, setDeletingSubject] = useState(false);

  async function handleSubjectDelete() {
    setDeletingSubject(true);
    try {
      const response = await fetch(`${BACKEND_URL}/api/v1/subject/remove/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` }
      });
      navigate(`/study`);
      return response;
    } catch (e) {
      console.error(e);
      return e;
    } finally {
      setDeletingSubject(false);
    }
  }

  const addContent = () =>
    token ? (
      <>
        <button
          className="bg-gradient-to-r from-red-500 to-red-400 hover:scale-105 transition-transform text-black font-semibold px-6 py-3 rounded-3xl shadow-lg disabled:opacity-60 disabled:hover:scale-100"
          onClick={handleSubjectDelete}
          disabled={deletingSubject}
        >
          {deletingSubject ? "Deleting..." : "Delete subject"}
        </button>
        <Link
          className="bg-gradient-to-r from-yellow-500 to-orange-400 hover:scale-105 transition-transform text-black font-semibold px-6 py-3 rounded-3xl shadow-lg"
          to={`/${id}/add-chapter`}
        >
          Add chapter
        </Link>
      </>
    ) : null;

  useEffect(() => {
    const controller = new AbortController();

    setStatus("loading");
    setErrMsg(null);
    setChapters(null);

    (async () => {
      try {
        const res = await fetch(`${BACKEND_URL}/api/v1/subject/${id}`, {
          signal: controller.signal
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        const arr: Chapter[] = Array.isArray(data?.response?.chapters)
          ? data.response.chapters
          : [];
        setChapters(arr);
        setStatus("loaded");
      } catch (e: any) {
        if (e?.name === "AbortError") return; // ignore stale request
        console.error(e);
        setErrMsg(e?.message ?? "Failed to load");
        setStatus("error");
      }
    })();

    return () => controller.abort();
  }, [id]);

  return (
    <div className="p-8 min-h-screen bg-gradient-to-br from-[#0f1115] to-[#1a1d25]">
      {/* Header */}
      <div className="flex flex-row justify-between items-center mb-8">
        <h1 className="text-5xl font-bold text-gradient bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
          Chapters
        </h1>
        {addContent()}
      </div>

      {status === "loading" && (
        <div className="flex justify-center items-center py-32 text-3xl text-gray-400">
          Loading...
        </div>
      )}

      {status === "error" && (
        <div className="flex justify-center items-center py-32 text-xl text-red-400">
          {errMsg || "Something went wrong."}
        </div>
      )}

      {status === "loaded" && (
        <>
          {chapters && chapters.length === 0 ? (
            <div className="flex justify-center items-center py-32 text-5xl font-bold text-gray-400">
              No Chapter Available
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {chapters!.map((ch) => (
                <div
                  key={ch.id}
                  className="flex flex-row justify-between relative p-6 rounded-2xl backdrop-blur-md bg-white/5 border border-white/10 hover:scale-105 hover:shadow-2xl transition-all duration-300"
                >
                  <div>
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-500 opacity-10 blur-3xl pointer-events-none"></div>
                    <h2 className="text-2xl font-bold text-gradient bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
                      {ch.name}
                    </h2>
                    <p className="text-gray-300 mt-2">{ch.details}</p>
                  </div>

                  <div className="flex flex-col justify-between">
                    <button
                      className="font-bold opacity-10 hover:opacity-100 hover:text-red-600"
                      onClick={async () => {
                        await fetch(`${BACKEND_URL}/api/v1/chapter/remove/${ch.id}`, {
                          method: "DELETE",
                          headers: { Authorization: `Bearer ${token}` }
                        });
                        setChapters((prev) => (prev ?? []).filter((c) => c.id !== ch.id));
                      }}
                    >
                      Delete
                    </button>
                    <button
                      className="font-bold opacity-10 hover:opacity-100 hover:text-blue-800"
                      onClick={() => navigate(`/${id}/${ch.name}/${ch.id}`)}
                    >
                      View
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
