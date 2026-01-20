import { pool } from "../../config/db.js";

const WEIGHTS = {
  mid1: 15,
  mid2: 15,
  digital1: 10,
  digital2: 10,
  digital3: 10,
  final: 40,
};

const gradeFromScore = (score) => {
  if (score >= 90) return "A+";
  if (score >= 80) return "A";
  if (score >= 70) return "B";
  if (score >= 60) return "C";
  if (score >= 50) return "D";
  return "F";
};

export const computeAndStoreFinalScore = async ({
  studentId,
  courseId,
  semester,
  academicYear,
}) => {
  const { rows } = await pool.query(
    `
    SELECT component, score, max_score
    FROM marks
    WHERE student_id = $1 AND course_id = $2
    `,
    [studentId, courseId]
  );

  if (rows.length === 0) {
    throw new Error("No marks found for this course");
  }

  let total = 0;

  for (const r of rows) {
    const weight = WEIGHTS[r.component];
    if (!weight) continue;

    total += (r.score / r.max_score) * weight;
  }

  const totalScore = Number(total.toFixed(2));
  const grade = gradeFromScore(totalScore);

  const result = await pool.query(
    `
    INSERT INTO final_scores (
      student_id,
      course_id,
      semester,
      academic_year,
      total_score,
      grade
    )
    VALUES ($1, $2, $3, $4, $5, $6)
    ON CONFLICT (student_id, course_id, semester, academic_year)
    DO UPDATE SET
      total_score = EXCLUDED.total_score,
      grade = EXCLUDED.grade
    RETURNING *
    `,
    [studentId, courseId, semester, academicYear, totalScore, grade]
  );

  return result.rows[0];
};

export const getGPAForStudent = async (userId) => {
  const { rows } = await pool.query(
    `
    SELECT
      c.code,
      c.title,
      f.total_score,
      f.grade,
      f.semester,
      f.academic_year
    FROM final_scores f
    JOIN students s ON s.id = f.student_id
    JOIN courses c ON c.id = f.course_id
    WHERE s.user_id = $1
    ORDER BY f.academic_year, f.semester, c.code
    `,
    [userId]
  );

  return rows;
};
