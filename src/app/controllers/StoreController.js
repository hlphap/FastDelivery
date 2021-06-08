const Store = require("../models/Store");

class StoreController {
  //[GET] stores/
  index(req, res, next) {
    Store.find({})
      .populate("idBank")
      .then((stores) => {
        res.status(200).json(stores);
      })
      .catch(next);
  }

  //[GET] stores/:id
  show(req, res, next) {
    Store.findOne({ _id: req.params.id })
      .then((store) => res.status(200).json(store))
      .catch(next);
  }

  //[POST] stores/
  create(req, res, next) {
    const formData = req.body;
    const store = new Store(formData);
    store
      .save()
      .then(() => res.status(200).json({ result: 1 }))
      .catch(next);
  }

  //[PUT] stores/:id
  update(req, res, next) {
    const formData = req.body;
    Store.updateOne({ _id: req.params.id }, formData)
      .then(() => res.status(200).json({ result: 1 }))
      .catch(next);
  }

  //[DELETE] stores/:id
  delete(req, res, next) {
    Store.deleteOne({ _id: req.params.id })
      .then(() => res.status(200).json({ result: 1 }))
      .catch(next);
  }
}

module.exports = new StoreController();
