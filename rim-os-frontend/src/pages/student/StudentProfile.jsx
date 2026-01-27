import { useEffect, useState } from "react";
import api from "../../api/axios";

const StudentProfile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/user-profiles/me")
      .then((res) => setProfile(res.data))
      .catch((err) => console.error("Profile load error:", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading profile...</p>;

  if (!profile) {
    return (
      <div>
        <h2 className="text-xl font-semibold mb-2">My Profile</h2>
        <p className="text-slate-500">
          No biodata found. Please complete your profile.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-xl">
      <h2 className="text-2xl font-semibold mb-4">My Profile</h2>

      <div className="space-y-2 text-sm">
        <p><strong>Name:</strong> {profile.first_name} {profile.last_name}</p>
        <p><strong>Email:</strong> {profile.email}</p>
        <p><strong>Phone:</strong> {profile.phone}</p>
        <p><strong>Gender:</strong> {profile.gender}</p>
        <p><strong>Date of Birth:</strong> {profile.date_of_birth}</p>
        <p><strong>Nationality:</strong> {profile.nationality}</p>
        <p><strong>Address:</strong> {profile.address}</p>
      </div>
    </div>
  );
};

export default StudentProfile;
