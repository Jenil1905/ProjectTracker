import { useEffect, useState } from "react";
import { useTaskStore } from "../store/useTaskStore";
import TimelineView from "../components/TimeLine/TimelineView";
import KanbanBoard from "../components/Kanban/KanbanBoard";
import ListView from "../components/List/ListView";

function Home() {
  const { setTasks } = useTaskStore();
  const [view, setView] = useState<"kanban" | "list" | "timeline">("kanban");

  useEffect(() => {
    const statuses = ["todo", "inprogress", "review", "done"] as const;
    const priorities = ["low", "medium", "high", "critical"] as const;

    const tasks = Array.from({ length: 40 }).map((_, i) => ({
      id: String(i),
      title: `Task ${i}`,
      status: statuses[i % 4],
      priority: priorities[i % 4],
      assignee: "JD",
      dueDate: new Date().toISOString(),
      userId: ["u1", "u2", "u3", "u4", "u5"][i % 5],
    }));

    setTasks(tasks);
  }, [setTasks]);

  return (
    <div className="h-screen bg-gray-50 p-6 md:p-8 font-sans text-gray-900 flex flex-col overflow-hidden">
      <div className="max-w-7xl mx-auto w-full flex-1 flex flex-col min-h-0">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 flex-shrink-0">
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">
            Project Tracker
          </h1>

          <div className="bg-white p-1 rounded-lg border border-gray-200 shadow-sm inline-flex">
            <button
              onClick={() => setView("kanban")}
              className={`px-4 py-2 rounded-md text-sm font-semibold transition-colors ${view === "kanban"
                ? "bg-gray-100 text-gray-900 shadow-sm"
                : "text-gray-500 hover:text-gray-900"
                }`}
            >
              Kanban
            </button>
            <button
              onClick={() => setView("list")}
              className={`px-4 py-2 rounded-md text-sm font-semibold transition-colors ${view === "list"
                ? "bg-gray-100 text-gray-900 shadow-sm"
                : "text-gray-500 hover:text-gray-900"
                }`}
            >
              List
            </button>
            <button
              onClick={() => setView("timeline")}
              className={`px-4 py-2 rounded-md text-sm font-semibold transition-colors ${view === "timeline"
                ? "bg-gray-100 text-gray-900 shadow-sm"
                : "text-gray-500 hover:text-gray-900"
                }`}
            >
              Timeline
            </button>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 flex-1 min-h-0 p-1 flex flex-col">
          {view === "kanban" && <KanbanBoard />}
          {view === "list" && <ListView />}
          {view === "timeline" && <TimelineView />}
        </div>
      </div>
    </div>
  );
}

export default Home;