var Filter = require('bad-words'),
  filter = new Filter()


  function determineIsProfane(content) {
      return filter.isProfane(content);
  }

  export { determineIsProfane }
