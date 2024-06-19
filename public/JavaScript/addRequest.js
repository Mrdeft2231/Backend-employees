// Создание и отправка данных в БД

async function hangleFormSubmit(event) {
  event.preventDefault()
  const data = serializeForm(event.target)
  const formType = event.target.getAttribute('data-form-type')

  toggleLoader();
  try {
    let response
    let dataS
    if (formType === 'user' ) {
      response = await sendUser(data)
      dataS = 1
    } else if (formType === 'employee') {
      dataS = 2
      response = await sendEmployee(data);
    } else if (formType === 'machine') {
      dataS = 3
      response = await sendMachine(data);
    } else if (formType === 'data'){
      dataS = 4
      response = await sendSchedule(data)
    }

    const {status, error} = response;
    console.log('response', response)
    toggleLoader();
    console.log(dataS)
    if (status === 200) {
      onSuccess(event.target)
      dataSwitch = true

      if (dataS === 1) {
        fetchData();
      } else if (dataS === 2) {
        fetchDataEmployee();
      } else if (dataS === 3) {
        fetchDataMachine();
      } else if (dataS === 4) {
        console.log('Отработал')
        fetchDataSchedule();
      }

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

// Создание таблицы сотрудников
async function sendEmployee(data) {
  console.log('Данные с формы сотрдуников', Array.from(data.entries()))
  return await fetch('/api/employee', {
    method: 'POST',
    body: data,
  })
}

// Создание таблицы станков
async function sendMachine(data) {
  console.log('Данные с формы станков', Array.from(data.entries()))
  return await fetch('/api/machine', {
    method: 'POST',
    body: data
  })
}

// Создание таблицы графиков
async function sendSchedule(data) {
  console.log('Данные графика', Array.from(data.entries()))
  return await fetch('/api/schedule', {
    method: 'POST',
    body: data
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


// Получение данных с БД пользователей
async function fetchData() {
  try {
    const response = await fetch('/api/user')
    const userData = await response.json();
    
    SortAnArrayOfUsers(userData);

  } catch (err) {
    console.error('Ошибка при получении данных:', err);
  }
}

// Получение данных с БД сотрудников
async function fetchDataEmployee() {
  try {
    const employeeResponse = await fetch('/api/employee')
    const employeeData = await employeeResponse.json();
    console.log('сотрудник', employeeData)
    SortAnArrayOfEmployee(employeeData)
  } catch (err) {
    console.error('Ошибка при получении данных:', err)
  }
}

async function fetchDataMachine() {
  try {
    const machineResponse = await fetch('/api/machine')
    const machineData = await machineResponse.json();
    SortAnArrayOfMachine(machineData);
  } catch (err) {
    console.error('Ошибка при получении данных:', err)
  }
}

async function fetchDataSchedule() {
  try {
    const scheduleResponse = await fetch('/api/schedule')
    const scheduleData = await scheduleResponse.json();
    SortAnArrayOfSchedule(scheduleData)

  } catch (err) {
    console.error('Ошибка при получении данных:', err)
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

// Обработка данных сотрудников

function SortAnArrayOfEmployee(employees) {
  if (dataSwitch) {
    const employee = employees[employees.length - 1]
    const item = templateEmployee.content.cloneNode(true)
    item.getElementById('template-employee-name').textContent = employee.name;
    item.getElementById('template-employee-job').textContent = employee.job;
    item.getElementById('template-employee-photo').src = `http://localhost:3000/${employee.photoPath}`;

    document.getElementById('employee-row').append(item);
    return dataSwitch = false
  } else {
    employees.forEach((employee) => {
      const item = templateEmployee.content.cloneNode(true)
    item.getElementById('template-employee-name').textContent = employee.name;
    item.getElementById('template-employee-job').textContent = employee.job;
    item.getElementById('template-employee-photo').src = `http://localhost:3000/${employee.photoPath}`;

    document.getElementById('employee-row').append(item);
    })
  }
}

// Обработка данных станков

function SortAnArrayOfMachine(machine) {
  if (dataSwitch) {
    const machines = machine[machine.length - 1]
    const item = templateMachine.content.cloneNode(true)
    
    item.getElementById('templaye-machine-name').textContent = machines.machine;
    item.getElementById('template-machine-photo').src = `http://localhost:3000/${machines.photoPath}`;

    document.getElementById('machine-row').append(item)
    return dataSwitch = false
  } else {
    machine.forEach((machinees) => {
    const item = templateMachine.content.cloneNode(true)
    item.getElementById('template-machine-name').textContent = machinees.machine;
    item.getElementById('template-machine-photo').src = `http://localhost:3000/${machinees.photoPath}`;

    document.getElementById('machine-row').append(item)
    })
  }
}

// Обработка данных графика

function SortAnArrayOfSchedule(schedule) {
  if (dataSwitch) {
    const schedules = schedule[schedule.length -1]
    const item = templateSchedule.content.cloneNode(true)

    item.getElementById('template-dataMonth').textContent = schedules.dataMonth
    item.getElementById('template-dateMode').textContent = schedules.dateMode
    item.getElementById('template-dateSchedule').textContent = schedules.dateSchedule
    item.getElementById('template-dateTime').textContent = schedules.dateTime

    document.getElementById('schedule-row').append(item)
  } else {
    schedule.forEach((schedules) => {

    item.getElementById('template-dataMonth').textContent = schedules.dataMonth
    item.getElementById('template-dateMode').textContent = schedules.dateMode
    item.getElementById('template-dateSchedule').textContent = schedules.dateSchedule
    item.getElementById('template-dateTime').textContent = schedules.dateTime

    })
  }
}

const templateUser = document.getElementById('template-user')
const templateEmployee = document.getElementById('template-employee')
const templateMachine = document.getElementById('template-machine')
const templateSchedule = document.getElementById('template-schedule')

fetchData();
fetchDataEmployee();
fetchDataMachine();