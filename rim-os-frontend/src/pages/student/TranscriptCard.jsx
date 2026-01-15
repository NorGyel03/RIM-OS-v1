import { useEffect, useState } from "react";
import { getMyTranscript } from "../../api/student.api";

const TranscriptCard = () => {
  const [transcript, setTranscript] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMyTranscript()
      .then(setTranscript)
      .finally(() => setLoading(false));
  }, []);

  const downloadPDF = () => {
    window.open(
      "http://localhost:5000/api/transcripts/me/pdf",
      "_blank"
    );
  };

  if (loading) return <p>Loading transcript...</p>;

  if (!transcript) {
    return <p>No transcript data available.</p>;
  }

  return (
    <div>
      <h2 className="text-lg font-semibold mb-2">
        Transcript
      </h2>

      <p className="mb-3">
        <strong>CGPA:</strong> {transcript.cgpa}
      </p>

      <button
        onClick={downloadPDF}
        className="bg-green-600 text-white px-4 py-2 rounded"
      >
        Download Transcript (PDF)
      </button>
    </div>
  );
};

export default TranscriptCard;
