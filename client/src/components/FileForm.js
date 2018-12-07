import React, { Component } from 'react';

class FileForm extends Component {
  constructor(props) {
    super(props);

    const DEV_API_ROOT = 'http://localhost:4000'
    const PROD_API_ROOT = 'https://morejust.herokuapp.com'
    this.API_ROOT = window.location.hostname === 'localhost'
      ? DEV_API_ROOT
      : PROD_API_ROOT

    this.state = {};
  }

  submit(e) {
    e.preventDefault();

    if (this.refs.formInput.files.length < 1) {
      console.log('Upload files first');
      return;
    }
    console.log('Generating links');

    var formData = new FormData(this.refs.form);

    fetch(`${this.API_ROOT}/upload`, { // Your POST endpoint
      method: 'POST',
      body: formData // This is your file object
    })
    .then(response => {
      return response.json();
    })
    .then(data => {
      this.props.addLinks(data);
      console.log('FileForm received', data);
    })
    .catch(err => {
      console.error(err);
      alert(err.name + ": " + err.message);
    });
  }

  filesChanged() {
    const num = this.refs.formInput.files.length;
    if (num > 0) {
      this.refs.inputText.innerHTML = `You have selected ${num} file(s).`;
    } else {
      this.refs.inputText.innerHTML = `Drag your files here or click in this area.`;
    }
  }

  render() {
    console.log('Rerender file form');
    return (
      <div className="form-wrapper">
        <form ref="form" onSubmit={this.submit.bind(this)} id="form-upload" className="upload-form" method="post" encType="multipart/form-data">
          <input ref="formInput" onChange={this.filesChanged.bind(this)} id="form-input" type="file" name="somefiles" multiple />
          <p ref="inputText">Drag your files here or click in this area.</p>
          <button className="btn_1 rounded" type="submit">Upload</button>
        </form>
      </div>
    );
  }
}

export default FileForm;
