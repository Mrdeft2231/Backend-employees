
function hangleFormSubmit(event) {
  event.preventDefault()
  serializeForm(applicationForm)
  console.log('Отправка успешно');
}

function serializeForm(formNode) {
  console.log(Array.from(data.entries()))
  return new FormData(formNode);
}

const applicationForm = document.getElementById('user');
applicationForm.addEventListener('submit', hangleFormSubmit)
