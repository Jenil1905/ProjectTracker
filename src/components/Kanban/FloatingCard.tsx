import { useTaskStore } from "../../store/useTaskStore";
import type { Task } from "../../types/task";

export function FloatingCard({ task }: { task: Task }) {
  const { dragPosition } = useTaskStore();

  if (!dragPosition) return null;

  return (
    <div
      className="fixed pointer-events-none opacity-90 bg-white border border-gray-200 p-3 rounded-xl shadow-xl z-[1000] font-semibold text-gray-800"
      style={{
        top: dragPosition.y,
        left: dragPosition.x,
        transform: "translate(-50%, -50%)",
      }}
    >
      {task.title}
    </div>
  );
}