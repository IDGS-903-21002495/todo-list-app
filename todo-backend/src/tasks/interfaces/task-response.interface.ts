import { Task } from '../entities/task.entity';

export interface TaskResponse {
  message: string;
  data: Task;
}

export interface TasksResponse {
  message: string;
  data: Task[];
}

export interface DeleteResponse {
  message: string;
}
