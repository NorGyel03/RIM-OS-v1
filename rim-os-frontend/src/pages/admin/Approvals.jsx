import { useEffect, useState } from "react";
import api from "../../api/axios";

const Approvals = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionId, setActionId] = useState(null);

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
      setActionId(id);
      await api.post(`/admin/approve-user/${id}`);
      setUsers((prev) => prev.filter((u) => u.id !== id));
    } catch {
      alert("Approval failed");
    } finally {
      setActionId(null);
    }
  };

  const reject = async (id) => {
    if (!confirm("Reject and delete this user?")) return;

    try {
      setActionId(id);
      await api.delete(`/admin/reject-user/${id}`);
      setUsers((prev) => prev.filter((u) => u.id !== id));
    } catch {
      alert("Failed to reject user");
    } finally {
      setActionId(null);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-10">

      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-semibold text-black">
          User Approvals
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Review and manage pending user access requests
        </p>
      </div>

      {/* LOADING */}
      {loading && (
        <div className="text-sm text-slate-500">
          Loading pending approvals…
        </div>
      )}

      {/* EMPTY STATE */}
      {!loading && users.length === 0 && (
        <div className="bg-white border border-slate-200 rounded-lg p-6 text-sm text-slate-600">
          No pending user approvals.
        </div>
      )}

      {/* TABLE */}
      {!loading && users.length > 0 && (
        <div className="bg-white border border-slate-200 rounded-lg overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-slate-600">
              <tr>
                <th className="px-6 py-3 text-left">Username</th>
                <th className="px-6 py-3 text-left">Role</th>
                <th className="px-6 py-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {users.map((u) => (
                <tr key={u.id} className="hover:bg-slate-50">
                  <td className="px-6 py-3 text-slate-900">
                    {u.username}
                  </td>
                  <td className="px-6 py-3 text-slate-600">
                    {u.role}
                  </td>
                  <td className="px-6 py-3 text-right">
                    <div className="inline-flex gap-2">
                      <button
                        onClick={() => approve(u.id)}
                        disabled={actionId === u.id}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-md px-4 py-1.5 text-sm font-medium disabled:opacity-60"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => reject(u.id)}
                        disabled={actionId === u.id}
                        className="bg-rose-600 hover:bg-rose-700 text-white rounded-md px-4 py-1.5 text-sm font-medium disabled:opacity-60"
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
      )}

    </div>
  );
};

export default Approvals;
