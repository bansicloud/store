const form = document.getElementById('form-upload');
const input = document.getElementById('form-input');
const DEV_API_ROOT = 'http://localhost:4000'
const PROD_API_ROOT = 'https://morejust.herokuapp.com'
const API_ROOT = window.location.host === 'morejust.store'
  ? PROD_API_ROOT
  : DEV_API_ROOT

form.onsubmit = (e => {
  e.preventDefault();

  if (input.files.length < 1) {
    console.log('Upload files first');
    return;
  }
  console.log('Generating links');

  var formData = new FormData(form);

  fetch(`${API_ROOT}/upload`, { // Your POST endpoint
    method: 'POST',
    body: formData // This is your file object
  })
  .then(response => {
    return response.json();
  })
  .then(data => {
    console.log(data);
  });
})
