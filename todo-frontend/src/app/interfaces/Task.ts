export interface Task {
  id: number;
  title: string;
  description: string;
  isCompleted: boolean;
  createdAt: string | Date;
}

export interface TaskResponse {
  message: string;
  data: Task[];
}