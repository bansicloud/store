import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import MainPage from './pages/MainPage';
import DocsPage from './pages/DocsPage';
import LinksPage from './pages/LinksPage';

class App extends Component {
  componentDidMount() {
    this.refs.ym.innerHTML=`
    <!-- Yandex.Metrika counter -->
    <script type="text/javascript" >
       (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
       m[i].l=1*new Date();k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
       (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

       ym(51443497, "init", {
            id:51443497,
            clickmap:true,
            trackLinks:true,
            accurateTrackBounce:true,
            webvisor:true
       });
    </script>
    <noscript><div><img src="https://mc.yandex.ru/watch/51443497" style="position:absolute; left:-9999px;" alt="" /></div></noscript>
    <!-- /Yandex.Metrika counter -->
    `;
  }

  render() {
    return (
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <div>
          <div ref="ym"></div>
          <Route path={process.env.PUBLIC_URL + "/"} exact component={MainPage} />
          <Route path={process.env.PUBLIC_URL + "/docs"} exact component={DocsPage} />
          <Route path={process.env.PUBLIC_URL + "/links"} exact component={LinksPage} />
        </div>
      </BrowserRouter>
    )
  }
}

export default App;