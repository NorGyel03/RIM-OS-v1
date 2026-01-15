import { useEffect, useState } from "react";
import { getMyCourses, uploadMarks } from "../../api/faculty.api";

const MarksForm = () => {
  const [courses, setCourses] = useState([]);
  const [payload, setPayload] = useState({
    enrollmentId: "",
    courseId: "",
    component: "mid1",
    score: "",
    maxScore: 100,
  });

  useEffect(() => {
    getMyCourses().then(setCourses);
  }, []);

  const submit = async () => {
    await uploadMarks(payload);
    alert("Marks uploaded");
  };

  return (
    <div>
      <h2 className="text-lg font-semibold mb-3">Upload Marks</h2>

      <select
        className="border p-2 w-full mb-3"
        value={payload.courseId}
        onChange={(e) =>
          setPayload({ ...payload, courseId: e.target.value })
        }
        required
      >
        <option value="">Select Course</option>
        {courses.map((c) => (
          <option key={c.id} value={c.id}>
            {c.code} — {c.title}
          </option>
        ))}
      </select>

      <input
        className="border p-2 w-full mb-3"
        placeholder="Enrollment ID"
        value={payload.enrollmentId}
        onChange={(e) =>
          setPayload({ ...payload, enrollmentId: e.target.value })
        }
        required
      />

      <select
        className="border p-2 w-full mb-3"
        value={payload.component}
        onChange={(e) =>
          setPayload({ ...payload, component: e.target.value })
        }
      >
        <option value="mid1">Mid 1</option>
        <option value="mid2">Mid 2</option>
        <option value="digital1">Digital 1</option>
        <option value="digital2">Digital 2</option>
        <option value="digital3">Digital 3</option>
        <option value="final">Final</option>
      </select>

      <input
        type="number"
        className="border p-2 w-full mb-3"
        placeholder="Score"
        value={payload.score}
        onChange={(e) =>
          setPayload({ ...payload, score: e.target.value })
        }
        required
      />

      <button
        onClick={submit}
        className="bg-green-600 text-white px-4 py-2 rounded"
      >
        Submit
      </button>
    </div>
  );
};

export default MarksForm;
