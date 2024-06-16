// let dataSwitch = false


async function hangleFormSubmit(event) {
  event.preventDefault()
  const data = serializeForm(event.target)

  toggleLoader();
  const { status, error } = await sendData(data)
  toggleLoader();

  if (status === 200) {
    onSuccess(event.target)
    // dataSwitch = true
    fetchData();
    
  } else if ( error && error.message) {
    onError(error)
  } else {
    alert('Произошла ошибка но не на сервере')
  }
}

function serializeForm(formNode) {
  const data = new FormData(formNode)
  return data;
}

function toggleLoader() {
  const loader = document.getElementById('loader')
  loader.classList.toggle('hidden')
}

function onSuccess() {
  alert('Данные сотрудников успешно отправленны')
  document.getElementById('Editor-employee').style.display = 'none'
}

function onError(error) {
  alert(error.message);
}

async function sendData(data) {
  console.log('Данные сотрудников', Array.from(data.entries()))
  return await fetch('/api/employee', {
    method: 'POST',
    body: data,
  })
}
const applicationFormEmployee = document.getElementById('employee-form')
applicationFormEmployee.addEventListener('submit', hangleFormSubmit);


// function SortAnArrayOfEmployee(employee) {
//   if (dataSwitch) {

//   }
// }