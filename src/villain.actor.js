self.addEventListener('message', function() {
    return flee()
      .then(leaveClues)
      .then(self.postMessage);
});

function leaveClues(destinations) {
  const witnesses = ['Bank', 'Library', 'Airport'];
  return { destinations, witnesses };
}

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