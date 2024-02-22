
import Task from "../components/Tasks.jsx";
import FormDialog from "../components/FormDialog.jsx";
import { useState,} from "react";
const HomePage = () => {
	
	const [formState, setFormState] = useState(false);
	const toggleForm  = ()=>{
		if(formState)
			setEditData({});
		setFormState(!formState);
	}

	const [editData, setEditData] = useState({});
	const fillEditFlag  = (data)=>{
		setEditData(data)
	}
  return (
		<div className="max-w-4xl mx-auto px-4 py-10 sm:px-6 lg:px-8">
			<button 
				type="button" 
				className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 border border-indigo-700 rounded"
				onClick={toggleForm}
			>
				+ Add Task
			</button>
			{/*
			 here's an example for whey we should use redux to manage shared state  
			 cause the tow lines belows are a state chaos
			*/}
			{
				formState && <FormDialog editData={editData} formStateFlag={formState} toggleForm={toggleForm}/>
			}
			<Task formStateFlag={formState} editData={editData} fillEditFlag = {fillEditFlag} toggleForm={toggleForm}/>
		</div>
  );
};

export default HomePage;
