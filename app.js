const head = document.querySelector("head");
const body = document.querySelector("body");
const header = document.querySelector("header");
const main = document.querySelector("main");

head.innerHTML = `<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title></title>
<link href="../app.css" rel="stylesheet" type="text/css">`

const title = document.querySelector("title");

header.innerHTML = `<div id="header">

</div>`

main.innerHTML = `<div id="navbar"></div>
<div id="content"></div>`