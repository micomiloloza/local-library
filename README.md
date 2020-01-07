# local-library
Library web app made in Express framework

This web application manages the catalog for a local library.
This app can add, delete and edit authors, books and genres.


Setup Express development including Node.js, npm package manager and Express Application generator.
Node and the NPM package manager are installed together from prepared binary packages installers, operating system package managers or from source.
Express is then installed by NPM as a dependency of your individual Express web applications (along with other libraries like template engines, database drivers, authentication middleware, etc.)

NPM can also be used to globally install the Express Application Generator.
A tool for creating skeleton Express web apps that follow the MVC pattern. 
This application generator is optional because you don’t need to use this tool to create apps that use Express, but we will be using it because it makes getting started a lot easier and gives us a modular application structure for a start.
Unlike some other web frameworks in Node Express a web application creates and runs its own web server!
For Express you should always use latest Node version.


# Installing Node

In order to use Express you will first have to install Node.js and the Node Package Manager(NPM) on your operating system.
Installing Node and NPM is straightforward because you can just use the provided installer:
Go to https://nodejs.org/en/
Select the button to download the LTS build that is “Recommended for most users”.

The easiest way to test that node is installed is to run the “version” command in your terminal/command prompt and check that a version string is returned:
```bash
  > node -v
  v10.17.3
```
The Node.js package manager NPM should also have been installed and can be tested in the same way:
  ```bash
	> npm -v
	7.0.0
  ```
To test if everything works let’s create a very basic node server that simply prints out “Hello Library” in the browser when you visit the correct URL in your browser:
```node
//Load HTTP module
const http = require("http");
const hostname = '127.0.0.1';
const port = 3000;

//Create HTTP server and listen on port 3000 for requests
const server = http.createServer((req, res) => {

  //Set the response HTTP header with HTTP status and Content type
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello `library\n');
});

//listen for request on port 3000, and as a callback function have the port listened on logged
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
```
The code imports the “http” module and uses it to create a server createServer() that listens for HTTP requests on port 3000. The script than prints a message to the console about what browser URL you can use to test the server.
The createServer() function takes as an argument a callback function that will be invoked when an HTTP request is received - this simply returns a response with an HTTP status code of 200(“OK”) and the plain text “Hello Library”.

Start the server by navigating into the same directory as your hellonode.js file in your command prompt, and calling node along with the script name, like so:
	>node hellonode.js
	Server tunning at http://127.0.0.1:3000/
Navigate to the URL  http://127.0.0.1:3000/. If everything is working the browser should simply display the string “Hello Library”.

# Using NPM

Next to Node, NPM is the most important tool for working with Node applications. NPM is used to fetch any packages (Javascript libraries) that an application needs for development, testing or production. 
From Node’s perspective Express is just another package that you need to install using NPM and then require in your own code.

You can manually use NPM to separately fetch each needed package. Typically we instead manage dependencies using a plain-text definition file named package.json. This file lists all dependencies for a specific JavaScript package.

If a dependency is only used during development, you should instead save it as a "development dependency" (so that your package users don't have to install it in production).
```json
"devDependencies": {
    "eslint": "^4.12.1"
  }
```
