const fs = require('fs');
const http = require('http');
const path = require('path');
const { spawnSync } = require('child_process');

const root = path.resolve(__dirname, '..');
const port = Number(process.argv[2]) || 8000;

const build = spawnSync(process.execPath, [path.join(root, 'scripts/build-bundle.js')], {
  cwd: root,
  encoding: 'utf8'
});

if (build.stdout) process.stdout.write(build.stdout);
if (build.stderr) process.stderr.write(build.stderr);
if (build.status !== 0) {
  console.error('Build failed. Server not started.');
  process.exit(build.status || 1);
}

const buildTime = new Date().toISOString();

const types = {
  '.css': 'text/css; charset=utf-8',
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8'
};

const server = http.createServer((req, res) => {
  const url = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
  if (url.pathname === '/__build-info') {
    res.writeHead(200, {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'no-store, max-age=0'
    });
    res.end(JSON.stringify({ buildTime, root }, null, 2));
    return;
  }

  const requested = url.pathname === '/' ? '/index.html' : decodeURIComponent(url.pathname);
  const file = path.resolve(root, `.${requested}`);

  if (!file.startsWith(root + path.sep) && file !== root) {
    res.writeHead(403);
    res.end('Forbidden');
    return;
  }

  fs.readFile(file, (err, data) => {
    if (err) {
      res.writeHead(err.code === 'ENOENT' ? 404 : 500);
      res.end(err.code === 'ENOENT' ? 'Not found' : 'Server error');
      return;
    }

    res.writeHead(200, {
      'Content-Type': types[path.extname(file).toLowerCase()] || 'application/octet-stream',
      'Cache-Control': 'no-store, max-age=0',
      'Pragma': 'no-cache',
      'Expires': '0',
      'X-Coin-And-Company-Build-Time': buildTime
    });
    res.end(data);
  });
});

server.on('error', err => {
  if (err.code === 'EADDRINUSE') {
    const nextPort = port + 1;
    console.log(`Port ${port} is already in use. Trying ${nextPort}.`);
    server.listen(nextPort);
    return;
  }

  console.error(err.message || err);
  process.exit(1);
});

server.listen(port, () => {
  console.log(`Coin and Company server running at http://localhost:${port}`);
  console.log('Close this window to stop the server.');
});
