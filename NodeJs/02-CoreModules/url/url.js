const url = require("url");
const address = "https://www.site.com.br/catalog?products=tv";
const parsedUrl = new url.URL(address);

console.log(parsedUrl.hostname);
console.log(parsedUrl.pathname);
console.log(parsedUrl.search);
console.log(parsedUrl.searchParams);
console.log(parsedUrl.searchParams.get("products"));
console.log(parsedUrl.searchParams.keys());
console.log(parsedUrl.searchParams.values());
