import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../config";

interface Subject {
  id: number;
  name: string;
  class: {
    standard: string;
  }
}

export function SubjectListPage() {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();
  const token = sessionStorage.getItem("token");

  function AddContent() {
    if (token) {
      return (
        <Link
          to="/addsubject"
          className="bg-gradient-to-r from-yellow-500 to-orange-400 hover:scale-105 transition-transform text-black font-semibold px-6 py-3 rounded-3xl shadow-lg text-sm md:text-lg md:font-bold"
        >
          Add New Subject
        </Link>
      );
    }
    return null;
  }

  useEffect(() => {
    async function fetchSubjects() {
      try {
        const res = await fetch(`${BACKEND_URL}/api/v1/subject/all`);
        if (!res.ok) throw new Error("Failed to fetch subjects");
        const data = await res.json();
        console.log(data);
        setSubjects(data.response || []);
      } catch (err: any) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    }
    fetchSubjects();
  }, []);

  return (
    <div className="p-8 bg-gradient-to-br from-[#0f1115] to-[#1a1d25] min-h-screen">
      <div className="flex flex-row justify-between items-center text-4xl font-bold text-white mb-8">
        <div>All Study Subjects</div>
        <AddContent />
      </div>

      {loading && <p className="text-gray-400 text-3xl font-bold flex justify-center py-32">Loading subjects...</p>}
      {error && <p className="text-red-400">{error}</p>}

      {!loading && !error && (
        <>
          {subjects.length == 0 ? (
            <div className="text-gray-400 text-5xl font-bold flex justify-center py-32">
              No subject Available
            </div>
          ):
          (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {subjects.map((subject) => (
              <div
                onClick={() => {
                  navigate(`/study/${subject.id}`)
                }}
                key={subject.id}>
                <div className="relative p-6 rounded-2xl backdrop-blur-md bg-white/5 border border-white/10 hover:scale-105 hover:shadow-2xl transition-all duration-300 cursor-pointer">
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-500 opacity-10 blur-3xl pointer-events-none"></div>
                  <h2 className="text-2xl font-bold text-gradient bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
                    {subject.name}
                  </h2>
                  <h2 className="text-2xl font-bold text-gradient bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
                    Standard: {subject.class.standard}
                  </h2>
                  <p className="text-gray-300 mt-2">Click to view chapters →</p>
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
