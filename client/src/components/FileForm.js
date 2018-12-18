import React, { Component } from 'react';
import styled from 'styled-components';
import { toast } from 'react-toastify';

import Loader from './misc/Loader';

const DEV_API_ROOT = 'http://localhost:4000'
const PROD_API_ROOT = 'https://morejust.herokuapp.com'
const FILE_LIMIT = 5;

class FileForm extends Component {
  constructor(props) {
    super(props);

    this.API_ROOT = window.location.hostname === 'morejust.store'
      ? PROD_API_ROOT
      : DEV_API_ROOT;
      // : `//${window.location.host}`;

    this.state = {
      loading: false
    };
    this.toastId = [];
  }

  submit(e) {
    e.preventDefault();

    if (this.refs.formInput.files.length < 1) {

      // Notification
      const id = 'noFiles';
      if (! toast.isActive(this.toastId[id])) {
        this.toastId[id] = toast.info("📂 Select files first!", {
          position: toast.POSITION.TOP_CENTER
        });
      }
      return;
    }

    if(this.refs.formInput.files.length > FILE_LIMIT) {

      // Notification
      const id = 'fileLimit';
      if (! toast.isActive(this.toastId[id])) {
        this.toastId[id] = toast.error(`✋ You can upload ${FILE_LIMIT} files ot once`, {
          position: toast.POSITION.TOP_CENTER
        });
      }
      return;
    }

    var formData = new FormData(this.refs.form);
    this.setState({ loading: true });

    this.refs.formInput.value = '';
    this.filesChanged();

    fetch(`${this.API_ROOT}/upload`, { // Your POST endpoint
      method: 'POST',
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
