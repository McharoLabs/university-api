import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Student from "./pages/Student";
import Subject from "./pages/Subject";

function App() {
  return (
    <Routes>
      <Route index element={<Dashboard />} />
      <Route path="/students/all" element={<Student />} />
      <Route path="/subjects/all" element={<Subject />} />
    </Routes>
  );
}

export default App;
