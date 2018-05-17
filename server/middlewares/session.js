module.exports = (req, res, next) => {
  if (!req.session.user){
    session.user = { messages: [] }
  }
  next();
}






/*

*/