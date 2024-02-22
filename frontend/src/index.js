import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import "./assets/index.css";
import  HomeScreen from './screens/HomePage.jsx';
import { QueryClientProvider, QueryClient } from 'react-query';

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
} from  'react-router-dom';
const queryClient = new QueryClient();
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index path="/" element={<HomeScreen />}/>
      <Route index path="/home" element={<HomeScreen />}/>
    </Route>
  )
)
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
	 <QueryClientProvider client={queryClient}>
    <RouterProvider  router={router}/>
	 </QueryClientProvider>
  </React.StrictMode>
);