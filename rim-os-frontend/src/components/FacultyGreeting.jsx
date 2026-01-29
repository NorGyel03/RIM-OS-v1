import { useEffect, useState } from "react";
import api from "../api/axios";

const FacultyGreeting = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    api.get("/faculty/me/header")
      .then(res => setData(res.data))
      .catch(console.error);
  }, []);

  if (!data) return null;

  return (
    <div className="mb-6">
      <h1 className="text-2xl font-semibold text-slate-900">
        Hello {data.first_name || "Faculty"} 👋
      </h1>

      <p className="text-sm text-slate-600 mt-1">
        {data.designation || "Faculty Member"}
        {data.department_name && (
          <> · {data.department_name}</>
        )}
      </p>
    </div>
  );
};

export default FacultyGreeting;
