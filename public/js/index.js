const form = document.getElementById('form-upload');
const input = document.getElementById('form-input');

form.onsubmit = (e => {
  e.preventDefault();

  if (input.files.length < 1) {
    console.log('Upload files first');
    return;
  }
  console.log('Generating links');

  var formData = new FormData(form);

  fetch('http://localhost:4000/upload', { // Your POST endpoint
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