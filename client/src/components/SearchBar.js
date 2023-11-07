import React from 'react'

const SearchBar = () => {
  return (
    <div className=' mb-10'>
        <input className='border-none p-2 text-slate-500 rounded-lg
        focus:outline-none focus:border-voilet-500 focus:ring-1 focus:ring-voilet-500
        w-3/6' placeholder='Seach courses'/>

    </div>
  )
}

export default SearchBar