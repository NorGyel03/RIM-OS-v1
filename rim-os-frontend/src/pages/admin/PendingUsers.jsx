import { useEffect, useState } from "react";
import {
  getPendingUsers,
  approveUser,
} from "../../api/admin.api";

const PendingUsers = () => {
  const [users, setUsers] = useState([]);

  const load = async () => {
    const res = await getPendingUsers();
    setUsers(res.data);
  };

  useEffect(() => {
    load();
  }, []);

  const approve = async (id) => {
    await approveUser(id);
    load();
  };

  return (
    <div>
      <h2 className="text-xl mb-4">Pending Users</h2>

      {users.length === 0 && <p>No pending users</p>}

      {users.map((u) => (
        <div
          key={u.id}
          className="flex justify-between border p-2 mb-2"
        >
          <span>
            {u.username} ({u.role})
          </span>
          <button
            onClick={() => approve(u.id)}
            className="bg-green-600 text-white px-3"
          >
            Approve
          </button>
        </div>
      ))}
    </div>
  );
};

export default PendingUsers;
