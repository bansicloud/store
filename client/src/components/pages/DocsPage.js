import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Prism from 'prismjs';

import "../../css/prism.css";

import Header from '../Header';
import Footer from '../Footer';

export default class DocsPage extends Component {
  componentDidMount() {
    Prism.highlightAll();
    console.log(Prism.languages);
  }

  render() {
    return(
      <div>
        <Header />
        <main role="main" className="container">
          <h2 className="mt-5">Installation</h2>
          <p className="lead">Here is step-by-step guide on how to create your own Free & Unlimited Cloud Storage.</p>
          <span className="h6" role="img" aria-label="First">1️⃣</span> 
          <p style={{display: 'inline'}}><span className="h5 bold">Create GitHub token</span></p>
  
          <ul style={{marginLeft: '22px', marginTop: '10px'}}>
            <li>1. Register on GitHub and go to <a href="https://github.com/settings/tokens/new" target="blank">Settings -> Developer Settings -> Personal Access Tokens -> Generate new token</a></li><br/>
            <li>2. Give it a random name, select public repo and scroll below and smash Generate. You don't have to add any additional rights if you want to store your files on public repositories.</li><br/>
            <img className="shadow doc-img" src="https://raw.githubusercontent.com/morejust/orgb1/ee1ec84391449b16ed643d3b629b6f0b/Screenshot%202018-12-27%20at%2014.40.19.png" alt=""/><br/><br/>
            <li>3. Copy generated GitHub token and go to the next part: Deployment.</li>
          </ul>
  
          <span className="h6" role="img" aria-label="Second">2️⃣</span> 
          <p style={{display: 'inline'}}><span className="h5 bold">Deployment on Heroku</span></p>
  
          <ul style={{marginLeft: '22px', marginTop: '10px'}}>
            <li>Heroku allows to create free small machines and deploy from GitHub in one click. You will need to have a Heroku account to proceed, so please <a href="https://signup.heroku.com/login" target="blank">register</a>.</li>
            <br/>
            <li>1. Press the button below to deploy with one click</li><br/>
            <a style={{marginLeft: '22px'}} href="https://heroku.com/deploy?template=https://github.com/morejust/store/tree/heroku-deploy" target="blank">
              <img src="https://www.herokucdn.com/deploy/button.svg" alt="Deploy" />
            </a><br/><br/>
            <li>2. Choose any app name you like.</li><br/>
            <img src="https://raw.githubusercontent.com/morejust/orgb1/1c5eff2238a0abcf387205626bf804f2/Create-heroku.png" alt="" className="shadow doc-img"/><br/><br/>
            <li>3. Click the <span className="bold">'Manage App'</span> at the bottom of the page.</li><br/>
            <li>4. Click <span className="bold">'Settings'</span> and <span className="bold">'Reveal Config Vars'</span>.</li><br/>
            <li>5. Set the key to <span className="bold">GITHUB_TOKEN</span> and the <span className="bold"><i>value</i></span> to the generated on the previous steps GitHub token.</li><br/>
            <img src="https://raw.githubusercontent.com/morejust/orgb1/c9cbc1a17746e52d1accb9d14e0f9b8b/Screenshot%202018-12-26%20at%2002.20.27.png" alt="" className="shadow doc-img"/><br/><br/>
            <li>6. Smash 'Open app' and enjoy!</li>
          </ul>
          <iframe style={{marginLeft: '22px'}} className="shadow" width="560" height="315" src="https://www.youtube.com/embed/Srz5RMnDv6s" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen title="YouTube Video Installation"></iframe>
  
          {/*  */}
          <hr/>

          <h2 className="mt-5">Optional Environment Variables</h2>
          <p className="lead">Here is the list of all possible config variables that can be changed.</p>
          <p>Except <span className="bold">GITHUB_TOKEN</span> that is required and was set earlier. <br/><br/> If you decide to use this config variables, you should specify them as environment variables.</p>
          <ul style={{marginLeft: '22px', marginTop: '10px'}}>
            <li>1. <span className="bold">BLOCK_SIZE_MB</span> - max block (github repo) size. Default value = 1000</li><br/>
            <li>2. <span className="bold">MAX_FILE_SIZE_MB</span> - max file size that can be uploaded. Default value = 100</li><br/>
            <li>3. <span className="bold">ORGANIZATION_NAME</span> - used to create blocks in the organization Github account, not in your private account. Default value - not set.</li><br/>
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
}

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
};

Prism.languages.python = {
  comment: {
      pattern: /(^|[^\\])#.*/,
      lookbehind: !0
  },
  string: {
      pattern: /(?:[rub]|rb|br)?("|')(?:\\.|(?!\1)[^\\\r\n])*\1/i,
      greedy: !0
  },
  function: {
      pattern: /((?:^|\s)def[ \t]+)[a-zA-Z_]\w*(?=\s*\()/g,
      lookbehind: !0
  },
  decorator: {
      pattern: /(^\s*)@\w+(?:\.\w+)*/i,
      lookbehind: !0,
      alias: ["annotation", "punctuation"],
      inside: {
          punctuation: /\./
      }
  },
  keyword: /\b(?:and|as|assert|async|await|break|class|continue|def|del|elif|else|except|exec|finally|for|from|global|if|import|in|is|lambda|nonlocal|not|or|pass|print|raise|return|try|while|with|yield)\b/,
  builtin: /\b(?:__import__|abs|all|any|apply|ascii|basestring|bin|bool|buffer|bytearray|bytes|callable|chr|classmethod|cmp|coerce|compile|complex|delattr|dict|dir|divmod|enumerate|eval|execfile|file|filter|float|format|frozenset|getattr|globals|hasattr|hash|help|hex|id|input|int|intern|isinstance|issubclass|iter|len|list|locals|long|map|max|memoryview|min|next|object|oct|open|ord|pow|property|range|raw_input|reduce|reload|repr|reversed|round|set|setattr|slice|sorted|staticmethod|str|sum|super|tuple|type|unichr|unicode|vars|xrange|zip)\b/,
  boolean: /\b(?:True|False|None)\b/,
  number: /(?:\b(?=\d)|\B(?=\.))(?:0[bo])?(?:(?:\d|0x[\da-f])[\da-f]*\.?\d*|\.\d+)(?:e[+-]?\d+)?j?\b/i,
  operator: /[-+%=]=?|!=|\*\*?=?|\/\/?=?|<[<=>]?|>[=>]?|[&|^~]/,
  punctuation: /[{}[\];(),.:]/
};