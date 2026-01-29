import { Link } from "react-router-dom";
import FacultyGreeting from "../../components/FacultyGreeting";

const FacultyDashboard = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-black">
          <FacultyGreeting />

          Faculty Dashboard
        </h1>
        <p className="text-slate-500 mt-1">
          Manage attendance and student assessments
        </p>
      </div>

      {/* Action Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ActionCard
          title="Mark Attendance"
          description="Record daily attendance for your courses"
          link="/faculty/attendance"
          color="bg-blue-600"
        />

        <ActionCard
          title="Upload Marks"
          description="Enter assessment marks for students"
          link="/faculty/marks"
          color="bg-emerald-600"
        />
      </div>

      {/* Guidance Section */}
      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-xl font-semibold text-slate-800 mb-2">
          Teaching Workflow
        </h2>
        <ul className="list-disc list-inside text-slate-600 space-y-1">
          <li>Select your course</li>
          <li>Mark attendance regularly</li>
          <li>Upload assessment marks</li>
          <li>Final GPA is computed by Admin</li>
        </ul>
      </div>
    </div>
  );
};

const ActionCard = ({ title, description, link, color }) => (
  <Link
    to={link}
    className="bg-white rounded-xl shadow p-6 hover:shadow-lg transition"
  >
    <div
      className={`w-12 h-12 rounded-lg ${color} text-white flex items-center justify-center mb-4`}
    >
      ✓
    </div>
    <h3 className="text-xl font-semibold text-slate-800">
      {title}
    </h3>
    <p className="text-slate-500 mt-1">
      {description}
    </p>
  </Link>
);

export default FacultyDashboard;
