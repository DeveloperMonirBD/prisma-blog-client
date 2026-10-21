import { redirect } from 'next/navigation'
import React from 'react'

export default function UserDashboard() {
  return redirect("/dashboard/create-blog")
}
