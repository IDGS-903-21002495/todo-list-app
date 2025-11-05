import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Task, TaskResponse } from '../interfaces/Task';

@Injectable({
  providedIn: 'root',
})
export class Tasks {
  private apiUrl = 'http://localhost:3000/tasks';
  constructor(private http: HttpClient) {}
  
  //* Obtener todas las tareas *//
  getTasks(): Observable<Task[]> {
    return this.http.get<TaskResponse>(this.apiUrl).pipe(
      map(response => response.data || [])
    );
  }
  
  //* Crear una nueva tarea *//
  createTask(task: Partial<Task>): Observable<Task> {
    return this.http.post<any>(this.apiUrl, task).pipe(
      map(response => response.data || response)
    );
  }
  
  //* Actualizar una tarea )*//
  updateTask(id: number, task: Partial<Task>): Observable<Task> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, task).pipe(
      map(response => response.data || response)
    );
  }
  
  //* Eliminar una tarea *//
  deleteTask(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
  
  //* Obtener una tarea por id *//
  getTaskById(id: number): Observable<Task> {
    return this.http.get<any>(`${this.apiUrl}/${id}`).pipe(
      map(response => response.data || response)
    );
  }
}
