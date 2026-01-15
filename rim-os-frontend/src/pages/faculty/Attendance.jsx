import AttendanceForm from "./AttendanceForm";

const Attendance = () => {
  console.log("Attendance page rendered");

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">
        Attendance Page Loaded
      </h2>

      <AttendanceForm />
    </div>
  );
};

export default Attendance;
