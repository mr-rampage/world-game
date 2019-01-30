self.addEventListener('message', function() {
  $world = fetch('https://restcountries.eu/rest/v2/all')
    .then(response => response.json())
    .then(destinations => [
      destinations[randomInt(destinations.length)],
      destinations[randomInt(destinations.length)],
      destinations[randomInt(destinations.length)]
    ])
    .then(self.postMessage);
}, false);

function randomInt(max) {
  return (Math.random() * max) | 0;
}