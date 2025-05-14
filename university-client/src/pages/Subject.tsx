import React from "react";
import { useAppDispatch, useAppSelector } from "../hooks/useStore";
import { useNavigate } from "react-router-dom";
import { fetchSubjects } from "../store/features/subjects/subjectSlice";

const Subject = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { subjectList, loading } = useAppSelector((state) => state.subject);

  React.useEffect(() => {
    if (!subjectList) {
      dispatch(fetchSubjects());
    }
  }, [dispatch, subjectList]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 px-4 py-8">
        <div className="flex items-center justify-center space-x-2">
          <div className="w-12 h-12 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
          <span className="text-xl text-gray-700 font-semibold">
            Loading...
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 px-4 py-8">
      <div className="max-w-7xl mx-auto">
        {/* Breadcrumb */}
        <div className="mb-4 text-sm text-gray-600">
          <span
            className="text-blue-600 hover:underline cursor-pointer"
            onClick={() => navigate("/")}
          >
            Dashboard
          </span>
          <span className="mx-2">›</span>
          <span className="font-semibold">Students</span>
        </div>

        {/* Page Title */}
        <h1 className="text-4xl font-semibold text-center text-gray-800 mb-8">
          Subject List
        </h1>

        {/* Student Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {subjectList?.map((subject) => (
            <div
              key={subject.id}
              className="bg-white shadow-xl rounded-xl p-6 hover:scale-105 transform transition-all duration-300 h-full flex flex-col justify-between"
            >
              <div>
                <h2 className="text-xl font-bold text-gray-800 line-clamp-1">
                  {subject.name}
                </h2>
                <p className="text-lg text-gray-600 line-clamp-3">
                  Academic Year: {subject.academic_year}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Subject;
