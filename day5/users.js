const loadButton = document.querySelector('#load-users');
const filterInput = document.querySelector('#filter-input');
const status = document.querySelector('#status');
const usersList = document.querySelector('#users-list');

const USERS_URL = 'https://jsonplaceholder.typicode.com/users';
let users = [];

function renderUsers(list) {
  usersList.replaceChildren();

  if (list.length === 0) {
    const message = document.createElement('li');
    message.textContent = filterInput.value.trim()
      ? 'No users match your filter.'
      : 'No users to display.';
    usersList.appendChild(message);
    return;
  }

  list.forEach((user) => {
    const item = document.createElement('li');
    const name = document.createElement('h2');
    const email = document.createElement('p');
    const city = document.createElement('p');
    const company = document.createElement('p');

    name.textContent = user.name;
    email.textContent = `Email: ${user.email}`;
    city.textContent = `City: ${user.address.city}`;
    company.textContent = `Company: ${user.company.name}`;

    item.append(name, email, city, company);
    usersList.appendChild(item);
  });
}

async function loadUsers() {
  loadButton.disabled = true;
  status.textContent = 'Loading users...';

  try {
    const response = await fetch(USERS_URL);

    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    users = await response.json();
    renderUsers(users);
    status.textContent = `Loaded ${users.length} users successfully.`;
  } catch (error) {
    users = [];
    usersList.replaceChildren();
    status.textContent = 'Unable to load users. Please try again.';
    console.error('Error loading users:', error);
  } finally {
    loadButton.disabled = false;
  }
}

filterInput.addEventListener('input', () => {
  const searchText = filterInput.value.trim().toLowerCase();
  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchText)
  );

  renderUsers(filteredUsers);
});

loadButton.addEventListener('click', loadUsers);
