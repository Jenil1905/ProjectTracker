import type { Task, Status } from "./../../types/task"
import Card from "./Card";
import { useTaskStore } from "../../store/useTaskStore";
import { useEffect, useRef } from "react";


type Props = {
  title: string;
  tasks: Task[];
  status: Status;
}

function Column({ title, tasks, status }: Props) {
  const { setColumnRect, placeholderTaskId, hoveredColumn } = useTaskStore();
  const ref = useRef<HTMLDivElement | null>(null);


  useEffect(() => {
    const register = () => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        setColumnRect(status, rect);
        console.log("REGISTERED:", status, rect); // debug
      }
    };

    register();

    window.addEventListener("resize", register);

    return () => window.removeEventListener("resize", register);
  }, [setColumnRect, status]);

  return (
    <div
      className={`w-72 shrink-0 flex flex-col rounded-xl p-4 transition-colors duration-200 ${hoveredColumn === status
          ? "bg-blue-50 border border-blue-200"
          : "bg-gray-50/50 border border-transparent"
        }`}
      ref={ref}
    >
      <h3 className="font-bold text-gray-700 mb-4 px-1">{title}({tasks.length})</h3>

      <div className="flex flex-col min-h-[100px]">
        {tasks.map((task) => {
          if (task.id === placeholderTaskId) {
            return (
              <div
                key={task.id}
                className="h-[120px] border-2 border-dashed border-gray-300 rounded-lg mb-2 bg-gray-100"
              />
            );
          }

          return <Card key={task.id} task={task} />;
        })}
        {tasks.length === 0 && (
  <div className="text-gray-400 text-sm mt-4">
    No tasks here
  </div>
)}
      </div>
    </div>
  );
}

export default Column;