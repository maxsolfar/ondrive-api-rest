import Task from "../models/Task.js";

export const getTasks = async (req,res) =>{
  const userId = req.uid;
  try {
    const tasks = await Task.find({userId: userId});
    return res.status(200).send({tasks});
  }
  catch (error) {
    return res.status(error.code || 500).send({ errors: error.message });
  }
};

export const getTaskById = async (req,res) =>{
  const {idTask} = req.params;
  const id = req.uid;
  try {
    const task = await Task.findById(idTask);
    if(!task){
      throwError(1301);
    }
    if(!task.userId.equals(id)){
      throwError(1302); 
    } 

    return res.status(200).send({task});
  }
  catch (error) {
    if(error.kind === "ObjectId"){
      return res.status(403).send({ errors: "Incorrect ID format" });
    }
    return res.status(error.code || 500).send({ errors: error.message });
  }
};

export const updateTaskById = async (req,res) =>{
  const { title, description, priority, color, tags, expiryDate } = req.body;
  const {idTask} = req.params;
  const id = req.uid;
  try {
    const taskForUpdate = await Task.findById(idTask);
    if(!taskForUpdate){
      throwError(1301);
    }
    if(!taskForUpdate.userId.equals(id)){
      throwError(1302); 
    } 
    
    taskForUpdate.title = title;
    taskForUpdate.description = description;
    taskForUpdate.priority = priority;
    taskForUpdate.color = color;
    taskForUpdate.tags = tags;
    taskForUpdate.expiryDate = expiryDate;

    await taskForUpdate.save();
    
    return res.status(200).send({ taskForUpdate });
  }
  catch (error) {
    return res.status(error.code || 500).send({ errors: error.message });
  }
};

export const deleteTaskById = async (req,res) =>{
  const {idTask} = req.params;
  const id = req.uid;
  try {
    const taskForDelete = await Project.findById(idTask);
    if(!taskForDelete){
      throwError(1301);
    }
    if(!taskForDelete.userId.equals(id)){
      throwError(1302); 
    } 
    
    await taskForDelete.remove();
    return res.status(200).send({taskForDelete});
  }
  catch (error) {
    return res.status(error.code || 500).send({ errors: error.message });
  }
};

export const createTask = async (req,res) =>{
  const userId = req.uid;
  const { title, description, priority, color, tags, expiryDate, projectId } = req.body;
  try {
    const newTask = new Task({ title, description, priority, color, tags, expiryDate, userId: userId, projectId: projectId});
    await newTask.save();
    return res.status(201).send(newTask);
  }
  catch (error) {
    return res.status(error.code || 500).send({ errors: error.message });
  }
};

const throwError = (errorType) => {
  if(errorType === 1301){
    const error = new Error("The task doesn't exist");
    error.code = 404;
    throw error; 
  }
  if(errorType === 1302){
    const error = new Error("You don't have access to this task");
    error.code = 401;
    throw error; 
  } 
};