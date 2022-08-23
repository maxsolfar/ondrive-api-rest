import Project from "../models/Project.js";
import Task from "../models/Task.js";

export const getProjects = async (req,res) =>{
  const userId = req.uid;
  try {
    const projects = await Project.find({userId: userId});
    return res.status(200).send({projects});
  }
  catch (error) {
    return res.status(error.code || 500).send({ errors: error.message });
  }
};

export const getProjectById = async (req,res) =>{
  const {idProject} = req.params;
  const id = req.uid;
  try {
    const project = await Project.findById(idProject);
    if(!project){
      throwError(1201);
    }
    if(!project.userId.equals(id)){
      throwError(1202); 
    } 
    return res.status(200).send({project});
  }
  catch (error) {
    if(error.kind === "ObjectId"){
      return res.status(403).send({ errors: "Incorrect ID format" });
    }
    return res.status(error.code || 500).send({ errors: error.message });
  }
};

export const updateProjectById = async (req,res) =>{
  const { title, description, color, iconProject } = req.body;
  const {idProject} = req.params;
  const id = req.uid;
  try {
    const projectForUpdate = await Project.findById(idProject);
    if(!projectForUpdate){
      throwError(1201);
    }
    if(!projectForUpdate.userId.equals(id)){
      throwError(1202);
    } 
    
    projectForUpdate.title = title;
    projectForUpdate.description = description;
    projectForUpdate.color = color;
    projectForUpdate.iconProject = iconProject;

    await projectForUpdate.save();
    
    return res.status(200).send({ projectForUpdate });
  }
  catch (error) {
    return res.status(error.code || 500).send({ errors: error.message });
  }
};

export const deleteProjectById = async (req,res) =>{
  const {idProject} = req.params;
  const id = req.uid;
  try {
    const projectForDelete = await Project.findById(idProject);
    if(!projectForDelete){
      throwError(1201);
    }
    if(!projectForDelete.userId.equals(id)){
      throwError(1202); 
    } 
    
    await projectForDelete.remove();
    return res.status(200).send({projectForDelete});
  }
  catch (error) {
    return res.status(error.code || 500).send({ errors: error.message });
  }
};

export const createProject = async (req,res) =>{
  const userId = req.uid;
  const { title, description, color, iconProject } = req.body;
  try {
    const newProject = new Project({ title, description, color, iconProject, userId: userId });
    await newProject.save();
    return res.status(201).send(newProject);
  }
  catch (error) {
    return res.status(error.code || 500).send({ errors: error.message });
  }
};

export const getTasksByProject = async (req,res) =>{
  const {idProject} = req.params;
  const id = req.uid;
  try {
    const project = await Project.findById(idProject);
    if(!project.userId.equals(id)){
      throwError(1202);
    } 
    const tasks = await Task.find({ projectId: idProject });
    if(!tasks){
      throwError(1303);
    }

    return res.status(200).send({tasks});
  }
  catch (error) {
    if(error.kind === "ObjectId"){
      return res.status(403).send({ errors: "Incorrect ID format" });
    }
    return res.status(error.code || 500).send({ errors: error.message });
  }
};

const throwError = (errorType) => {
  if(errorType === 1201){
    const error = new Error("The project doesn't exist");
    error.code = 404;
    throw error; 
  }
  if(errorType === 1202){
    const error = new Error("You don't have access to this project");
    error.code = 401;
    throw error; 
  }
  if(errorType === 1303){
    const error = new Error("No tasks for the project");
    error.code = 404;
    throw error; 
  }
};