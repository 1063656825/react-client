import { Navigate, Route, Routes } from "react-router-dom";

import Books from "../pages/Books";
import Interviews from "../pages/interviews";
import Issues from "../pages/issues";

export default function RouterConfig() {
  return (
    <Routes>
      <Route path="/books" element={<Books />} />
      <Route path="/interviews" element={<Interviews />} />
      <Route path="/issues" element={<Issues />} />
      <Route path="/" element={<Navigate replace to="/issues" />} />
    </Routes>
  );
}