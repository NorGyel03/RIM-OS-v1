import { getTranscriptForStudent } from "./transcripts.service.js";
import { buildTranscript } from "./transcripts.service.js";
import { generateTranscriptPDF } from "./transcript.pdf.js";


export const myTranscript = async (req, res) => {
  try {
    const data = await getTranscriptForStudent(req.user.id);
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch transcript" });
  }
};


export const myTranscriptPDF = async (req, res) => {
  try {
    const transcript = await buildTranscript(req.user.id);

    const doc = generateTranscriptPDF(transcript);

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=transcript.pdf"
    );

    doc.pipe(res);
    doc.end();
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to generate transcript PDF" });
  }
};
