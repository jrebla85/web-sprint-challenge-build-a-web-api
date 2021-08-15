// add middlewares here related to actions
const Actions = require("./actions-model");

const checkId = async (req, res, next) => {
    const {id} = req.params

    try{
        const actions = await Actions.get(id);
        if(!actions){
            res.status(404).json({ message: `No project with id: ${id}` })
        }else{
            req.actions = actions;
            next();
        }
    }catch(message){
        res.status(500).json({ error: message })
    }
};

const checkBody = (req, res, next) => {
    const { project_id } = req.body;
    const { description } = req.body;
    const { notes } = req.body
    if(!project_id || !description || !notes){
        res.status(400).json({ message: "missing required project_id, description and notes field" })
    }else{
        req.project_id = project_id;
        req.description = description;
        req.notes = notes;
        next();
    }
}

module.exports = {
    checkId,
    checkBody
}
