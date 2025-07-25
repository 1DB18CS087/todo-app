import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { Task } from '../../models/task.model';
import { TodoService } from '../../services/todo.service';

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
})
export class TodoComponent implements OnInit {
  todoForm: FormGroup;
  tasks: Task[] = [];

  constructor(private todoService: TodoService) {
    this.todoForm = new FormGroup({
      title: new FormControl('', Validators.required),
    });
  }

  ngOnInit(): void {
    this.tasks = this.todoService.getTasks();
  }

  addTask(): void {
    if (this.todoForm.invalid) return;

    const newTask: Task = {
      id: Date.now(),
      title: this.todoForm.value.title,
      completed: false,
    };

    this.tasks.push(newTask);
    this.saveTasks();
    this.todoForm.reset();
  }

  deleteTask(id: number): void {
    this.tasks = this.tasks.filter((task) => task.id !== id);
    this.saveTasks();
  }

  toggleDone(task: Task): void {
    task.completed = !task.completed;
    this.saveTasks();
  }

  saveTasks(): void {
    this.todoService.saveTasks(this.tasks);
  }
}
