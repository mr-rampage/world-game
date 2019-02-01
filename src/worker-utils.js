function log(id, message) {
  console.info(`Message received at ${id}: `, message);
  return message;
}

function openChannel(port, handler) {
  port.addEventListener('message', handler);
  port.start();
  return port;
}

function randomInt(max) {
  return (Math.random() * max) | 0;
}
