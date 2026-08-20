import { useEffect, useState } from "react";
import { Plus, ArrowDown, ArrowUp, Trash2, Pencil } from "lucide-react";
import api from "./api";

export default function App() {
  const [history, setHistory] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [value, setValue] = useState("");
  const [priority, setPriority] = useState("");

  const loadTasks = async () => {
  try {
    const res = await api.get("/tasks");

    // Ensure tasks is always an array
    setTasks(Array.isArray(res.data) ? res.data : []);
  } catch (err) {
    console.error(err);
    setTasks([]);
  }
};
  const log = (message) => {
  setHistory((prev) => [
    { message, time: new Date().toLocaleTimeString() },
    ...prev.slice(0, 4),
  ]);
};




  useEffect(() => {
  loadTasks();
}, []);

const total = tasks.length;

const highest =
  Array.isArray(tasks) && tasks.length
    ? Math.min(...tasks.map((t) => t.priority))
    : "-";

const lowest =
  Array.isArray(tasks) && tasks.length
    ? Math.max(...tasks.map((t) => t.priority))
    : "-";


  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="max-w-6xl mx-auto p-8">

        <div className="mb-8">
          <h1 className="text-4xl font-bold">Persistent Priority Queue</h1>
          <p className="text-slate-400 mt-2">
            Min-Max Heap + PostgreSQL + React
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <div className="bg-slate-900 rounded-2xl p-5 border border-slate-800">
            <p className="text-slate-400 text-sm">Total Tasks</p>
            <h2 className="text-3xl font-bold mt-2">{total}</h2>
          </div>

          <div className="bg-slate-900 rounded-2xl p-5 border border-slate-800">
            <p className="text-slate-400 text-sm">Highest Priority</p>
           <h2 className="text-3xl font-bold mt-2 text-green-400">
  {highest}
</h2>
          </div>

          <div className="bg-slate-900 rounded-2xl p-5 border border-slate-800">
            <p className="text-slate-400 text-sm">Lowest Priority</p>
            <h2 className="text-3xl font-bold mt-2 text-red-400">
  {lowest}
</h2>
          </div>
        </div>

        <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6 mb-8">
          <h3 className="text-xl font-semibold mb-4">Add Task</h3>

          <div className="grid md:grid-cols-4 gap-3">
            <input
  value={value}
  onChange={(e) => setValue(e.target.value)}
  placeholder="Task name"
  className="bg-slate-800 rounded-xl px-4 py-3 outline-none border border-slate-700"
/>

<input
  type="number"
  value={priority}
  onChange={(e) => setPriority(e.target.value)}
  placeholder="Priority"
  className="bg-slate-800 rounded-xl px-4 py-3 outline-none border border-slate-700"
/>

            <button
  onClick={async () => {
  if (!value.trim()) {
    alert("Enter task name");
    return;
  }

  if (priority === "") {
    alert("Enter priority");
    return;
  }

  try {
    await api.post("/insert", {
      value: value.trim(),
      priority: Number(priority),
    });

    log(`Inserted "${value}"`);
log("Extracted minimum task");
log("Updated priority");
log("Deleted task");



    setValue("");
    setPriority("");
    loadTasks();
  } catch (err) {
  console.log("STATUS:", err.response?.status);
  console.log("DATA:", err.response?.data);
  console.log("ERROR:", err);

  alert(
    `${err.response?.status || ""}\n${JSON.stringify(err.response?.data)}`
  );
}
}}
              className="bg-indigo-600 hover:bg-indigo-700 rounded-xl font-medium flex items-center justify-center gap-2"
            >
              <Plus size={18} />
              Add Task
            </button>

            <button
  onClick={() => {
    setValue("");
    setPriority("");
  }}
  className="bg-emerald-600 hover:bg-emerald-700 rounded-xl font-medium"
>
  Reset
</button>
          </div>
        </div>

        <div className="flex gap-4 mb-6">
         <button
  onClick={async () => {
    try {
      await api.post("/extract-min");
      loadTasks();

      log(`Inserted "${value}"`);
log("Extracted minimum task");
log("Updated priority");
log("Deleted task");
    } catch {
      alert("Priority Queue is empty!");
    }
  }}
  className="flex-1 bg-indigo-600 hover:bg-indigo-700 py-3 rounded-xl flex items-center justify-center gap-2 font-semibold"
>
  <ArrowDown size={18}/>
  Extract Min
</button>

          <button
  onClick={async () => {
    try {
      await api.post("/extract-max");
      loadTasks();

      log(`Inserted "${value}"`);
log("Extracted minimum task");
log("Updated priority");
log("Deleted task");
    } catch {
      alert("Priority Queue is empty!");
    }
  }}
  className="flex-1 bg-rose-600 hover:bg-rose-700 py-3 rounded-xl flex items-center justify-center gap-2 font-semibold"
>
  <ArrowUp size={18}/>
  Extract Max
</button>
        </div>
        <div className="bg-slate-900 rounded-2xl border border-slate-800 p-5 mb-6">
  <h3 className="font-semibold mb-3">Recent Operations</h3>

  {history.length === 0 ? (
    <p className="text-slate-500 text-sm">No operations yet.</p>
  ) : (
    <div className="space-y-2">
      {history.map((h, i) => (
        <div key={i} className="flex justify-between text-sm">
          <span>{h.message}</span>
          <span className="text-slate-500">{h.time}</span>
        </div>
      ))}
    </div>
  )}
</div>

        <div className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden">
          <div className="flex justify-between items-center px-5 py-4 border-b border-slate-800">
  <h3 className="text-lg font-semibold">Queue Items</h3>

  <span className="text-sm text-slate-400">
    {tasks.length} Active Tasks
  </span>
</div>
          <table className="w-full">
            <thead className="bg-slate-800 text-slate-300">
              <tr>
                <th className="text-left p-4">ID</th>
                <th className="text-left p-4">Task</th>
                <th className="text-left p-4">Priority</th>
                <th className="text-right p-4">Actions</th>
              </tr>
            </thead>

            <tbody>
  {tasks.length === 0 ? (
    <tr>
      <td colSpan="4" className="text-center py-12 text-slate-500">
        No tasks in the priority queue.
      </td>
    </tr>
  ) : (
    tasks.map((task) => (
      <tr key={task.id} className="border-t border-slate-800 hover:bg-slate-800/40 transition">
        <td className="p-4">{task.id}</td>

        <td className="p-4 font-medium">{task.value}</td>

        <td className="p-4">
          <span
            className={`px-3 py-1 rounded-full text-xs font-semibold ${
              task.priority <= 10
                ? "bg-green-600 text-white"
                : task.priority <= 30
                ? "bg-yellow-400 text-black"
                : "bg-red-600 text-white"
            }`}
          >
            P{task.priority}
          </span>
        </td>

        <td className="p-4">
          <div className="flex justify-end gap-2">
            <button
              onClick={async () => {
                const p = prompt("Enter new priority", task.priority);
                if (!p) return;

                await api.put(`/update/${task.id}`, {
                  priority: Number(p),
                });

                loadTasks();
                log(`Inserted "${value}"`);
log("Extracted minimum task");
log("Updated priority");
log("Deleted task");
              }}
              className="p-2 bg-slate-700 rounded-lg hover:bg-slate-600"
            >
              <Pencil size={16} />
            </button>

            <button
              onClick={async () => {
                if (!confirm(`Delete "${task.value}"?`)) return;

                await api.delete(`/delete/${task.id}`);
                loadTasks();

                log(`Inserted "${value}"`);
log("Extracted minimum task");
log("Updated priority");
log("Deleted task");
              }}
              className="p-2 bg-red-700 rounded-lg hover:bg-red-600"
            >
              <Trash2 size={16} />
            </button>
          </div>
        </td>
      </tr>
    ))
  )}
</tbody>
          </table>
        </div>

      </div>
    </div>
  );
}