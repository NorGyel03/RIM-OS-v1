import { useEffect, useState } from "react";
import {
  getUserProfile,
  createUserProfile,
  updateUserProfile,
} from "../../api/userProfiles.api";

const emptyForm = {
  firstName: "",
  middleName: "",
  lastName: "",
  gender: "",
  dateOfBirth: "",
  email: "",
  phone: "",
  address: "",
  nationality: "",
};

const UserProfileForm = ({ userId, onClose }) => {
  const [form, setForm] = useState(emptyForm);
  const [loading, setLoading] = useState(true);
  const [exists, setExists] = useState(false);

  /* LOAD PROFILE IF EXISTS */
  useEffect(() => {
    if (!userId) return;

    getUserProfile(userId)
      .then((res) => {
        setForm({
          firstName: res.data.first_name || "",
          middleName: res.data.middle_name || "",
          lastName: res.data.last_name || "",
          gender: res.data.gender || "",
          dateOfBirth: res.data.date_of_birth || "",
          email: res.data.email || "",
          phone: res.data.phone || "",
          address: res.data.address || "",
          nationality: res.data.nationality || "",
        });
        setExists(true);
      })
      .catch(() => {
        setForm(emptyForm);
        setExists(false);
      })
      .finally(() => setLoading(false));
  }, [userId]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.firstName || !form.lastName) {
      alert("First and last name are required");
      return;
    }

    try {
      if (exists) {
        await updateUserProfile(userId, form);
        alert("Profile updated");
      } else {
        await createUserProfile({ userId, ...form });
        alert("Profile created");
      }
      onClose();
    } catch (err) {
      console.error(err);
      alert("Failed to save profile");
    }
  };

  if (loading) return <p>Loading profile...</p>;

  return (
    <div className="bg-gray-600 p-6 rounded-lg shadow max-w-xl text-white">
      <h3 className="text-lg font-semibold mb-4">
        {exists ? "Edit User Profile" : "Create User Profile"}
      </h3>

      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-3">
        <input
          name="firstName"
          placeholder="First Name *"
          className="border p-2"
          value={form.firstName}
          onChange={handleChange}
        />

        <input
          name="middleName"
          placeholder="Middle Name"
          className="border p-2"
          value={form.middleName}
          onChange={handleChange}
        />

        <input
          name="lastName"
          placeholder="Last Name *"
          className="border p-2 col-span-2"
          value={form.lastName}
          onChange={handleChange}
        />

        <select
          name="gender"
          className="border p-2"
          value={form.gender}
          onChange={handleChange}
        >
          <option value="">Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>

        <input
          type="date"
          name="dateOfBirth"
          className="border p-2"
          value={form.dateOfBirth}
          onChange={handleChange}
        />

        <input
          name="email"
          placeholder="Email"
          className="border p-2 col-span-2"
          value={form.email}
          onChange={handleChange}
        />

        <input
          name="phone"
          placeholder="Phone"
          className="border p-2"
          value={form.phone}
          onChange={handleChange}
        />

        <input
          name="nationality"
          placeholder="Nationality"
          className="border p-2"
          value={form.nationality}
          onChange={handleChange}
        />

        <textarea
          name="address"
          placeholder="Address"
          className="border p-2 col-span-2"
          value={form.address}
          onChange={handleChange}
        />

        <div className="col-span-2 flex justify-end gap-2 pt-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 border rounded"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-indigo-600 text-white rounded"
          >
            {exists ? "Update" : "Create"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserProfileForm;
