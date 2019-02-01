importScripts('worker-utils.js');
self.addEventListener('message', messageHandler);

function messageHandler(e) {
  const {command, message} = e.data;
  switch (command) {
    case 'open-channel':
      openChannel(message, messageHandler);
      break;
    case 'log':
      log(message);
      break;
    case 'flee':
      flee().then(self.postMessage);
      break;
    default:
      break;
  }
}

function leaveClues(destinations) {
  const witnesses = ['Bank', 'Library', 'Airport'];
  return {destinations, witnesses};
}

function flee() {
  return fetch('https://restcountries.eu/rest/v2/all')
    .then(response => response.json())
    .then(destinations => [
      destinations[randomInt(destinations.length)],
      destinations[randomInt(destinations.length)],
      destinations[randomInt(destinations.length)]
    ])
    .then(leaveClues)
}

function randomInt(max) {
  return (Math.random() * max) | 0;
}