// Создание и отправка данных в БД

async function hangleFormSubmit(event) {
  event.preventDefault()
  const data = serializeForm(event.target)
  const formType = event.target.getAttribute('data-form-type')

  toggleLoader();
  try {
    let response
    if (formType === 'user' ) {
      response = await sendUser(data)
    } else if (formType === 'employee') {
      response = await sendEmployee(data);
    }

    const {status, error} = response;

    toggleLoader();
    if (status === 200) {
      onSuccess(event.target)
      dataSwitch = true
      fetchData();
      clearInput();
    } else if (error && error.message) {
      onError(error);
    } else {
      alert('Произошла ошибка но не на сервере')
    }
  } catch (err) {
    toggleLoader();
    alert('Произошла ошибка: ' + e.message);
  }
  
}

function serializeForm(formNode) {
const data = new FormData(formNode)
return data;
}

function clearInput() {
  inputs.forEach(input => {
    input.value = '';
  });
}

function toggleLoader() {
  const loader = document.getElementById('loader')
  loader.classList.toggle('hidden')
}

function onSuccess() {
  alert('Данные успешно отправленны')
  document.getElementById('Editor-user').style.display = 'none'
  
}

function onError(error) {
  alert(error.message);
}

// Создание таблицы аккаунты
async function sendUser(data) {
  console.log('Данные с формы', Array.from(data.entries()))
  return await fetch('/api/user', {
    method: 'POST',
    body: data,
  })
}

async function sendEmployee(data) {
  console.log('Данные с формы сотрдуников', Array.from(data.entries()))
  return await fetch('/api/employee', {
    method: 'POST',
    body: data,
  })
}

let dataSwitch = false
const inputs = document.querySelectorAll('input')
const applicationForm = document.getElementById('user');

// Следим за всеми формами и ловим событие
document.addEventListener('DOMContentLoaded', function() {
  // Добавляем обработчик события на все формы
  document.body.addEventListener('submit', function(event) {
    // Проверяем, что событие произошло на элементе формы
    if (event.target.tagName.toLowerCase() === 'form') {
      hangleFormSubmit(event);
    }
  });
});


// Получение данных с БД
async function fetchData() {
  try {
    const response = await fetch('/api/user')
    const userData = await response.json();
    
    SortAnArrayOfUsers(userData);

    const employeeResponse = await fetch('/api/employee')
    const employeeData = await employeeResponse.json();
    console.log('сотрудник', employeeData)
    SortAnArrayOfEmployee(employeeData)

  } catch (err) {
    console.error('Ошибка при получении данных:', err);
  }
}

// Обработка данных с аккаунтов 
function SortAnArrayOfUsers(users) {
  if (dataSwitch) {
    const user = users[users.length - 1]
    const item = templateUser.content.cloneNode(true);
    item.getElementById('template-login').textContent = user.login;
    item.getElementById('template-email').textContent = user.email;
    item.getElementById('template-password').textContent = user.password;

    document.getElementById('user-row').append(item);
    return dataSwitch = false
  } else {
    users.forEach((user) => {
      const item = templateUser.content.cloneNode(true);
      item.getElementById('template-login').textContent = user.login;
      item.getElementById('template-email').textContent = user.email;
      item.getElementById('template-password').textContent = user.password;
  
      document.getElementById('user-row').append(item);
    });
  }
  console.log(users[users.length - 1])
}

const templateUser = document.getElementById('template-user')
const templateEmployee = document.getElementById('template-employee')

fetchData();

// Обработка данных сотрудников

function SortAnArrayOfEmployee(employees) {
  console.log('Проверка', employees)
  if (dataSwitch) {
    const employee = employees[employees.length - 1]
    const item = templateEmployee.content.cloneNode(true)
    item.getElementById('template-employee-name').textContent = employee.name;
    item.getElementById('template-employee-job').textContent = employee.job;
    item.getElementById('template-employee-photo').src = employee.photoPath;

    document.getElementById('employee-row').append(item);
    return dataSwitch = false
  } else {
    employees.forEach((employee) => {
      const item = templateEmployee.content.cloneNode(true)

    item.getElementById('template-employee-name').textContent = employee.name;
    item.getElementById('template-employee-job').textContent = employee.job;
    item.getElementById('template-employee-photo').src = `http://http://localhost:3000/${employee.photoPath}`;

    document.getElementById('employee-row').append(item);
    })
  }
}