
let image = document.querySelector('.photo');
let file = document.querySelector('#photo');


// Функция для загрузки фото
file.addEventListener('change', function() {
  image.src = URL.createObjectURL(file.files[0]);
  image.computedStyleMap.display = 'block';
})