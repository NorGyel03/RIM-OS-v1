import { useEffect, useState } from "react";
import api from "../../api/axios";

const Approvals = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadPending = async () => {
    try {
      const res = await api.get("/admin/pending-users");
      setUsers(res.data);
    } catch (err) {
      console.error("Failed to load pending users", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPending();
  }, []);

  const approve = async (id) => {
    try {
      await api.post(`/admin/approve-user/${id}`);
      setUsers((prev) => prev.filter((u) => u.id !== id));
    } catch (err) {
      console.error("Approval failed", err);
      alert("Approval failed");
    }
  };

  const reject = async (id) => {
    if (!confirm("Reject and delete this user?")) return;

    try {
      await api.delete(`/admin/reject-user/${id}`);
      setUsers((prev) => prev.filter((u) => u.id !== id));
    } catch (err) {
      console.error("Rejection failed", err);
      alert("Failed to reject user");
    }
  };

  if (loading) return <p>Loading approvals...</p>;

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Pending User Approvals</h2>

      {users.length === 0 && <p>No pending users</p>}

      <table className="border w-full">
        <thead>
          <tr>
            <th className="border p-2">Username</th>
            <th className="border p-2">Role</th>
            <th className="border p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id}>
              <td className="border p-2">{u.username}</td>
              <td className="border p-2">{u.role}</td>
              <td className="border p-2">
                <div className="flex gap-2">
                  <button
                    onClick={() => approve(u.id)}
                    className="bg-green-600 text-white px-3 py-1 rounded"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => reject(u.id)}
                    className="bg-red-600 text-white px-3 py-1 rounded"
                  >
                    Reject
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Approvals;
