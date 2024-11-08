import './style.css';

interface Todo {
  id: number;
  title: string;
  completed: boolean;
  dueDate?: string; // Tilføjer dueDate som en valgfri egenskab
  priority: 'Low' | 'Medium' | 'High'; // Ny egenskab til prioritet
}

let todos: Todo[] = [];

const todoInput = document.getElementById('todo-input') as HTMLInputElement;
const todoList = document.getElementById('todo-list') as HTMLUListElement;
const todoForm = document.querySelector('.todo-form') as HTMLFormElement;
const dueDateInput = document.getElementById('due-date') as HTMLInputElement; // Nyt due date inputfelt
const priorityFilter = document.getElementById('priority-filter') as HTMLSelectElement; // Prioritet filterelement

// Funktion til at tilføje en ny to-do
const addTodo = (text: string, dueDate: string, priority: 'Low' | 'Medium' | 'High'): void => {
  const newTodo: Todo = {
    id: Date.now(),
    title: text,
    completed: false,
    dueDate: dueDate,
    priority: priority
  };
  todos.push(newTodo);
  console.log("todo added", todos);
  renderTodos(); // Opdater visningen med den nye opgave
};

// Funktion til at render todos
const renderTodos = (): void => {
  todoList.innerHTML = '';
  todos.forEach(todo => {
    const li = document.createElement('li');
    li.className = 'todo-item';

    // Fremhæv to-dos der er forfaldne
    const isOverdue = todo.dueDate && new Date(todo.dueDate) < new Date();
    if (isOverdue) {
      li.style.backgroundColor = 'lightcoral'; // Rød baggrund for forfaldne to-dos
    } else if (todo.completed) {
      li.style.backgroundColor = 'lightgreen'; // Grøn baggrund for fuldførte to-dos
    } else {
      // Farv todoen baseret på prioritetsniveauet
      switch (todo.priority) {
        case 'High':
          li.style.backgroundColor = 'grey'; // Mørkegrå baggrund for høj prioritet
          break;
        case 'Medium':
          li.style.backgroundColor = 'darkgrey'; // Grå baggrund for medium prioritet
          break;
        case 'Low':
          li.style.backgroundColor = 'lightgrey'; // Lys grå baggrund for lav prioritet
          break;
      }
    }

    li.innerHTML = `
      <span>${todo.title}</span>
      ${todo.dueDate ? `<span class="due-date">Due: ${todo.dueDate}</span>` : ''}
      <span class="priority">Priority: ${todo.priority}</span>
      <button class="toggle-status">Mark as ${todo.completed ? 'Incomplete' : 'Complete'}</button>
      <button id="delete" class="remove-button">Remove</button>
      <button id="editBtn">Edit</button>
    `;

    addToggleStatusButtonListener(li, todo.id);
    addRemoveButtonListener(li, todo.id);
    addEditButtonListener(li, todo.id);
    todoList.appendChild(li);
  });
};

// Funktion til at vise filtrerede opgaver baseret på prioritet
const renderFilteredTodos = (filteredTodos: Todo[]): void => {
  todoList.innerHTML = ''; // Ryd tidligere liste
  filteredTodos.forEach(todo => {
    const li = document.createElement('li');
    li.className = 'todo-item';

    // Fremhæv to-dos der er forfaldne
    const isOverdue = todo.dueDate && new Date(todo.dueDate) < new Date();
    if (isOverdue) {
      li.style.backgroundColor = 'lightcoral';
    } else if (todo.completed) {
      li.style.backgroundColor = 'lightgreen';
    } else {
      switch (todo.priority) {
        case 'High':
          li.style.backgroundColor = 'grey';
          break;
        case 'Medium':
          li.style.backgroundColor = 'darkgrey';
          break;
        case 'Low':
          li.style.backgroundColor = 'lightgrey';
          break;
      }
    }

    li.innerHTML = `
      <span>${todo.title}</span>
      ${todo.dueDate ? `<span class="due-date">Due: ${todo.dueDate}</span>` : ''}
      <span class="priority">Priority: ${todo.priority}</span>
      <button class="toggle-status">Mark as ${todo.completed ? 'Incomplete' : 'Complete'}</button>
      <button id="delete" class="remove-button">Remove</button>
      <button id="editBtn">Edit</button>
    `;

    addToggleStatusButtonListener(li, todo.id);
    addRemoveButtonListener(li, todo.id);
    addEditButtonListener(li, todo.id);
    todoList.appendChild(li);
  });
};

// Funktion til at filtrere opgaver efter valgt prioritet
const filterByPriority = (): void => {
  const selectedPriority = priorityFilter.value as 'Low' | 'Medium' | 'High' | '';

  const filteredTodos = selectedPriority
    ? todos.filter(todo => todo.priority === selectedPriority)
    : todos;

  renderFilteredTodos(filteredTodos); // Brug den filtrerede render-funktion
};

// Event listener til at filtrere opgaver baseret på prioritet
priorityFilter.addEventListener('change', filterByPriority);

todoForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const text = todoInput.value.trim();
  const dueDate = dueDateInput.value;
  const priority = (document.getElementById('priority') as HTMLSelectElement).value as 'Low' | 'Medium' | 'High';
  
  if (text !== '') {
    addTodo(text, dueDate, priority);
  }
  
  todoInput.value = '';
  dueDateInput.value = '';
});

const addToggleStatusButtonListener = (li: HTMLLIElement, id: number) => {
  const toggleButton = li.querySelector('.toggle-status');
  toggleButton?.addEventListener('click', () => toggleTodoStatus(id));
};

const toggleTodoStatus = (id: number) => {
  const todo = todos.find(todo => todo.id === id);
  if (todo) {
    todo.completed = !todo.completed;
    renderTodos();
  }
  console.log("todo status toggled", todos);
};

const addRemoveButtonListener = (li: HTMLLIElement, id: number) => {
  const removeButton = li.querySelector('.remove-button');
  removeButton?.addEventListener('click', () => removeTodo(id));
};

const removeTodo = (id: number) => {
  todos = todos.filter(todo => todo.id !== id);
  console.log("todo removed", todos);
  renderTodos();
};

const addEditButtonListener = (li: HTMLLIElement, id: number) => {
  const editButton = li.querySelector('#editBtn');
  editButton?.addEventListener('click', () => editTodo(id));
};

const editTodo = (id: number) => {
  const todo = todos.find(todo => todo.id === id);
  if (todo) {
    const text = prompt('Edit todo text', todo.title);
    if (text) {
      todo.title = text;
      renderTodos();
    }
  }
  console.log("todo edited", todos);
};

const initializeColorPicker = (): void => {
  const colorPicker = document.getElementById('colorPicker') as HTMLInputElement;
  if (colorPicker) {
    colorPicker.addEventListener('input', (event: Event) => {
      const target = event.target as HTMLInputElement;
      changeBackgroundColor(target.value);
    });
  } else {
    console.error('Color picker not found');
  }
};

const changeBackgroundColor = (color: string): void => {
  document.body.style.backgroundColor = color;
};

document.addEventListener('DOMContentLoaded', () => {
  initializeColorPicker();
  renderTodos(); // Initial visning af alle opgaver
});
