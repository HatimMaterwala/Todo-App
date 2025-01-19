import React from 'react'

const Navbar = () => {
  return (
    <div className='bg-purple-700' >
      <nav className='flex justify-around items-center p-3 text-white'>
        <h1 className='text-2xl font-semibold font-mono'>iTask</h1>
        {/* <ul className="flex gap-4">
          <li className='cursor-pointer'>Home</li> 
          <li className='cursor-pointer'>Your Tasks</li>
        </ul> */}
      </nav>
    </div>
  )
}

export default Navbar
