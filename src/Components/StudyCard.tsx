import { useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../config";

interface StudyCardProps {
  className: string;
  subjectName: string;
  id: number;
}

export const StudyCard = ({ className, subjectName, id }: StudyCardProps) => {
  const navigate = useNavigate();

  const deleteHandler = async (e: React.MouseEvent) => {
    e.stopPropagation();
    await fetch(`${BACKEND_URL}/api/v1/study/remove/${id}`, {
      method: "DELETE",
    });
    navigate(`/profile`);
  };

  return (
    <div
      className="hover:cursor-pointer"
      onClick={() => {
        navigate(`/study/${id}`);
      }}
    >
      <div className="relative group w-64 sm:w-72 h-40 sm:h-44 rounded-3xl backdrop-blur-md bg-white/5 border border-white/10 hover:scale-105 hover:shadow-2xl transition-all duration-300 flex flex-col justify-between p-4 sm:p-5 m-3 sm:m-4">
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-500 to-purple-500 opacity-10 blur-3xl pointer-events-none"></div>

        <div
          className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-red-400 hover:text-red-500 hover:scale-110"
          onClick={deleteHandler}
        >
          🗑
        </div>

        <div className="flex flex-col justify-center items-center flex-grow text-center">
          <div className="text-white text-lg sm:text-2xl font-bold">
            {className}
          </div>
          <div className="text-gray-300 text-sm sm:text-md mt-1">
            {subjectName}
          </div>
        </div>

        <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-blue-400 hover:text-blue-500 hover:scale-110 text-sm sm:text-base">
          View →
        </div>
      </div>
    </div>
  );
};
