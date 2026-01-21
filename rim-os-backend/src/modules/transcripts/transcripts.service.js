import { pool } from "../../config/db.js";

const gradePoints = {
  "A+": 4.0,
  "A": 3.7,
  "B": 3.0,
  "C": 2.0,
  "D": 1.0,
  "F": 0.0
};

/**
 * Low-level fetch including course credit
 */
export const getTranscriptForStudent = async (userId) => {
  const { rows } = await pool.query(
    `
    SELECT
      fs.semester,
      fs.academic_year,
      c.code,
      c.title,
      c.credit,
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
 * Credit-based transcript builder (ACADEMICALLY CORRECT)
 */
export const buildTranscript = async (userId) => {
  const rows = await getTranscriptForStudent(userId);

  const semesterMap = {};
  let totalWeightedPoints = 0;
  let totalCredits = 0;

  for (const r of rows) {
    const gp = gradePoints[r.grade] ?? 0;
    const credit = r.credit;
    const key = `${r.academic_year}-S${r.semester}`;

    // semester aggregation
    if (!semesterMap[key]) {
      semesterMap[key] = {
        weightedPoints: 0,
        credits: 0
      };
    }

    semesterMap[key].weightedPoints += gp * credit;
    semesterMap[key].credits += credit;

    // cumulative aggregation
    totalWeightedPoints += gp * credit;
    totalCredits += credit;
  }

  // compute semester GPA
  const semesterGPA = {};
  for (const key in semesterMap) {
    semesterGPA[key] = Number(
      (semesterMap[key].weightedPoints / semesterMap[key].credits).toFixed(2)
    );
  }

  const cgpa = totalCredits
    ? Number((totalWeightedPoints / totalCredits).toFixed(2))
    : 0;

  return {
    courses: rows,
    semesterGPA,
    cgpa
  };
};
