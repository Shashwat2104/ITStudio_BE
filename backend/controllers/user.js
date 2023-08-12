const userModel = require("../models/user.js");

class UserController {
  static getAllUsers(req, res) {
    userModel
      .find({})
      .then(allUsers => {
        return res.status(200).json(allUsers);
      })
      .catch(error => {
        return res.status(400).json(error);
      });
  }

  static createUser(req, res) {
    const { name, email, phonenumber,hobbies } = req.body;
    if (name && email && phonenumber && hobbies) {
      const  newUser = userModel({
        name,
        email,
        phonenumber,
        hobbies,
      });

      newUser
        .save()
        .then(savedUser => {
          return res.status(201).json(savedUser);
        })
        .catch(error => {
          return res.status(400).json({ message: "something wrong" });
        });
    } else {
      return res.status(400).json({ message: "all fields are required" });
    }
  }

  static getSingleUser(req, res) {
    const { id } = req.params;
    if (id) {
      userModel
        .findById(id)
        .then(getSingleData => {
          return res.status(200).json(getSingleData);
        })
        .catch(error => {
          return res.status(400).json(error);
        });
    } else {
      return res.status(400).json({ message: "Id not found" });
    }
  }

  static updateUser(req, res) {
    const { id } = req.params;
    if (id) {
      userModel
        .findByIdAndUpdate(id, req.body)
        .then(getUpdatedData => {
          return res.status(200).json(getUpdatedData);
        })
        .catch(error => {
          return res.status(400).json(error);
        });
    } else {
      return res.status(400).json({ message: "Id not found" });
    }
  }

  static deleteUser(req, res) {
    const { id } = req.params;
    if (id) {
      userModel
        .findByIdAndDelete(id)
        .then(getDeletedData => {
          return res.status(200).json(getDeletedData);
        })
        .catch(error => {
          return res.status(400).json(error);
        });
    } else {
      return res.status(400).json({ message: "Id not found" });
    }
  }
}

module.exports = UserController;
