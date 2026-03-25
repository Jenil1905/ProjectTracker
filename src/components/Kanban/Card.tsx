import type { Task } from "../../types/task";
import { useTaskStore } from "../../store/useTaskStore";

type Prop = {
  task: Task;
}

function Card({ task }: Prop) {
  const { title, priority, dueDate } = task;
  const { setDraggedTask, setDragPosition, setPlaceholderTask, draggedTaskId, users } = useTaskStore();
  const isOverdue = new Date(dueDate) < new Date();
  const due = new Date(task.dueDate);
const today = new Date();

const diff = Math.floor(
  (today.getTime() - due.getTime()) / (1000 * 60 * 60 * 24)
);

let dueText = due.toDateString();

if (diff === 0) dueText = "Due Today";
if (diff > 7) dueText = `Overdue by ${diff} days`;

  const user = users.find(u => u.id === task.userId);

  if (draggedTaskId === task.id) return null;
  return (
    <div
      onPointerDown={(e) => {
        e.preventDefault();
        e.currentTarget.style.cursor = "grabbing";
        setDraggedTask(task.id)
        setPlaceholderTask(task.id);
        setDragPosition({ x: e.clientX, y: e.clientY })
      }}
      className="select-none cursor-grab p-4 bg-white border border-gray-200 rounded-xl mb-3 shadow-sm hover:shadow-md transition-shadow"
    >
      {/* Title */}
      <div className="font-semibold text-gray-800 break-words">{title}</div>


      {/* Assignee Name */}
      {user && (
        <div
          className="mt-2 text-xs font-medium"
          style={{ color: user.color }}
        >
          {user.name}
        </div>
      )}

      {/* Priority */}
      <div
        className={`mt-3 text-[11px] font-bold px-2 py-0.5 rounded-full inline-block uppercase tracking-wider
        ${priority === "critical"
            ? "bg-red-100 text-red-700"
            : priority === "high"
              ? "bg-orange-100 text-orange-700"
              : priority === "medium"
                ? "bg-blue-100 text-blue-700"
                : "bg-gray-100 text-gray-700"
          }`}
      >
        {priority}
      </div>

      {/* Due Date */}
      <div
        className={`mt-3 text-xs font-medium ${isOverdue ? "text-red-600" : "text-gray-500"}`}
      >
        Due: {dueText}
      </div>
    </div>

  )
}

export default Card;