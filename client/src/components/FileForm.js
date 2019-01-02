import React, { Component } from 'react';
import styled from 'styled-components';
import { toast } from 'react-toastify';

import Loader from './misc/Loader';

const myHeaders = new Headers({
  "Access-Control-Allow-Origin": "*",
});

class FileForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false
    };
    this.toastId = [];
  }

  submit(e) {
    e.preventDefault();

    if (this.refs.formInput.files.length < 1) {
      this.refs.formInput.click();
      return;
    }

    if(this.refs.formInput.files.length > this.props.FILES_LIMIT) {
      this.notify('fileLimit', `✋ You can upload ${this.props.FILES_LIMIT} files ot once`);
      return;
    }

    // Going through each file to check its limit 
    const files = this.refs.formInput.files;
    const maxFileSize = this.props.MAX_FILE_SIZE_MB * 1000000;

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (file.size >= maxFileSize) {

        this.notify('fileSize', `🛑 File ${file.name} exceeds a size limit. Currently we support files no bigger than ${this.props.MAX_FILE_SIZE_MB} mb.`);
        this.refs.formInput.value = '';
        this.filesChanged();
        return;
      }
    }

    var formData = new FormData(this.refs.form);
    this.setState({ loading: true });

    this.refs.formInput.value = '';
    this.filesChanged();

    fetch(`${this.props.API_ROOT}/upload`, { // Your POST endpoint
      method: 'POST',
      headers: myHeaders,
      body: formData // This is your file object
    })
    .then(response => {
      return response.json();
    })
    .then(data => {
      this.props.addLinks(data);
      this.setState({ loading: false });
    })
    .catch(err => {
      console.error(err);
      this.setState({ loading: false });
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

  notify(id, text) {
    if (! toast.isActive(this.toastId[id])) {
      this.toastId[id] = toast.error(text, {
        position: toast.POSITION.TOP_CENTER
      });
    }
  }

  renderButton() {
    if (this.state.loading) {
      const Container = styled.div`
        display: flex;
        width: 100%;
        align-items: center;
        flex-wrap: wrap;
        justify-content: space-evenly;
      `;
      return (
        <Container>
          <Loader 
            pColor='#434bdf'
            height={15}
            width={15}
          />
        </Container>
      );
    }

    return <button ref="formSubmit" className="btn_1 rounded" type="submit">Upload</button>;
  }

  render() {
    return (
      <div className="form-wrapper">
        <form ref="form" onSubmit={this.submit.bind(this)} id="form-upload" className="upload-form" method="post" encType="multipart/form-data">
          <input ref="formInput" onChange={this.filesChanged.bind(this)} id="form-input" type="file" name="somefiles" multiple />
          <p ref="inputText">Drag your files here or click in this area.</p>
          {this.renderButton()}
        </form>
      </div>
    );
  }
}

export default FileForm;
