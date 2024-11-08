import './style.css';

interface Todo {
  id: number;
  title: string;
  completed: boolean;
  dueDate?: string;
  priority: 'Low' | 'Medium' | 'High';
}

let todos: Todo[] = [];

const todoInput = document.getElementById('todo-input') as HTMLInputElement;
const todoList = document.getElementById('todo-list') as HTMLUListElement;
const todoForm = document.querySelector('.todo-form') as HTMLFormElement;
const dueDateInput = document.getElementById('due-date') as HTMLInputElement;
const priorityFilter = document.getElementById('priority-filter') as HTMLSelectElement;

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
  renderTodos();
};

const renderTodos = (): void => {
  todoList.innerHTML = '';
  todos.forEach(todo => {
    const li = document.createElement('li');
    li.className = 'todo-item';

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
      <button class="remove-button">Remove</button>
      <button class="edit-button">Edit</button>
    `;

    addToggleStatusButtonListener(li, todo.id);
    addRemoveButtonListener(li, todo.id);
    addEditButtonListener(li, todo.id);
    todoList.appendChild(li);
  });
};

const renderFilteredTodos = (filteredTodos: Todo[]): void => {
  todoList.innerHTML = '';
  filteredTodos.forEach(todo => {
    const li = document.createElement('li');
    li.className = 'todo-item';

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
      <button class="remove-button">Remove</button>
      <button class="edit-button">Edit</button>
    `;

    addToggleStatusButtonListener(li, todo.id);
    addRemoveButtonListener(li, todo.id);
    addEditButtonListener(li, todo.id);
    todoList.appendChild(li);
  });
};

const filterByPriority = (): void => {
  const selectedPriority = priorityFilter.value as 'Low' | 'Medium' | 'High' | '';

  const filteredTodos = selectedPriority
    ? todos.filter(todo => todo.priority === selectedPriority)
    : todos;

  renderFilteredTodos(filteredTodos);
};

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
  const editButton = li.querySelector('.edit-button');
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

const initializeThemeSelector = (): void => {
  const themeSelector = document.getElementById('themeSelector') as HTMLSelectElement;

  if (themeSelector) {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.body.setAttribute('data-theme', savedTheme);
    themeSelector.value = savedTheme;

    themeSelector.addEventListener('change', (event: Event) => {
      const target = event.target as HTMLSelectElement;
      changeTheme(target.value);
    });
  } else {
    console.error('Theme selector not found');
  }
};

const changeTheme = (theme: string): void => {
  document.body.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
};

document.addEventListener('DOMContentLoaded', () => {
  initializeColorPicker();
  initializeThemeSelector();
  renderTodos();
});

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

priorityFilter.addEventListener('change', filterByPriority);
