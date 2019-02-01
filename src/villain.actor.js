importScripts('worker-utils.js');
self.addEventListener('message', messageHandler);

async function messageHandler(e) {
  const {command, message} = e.data;
  switch (command) {
    case 'open-channel':
      openChannel(message, messageHandler);
      break;
    case 'log':
      log(message);
      break;
    case 'flee':
      self.postMessage(await flee());
      break;
    default:
      break;
  }
}

function leaveClues(destinations) {
  const witnesses = ['Bank', 'Library', 'Airport'];
  return {destinations, witnesses};
}

async function flee() {
  const response = await fetch('https://restcountries.eu/rest/v2/all');
  const destinations = await response.json();
  return leaveClues([
    destinations[randomInt(destinations.length)],
    destinations[randomInt(destinations.length)],
    destinations[randomInt(destinations.length)]
  ]);
}

function randomInt(max) {
  return (Math.random() * max) | 0;
}