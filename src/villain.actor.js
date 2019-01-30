self.addEventListener('message', function(e) {
  switch(e.data) {
    case 'flee': return flee().then(self.postMessage);
  }
}, false);

function flee() {
  return fetch('https://restcountries.eu/rest/v2/all')
    .then(response => response.json())
    .then(destinations => [
      destinations[randomInt(destinations.length)],
      destinations[randomInt(destinations.length)],
      destinations[randomInt(destinations.length)]
    ]);
}

function randomInt(max) {
  return (Math.random() * max) | 0;
}