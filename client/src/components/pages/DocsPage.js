import React from 'react';
import { Link } from 'react-router-dom';

import Header from '../Header';
import Footer from '../Footer';

export default function DocsPage() {
  const API = {
    node: `const request = require('request');
const fs = require('fs');
const path = require('path');

// const API_URL = 'http://localhost:4000/file'; // Local EndPoint
const API_URL = 'https://morejust.herokuapp.com/file';

var r = request.post(API_URL, function optionalCallback (err, httpResp, fileLink) {
  if (err) {
    return console.error('Upload failed:', err);
  }
  console.log('Upload successful! Link:', fileLink);
});
var form = r.form();

// To load file from current folder
form.append('file', fs.createReadStream(path.join(__dirname, 'image.png')));

// To load file anywhere from computer
// form.append('file', fs.createReadStream('/Users/viktorkirillov/Documents/GitHub/store/image.png'));
`,
    python: `import requests

# url = 'http://localhost:4000/file' #Local EndPoint
url = 'https://morejust.herokuapp.com/file'

# To load file from current folder
files = {'file': open('image.png', 'rb')}

# To load file amywhere from computer
# files = {'file': open('/Users/viktorkirillov/Documents/GitHub/store/image.png', 'rb')}

r = requests.post(url, files=files)
print(r.text)
`,
  }
  return(
    <div>
      <Header />
      <main role="main" className="container">
        <h2 className="mt-5">Installation</h2>
        <p className="lead">Here is step-by-step guide on how to create your own Free & Unlimited Cloud Storage.</p>
        <span className="h6" role="img" aria-label="First">1️⃣</span> 
        <p style={{display: 'inline'}}><span className="bold">Create GitHub token</span></p>

        <ul style={{marginLeft: '22px', marginTop: '10px'}}>
          <li>1. Register on GitHub and go to <a href="https://github.com/settings/tokens/new" target="blank">Settings -> Developer Settings -> Personal Access Tokens -> Generate new token</a></li><br/>
          <li>2. Give it a random name, select public repo and scroll below and smash Generate. You don't have to add any additional rights if you want to store your files on public repositories.</li><br/>
          <li>3. Copy generated GitHub token and go to the next part: Deployment.</li>
        </ul>

        <span className="h6" role="img" aria-label="Second">2️⃣</span> 
        <p style={{display: 'inline'}}><span className="bold">Deployment on Heroku</span></p>

        <ul style={{marginLeft: '22px', marginTop: '10px'}}>
          <li>Heroku allows to create free small machines and deploy from GitHub in one click. You will need to have a Heroku account to proceed, so please <a href="https://signup.heroku.com/login" target="blank">register</a>.</li>
          <br/>
          <li>1. Press the button below to deploy with one click</li><br/>
          <a style={{marginLeft: '22px'}} href="https://heroku.com/deploy?template=https://github.com/morejust/store/tree/heroku-deploy" target="blank">
            <img src="https://www.herokucdn.com/deploy/button.svg" alt="Deploy" />
          </a><br/><br/>
          <li>2. Choose any app name you like.</li><br/>
          <li>3. Click the <span className="bold">'Manage App'</span> at the bottom of the page.</li><br/>
          <li>4. Click <span className="bold">'Settings'</span> and <span className="bold">'Reveal Config Vars'</span>.</li><br/>
          <li>5. Set the key to <span className="bold">GITHUB_TOKEN</span> and the <span className="bold"><i>value</i></span> to the generated on the previous steps GitHub token.</li><br/>
          <li>6. Smash 'Open app' and enjoy!</li><br/>
        </ul>

        {/*  */}
        <hr/>

        <h2 className="mt-5">API Endpoints</h2>
        <p className="lead">There is an API Endpoint <code>POST /file</code> which can be used to upload files from anywhere outside our app.</p>
        <p>This Endpoint receives only a <code>SINGLE</code> file, so in order to upload more than 1 file - use <code>for</code> loop</p>
        
        <p style={{marginBottom: '10px'}}>Node.JS example:</p>
        <pre><code className="language-js">{API.node}</code></pre>

        <br/>
        <p style={{marginBottom: '10px'}}>Python example:</p>
        <pre><code className="language-python">{API.python}</code></pre>

        <br/>
        <p>Back to <Link to="/">the main page</Link> to use service online.</p>
      </main>
      <Footer />
    </div>
  );
}