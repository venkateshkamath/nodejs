const fs = require("fs");
const http = require("http"); 
const url = require("url");
const replaceTemplate = require("./modules/replaceTemplate");
const slugify = require("slugify");
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
  const { pathname, query } = url.parse(req.url, true);

  console.log(query, pathname);

  if (pathname === "/" || pathname === "/overview") {
    res.writeHead(200, {
      "Content-type": "text/html",
    });

    const cardsHtml = dataObj
      .map((el) => replaceTemplate(tempCard, el))
      .join("");
    let output = tempOverview.replace("{%PRODUCT_CARDS", cardsHtml);
    res.end(output);
  } else if (pathname === "/product") {
    //Getting the Product
    res.writeHead(200, {
      "Content-type": "text/html",
    });
    const product = dataObj[query.id];
    const output = replaceTemplate(tempProduct, product);

    res.end(output);
  } else if (pathname === "/api") {
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
