import Project from "../models/Project.js";

export const getProjects = async (req,res) =>{
  const userId = req.uid;
  try {
    const projects = await Project.find({userId: userId});
    return res.status(200).send({projects});
  }
  catch (error) {
    return res.status(500).send({ errors: error.message });
  }
};

export const createProject = async (req,res) =>{
  const userId = req.uid;
  const { title, description, color, status } = req.body;
  try {
    const newProject = new Project({ title, description, color, userId: userId });
    await newProject.save();
    return res.status(201).send(newProject);
  }
  catch (error) {
    return res.status(500).send({ errors: error.message });
  }
};