import React from 'react'
import { Outlet } from 'react-router-dom'

type Props = {}

export default function Education({}: Props) {
  return (
    <div>
        Education
        <Outlet />
    </div>
  )
}