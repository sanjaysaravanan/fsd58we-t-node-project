import http from "http";

const server = http.createServer((request, response) => {
  /* response.end("Hello World"); */
  /* response.end("<h1>Hello World</h1>"); */
  /* response.end(JSON.stringify({ msg: "Hello World" })); */

  // Determine the type of request
  const method = request.method;

  if (method === "GET") {
    response.end(JSON.stringify({ msg: "Hello World" }));
  } else if (method === "POST") {
    console.log(request.read());

    // to create something status 201
    response.statusCode = 201;
    response.end(JSON.stringify({ msg: "Created Something Successfully" }));
  }
});

const PORT = 4500;

server.listen(PORT, () => {
  console.log("Server listening on ", PORT);
});
