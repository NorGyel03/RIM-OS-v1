import { useEffect, useState } from "react";
import { getMyAttendance } from "../../api/student.api";

const AttendanceCard = () => {
  const [attendance, setAttendance] = useState(null);

  useEffect(() => {
    getMyAttendance().then(setAttendance);
  }, []);

  if (!attendance) {
    return <p>Loading attendance...</p>;
  }

  return (
    <div>
      <h2 className="text-lg font-semibold mb-2">
        Attendance
      </h2>

      <p className="text-3xl font-bold">
        {attendance.percentage}%
      </p>
    </div>
  );
};

export default AttendanceCard;
