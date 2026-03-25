import { useEffect } from "react";
import { useTaskStore } from "../../store/useTaskStore";
import Column from "./Column";
import { FloatingCard } from "./FloatingCard";

function KanbanBoard() {
  const { tasks, draggedTaskId, setDragPosition, setDraggedTask, setPlaceholderTask, columns, setHoveredColumn } = useTaskStore();
  const draggedTask = tasks.find((t) => t.id === draggedTaskId);

  const todo = tasks.filter((t) => t.status === "todo");
  const inprogress = tasks.filter((t) => t.status === "inprogress");
  const review = tasks.filter((t) => t.status === "review");
  const done = tasks.filter((t) => t.status === "done");

  useEffect(() => {
    const move = (e: PointerEvent) => {
      if (draggedTaskId) {
        const { clientX, clientY } = e;

        setDragPosition({ x: clientX, y: clientY });

        let found = null;

        for (const status in columns) {
          const rect = columns[status];

          if (
            clientX >= rect.left &&
            clientX <= rect.right &&
            clientY >= rect.top &&
            clientY <= rect.bottom
          ) {
            found = status;
            break;
          }
        }

        setHoveredColumn(found as any);
      }
    };

    window.addEventListener("pointermove", move);

    return () => window.removeEventListener("pointermove", move);
  }, [draggedTaskId, columns, setDragPosition, setHoveredColumn]);

  useEffect(() => {
    const up = (e: PointerEvent) => {
      const { draggedTaskId, columns, updateTaskStatus } = useTaskStore.getState();
      let dropped = false;
      if (draggedTaskId) {
        const { clientX, clientY } = e;

        for (const status in columns) {
          const rect = columns[status];

          if (
            clientX >= rect.left &&
            clientX <= rect.right &&
            clientY >= rect.top &&
            clientY <= rect.bottom
          ) {
            updateTaskStatus(draggedTaskId, status as any);
            dropped = true;
            break;
          }
        }
        if (!dropped) {
          console.log("Task was not dropped in a valid column");
        }
      }

      setDraggedTask(null);
      setDragPosition(null);
      setPlaceholderTask(null);
      setHoveredColumn(null);
    };

    window.addEventListener("pointerup", up);

    return () => window.removeEventListener("pointerup", up);
  }, [setDragPosition, setDraggedTask, setHoveredColumn, setPlaceholderTask]);

  useEffect(() => {
    setTimeout(() => {
      window.dispatchEvent(new Event("resize"));
    }, 100);
  }, []);

  return (
    <div className="flex gap-6 p-6 overflow-x-auto min-h-[500px]">
      <Column title="To Do" tasks={todo} status="todo" />
      <Column title="In Progress" tasks={inprogress} status="inprogress" />
      <Column title="Review" tasks={review} status="review" />
      <Column title="Done" tasks={done} status="done" />
      {draggedTask && (
        <FloatingCard task={draggedTask} />
      )}
    </div>
  );
}

export default KanbanBoard;