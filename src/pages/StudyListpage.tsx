import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BACKEND_URL } from "../config";

interface Subject {
  id: number;
  name: string;
}

export function StudyListPage() {
  const [subjects, setSubjects] = useState<Subject[]>([]);

  const token = sessionStorage.getItem("token");

  function addContent() {
    if(token) {
      return (
        <Link
          to={`/addmaterial`}
          className="bg-gradient-to-r from-yellow-500 to-orange-400 hover:scale-105 transition-transform text-black font-semibold px-6 py-3 rounded-3xl shadow-lg"
        >
          Add New Material
        </Link>
      )
    }else{
      return <div></div>
    }
  }

  useEffect(() => {
    async function fetchSubjects() {
      const res = await fetch(`${BACKEND_URL}/api/v1/subject/all`);
      const data = await res.json();
      setSubjects(data.response);
    }
    fetchSubjects();
  }, []);

  return (
    <div className="p-8 bg-gradient-to-br from-[#0f1115] to-[#1a1d25] min-h-screen">
      {/* Header */}
      <div className="flex flex-row justify-between items-center text-4xl font-bold text-white mb-8">
        <div>All Study Subjects</div>
        { addContent() }
      </div>

      {/* Subject Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {subjects.map((subject) => (
          <Link key={subject.id} to={`/study/${subject.id}`}>
            <div className="relative p-6 rounded-2xl backdrop-blur-md bg-white/5 border border-white/10 hover:scale-105 hover:shadow-2xl transition-all duration-300 cursor-pointer">
              {/* Neon glow effect */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-500 opacity-10 blur-3xl pointer-events-none"></div>

              <h2 className="text-2xl font-bold text-gradient bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
                {subject.name}
              </h2>
              <p className="text-gray-300 mt-2">Click to view chapters →</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
