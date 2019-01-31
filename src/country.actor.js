self.addEventListener('message', function({data: country}) {
  return enrichCountry(country)
    .then(self.postMessage)
});

function enrichCountry(country) {
  return fetch(`https://en.wikipedia.org/w/api.php?action=query&titles=${country}&format=json&origin=*&prop=extracts&explaintext&exintro&redirects=1`)
    .then(response => response.json())
    .then(result => result.query.pages[Object.keys(result.query.pages)[0]].extract);
}
