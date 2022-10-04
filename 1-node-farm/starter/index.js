const fs = require("fs");
const http = require("http");
const url = require("url");
//The replace Template
const replaceTemplate = (temp, product) => {
  let output = temp.replaceAll();
};

// READING FILE SYNCHRONOUSLY ONLY
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
const dataObj = JSON.parse(data); //JSON to object
const tempOverview = fs.readFileSync(
  `${__dirname}/templates/template-overview.html`,
  "utf-8"
);
const tempCard = fs.readFileSync(
  `${__dirname}/templates/template-card.html`,
  "utf-8"
);
const tempProduct = fs.readFileSync(
  `${__dirname}/templates/template-product.html`,
  "utf-8"
);

const server = http.createServer((req, res) => {
  const pathName = req.url;
  if (pathName === "/" || pathName === "/overview") {
    res.writeHead(200, {
      "Content-type": "text/html",
    });

    const cardHtml = dataObj.map((el) => replaceTemplate(tempCard, el));

    res.end(tempOverview);
  } else if (pathName === "/product") {
    res.end("This is Product");
  } else if (pathName === "/api") {
    res.writeHead(200, {
      "Content-Type": "application/json",
    });
    res.end(data);

    res.end("API");
  } else {
    res.writeHead(404, {
      "Content-Type": "text/html",
      "my-own-header": "Hello World",
    });
    res.end("<h1>Page Not Found</h1>");
  }
});

server.listen(8000, () => {
  console.log("Listening to port number 8000");
});

//File sync and async
// const textIn = fs.readFileSync("./txt/input.txt", "utf-8");
// const textOut = `this is about the Avacado ${textIn}\n Created on ${Date.now()}`;
// fs.writeFileSync('./txt/output.txt', textOut);
// console.log("File is Written");

//Async(Non Blocking) Reading of the file.
// fs.readFile("./txt/start.txt", "utf-8", (err, data1) => {
//   fs.readFile(`./txt/${data1}.txt`, "utf-8", (err, data2) => {
//     fs.readFile("./txt/append.txt", "utf-8", (err, data3) => {
//       fs.writeFile("./txt/final.tx", `${data2}\n${data3}`, "utf-8", (err) => {
//         console.log(err);
//       });
//     });
//   });
// });

// console.log("File is being read"); // this will be read first

// Server
