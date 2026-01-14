import { pool } from "../../config/db.js";

const gradePoints = {
  "A+": 4.0,
  "A": 3.7,
  "B": 3.0,
  "C": 2.0,
  "D": 1.0,
  "F": 0.0
};

export const getTranscriptForStudent = async (userId) => {
  const { rows } = await pool.query(
    `
    SELECT
      fs.semester,
      fs.academic_year,
      c.code,
      c.title,
      fs.total_score,
      fs.grade
    FROM final_scores fs
    JOIN students s ON s.id = fs.student_id
    JOIN courses c ON c.id = fs.course_id
    WHERE s.user_id = $1
    ORDER BY fs.academic_year, fs.semester, c.code
    `,
    [userId]
  );

  return rows;
};

/**
 * High-level transcript builder
 * (this is what controller & PDF use)
 */
export const buildTranscript = async (userId) => {
  const rows = await getTranscriptForStudent(userId);

  const semesterGPA = {};
  let totalPoints = 0;
  let totalCourses = 0;

  for (const r of rows) {
    const key = `${r.academic_year}-S${r.semester}`;
    const gp = gradePoints[r.grade] ?? 0;

    if (!semesterGPA[key]) {
      semesterGPA[key] = { points: 0, count: 0 };
    }

    semesterGPA[key].points += gp;
    semesterGPA[key].count += 1;

    totalPoints += gp;
    totalCourses += 1;
  }

  const formattedSemesterGPA = {};
  for (const key in semesterGPA) {
    formattedSemesterGPA[key] = Number(
      (semesterGPA[key].points / semesterGPA[key].count).toFixed(2)
    );
  }

  const cgpa = totalCourses
    ? Number((totalPoints / totalCourses).toFixed(2))
    : 0;

  return {
    courses: rows,
    semesterGPA: formattedSemesterGPA,
    cgpa
  };
};
