const http = require('http');

const PORT = process.env.PORT || 3000;
let requestCount = 0;

const requestListener = (req, res) => {
  requestCount++;
  if (req.url === '/' || req.url === '/dashboard') {
    const uptime = Math.floor(process.uptime());
    const html = `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><title>Dashboard</title></head>
<body>
  <h1>Hello World Dashboard</h1>
  <p>Uptime: ${uptime} seconds</p>
  <p>Requests handled: ${requestCount}</p>
  <p>Visit <code>/api/hello</code> for plain text response.</p>
</body>
</html>`;
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end(html);
  } else if (req.url === '/api/hello') {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Hello World!\n');
  } else {
    res.writeHead(404, {'Content-Type': 'text/plain'});
    res.end('Not Found');
  }
};

const server = http.createServer(requestListener);
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});