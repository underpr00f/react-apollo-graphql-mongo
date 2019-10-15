import React from 'react';
import { siteURL } from '../constants';
const HTML = ({ content, state, helmet, folders }) => {

  const htmlAttrs = helmet.htmlAttributes.toComponent();
  const bodyAttrs = helmet.bodyAttributes.toComponent();
  // const mainJS = assets['main.js'];
  // const vendorJS = assets['vendor.js'];
  // const mainCSS = assets['main.css'];
  // console.log("folders", folders)
  // console.log("HEY")
  return (
    <html lang="en" {...htmlAttrs}>
      <head dangerouslySetInnerHTML={{
        __html: `${helmet.title.toString()}
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    ${helmet.meta.toString()}
    <link rel="shortcut icon" href="${siteURL}/assets/graphics/favicon.ico">
    <link href="${siteURL}/assets/css/main.min.css" rel="stylesheet" type="text/css" />
    <link href="https://fonts.googleapis.com/css?family=Lato:400,700" rel="stylesheet" />
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.2.0/css/all.css" integrity="sha384-hWVjflwFxL6sNzntih27bfxkr27PmbbK/iSvJ+a4+0owXq79v+lsFkW54bOGbiDQ" crossOrigin="anonymous" />
    `}}></head>
      <body {...bodyAttrs}>
        <div id="root" dangerouslySetInnerHTML={{ __html: content }} />
        <script dangerouslySetInnerHTML={{
          __html: `window.__APOLLO_STATE__=${JSON.stringify(state).replace(/</g, '\\u003c')};`,
        }} />
        <script src="https://cdn.ckeditor.com/4.6.2/standard/ckeditor.js"></script>
        <script src={`${siteURL}/main.js`}></script>
      </body>
    </html>
  )

}

export default HTML;

