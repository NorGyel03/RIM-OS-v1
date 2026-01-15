import AttendanceForm from "./AttendanceForm";
// import MarksForm from "./MarksForm"; // ⛔ temporarily disabled

const FacultyDashboard = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">
        Faculty Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-4 rounded shadow">
          <AttendanceForm />
        </div>

        <div className="bg-white p-4 rounded shadow">
          <p className="text-gray-500">
            Marks upload will be enabled soon.
          </p>
        </div>
      </div>
    </div>
  );
};

export default FacultyDashboard;
