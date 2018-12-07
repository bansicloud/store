const form = document.getElementById('form-upload');
const input = document.getElementById('form-input');
const loaded = document.querySelector('.loader');
const file_list = document.querySelector('#uploaded-list');
const file_link = document.querySelector('.uploaded-file-link');

const DEV_API_ROOT = 'http://localhost:4000'
const PROD_API_ROOT = 'https://morejust.herokuapp.com'
const REL_API_ROOT = '/'
const API_ROOT = window.location.hostname === 'morejust.store'
  ? PROD_API_ROOT
  : REL_API_ROOT

const showLoading = () => {
  loaded.style.display = 'block'
}

const hideLoading = () => {
  loaded.style.display = 'none'
}

const printFileList = (files) => {
  const new_files_list = files.map(link => {
    const node = file_link.cloneNode(true);

    node.style.display = 'block';
    node.querySelector('a').innerText = link;
    node.querySelector('a').href = link;

    return node
  });

  file_list.append(...new_files_list);
}

form.onsubmit = (e => {
  e.preventDefault();

  if (input.files.length < 1) {
    console.log('Upload files first');
    return;
  }
  console.log('Generating links');
  showLoading();

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
    printFileList(data);
    hideLoading();
  })
  .catch(err => {
    hideLoading();
    console.error(err);
    alert(err.name + ": " + err.message);
  });
})
