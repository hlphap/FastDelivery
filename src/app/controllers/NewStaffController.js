const NewStaff = require("../models/NewStaff");

class NewStaffController{
    create(req, res, next){
        const formData = req.body;
        const newStaff = NewStaff(formData);
        newStaff
            .save()
            .then(()=> res.status(200).json({ status: 200, message: "Created success" }))
    }
}

module.exports = new NewStaffController();