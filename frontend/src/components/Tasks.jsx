import * as React from 'react';
import axios from 'axios';
import { useState} from 'react';
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline';
import { useMutation, useQuery} from 'react-query';
import Loader from './Loader';

const Tasks = ({formStateFlag, editData, fillEditFlag, toggleForm})=>{
	const [tasks, setTasks] = React.useState([])
  const [hoveredItems, setHoveredItems] = useState({});
	const [refetch, setRefetch] = useState(false);

  const handleMouseEnter = (itemId) => {
    setHoveredItems((prevHoveredItems) => ({
      ...prevHoveredItems,
      [itemId]: true,
    }));
  };

  const handleMouseLeave = (itemId) => {
    setHoveredItems((prevHoveredItems) => ({
      ...prevHoveredItems,
      [itemId]: false,
    }));
  };

	const toggleFormWithData = (task)=>{
		fillEditFlag(task);
		toggleForm();
	}
	
	async function  updateTaskStatus(data) {
		try {
			const response = await axios.patch('/api/task', data);
			return response.data;
		} catch (error) {
			throw new Error(`Error updating task: ${error.message}`);
		}
	}
	const { mutate:updateStatusMutation } = useMutation(updateTaskStatus, {
    onSuccess: () => {
			setRefetch(!refetch);
    },
    onError: (err) => {
			throw new Error(err);
    },
  });
  const handleChecked = (_id) => {
    updateStatusMutation({_id , "status" : true});
  };

	async function  deleteTaskAPI(id) {
		try {
			await axios.delete(`/api/task/${id}`);
		} catch (error) {
			throw new Error(`Error deleting task: ${error.message}`);
		}
	}
	const { mutate:deleteMutation, isLoading:deleteLoading } = useMutation(deleteTaskAPI, {
    onSuccess: () => {
			setRefetch(!refetch);
    },
    onError: (err) => {
			throw new Error(err);
    },
  });
  const deleteTask = (id) => {
    deleteMutation(id);
  };
	
	async function  fetchingTasksAPI(data) {
		try {
			let axiosPromise = await axios.get('/api/task');
			setTasks(axiosPromise.data.tasks);
		} catch (error) {
			throw new Error(`Error fetching task: ${error.message}`);
		}
	}
	const {isLoading:fetchingLoading, error:fetchingError} = useQuery(["tasks", refetch, formStateFlag], fetchingTasksAPI); //include criteria state to query key

  return (
    <ul className="divide-y divide-gray-100 mt-3">
      {
				fetchingLoading ? <Loader/> : fetchingError ? <p className='error-message bg-red-500 text-white px-4 py-3 rounded-md flex items-center justify-center'>error while fetching</p> :
				tasks.length === 0 ? <div class="flex justify-center gap-x-6 py-5 bg-gray-100 text-gray-500 text-center text-xl font-bold rounded-md">Kick start your day & add some tasks</div> :
				tasks.map((task) => (
					<li 
						key={task._id}
						className="flex justify-between gap-x-6 py-5"
						onMouseEnter={() => handleMouseEnter(task._id)}
						onMouseLeave={() => handleMouseLeave(task._id)}
					>
						<div className="flex min-w-5 min-h-5 gap-x-5 sm:items-center sm:flex">
							<input
								id={task._id}
								type="checkbox"
								onChange={() => handleChecked(task._id)}
								className="h-5 w-5 min-w-5 min-h-5 rounded border-gray-300 "
							/>
							<div className="min-w-0 flex-auto">
								<p className="text-lg font-semibold leading-6 text-gray-1000 break-words">{task.tittle}</p>
								<p className="mt-1 truncate text-sm leading-5 text-gray-800 break-words">{task.description}</p>
								<p className={`inline mr-2 truncate text-xs leading-5 ${
									task.priority === 1 ? 'text-green-500' :
									task.priority === 2 ? 'text-yellow-500' :
									task.priority === 3 ? 'text-red-500' : 'text-gray-500'
								}`}>
									{task.priority && (
										<> 
											{task.priority === 1 ? ' High' :
											task.priority === 2 ? ' Medium' :
											task.priority === 3 ? ' Low' : ''}
										</>
									)}
								</p>
								<p className="inline mr-2truncate text-xs leading-5 text-gray-500">{task.dueTo && `${task.dueTo?.split('T')[0]}`}</p>
							</div>
						</div>
						{
							hoveredItems[task._id]  && (
								<div class="hidden shrink-0 sm:flex sm:flex-row sm:items-center ">
									<PencilSquareIcon 
										onClick={()=>toggleFormWithData(task)}
										className="h-6 w-6 mr-2 text-gray-500  cursor-pointer hover:text-gray-900"/>
									{
										deleteLoading ? <Loader color="text-red-600"/> :
										<TrashIcon 
										onClick={() => deleteTask(task._id)}
										className="h-6 w-6 text-red-400 cursor-pointer hover:text-red-600"/>
									}
								</div>
							)
						}
					</li>
				))}
				
    </ul>
  )
}
export default Tasks