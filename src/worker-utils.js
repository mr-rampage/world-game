function log(message) {
  console.info('Message received:', message);
  return message;
}

function openChannel(port, handler) {
  port.addEventListener('message', handler);
  port.start();
  return port;
}

