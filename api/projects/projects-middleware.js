// add middlewares here related to projects
const Projects = require("./projects-model");

const checkId = async (req, res, next) => {
    const {id} = req.params

    try{
        const project = await Projects.get(id);
        if(!project){
            res.status(404).json({ message: `No project with id: ${id}` })
        }else{
            req.project = project;
            next();
        }
    }catch(message){
        res.status(500).json({ error: message })
    }
};

const checkBody = (req, res, next) => {
    const name = req.body;
    const description = req.body;
    if(!name || !description || !name.trim() || !description.trim()){
        res.status(400).json({ message: "missing required name and description field" })
    }else{
        next();
    }
}

module.exports = {
    checkId,
    checkBody
}