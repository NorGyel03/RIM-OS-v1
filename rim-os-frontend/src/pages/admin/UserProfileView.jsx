import { useEffect, useState } from "react";
import api from "../../api/axios";

const UserProfileView = ({ userId, onClose }) => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    api
      .get(`/user-profiles/${userId}`)
      .then(res => {
        setProfile(res.data); // can be null
      })
      .catch(() => {
        setProfile(null); // safety fallback
      })
      .finally(() => setLoading(false));
  }, [userId]);

  if (loading) {
    return (
      <div className="bg-white p-6 rounded shadow">
        Loading profile…
      </div>
    );
  }

  /* 🟡 NO BIO DATA CASE */
  if (!profile) {
    return (
      <div className="bg-white p-6 rounded-lg shadow max-w-md">
        <h3 className="text-lg font-semibold mb-3">User Biodata</h3>

        <p className="text-slate-600 text-sm mb-4">
          No biodata has been created for this user yet.
        </p>

        <button
          onClick={onClose}
          className="px-4 py-2 border rounded"
        >
          Close
        </button>
      </div>
    );
  }

  /* 🟢 BIO EXISTS */
  return (
    <div className="bg-white p-6 rounded-lg shadow max-w-lg">
      <h3 className="text-lg font-semibold mb-4">User Biodata</h3>

      <div className="space-y-2 text-sm">
        <p><strong>Name:</strong> {profile.first_name} {profile.middle_name} {profile.last_name}</p>
        <p><strong>Gender:</strong> {profile.gender}</p>
        <p><strong>DOB:</strong> {profile.date_of_birth}</p>
        <p><strong>Email:</strong> {profile.email}</p>
        <p><strong>Phone:</strong> {profile.phone}</p>
        <p><strong>Nationality:</strong> {profile.nationality}</p>
        <p><strong>Address:</strong> {profile.address}</p>
      </div>

      <button
        onClick={onClose}
        className="mt-4 px-4 py-2 border rounded"
      >
        Close
      </button>
    </div>
  );
};

export default UserProfileView;
