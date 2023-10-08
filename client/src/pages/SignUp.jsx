import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {  toast } from "react-toastify"

const SignOut = () => {

  const [formData, setFormData] = useState({})
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData(
      {
        ...formData, 
        [e.target.id]: e.target.value,
      }
    )
  }

  const handleSubmit = async(e) => {
    e.preventDefault()
    try {
      setLoading(true)
    const res = await fetch('/api/v0/auth/sign-up', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData)
    });
    const data = await res.json()
    console.log(data.msg)
    if(data.success === false){
      setError(data.message)
      toast.error(data.msg)
      setLoading(false)
      return;
    }
    setLoading(false)
    setError(null)
    toast.success('registration successfull, please check your email')
    navigate('/sign-in')
    } catch (error) {
      setLoading(false)
      setError(error.message)
    }
    
    // console.log(data)
  }
  // console.log(formData)
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className="text-3xl text-center font-semibold my-7">Sign up</h1>
      <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
        <input type="text" placeholder='username' className='border p-3 rounded-lg focus:outline-none' id='username' onChange={handleChange}/>
        <input type="email" placeholder='email' className='border p-3 rounded-lg focus:outline-none' id='email' onChange={handleChange}/>
        <input type="password" placeholder='password' className='border p-3 rounded-lg focus:outline-none' id='password' onChange={handleChange}/>

        <button disabled={loading} className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80">
          {loading ? 'loading...' : "Sign Up"}
        </button>
      </form>

      <div className="flex gap-2 mt-5 ">
        <p>have an account? </p>
      <Link to={'/sign-in'}> <span className='text-blue-700'>Sign in</span> </Link>
      </div>
      {error && <p className='text-red-500 mt-3'>{error}</p>}
      </div>
  )
}

export default SignOut