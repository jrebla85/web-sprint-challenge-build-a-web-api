// Write your "actions" router here!
const express = require("express");

const Actions = require("./actions-model");

const { checkId,
    checkBody } = require("./actions-middlware");

const router = express.Router();

router.get("/", (req, res, next) => {
    Actions.get()
    .then(actions => {
        if(!actions){
            res.json([])
        }else{
            res.json(actions)
        }
    })
    .catch(next)
});

router.get("/:id", checkId, (req, res) => {
    res.json(req.actions)
});

router.post("/", checkBody, (req, res, next) => {
    Actions.insert({project_id: req.project_id, description: req.description, notes: req.notes})
    .then(newAction => {
        res.status(201).json(newAction);
    })
    .catch(next);
});

router.put("/:id", checkId, checkBody, (req, res, next) => {
    Actions.update(req.params.id, { project_id: req.project_id, description: req.description, notes: req.notes })
    .then(updatedAction => {
        res.json(updatedAction)
    })
    .catch(next)
});

router.delete("/:id", checkId, async (req, res, next) => {
    try{
        await Actions.remove(req.params.id);
        res.status(200).json({ message: "Action deleted" })
    }catch(err){
        next(err)
    }
});

router.use((err, req, res, next) => { //eslint-disable-line
    res.status(err.status || 500).json({
      customMessage: "Something happened and we could not complete your request :(",
      message: err.message,
      stack: err.stack,
    })
  });

module.exports = router