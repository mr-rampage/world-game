console.info('new witness created!');
self.addEventListener('message', function(e) {
  console.info(e.data);
});