import mongoose, { mongo } from "mongoose";

const taskSchema = mongoose.Schema({
  tittle: {
    type     : String,
    required : true
  }, 
  description:  String,
  status	 : {
		type : Boolean,
		default : false
	},
  priority   : Number,
  dueTo		 : Date

}, {
  timestamps : true
})

const Task = mongoose.model("Task", taskSchema);

export default Task;

	