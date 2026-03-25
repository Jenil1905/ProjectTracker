import { useTaskStore } from "../../store/useTaskStore";

function TimelineView() {
  const { tasks } = useTaskStore();

  const days = Array.from({ length: 30 }, (_, i) => i + 1);
  const today = new Date().getDate();

  return (
    <div className="overflow-x-auto relative p-6 bg-white rounded-lg h-full min-h-[500px]">
      <div className="relative" style={{ width: 150 + days.length * 30 }}>

        {/* Today marker */}
        <div
          className="absolute top-0 bottom-0 w-0.5 bg-red-400 z-10"
          style={{ left: 150 + (today - 1) * 30 }}
        />

        {/* Header */}
        <div className="flex h-8 border-b border-gray-200 relative z-0 bg-white sticky top-0">
          <div className="w-[150px] shrink-0" />

          {days.map((d) => (
            <div
              key={d}
              className="w-[30px] border-l border-gray-200 text-center text-xs text-gray-500 font-medium leading-8 shrink-0"
            >
              {d}
            </div>
          ))}
        </div>

        {/* Grid lines */}
        <div className="absolute left-[150px] top-8 right-0 bottom-0 flex z-0 pointer-events-none">
          {days.map((d) => (
            <div
              key={d}
              className="w-[30px] border-l border-gray-50 shrink-0"
            />
          ))}
        </div>

        {/* Tasks */}
        <div className="mt-4 flex flex-col gap-2">
          {tasks.map((task) => {
            const start = task.startDate
              ? new Date(task.startDate).getDate()
              : new Date(task.dueDate).getDate();

            const end = new Date(task.dueDate).getDate();

            const left = (start - 1) * 30;
            // Ensure width is at least 30px (1 day) so tasks are visible even if start == end
            const width = Math.max(1, end - start + 1) * 30;

            const colorClass =
              task.priority === "critical"
                ? "bg-red-500"
                : task.priority === "high"
                  ? "bg-orange-500"
                  : task.priority === "medium"
                    ? "bg-blue-500"
                    : "bg-gray-400";

            return (
              <div
                key={task.id}
                className="flex items-center h-10 relative z-10 group hover:bg-gray-50/50 rounded-md transition-colors"
              >
                {/* Task name */}
                <div
                  className="w-[150px] px-2 text-sm font-medium text-gray-700 truncate shrink-0"
                  title={task.title}
                >
                  {task.title}
                </div>

                {/* Timeline row */}
                <div className="relative flex-1 h-full flex items-center">
                  <div
                    className={`absolute h-6 rounded-md shadow-sm transition-all duration-200 group-hover:shadow-md ${colorClass} hover:brightness-110`}
                    style={{ left, width }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default TimelineView;