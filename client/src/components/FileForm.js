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


  render() {
    return (
      <form ref="form" onSubmit={this.submit.bind(this)} id="form-upload" method="post" encType="multipart/form-data">
        <input ref="formInput" id="form-input" type="file" name="somefiles" multiple />
        <input type="submit" />
      </form>
    );
  }
}

export default FileForm;
