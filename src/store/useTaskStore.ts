import { create } from "zustand";
import type { Task, Status } from "../types/task";

type State = {
  tasks: Task[];
  setTasks: (tasks: Task[]) => void;
  updateTaskStatus: (id: string, status: Status) => void;
  draggedTaskId: string | null;
  setDraggedTask: (id: string | null) => void;
  dragPosition: {x:number , y:number} | null;
  setDragPosition: (pos: {x:number , y:number} | null) => void;
  columns: Record<string , DOMRect>;
  setColumnRect: (status: Status, rect: DOMRect) => void;
  placeholderTaskId: string | null;
setPlaceholderTask: (id: string | null) => void;
hoveredColumn: Status | null;
setHoveredColumn: (status: Status | null) => void;
users: { id: string; name: string; color: string }[];
};

export const useTaskStore = create<State>((set) => ({
  tasks: [],
  draggedTaskId: null,
  columns: {},
  setColumnRect: (status, rect) =>
    set((state) => ({
      columns: { ...state.columns, [status]: rect },
    })),
    users:[
    { id: "u1", name: "Alice", color: "#e74c3c" },
    { id: "u2", name: "Bob", color: "#3498db" },
    { id: "u3", name: "Charlie", color: "#2ecc71" },
    {id: "u4", name: "Diana", color: "#9b59b6" },
    {id: "u5", name: "Ethan", color: "#f1c40f" },
    {id: "u6", name: "Fiona", color: "#e67e22" },
    {id: "u7", name: "George", color: "#1abc9c" },
    {id: "u8", name: "Hannah", color: "#34495e" },
    {id: "u9", name: "Ian", color: "#7f8c8d" },
    {id: "u10", name: "Jane", color: "#c0392b" },
    ],
    placeholderTaskId: null,
    setPlaceholderTask: (id) => set({ placeholderTaskId: id }),
    setDraggedTask: (id) => set({ draggedTaskId: id }),
    dragPosition: null,
    setDragPosition: (pos) => set({ dragPosition: pos }),
  setTasks: (tasks) => set({ tasks }),
  hoveredColumn: null,
    setHoveredColumn: (status) => set({ hoveredColumn: status }),
  updateTaskStatus: (id, status) =>
    set((state) => ({
      tasks: state.tasks.map((t) =>
        t.id === id ? { ...t, status } : t
      ),
    })),
}));