// Write your "projects" router here!
const express = require("express");

const Projects = require("./projects-model");
const Actions = require("../actions/actions-model");
const { checkId,
        checkBody } = require("./projects-middleware");

const router = express.Router();

router.get("/", (req, res, next) => {
    Projects.get()
    .then(projects => {
        if(!projects){
            res.status(404).json([])
        }else{
            res.json(projects)
        }
    })
    .catch(next)
});

router.get("/:id", checkId, (req, res) => {
    res.json(req.project)
});

router.post("/", checkBody, (req, res, next) => {
    Projects.insert({name: req.name, description: req.description})
    .then(newProject => {
        res.status(201).json(newProject);
    })
    .catch(next);
});

router.put("/:id", checkId, checkBody, (req, res, next) => {
    Projects.update(req.params.id, { name: req.name, description: req.description })
    .then(updatedProject => {
        res.json(updatedProject)
    })
    .catch(next)
});

router.delete("/:id", checkId, async (req, res, next) => {
    try{
        await Projects.remove(req.params.id);
        res.status(200).json({ message: "Project deleted" })
    }catch(err){
        next(err)
    }
});

router.get("/:id/actions", checkId, (req, res, next) => {
    Projects.getProjectActions(req.params.id)
    .then(actions => {
        res.json(actions)
    })
    .catch(next)
});

router.use((err, req, res, next) => { //eslint-disable-line
    res.status(err.status || 500).json({
      customMessage: "Something happened and we could not complete your request :(",
      message: err.message,
      stack: err.stack,
    })
  })

module.exports = router