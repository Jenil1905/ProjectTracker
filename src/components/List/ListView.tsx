import { useEffect, useState } from "react";
import { useTaskStore } from "../../store/useTaskStore";

function ListView() {
    const { tasks, updateTaskStatus } = useTaskStore();
    const [sortBy, setSortBy] = useState<"priority" | "dueDate" | "title" | null>(null);
    const [order, setOrder] = useState<"asc" | "desc">("asc");
    const [scrollTop, setScrollTop] = useState(0);
    const ROW_HEIGHT = 50;
    const VISIBLE_COUNT = 25;
    const [statusFilter, setStatusFilter] = useState<string[]>([]);
    const [priorityFilter, setPriorityFilter] = useState<string[]>([]);


    const filteredTasks = tasks.filter((task) => {
        if (statusFilter.length && !statusFilter.includes(task.status)) return false;
        if (priorityFilter.length && !priorityFilter.includes(task.priority)) return false;
        return true;
    });

    const sortedTasks = [...filteredTasks].sort((a, b) => {
        if (!sortBy) return 0;

        let valA = a[sortBy];
        let valB = b[sortBy];

        if (sortBy === "dueDate") {
            return order === "asc"
                ? new Date(valA).getTime() - new Date(valB).getTime()
                : new Date(valB).getTime() - new Date(valA).getTime();
        }

        return order === "asc"
            ? String(valA).localeCompare(String(valB))
            : String(valB).localeCompare(String(valA));
    });

    // Virtual Scrolling Core Math
    const buffer = 10;
    const startIndex = Math.max(0, Math.floor(scrollTop / ROW_HEIGHT) - buffer);
    const endIndex = Math.min(
        sortedTasks.length,
        startIndex + VISIBLE_COUNT + buffer * 2
    );

    const visibleTasks = sortedTasks.slice(startIndex, endIndex);

    useEffect(() => {
        const params = new URLSearchParams();

        if (statusFilter.length) {
            params.set("status", statusFilter.join(","));
        }

        if (priorityFilter.length) {
            params.set("priority", priorityFilter.join(","));
        }

        window.history.replaceState(null, "", `?${params.toString()}`);
    }, [statusFilter, priorityFilter]);

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);

        const status = params.get("status");
        const priority = params.get("priority");

        if (status) setStatusFilter(status.split(","));
        if (priority) setPriorityFilter(priority.split(","));
    }, []);

    if (sortedTasks.length === 0) {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <p className="text-gray-500 mb-3">No results found</p>
      <button
        onClick={() => {
          setStatusFilter([]);
          setPriorityFilter([]);
        }}
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        Clear Filters
      </button>
    </div>
  );
}

    return (
        <div className="flex flex-col h-full bg-white p-6 overflow-hidden">
            <div className="mb-6 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between flex-shrink-0">
                <div className="flex items-center gap-4">
                    <strong className="text-gray-700 font-medium">Status Filter:</strong>
                    <div className="flex flex-wrap gap-3">
                        {["todo", "inprogress", "review", "done"].map((s) => (
                            <label key={s} className="flex items-center gap-1.5 text-sm text-gray-600 cursor-pointer select-none">
                                <input
                                    type="checkbox"
                                    checked={statusFilter.includes(s)}
                                    className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                                    onChange={() => {
                                        setStatusFilter((prev) =>
                                            prev.includes(s)
                                                ? prev.filter((x) => x !== s)
                                                : [...prev, s]
                                        );
                                    }}
                                />
                                <span className="capitalize">{s}</span>
                            </label>
                        ))}
                    </div>
                </div>
            </div>

            <div
                className="flex-1 overflow-y-auto rounded-lg border border-gray-200 shadow-sm bg-white relative"
                onScroll={(e) => setScrollTop(e.currentTarget.scrollTop)}
            >
                <div className="min-w-[600px] w-full text-left text-sm text-gray-700 flex flex-col">
                    {/* Header */}
                    <div className="sticky top-0 z-10 w-full flex bg-gray-50 border-b border-gray-200 shadow-sm">
                        <div className="flex-1 px-6 py-3 font-semibold cursor-pointer hover:bg-gray-100 transition-colors"
                            onClick={() => {
                                if (sortBy === "title") setOrder(order === "asc" ? "desc" : "asc");
                                else { setSortBy("title"); setOrder("asc"); }
                            }}>
                            Title {sortBy === "title" && (order === "asc" ? "↑" : "↓")}
                        </div>

                        <div className="w-32 px-6 py-3 font-semibold cursor-pointer hover:bg-gray-100 transition-colors flex-shrink-0"
                            onClick={() => {
                                if (sortBy === "priority") setOrder(order === "asc" ? "desc" : "asc");
                                else { setSortBy("priority"); setOrder("asc"); }
                            }}>
                            Priority {sortBy === "priority" && (order === "asc" ? "↑" : "↓")}
                        </div>

                        <div className="w-40 px-6 py-3 font-semibold cursor-pointer hover:bg-gray-100 transition-colors flex-shrink-0"
                            onClick={() => {
                                if (sortBy === "dueDate") setOrder(order === "asc" ? "desc" : "asc");
                                else { setSortBy("dueDate"); setOrder("asc"); }
                            }}>
                            Due Date {sortBy === "dueDate" && (order === "asc" ? "↑" : "↓")}
                        </div>

                        <div className="w-32 px-6 py-3 font-semibold text-gray-700 flex-shrink-0">Status</div>
                    </div>

                    {/* List Items */}
                    <div style={{ height: sortedTasks.length * ROW_HEIGHT, position: "relative", width: "100%" }}>
                        {visibleTasks.map((task, index) => {
                            const top = (startIndex + index) * ROW_HEIGHT;
                            return (
                                <div key={task.id} style={{ height: ROW_HEIGHT, top, position: "absolute", left: 0, right: 0 }} className="flex w-full items-center hover:bg-blue-50/50 transition-colors group border-b border-gray-100 bg-white">
                                    <div className="flex-1 px-6 py-3 font-medium text-gray-900 truncate">
                                        {task.title}
                                    </div>
                                    <div className="w-32 px-6 py-3 flex-shrink-0">
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium uppercase tracking-wider
                                            ${task.priority === "critical" ? "bg-red-100 text-red-700" :
                                                task.priority === "high" ? "bg-orange-100 text-orange-700" :
                                                    task.priority === "medium" ? "bg-blue-100 text-blue-700" :
                                                        "bg-gray-100 text-gray-700"}`}
                                        >
                                            {task.priority}
                                        </span>
                                    </div>
                                    <div className="w-40 px-6 py-3 text-gray-500 flex-shrink-0">
                                        {new Date(task.dueDate).toDateString()}
                                    </div>
                                    <div className="w-32 px-6 py-3 flex-shrink-0">
                                        <select
                                            value={task.status}
                                            onChange={(e) =>
                                                updateTaskStatus(task.id, e.target.value as any)
                                            }
                                            className="border rounded px-2 py-1 text-sm w-full"
                                        >
                                            <option value="todo">Todo</option>
                                            <option value="inprogress">In Progress</option>
                                            <option value="review">Review</option>
                                            <option value="done">Done</option>
                                        </select>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ListView;