import { pool } from "../../config/db.js";

const WEIGHTS = {
  mid1: 15,
  mid2: 15,
  digital1: 10,
  digital2: 10,
  digital3: 10,
  final: 40
};

const REQUIRED_COMPONENTS = [
  "mid1",
  "mid2",
  "digital1",
  "digital2",
  "digital3",
  "final"
];

const gradeFromScore = (score) => {
  if (score >= 90) return "A+";
  if (score >= 80) return "A";
  if (score >= 70) return "B";
  if (score >= 60) return "C";
  if (score >= 50) return "D";
  return "F";
};

export const computeAndStoreFinalScore = async (
  studentId,
  courseId,
  semester,
  academicYear
) => {
  /* 1️⃣ Check if GPA is already locked */
  const lockCheck = await pool.query(
    `
    SELECT is_locked
    FROM final_scores
    WHERE student_id = $1
      AND course_id = $2
      AND semester = $3
      AND academic_year = $4
    `,
    [studentId, courseId, semester, academicYear]
  );

  if (lockCheck.rows[0]?.is_locked) {
    throw new Error("GPA already finalized and locked");
  }

  /* 2️⃣ Fetch marks */
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

  /* 3️⃣ Validate completeness */
  const presentComponents = rows.map(r => r.component);
  const missing = REQUIRED_COMPONENTS.filter(
    c => !presentComponents.includes(c)
  );

  if (missing.length > 0) {
    throw new Error(
      `Cannot compute GPA. Missing components: ${missing.join(", ")}`
    );
  }

  /* 4️⃣ Compute weighted total */
  let total = 0;

  for (const r of rows) {
    const weight = WEIGHTS[r.component];
    total += (r.score / r.max_score) * weight;
  }

  const totalScore = Number(total.toFixed(2));
  const grade = gradeFromScore(totalScore);

  /* 5️⃣ Upsert final score */
  await pool.query(
    `
    INSERT INTO final_scores (
      student_id,
      course_id,
      total_score,
      grade,
      semester,
      academic_year,
      is_locked
    )
    VALUES ($1, $2, $3, $4, $5, $6, true)
    ON CONFLICT (student_id, course_id, semester, academic_year)
    DO UPDATE SET
      total_score = EXCLUDED.total_score,
      grade = EXCLUDED.grade,
      is_locked = true
    `,
    [
      studentId,
      courseId,
      totalScore,
      grade,
      semester,
      academicYear
    ]
  );

  return {
    total: totalScore,
    grade
  };
};

/* ============================= */
/* STUDENT GPA / TRANSCRIPT VIEW */
/* ============================= */

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
