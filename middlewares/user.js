


const fiind = async (req, res, next) => {
  console.log(req.body);
  res.send('Запрос принят')
  next();
}

module.exports = fiind