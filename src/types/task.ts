export type Status = 'todo' | 'inprogress' | 'done' | 'review';

export type Priority = 'low' | 'medium' | 'high' | 'critical';

export type Task = {
    id: string;
  title: string;
  status: Status;
  priority: Priority;
  assignee: string;
  startDate?: string;
  dueDate: string;
  userId?: string;
}
