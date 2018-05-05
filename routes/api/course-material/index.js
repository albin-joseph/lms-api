const express = require("express");

const CourseMaterialModel = require("../../../models/api/coursework-material/");

const courseMaterialRouter = express.Router();

courseMaterialRouter.use("/:courseMatId/questions", require("./questions.js"));

courseMaterialRouter.route("/")
    .get((req, res) => {
        CourseMaterialModel.find(req.query, (err, material) => {
            if (err) return res.status(500).send(err);
            res.status(200).send(material);
        })
    })
    .post((req, res) => {
        if (req.user.admin) {
            const newMaterial = new CourseMaterialModel(req.body);
            newMaterial.save((err, material) => {
                if (err) return res.status(500).send(err);
                res.status(201).send(material);
            })
        } else {
            res.status(401).send({ message: "Admin authorization required" })
        }
    })
    .delete((req, res) => {
        if (req.user.admin) {
            CourseMaterialModel.deleteMany(req.query, (err) => {
                if (err) return res.status(500).send(err);
                res.status(204).send();
            })
        } else {
            res.status(401).send({ message: "Admin authorization required" })
        }
    })

courseMaterialRouter.route("/:id")
    .get((req, res) => {
        CourseMaterialModel.findById(req.params.id, (err, materials) => {
            if (err) return res.status(500).send(err);
            if (!materials) return res.status(404).send({ message: "Material not found" })
            res.status(200).send(materials);
        })
    })
    .put((req, res) => {
        if (req.user.admin) {
            CourseMaterialModel.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, updatedMat) => {
                if (err) return res.status(500).send(err);
                if (!updatedMat) return res.status(404).send({ message: "Material not found" });
                res.status(200).send(updatedMat);
            })
        } else {
            res.status(401).send({ message: "Admin authorization required" })
        }
    })
    .delete((req, res) => {
        if (req.user.admin) {
            CourseMaterialModel.findByIdAndRemove(req.params.id, (err) => {
                if (err) return res.status(500).send(err);
                res.status(204).send();
            })
        } else {
            res.status(401).send({ message: "Admin authorization required" })
        }
    })


module.exports = courseMaterialRouter;
