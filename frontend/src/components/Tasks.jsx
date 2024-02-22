import * as React from 'react';
import axios from 'axios';
import { useState } from 'react';
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline';
import { useMutation } from 'react-query';
const Tasks = ({fillEditFlag, toggleForm})=>{
	const [tasks, setTasks] = React.useState([])
  const [hoveredItems, setHoveredItems] = useState({});

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
	
	const deleteTask = async(deletedId) => {
		await axios.delete(`/api/task/${deletedId}`);
		// to toggle rerender and get current tasks
		setTasks([])
	}

	const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
	async function  updateTaskStatus(data) {
		try {
			const response = await axios.patch('/api/task', data);
			return response.data;
		} catch (error) {
			throw new Error(`Error submitting post: ${error.message}`);
		}
	}
	const { mutate } = useMutation(updateTaskStatus, {
    onSuccess: () => {
      setError(null);
    },
    onError: (err) => {
      setError(err.message);
    },
  });
  const handleChecked = (_id) => {
		console.log(_id)
    mutate({_id , "status" : true});
  };
  React.useEffect(() => {
    (async () => {
      // todo dynamic id
      let axiosPromise = await axios.get('/api/task');
      setTasks(axiosPromise.data.tasks);
    })();
  }, [tasks])

  return (
    <ul className="divide-y divide-gray-100">
      {tasks.map((task) => (
        <li 
					key={task._id}
					className="flex justify-between gap-x-6 py-5"
          onMouseEnter={() => handleMouseEnter(task._id)}
          onMouseLeave={() => handleMouseLeave(task._id)}
				>
					<div className="flex min-w-0 gap-x-5 sm:items-center sm:flex">
						<input
							id={task._id}
							type="checkbox"
							onChange={() => handleChecked(task._id)}
							className="h-5 w-5 rounded border-gray-300 "
						/>
						<div className="min-w-0 flex-auto">
							<p className="text-lg font-semibold leading-6 text-gray-1000">{task.tittle}</p>
							<p className="mt-1 truncate text-sm leading-5 text-gray-800">{task.description}</p>
							<p className="inline mr-2 truncate text-xs leading-5 text-gray-500">{task.priority && `Priority : ${task.priority}`}</p>
							<p className="inline mr-2truncate text-xs leading-5 text-gray-500">{task.dueTo && `DueTo : ${task.dueTo}`}</p>
						</div>
					</div>
					{
						hoveredItems[task._id]  && (
							<div class="hidden shrink-0 sm:flex sm:flex-row sm:items-end ">
								<PencilSquareIcon 
									onClick={()=>toggleFormWithData(task)}
									className="h-6 w-6 mr-2 text-gray-500  cursor-pointer hover:text-gray-900"/>
								<TrashIcon 
									onClick={() => deleteTask(task._id)}
									className="h-6 w-6 text-gray-500 cursor-pointer hover:text-gray-900"/>
							</div>
						)
					}
        </li>
      ))}
    </ul>
  )
}
export default Tasks