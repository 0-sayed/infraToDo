import { Fragment, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import axios from 'axios';
import { useForm } from "react-hook-form"
import { useMutation } from 'react-query';
import Loader from './Loader.jsx'

const FormDialog = ({editData, formStateFlag, toggleForm})=>{
	let tittle = null;
  let description = null;
	let priority = null;
  let dueTo = new Date().toISOString().split('T')[0];
	if(Object.getOwnPropertyNames(editData).length !== 0){
			console.log(editData)
			tittle = editData.tittle;
			description = editData.description;
			priority = editData.priority;
			dueTo = editData.dueTo;
	}
  const cancelButtonRef = useRef(null)

  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

	async function submitPost(data) {
		try {
			const response = await axios.post('/api/task', data);
			return response.data; 
		} catch (error) {
			throw new Error(`Error submitting post: ${error.message}`);
		}
	}

	async function updatePost(data) {
		try {
			const response = await axios.patch('/api/task', data);
			return response.data; 
		} catch (error) {
			throw new Error(`Error submitting post: ${error.message}`);
		}
	}

	const { mutate } = useMutation(async (data) => {
		if(Object.getOwnPropertyNames(editData).length !== 0){
			const {_id} = editData
			console.log({_id, ...data})
			await updatePost({_id, ...data});
		}
		else
			await submitPost(data) 
	}, {
    onSuccess: () => {
      setError(null);
			reset();
			toggleForm();
    },
    onError: (err) => {
      setError(err.message);
    },
  });

  const onSubmit =  async (data) => {
	
		try {
			setIsLoading(true);
			mutate(data)
    } catch (error) {
      console.error('Error submitting form:', error);
      setError(error.message);
    } finally {
			
      setIsLoading(false);
    }
  };

  return (
    <Transition.Root show={formStateFlag} as={Fragment} onClose={()=>{editData = {};toggleForm()}}>
      <Dialog as="div"  className="relative z-10 " initialFocus={cancelButtonRef} >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">

								<form onSubmit={handleSubmit(onSubmit)}>
									<div className="space-y-12 px-7 py-7">
										<div className=" pb-8">
											<h2 className="text-base font-semibold leading-7 text-gray-900">Add New Task</h2>

											<div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
												<div className="sm:col-span-3">
													<label htmlFor="tittle" className="block text-sm font-medium leading-6 text-gray-900">
														Tittle
													</label>
													<div className="mt-2">
														<input
															type="text"
															name="tittle"
															id="tittle"
															autoComplete="given-name"
															{...register("tittle", { required: true })}
															defaultValue={tittle}
															className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
														/>
													</div>
												</div>

												<div className="sm:col-span-6">
													<label htmlFor="description" className="block text-sm font-medium leading-6 text-gray-900">
														Description
													</label>
													<div className="mt-2">
														<textarea
															type="text"
															name="description"
															id="description"
															autoComplete="given-name"
															{...register("description")}
															defaultValue={description}
															className="block h-20 w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
														/>
													</div>
												</div>

												<div className="sm:col-span-3">
													<label htmlFor="dueTo" className="block text-sm font-medium leading-6 text-gray-900">
														DueTo
													</label>
													<div className="mt-2">
														<input
															type="date"
															name="dueTo"
															id="dueTo"
															autoComplete="given-name"
															{...register("dueTo")}
															defaultValue={dueTo}
															min={new Date().toISOString().split('T')[0]} 
															className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
														/>
													</div>
												</div>

												<div className="sm:col-span-3">
													<label htmlFor="priority" className="block text-sm font-medium leading-6 text-gray-900">
														Priority
													</label>
													<div className="mt-2">
														<select
															id="priority"
															name="priority"
															{...register("priority")}
															defaultValue={priority}
															className="block h-9 w-full rounded-md border-0 py-1.5 px-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
														>
															<option value='1'>1 (High)</option>
															<option value='2'>2 (Medium)</option>
															<option value='3'>3 (Low)</option>
														</select>
													</div>
												</div>

											</div>
										</div>

									</div>

									<div className="flex items-center justify-center space-x-4 mb-8">
										<button
											type="button"
											className="flex justify-center items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-600"
											onClick={()=>{editData={};toggleForm();}}
											ref={cancelButtonRef}
										>
											Cancel
										</button>
										<button
											type="submit"
											className="flex justify-center items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600"
											disabled={isLoading}
										>
											{isLoading ? <Loader /> : 'Done!'}
										</button>
									</div>
									{error && <p className="error-message">{error}</p>}
								</form>


              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
export default FormDialog;