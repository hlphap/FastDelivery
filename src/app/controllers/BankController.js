const Bank = require("../models/Bank");

class BankController {
  //[GET] banks/
  index(req, res, next) {
    Bank.find({})
      .then((banks) => {
        res.status(200).json(banks);
      })
      .catch(next);
  }

  //[GET] banks/:id
  show(req, res, next) {
    Bank.findOne({ _id: req.params.id })
      .then((bank) => res.status(200).json(bank))
      .catch(next);
  }

  //[POST] banks/
  create(req, res, next) {
    const formData = req.body;
    const bank = new Bank(formData);
    bank
      .save()
      .then(() => res.status(200).json({ result: 1 }))
      .catch(next);
  }

  //[PUT] banks/:id
  update(req, res, next) {
    const formData = req.body;
    Bank.updateOne({ _id: req.params.id }, formData)
      .then(() => res.status(200).json({ result: 1 }))
      .catch(next);
  }

  //[DELETE] banks/:id
  delete(req, res, next) {
    Bank.deleteOne({ _id: req.params.id })
      .then(() => res.status(200).json({ result: 1 }))
      .catch(next);
  }
}

module.exports = new BankController();
