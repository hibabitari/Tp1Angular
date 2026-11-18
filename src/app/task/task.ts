import { Component } from '@angular/core';

interface TaskItem {
  id: number;
  name: string;
}

@Component({
  selector: 'app-task',
  imports: [],
  templateUrl: './task.html',
})
export class Task {
  title = 'Ma liste de tâches';
  placeholderText = 'Saisir une tâche...';
  newTask = '';
  
  // Tableau d'objets pour utiliser track task.id
  tasks: TaskItem[] = [];
  private taskIdCounter = 1;

  canDelete = false;

  onInput(event: Event) {
    this.newTask = (event.target as HTMLInputElement).value;
  }

  addTask() {
    const value = this.newTask.trim();
    if (value) {
      // Ajout avec un id unique
      this.tasks.push({ id: this.taskIdCounter++, name: value });
      this.newTask = '';
    }
  }

  rename(index: number) {
    const newName = prompt('Nouveau nom :', this.tasks[index].name);
    if (newName && newName.trim()) {
      this.tasks[index].name = newName.trim();
      this.canDelete = true;
    }
  }

  deleteTask(index: number) {
    if (this.canDelete) {
      this.tasks.splice(index, 1);
      this.canDelete = false;
    }
  }
}

//il faut importer le composant Pipe ici et pas dans le fichier app.ts.