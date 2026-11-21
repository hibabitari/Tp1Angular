import { Component, computed, signal } from '@angular/core';

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

  // signal(v) : créer le signal
  tasks = signal<TaskItem[]>([]);

  // tasks() : lire le signal pour calculer le compteur
  count = computed(() => this.tasks().length);

  private taskIdCounter = 1;

  onInput(event: Event) {
    this.newTask = (event.target as HTMLInputElement).value;
  }

  addTask() {
    const value = this.newTask.trim();
    if (value) {
      const newItem: TaskItem = {
        id: this.taskIdCounter++,
        name: value,
      };

      // update(fn) : créer un nouveau tableau sans mutation (évite tasks().push(t))
      this.tasks.update((items) => [...items, newItem]);
      this.newTask = '';
    }
  }

  rename(index: number) {
    const currentTasks = this.tasks();
    const target = currentTasks[index];
    if (!target) return;

    const newName = prompt('Nouveau nom :', target.name);
    if (newName && newName.trim()) {
      const trimmed = newName.trim();
      this.tasks.update((items) =>
        items.map((item, i) => (i === index ? { ...item, name: trimmed } : item))
      );
    }
  }

  deleteTask(index: number) {
    this.tasks.update((items) => items.filter((_, i) => i !== index));
  }

  // set(v) : remplacer complètement la valeur du signal
  clearAll() {
    this.tasks.set([]);
  }
}