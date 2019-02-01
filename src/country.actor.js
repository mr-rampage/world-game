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
    case 'describe-country':
      describeCountry(message).then(self.postMessage);
      break;
    default:
      break;
  }
}

function describeCountry(country) {
  return fetch(`https://en.wikipedia.org/w/api.php?action=query&titles=${country}&format=json&origin=*&prop=extracts&explaintext&exintro&redirects=1`)
    .then(response => response.json())
    .then(result => result.query.pages[Object.keys(result.query.pages)[0]].extract);
}
