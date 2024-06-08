
const form = document.querySelector('form-auth');
const userNameInput = document.querySelector('#login');
const userPasswordInput = document.querySelector('#password');

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const userName = userNameInput.value;
  const userPassword = userPasswordInput.value;

  if (!userName || !userPassword) {
    alert('Заполните все поля');
    return;
  }

  fetch('/auth', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      userName: userName,
      userPassword: userPassword
    })
  })
  .then(response => {
    if (response.ok) {
      return response.json();
    } else {
      return Promise.reject(response);
    }
  })
  .then(data => {
    localStorage.setItem('item', data.token);

    window.location.href = './admin/dashboard.html'
  })
  .catch(error => {
    console.error('Ошибка авторизации', error);
  })
})
