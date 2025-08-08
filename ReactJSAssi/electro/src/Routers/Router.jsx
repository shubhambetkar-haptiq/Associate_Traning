import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Mainlayout from '../Layouts/Mainlayout'
import Home from '../Pages/Home'

import Login from '../Features/Login'
import Sign from '../Features/Sign'

import Laptop from '../Pages/Products/Laptop'

import ProductDetails from '../Features/ProductDetails'
import SmartPhone from '../Pages/Products/SmartPhone'
import Tables from '../Pages/Products/Tables'
import Accessories from '../Pages/Products/Accessories'
import Watches from '../Pages/Products/Watches'

const Router = () => {
     const Router = createBrowserRouter([
    {
      path:"/",
      element:<Mainlayout/>,
      children:[
        {
          index:true,
          element:<Home/>
        },
      
        {
            path:"/sign",
            element:<Sign/>
        },
        {
            path:"/login",
            element:<Login/>
        },
       
        {
          path:"/laptop",
        element:<Laptop/>
        },
        {
          path:"/phone",
        element:<SmartPhone/>
        },
        {
          path:"/tab",
        element:<Tables/>
        },
        {
          path:"/access",
        element:<Accessories/>
        },
        {
          path:"/watches",
        element:<Watches/>
        },
        
        {
          path:"/product/:id",
        element:<ProductDetails/>
        },
          
      ]
    },
    
   
  ])
  return (
      <RouterProvider router={Router}/>
  )
}

export default Router