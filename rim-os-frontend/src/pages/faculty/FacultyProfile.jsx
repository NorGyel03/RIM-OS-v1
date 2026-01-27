import { useEffect, useState } from "react";
import api from "../../api/axios";

const FacultyProfile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/user-profiles/me")
      .then(res => setProfile(res.data))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading profile...</p>;
  if (!profile) return <p>No profile found</p>;

  return (
    <div className="max-w-2xl bg-white p-6 rounded shadow text-slate-800">
      <h2 className="text-xl font-semibold mb-4">My Profile</h2>

      <div className="space-y-2">
        <p><b>Name:</b> {profile.first_name} {profile.last_name}</p>
        <p><b>Email:</b> {profile.email}</p>
        <p><b>Phone:</b> {profile.phone}</p>
        <p><b>Gender:</b> {profile.gender}</p>
        <p><b>Date of Birth:</b> {profile.date_of_birth?.slice(0,10)}</p>
        <p><b>Nationality:</b> {profile.nationality}</p>
        <p><b>Address:</b> {profile.address}</p>
      </div>
    </div>
  );
};

export default FacultyProfile;
