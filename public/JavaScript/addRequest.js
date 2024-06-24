// После отправки либо получения данных обрабатываем запрос на ошибки

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
    toggleLoader();
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
  document.getElementById('Editor-employee-data').style.display = 'none'
  document.getElementById('Editor-employee-stanok').style.display = 'none'
  document.getElementById('Editor-employee').style.display = 'none'

  
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

    SortAnArrayOfEmployee(employeeData)

  } catch (err) {
    console.error('Ошибка при получении данных:', err)
  }
}

// Получение данных с БД станков

async function fetchDataMachine() {
  try {
    const machineResponse = await fetch('/api/machine')
    const machineData = await machineResponse.json();

    SortAnArrayOfMachine(machineData);

  } catch (err) {
    console.error('Ошибка при получении данных:', err)
  }
}

// Получение данных с БД графика

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

    // Дополнительные формы станков и графика
    employees.forEach((machine) => {
      const machines = machine.machine
      if (machines.length === 0) {
        item.getElementById('template-block-machine').remove();
      } else {
        item.getElementById('template-machineEmployee-name').textContent = machines[0].machine
      }
    })


    employees.forEach((schedule) => {
      const schedules = schedule.schedule
      if (schedules.length === 0) {
        item.getElementById('template-block-schedule').remove();
      } else {
        item.getElementById('template-dataMonth-employee').textContent = schedules[0].dateMonth
        item.getElementById('template-dateMode-employee').textContent = schedules[0].dateMode
        item.getElementById('template-dateSchedule-employee').textContent = schedules[0].dateSchedule
        item.getElementById('template-dateTime-employee').textContent = schedules[0].dateTime
      }
    })

    document.getElementById('employee-row').append(item);
    return dataSwitch = false
  } else {
    employees.forEach((employee) => {
      const item = templateEmployee.content.cloneNode(true)
    item.getElementById('template-employee-name').textContent = employee.name;
    item.getElementById('template-employee-job').textContent = employee.job;
    item.getElementById('template-employee-photo').src = `http://localhost:3000/${employee.photoPath}`;
    const machines = employee.machine
    
    const schedules = employee.schedule
    
    if (schedules.length === 0) {
      item.getElementById('template-block-schedule').remove();
    } else {
    item.getElementById('template-dataMonth-employee').textContent = schedules[0].dateMonth
    item.getElementById('template-dateMode-employee').textContent = schedules[0].dateMode
    item.getElementById('template-dateSchedule-employee').textContent = schedules[0].dateSchedule
    item.getElementById('template-dateTime-employee').textContent = schedules[0].dateTime
    }

    if (machines.length === 0) {
      item.getElementById('template-block-machine').remove();
    } else {
      item.getElementById('template-machineEmployee-name').textContent = machines[0].machine
    }


    document.getElementById('employee-row').append(item);
    })
  }
}

// Обработка данных станков

function SortAnArrayOfMachine(machine) {
  if (dataSwitch) {
    const machines = machine[machine.length - 1]
    const item = templateMachine.content.cloneNode(true)
    
    item.getElementById('template-machine-name').textContent = machines.machine;
    item.getElementById('template-machine-photo').src = `http://localhost:3000/${machines.photoPath}`;

    document.getElementById('machine-row').append(item)

    // Создаём чекбоксы для станков

    const checkbox = document.createElement('input')
    checkbox.type = 'checkbox';
    checkbox.id = 'machine'
    checkbox.name = 'machine'
    checkbox.value = machines._id

    const label = document.createElement('label');
    label.htmlFor = 'machine';
    label.innerHTML = `<b>Станок:</b> <span>${machines.machine}</span> `

    StaffEditorText.appendChild(checkbox);
    StaffEditorText.appendChild(label)
    return dataSwitch = false
  } else {
    machine.forEach((machinees) => {
    const item = templateMachine.content.cloneNode(true)
    item.getElementById('template-machine-name').textContent = machinees.machine;
    item.getElementById('template-machine-photo').src = `http://localhost:3000/${machinees.photoPath}`;

    document.getElementById('machine-row').append(item)

    const checkbox = document.createElement('input')
    checkbox.type = 'checkbox';
    checkbox.id = 'machine'
    checkbox.name = 'machine'
    checkbox.value = machinees._id

    const label = document.createElement('label');
    label.htmlFor = 'machine';
    label.innerHTML = `<b>Станок:</b> <span>${machinees.machine}</span> `

    StaffEditorText.appendChild(checkbox);
    StaffEditorText.appendChild(label)
    })
  }
}

// Обработка данных графика

function SortAnArrayOfSchedule(schedule) {
  if (dataSwitch) {
    const schedules = schedule[schedule.length -1]
    const item = templateSchedule.content.cloneNode(true)

    item.getElementById('template-dataMonth').textContent = schedules.dateMonth
    item.getElementById('template-dateMode').textContent = schedules.dateMode
    item.getElementById('template-dateSchedule').textContent = schedules.dateSchedule
    item.getElementById('template-dateTime').textContent = schedules.dateTime

    document.getElementById('schedule-row').append(item)

    // Создаём чекбоксы для графика

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.id = 'schedule';
    checkbox.name = 'schedule';
    checkbox.value = schedules._id;

    const label = document.createElement('label');
    label.htmlFor = 'schedule';
    label.innerHTML = `
    <b>Месяц:</b> <span>${schedules.dateMonth}</span><br>
    <b>Режим:</b> <span>${schedules.dateMode}</span><br>
    <b>График:</b> <span>${schedules.dateSchedule}</span><br>
    <b>Время:</b> <span>${schedules.dateTime}</span><br>
    `

    StaffEditorTextSchedule.appendChild(checkbox);
    StaffEditorTextSchedule.appendChild(label)
    return dataSwitch = false
  } else {
    schedule.forEach((schedules) => {

    const item = templateSchedule.content.cloneNode(true)
      
    item.getElementById('template-dataMonth').textContent = schedules.dateMonth
    item.getElementById('template-dateMode').textContent = schedules.dateMode
    item.getElementById('template-dateSchedule').textContent = schedules.dateSchedule
    item.getElementById('template-dateTime').textContent = schedules.dateTime

    document.getElementById('schedule-row').append(item)

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.id = 'schedule';
    checkbox.name = 'schedule';
    checkbox.value = schedules._id;

    const label = document.createElement('label');
    label.htmlFor = 'schedule';
    label.innerHTML = `
    <b>Месяц:</b> <span>${schedules.dateMonth}</span><br>
    <b>Режим:</b> <span>${schedules.dateMode}</span><br>
    <b>График:</b> <span>${schedules.dateSchedule}</span><br>
    <b>Время:</b> <span>${schedules.dateTime}</span><br>
    `
    
    StaffEditorTextSchedule.appendChild(checkbox);
    StaffEditorTextSchedule.appendChild(label)
      
    })
  }
}



const StaffEditorText = document.getElementById('Staff-Editor-chebox-machine');
const StaffEditorTextSchedule = document.getElementById('Staff-Editor-chebox-schedule')

// Находим все темплейты

const templateUser = document.getElementById('template-user')
const templateEmployee = document.getElementById('template-employee')
const templateMachine = document.getElementById('template-machine')
const templateSchedule = document.getElementById('template-schedule')

// После прогрузки всей страницы прогружаем все данные с БД



fetchData();
fetchDataEmployee();
fetchDataMachine();
fetchDataSchedule()