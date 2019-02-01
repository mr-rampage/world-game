importScripts('worker-utils.js');
self.addEventListener('message', messageHandler);

async function messageHandler(e) {
  const {command, message} = e.data;
  switch (command) {
    case 'open-channel':
      openChannel(message, messageHandler)
        .postMessage({command: 'log', message: 'Greetings from Country Actor'});
      break;
    case 'log':
      log('Country', message);
      break;
    case 'describe-country':
      self.postMessage(await describeCountry(message), undefined);
      break;
    default:
      break;
  }
}

async function describeCountry(country) {
  const response = await fetch(`https://en.wikipedia.org/w/api.php?action=query&titles=${country}&format=json&origin=*&prop=extracts&explaintext&exintro&redirects=1`);
  const article = await response.json();
  return article.query.pages[Object.keys(article.query.pages)[0]].extract;
}
