import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface Todo {
  ID: number;
  Title: string;
  Completed: boolean;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Todo-app';
  todos: Todo[] = [];
  newTodo: Todo = { ID: 0, Title: '', Completed: false };

  constructor(private http: HttpClient) {
    this.refreshTodos();
  }

  refreshTodos() {
    this.http.get<Todo[]>('http://env-0445775.sh2.hidora.net:8080/todos').subscribe((data) => {
      this.todos = data;
	    console.log("refreshTodos:", data);
    });
  }

  addTodo() {
	if (this.newTodo.Title.trim() === '') {
    // Add appropriate error handling for empty title
	console.error("Title cannot be empty.");
	alert("Title cannot be empty. Please enter a valid title.");
    return;
    }  
    this.http.post<Todo>('http://env-0445775.sh2.hidora.net:8080/todos', this.newTodo).subscribe(() => {
      this.newTodo = { ID: 0, Title: '', Completed: false };
      this.refreshTodos();
    });
  }

  updateTodo(todo: Todo) {
  this.http.put<Todo>(`http://env-0445775.sh2.hidora.net:8080/todos/${todo.ID}`, todo).subscribe(
    (data) => {
      console.log("Updated Todo:", data);
      this.refreshTodos();
    },
    (error) => {
      console.error("Error updating todo:", error);
    });
  }
  
  deleteTodo(id: number) {
    this.http.delete(`http://env-0445775.sh2.hidora.net:8080/todos/${id}`).subscribe(() => {
      this.refreshTodos();
    });
  }
}
