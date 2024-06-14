

const userInput = document.getElementById('login-name');
const passwordInput = document.getElementById('password-user');
const emailUser = document.getElementById('email-user')
const template = document.getElementById('template-user')




async function hangleFormSubmit(event) {
  event.preventDefault()
  const data = serializeForm(event.target)

  toggleLoader();
  const { status, error } = await sendData(data)
  toggleLoader();


  if (status === 200) {
    onSuccess(event.target)
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
  console.log('Данные с формы', Array.from(data.entries()))
  return await fetch('/api/user', {
    method: 'POST',
    body: data,
  })
}

function clearInput() {
  userInput.value = '';
  passwordInput.value = '';
  emailUser.value = '';
  
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



const applicationForm = document.getElementById('user');
applicationForm.addEventListener('submit', hangleFormSubmit);

async function fetchData() {
  try {
    const response = await fetch('/api/user')
    const data = await response.json();
    SortAnArrayOfUsers(data);
  } catch (err) {
    console.error('Ошибка при получении данных:', err);
  }
}

function SortAnArrayOfUsers(users) {
  users.forEach((user) => {
    const item = template.content.cloneNode(true);
    console.log(user.login)
    item.getElementById('template-login').textContent = user.login;
    item.getElementById('template-email').textContent = user.email;
    item.getElementById('template-password').textContent = user.password;

    document.querySelector('.users').append(item);
  });
}


fetchData();