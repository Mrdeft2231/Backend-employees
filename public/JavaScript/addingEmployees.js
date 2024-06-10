const userInput = document.getElementById('login-name');
const passwordInput = document.getElementById('password-user');

const teamplate = document.getElementById('template-user')




async function hangleFormSubmit(event) {
  event.preventDefault()
  const data = serializeForm(event.target)

  toggleLoader();
  const { status, error } = await sendData(data)
  toggleLoader();


  if (status === 200) {
    onSuccess(event.target)
    const item = teamplate.content.cloneNode(true)

    item.getElementById('d').textContent = userInput.value;
    item.getElementById('a').textContent = passwordInput.value;

    document.querySelector('.users').append(item)
    clearInput();
  } else if (error && error.message) {
    onError(error);
  } else {
    alert('Произошла ошибка но не на сервере')
  }
}



function serializeForm(formNode) {
const data = new FormData(formNode)
console.log('Данные с формы', Array.from(data.entries()))
return data;
}

async function sendData(data) {
  return await fetch('/api/user/', {
    method: 'POST',
    headers: { 'Content-Type': 'multipart/form-data' },
    body: data,
  })
}

function clearInput() {
  userInput.value = '';
  passwordInput.value = '';
}

function toggleLoader() {
  const loader = document.getElementById('loader')
  loader.classList.toggle('hidden')
}

function onSuccess(formNode) {
  alert('Данные успешно отправленны')
  formNode.classList.toggle('hidden')
}

function onError(error) {

  alert(error.message);
}



const applicationForm = document.getElementById('user');
applicationForm.addEventListener('submit', hangleFormSubmit);
