import { useEffect, useState } from "react";
import api from "../api/axios";

const StudentGreeting = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    api.get("/students/me/header")
      .then(res => setData(res.data))
      .catch(console.error);
  }, []);

  if (!data) return null;

  return (
    <div className="mb-6">
      <h1 className="text-2xl font-semibold text-slate-900">
        Hello {data.first_name || "Student"} 👋
      </h1>
      <p className="text-sm text-slate-500 mt-1">
        {data.enrollment_no}
      </p>
    </div>
  );
};

export default StudentGreeting;
