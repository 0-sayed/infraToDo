
import Task from "../components/Tasks.jsx";
import FormDialog from "../components/FormDialog.jsx";
import { useState,} from "react";

const HomePage = () => {
	
	const [editData, setEditData] = useState({});
	const fillEditFlag  = (data)=>{
		setEditData(data)
	}

	const [formState, setFormState] = useState(false);
	const toggleForm  = ()=>{
		if(formState)
			setEditData({});
		setFormState(!formState);
	}
	
  return (
		<div class="max-w-4xl mx-auto px-4 py-10 sm:px-6 lg:px-8">
			<button 
				type="button" 
				className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 border border-green-700 rounded"
				onClick={toggleForm}
			>
				+ Add Task
			</button>
			{
				formState && <FormDialog editData={editData} formStateFlag={formState} toggleForm={toggleForm}/>
			}
			<Task fillEditFlag = {fillEditFlag} toggleForm={toggleForm}/>
		</div>
  );
};

export default HomePage;
