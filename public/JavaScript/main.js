
let image = document.querySelector('.photo');
let file = document.querySelector('#photo');


// Кнопки для добавления сотрудников
let employeeButton = document.querySelector('#employee-button');
let staffEmployee = document.querySelector('#Editor-employee');
let buttonExist = document.querySelector('#button-staff-exit');

// Кнопки для добавления аккаунтов
let userButton = document.querySelector('#employee-button-user')
let userEdit = document.querySelector('#Editor-user')
let userExist = document.querySelector('#button-staff-exit-user')


// Функция для загрузки фото
file.addEventListener('change', function() {
  image.src = URL.createObjectURL(file.files[0]);
  image.computedStyleMap.display = 'block';
})

// Кнопки включения и отключения редактора сотрудника

employeeButton.addEventListener('click', function() {
  staffEmployee.style.display = 'block';
 })

buttonExist.addEventListener('click', function() {
  staffEmployee.style.display = 'none';
 })

userButton.addEventListener('click', function() {
  userEdit.style.display = 'block'
})

userExist.addEventListener('click', function() {
  userEdit.style.display = 'none'
})