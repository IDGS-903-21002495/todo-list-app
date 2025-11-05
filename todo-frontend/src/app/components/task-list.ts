import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tasks } from '../services/tasks';
import { Task } from '../interfaces/Task';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './task-list.html',
  styleUrl: './task-list.css'
})
export class TaskListComponent implements OnInit {
  tasks = signal<Task[]>([]);
  newTaskTitle = signal('');
  newTaskDescription = signal('');
  isLoading = signal(false);
  error = signal<string | null>(null);
  showAddForm = signal(false);
  
  //* Editar una tarea *//
  editingTaskId = signal<number | null>(null);
  editingTitle = signal('');
  editingDescription = signal('');

  constructor(private tasksService: Tasks) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  //* Cargar tareas desde el servicio *//
  loadTasks(): void {
    this.isLoading.set(true);
    this.error.set(null);
    
    this.tasksService.getTasks().subscribe({
      next: (response) => {
        const tasksArray = Array.isArray(response) ? response : [];
        this.tasks.set(tasksArray);
        this.isLoading.set(false);
        console.log('Tasks loaded:', tasksArray);
      },
      error: (e) => {
        this.error.set('Error al cargar las tareas');
        this.isLoading.set(false);
        console.error('Error loading tasks:', e);
      }
    });
  }

  //* Añadir una tarea nueva *//
  addTask(): void {
    const title = this.newTaskTitle().trim();
    const description = this.newTaskDescription().trim();
    
    if (!title) {
      this.error.set('El título es un campo obligatorio.');
      return;
    }

    this.error.set(null);

    const newTask: Partial<Task> = {
      title,
      description,
      isCompleted: false
    };

    this.tasksService.createTask(newTask).subscribe({
      next: (task) => {
        this.tasks.update(tasks => [...tasks, task]);
        this.newTaskTitle.set('');
        this.newTaskDescription.set('');
        this.showAddForm.set(false);
      },
      error: (e) => {
        this.error.set('Error al crear la tarea');
        console.error('Error creating task:', e);
      }
    });
  }

  //* Abrir y cerrar el formulario para agregar o editar una tarea *//
  openAddForm(): void {
    this.showAddForm.set(true);
  }

  //* Cerrar el formulario para añadir o editar una tarea *//
  cancelAddTask(): void {
    this.newTaskTitle.set('');
    this.newTaskDescription.set('');
    this.showAddForm.set(false);
    this.error.set(null);
  }

  //* Añadir una tarea rápidamente *//
  quickAddTask(): void {
    const title = this.newTaskTitle().trim();
    
    if (!title) {
      return;
    }

    this.error.set(null);

    const newTask: Partial<Task> = {
      title,
      description: '',
      isCompleted: false
    };

    this.tasksService.createTask(newTask).subscribe({
      next: (task) => {
        this.tasks.update(tasks => [...tasks, task]);
        this.newTaskTitle.set('');
      },
      error: (e) => {
        this.error.set('Error al crear la tarea');
        console.error('Error creating task:', e);
      }
    });
  }

  //* Marcar una tarea como completada o no *//
  toggleTaskCompletion(task: Task): void {
    const newStatus = !task.isCompleted;
    this.tasksService.updateTask(task.id, { isCompleted: newStatus }).subscribe({
      next: (updatedTask) => {
        this.tasks.update(tasks =>
          tasks.map(t => t.id === updatedTask.id ? { ...t, isCompleted: newStatus } : t)
        );
      },
      error: (e) => {
        this.error.set('Error al actualizar la tarea');
        console.error('Error updating task:', e);
      }
    });
  }

    //* Editar una tarea *//
  startEdit(task: Task): void {
    this.editingTaskId.set(task.id);
    this.editingTitle.set(task.title);
    this.editingDescription.set(task.description || '');
  }

  //* Cancelar la edición de una tarea *//
  cancelEdit(): void {
    this.editingTaskId.set(null);
    this.editingTitle.set('');
    this.editingDescription.set('');
  }

  //* Guardar cambios *//
  saveEdit(taskId: number): void {
    const title = this.editingTitle().trim();
    
    if (!title) {
      this.error.set('El título es un campo obligatorio.');
      return;
    }

    const updates: Partial<Task> = {
      title,
      description: this.editingDescription().trim()
    };

    this.tasksService.updateTask(taskId, updates).subscribe({
      next: (updatedTask) => {
        this.tasks.update(tasks =>
          tasks.map(t => t.id === taskId ? { ...t, ...updates } : t)
        );
        this.cancelEdit();
      },
      error: (e) => {
        this.error.set('Error al actualizar la tarea');
        console.error('Error updating task:', e);
      }
    });
  }

    //* Eliminar una tarea *//
  deleteTask(taskId: number): void {
    if (!confirm('¿Está seguro de que quiere eliminar esta tarea?')) {
      return;
    }

    this.tasksService.deleteTask(taskId).subscribe({
      next: () => {
        this.tasks.update(tasks => tasks.filter(t => t.id !== taskId));
      },
      error: (e) => {
        this.error.set('Error al eliminar la tarea');
        console.error('Error deleting task:', e);
      }
    });
  }
}
