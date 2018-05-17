let notAllowed = [
  'fuck', 'shit', 'damn', 'bitch', 'ass'
]; // censored stuff

module.exports = (req, res, next) => {
  while ( notAllowed.find( word => req.body.text.includes(word) ) ) {
    const badWord = notAllowed.find( word => req.body.text.includes(word) );
    req.body.text = req.body.text.replace( badWord, '*'.repeat( badWord.length ) );
  }
  next();
}


/*
Use module.exports to export a function that has a req, res, and next parameter.
Copy in the following filter code:
 filter logic
Call next after the while loop.
*/