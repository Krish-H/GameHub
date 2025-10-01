import React from 'react'

const Navbar = () => {
  return (
    <div className='w-full h-16 flex justify-between items-center bg-black text-white'>
         <div className='text-3xl font-bold text-center p-3'>
         XOX
         </div>
         <div>
            <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-3'>
               more games </button>
         </div>
    </div>
  )
}

export default Navbar