import { pool } from "../../config/db.js";

export const upsertComponentMark = async ({
  studentId,
  courseId,
  component,
  score,
  maxScore,
  facultyUserId
}) => {
  // map user → faculty
  const facultyRes = await pool.query(
    `SELECT id FROM faculty WHERE user_id = $1`,
    [facultyUserId]
  );

  if (facultyRes.rowCount === 0) {
    throw new Error("Faculty profile not found");
  }

  const facultyId = facultyRes.rows[0].id;

  // 1️⃣ Check if GPA is locked
const lockCheck = await pool.query(
  `
  SELECT is_locked
  FROM final_scores
  WHERE student_id = $1 AND course_id = $2
  `,
  [studentId, courseId]
);

if (lockCheck.rows[0]?.is_locked) {
  throw new Error("Marks are locked. GPA already finalized.");
}


  const result = await pool.query(
    `
    INSERT INTO marks
      (student_id, course_id, component, score, max_score, marked_by)
    VALUES ($1,$2,$3,$4,$5,$6)
    ON CONFLICT (student_id, course_id, component)
    DO UPDATE SET
      score = EXCLUDED.score,
      max_score = EXCLUDED.max_score,
      marked_by = EXCLUDED.marked_by
    RETURNING *
    `,
    [studentId, courseId, component, score, maxScore, facultyId]
  );

  return result.rows[0];
};

