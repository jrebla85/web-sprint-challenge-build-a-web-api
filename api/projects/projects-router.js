// Write your "projects" router here!
const express = require("express");

const Projects = require("./projects-model");
const Actions = require("../actions/actions-model");
const { checkId,
        checkBody } = require("./projects-middleware");

const router = express.Router();

router.get("/", (req, res) => {
    Projects.get()
    .then(projects => {
        if(!projects){
            res.status(404).json([])
        }else{
            res.json(projects)
        }
    })
});

router.get("/:id", checkId, (req, res) => {
    res.json(req.project)
});

router.post("/", (req, res) => {

});

router.put("/:id", checkId, checkBody, (req, res) => {

});

router.delete("/:id", checkId, (req, res) => {

});

router.get("/:id/actions", checkId, (req, res) => {

});

module.exports = router