import PDFDocument from "pdfkit";

export const generateTranscriptPDF = (transcript) => {
  const doc = new PDFDocument({ margin: 50 });

  // Header
  doc
    .fontSize(18)
    .text("OFFICIAL ACADEMIC TRANSCRIPT", { align: "center" })
    .moveDown();

  // Student Info
  doc
    .fontSize(12)
    .text(`Name: ${transcript.student?.name ?? "-"}`)
    .text(`Roll Number: ${transcript.student?.rollNumber ?? "-"}`)
    .moveDown();

  // Table Header
  doc
    .fontSize(11)
    .text("Course Code", 50, doc.y, { continued: true })
    .text("Title", 120, doc.y, { continued: true })
    .text("Score", 350, doc.y, { continued: true })
    .text("Grade", 420)
    .moveDown(0.5);

  // Courses
  transcript.courses.forEach(c => {
    doc
      .text(c.code, 50, doc.y, { continued: true })
      .text(c.title, 120, doc.y, { continued: true })
      .text(c.total_score.toString(), 350, doc.y, { continued: true })
      .text(c.grade, 420);
  });

  doc.moveDown();

  // GPA Summary
  doc
    .fontSize(12)
    .text(`CGPA: ${transcript.cgpa}`, { align: "right" });

  return doc;
};
