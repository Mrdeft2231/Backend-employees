
let image = document.querySelector('.photo');
let file = document.querySelector('#photo');

let employeeButton = document.querySelector('#employee-button');
let staffEmployee = document.querySelector('.Staff-Editor-item-shadow');
let buttonExist = document.querySelector('#button-staff-exit');

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

 