import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  const nodeId = process.env.VITE_NODE_ID || import.meta.env.VITE_NODE_ID;

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 px-4">
      <div className="bg-white shadow-xl rounded-2xl p-10 w-full max-w-md text-center transition-all duration-500">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Welcome to the Dashboard
        </h1>
        {/* Show the current node ID */}
        <p className="text-sm text-gray-500 mb-8">
          Serving from:{" "}
          <span className="font-semibold text-gray-700">{nodeId}</span>
        </p>
        <div className="flex flex-col gap-6">
          <button
            onClick={() => handleNavigate("/students/all")}
            className="bg-indigo-600 text-white py-3 rounded-xl font-semibold text-lg shadow-md transform transition-all duration-300 hover:scale-105 hover:bg-indigo-700 hover:shadow-xl focus:outline-none"
          >
            View Students
          </button>
          <button
            onClick={() => handleNavigate("/subjects/all")}
            className="bg-pink-500 text-white py-3 rounded-xl font-semibold text-lg shadow-md transform transition-all duration-300 hover:scale-105 hover:bg-pink-600 hover:shadow-xl focus:outline-none"
          >
            View Subjects
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
