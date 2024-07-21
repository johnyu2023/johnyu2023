import React from 'react'

type Props = {}

export default function Search({}: Props) {
  return (
    <div className='flex items-center'>
        <input
            className='w-96 h-8 border border-gray-100 px-4 rounded-full bg-gray-50'
            placeholder='多所高校提供自选床位功能'
        />
        <button
            className='w-16 h-8 mx-4 text-sm bg-blue-600 text-white flex justify-center items-center rounded-full hover:bg-blue-700 transition-all duration-300'
        >提问</button>

    </div>
  )
}