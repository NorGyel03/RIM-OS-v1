import AttendanceCard from "./AttendanceCard";
import GPATable from "./GPATable";
import TranscriptCard from "./TranscriptCard";

const StudentDashboard = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">
        Student Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-4 rounded shadow">
          <AttendanceCard />
        </div>

       <div className="bg-white p-4 rounded shadow">
          <GPATable />  
      </div>

      </div>

      <div className="bg-white p-4 rounded shadow mt-6">
        <TranscriptCard />
      </div>

    </div>
  );
};

export default StudentDashboard;
