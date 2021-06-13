const Ward = require("../models/Ward");
const District = require("../models/District");
const Address = require("../models/Address");
const { json } = require("express");

class AddressController {
  async createFullAddress(formData) {
    const getWard = await Ward.findOne({ _id: formData.idWard })
      .then((ward) => ward)
      .catch((err) => ({
        message: err.message,
        err,
      }));

    const getDistrict = await District.findOne({ _id: getWard.idDistrict })
      .then((district) => district)
      .catch((err) => ({
        message: err.message,
        err,
      }));
    formData.fullAddress = `${formData.noteAddress}, ${getWard.name}, ${getDistrict.name}`;
    console.log(formData);
  }
  
  async create(formData) {
    await this.createFullAddress(formData);
    if (formData.hasOwnProperty("_id")) delete formData._id;
    const address = new Address(formData);
    const createAddress = await address
      .save()
      .then((address) => address.id)
      .catch((err) => ({
        message: err.message,
        err,
      }));
    return createAddress;
  }

  //Update Address
  async update(id, formData) {
    await this.createFullAddress(formData);
    return new Promise((resolve, reject) => {
      Address.updateOne({ _id: id }, formData)
        .then(() => resolve("Update Address Success"))
        .catch(() => reject("Update Address Failed"));
    });
  }

  //Delete Address
  delete(id) {
    Address.deleteOne({ _id: id }).then();
  }
}

module.exports = new AddressController();
