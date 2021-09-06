const { Mongoose } = require('mongoose');
const Data = require('../models/data');
const { customAlphabet } = require('nanoid');
const validUrl = require("valid-url");
const alphabet = '0123456789ABCDEFGHIJKLMNOPRSTUVWYXZ';
const nanoid = customAlphabet(alphabet, 6);

exports.create = async function (req, res) {
  if (!req.body || !req.body.url || !validUrl.isUri(req.body.url)) {
    res.status(400).json({error:'Please enter valid url'});
    return;
  }

  Data.findOne({ longUrl: req.body.url }, function (err, result) {
    if (err) console.log(err);
    if (result) {
      res.status(200).json(result);
    } else {
      let item = new Data({
        longUrl: req.body.url,
        shortUrl: nanoid(),
      });
      Data.create(item, function (err, result) {
        if (err) console.log(err);
        if (result) res.status(200).json(item);
      });
    }
  });
};

exports.get = function (req, res) {
  Data.findOne({ shortUrl: req.params.url.toUpperCase() }, function (err, result) {
    if (err) console.log(err);
    if (result) res.redirect(result.longUrl);
    else res.redirect('/');
  });
};
