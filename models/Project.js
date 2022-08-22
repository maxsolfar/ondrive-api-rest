import mongoose from "mongoose";
const { Schema, model } = mongoose;

const projectSchema = new Schema({
  title:{
    type: String,
    required: true,
    trim: true,
  },
  description:{
    type: String,
    required: true,
  },
  iconProject:{
    type: String,
    default:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Noun_Project_projects_icon_1327109_cc.svg/1024px-Noun_Project_projects_icon_1327109_cc.svg.png",
  },
  color:{
    type: String,
    required: true,
  },
  created: { 
    type: Date,
    default: Date.now 
  },
  status:{
    type: Boolean,
    default: true,
  },
  userId:{
    ref: "User",
    type: Schema.Types.ObjectId,
  },
},{
  versionKey: false
})

export default model('Project', projectSchema);