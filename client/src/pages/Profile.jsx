import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRef } from "react";
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from 'firebase/storage'
import { app } from './../firebase';
import {  toast } from "react-toastify"
import { updateUserStart, updateUserSuccess, updateUserFailure, deleteUserFailure, deleteUserStart, deleteUserSuccess, signOutUserStart, signOutUserFailure, signOutUserSuccess } from "../redux/user/userSlice";
// import default from './../../tailwind.config';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const fileRef = useRef(null);
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError]  = useState(false)
  const [updateSuccess, setUpdateSuccess] = useState(false)
  // console.log(file)
  const [formData, setFormData] = useState({})

  const dispatch = useDispatch()
  const navigate = useNavigate()



  useEffect(()=>{
    if(file){
      handleFileUpload();
    }
  }, [file])

  const handleFileUpload = (file) =>{
    // if(!file)return console.log('here');
    const storage = getStorage(app)
    // const fileName = new Date().getTime() + file?.name;
    const fileName = new Date().getTime().toString() + (file?.name || '');
    // const storageRef = ref(storage, file);
    const storageRef = ref(storage,  `images/${fileName}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on('state_changed',
    (snapshot)=> {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      // console.log('upload is ' + progress + '% done');
      setFilePerc(Math.round(progress));
    },
    
    (error) =>{
      setFileUploadError(true)
    },
    ()=>{
      getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl)=>{
        // console.log('file available at ', downloadUrl)
        setFormData({...formData, photo: downloadUrl})
      })
    }
    );
  }

  const handleUpdate = (e) => {
    setFormData({...formData, [e.target.id]: e.target.value})
  }

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
       dispatch(updateUserStart())
       const res = await fetch(`/api/v0/user/update/${currentUser._id}`,{
        method: 'POST',
        headers: {
          'Content-Type' : 'application/json'
        },
        body: JSON.stringify(formData)
       })
       const data  = await res.json()
       if(data.success === false){
        dispatch(updateUserFailure(data.message))
       }

       dispatch(updateUserSuccess(data))
       setUpdateSuccess(true)
    } catch (error) {
      dispatch(updateUserFailure(error.message))
    }
  }

  const handleDelete = async() =>{
    try {
      dispatch(deleteUserStart())
      const res = await fetch(`/api/v0/user/delete/${currentUser._id}`, {
        method: 'DELETE'
      });
      const data = await res.json()
      if(data.success === false){
        dispatch(deleteUserFailure(data.message))
        return;
      }
      dispatch(deleteUserSuccess(data));
      toast.success('User deleted Successfully') 
      navigate('/sign-in')
     
    } catch (error) {
      dispatch(deleteUserFailure(error.message))
    }
  }

  const handleSignout = async()=>{
    try {
      dispatch(signOutUserStart())
      
      const res = await fetch('/api/v0/auth/sign-out')
      const data  =  res.json()
      if(data.success === false){
        dispatch(signOutUserFailure(data.message))
        return;
      }
      dispatch(signOutUserSuccess(data))
      toast.success('sign out successful')
      navigate('/sign-in')
    } catch (error) {
      dispatch(signOutUserFailure(error.message))
    }
  }

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          onChange={(e) =>   setFile(e.target.files[0])}
          type="file"
          ref={fileRef}
          hidden
          accept="image/*"
        />
        <img
          onClick={() => fileRef.current.click()}
          src={formData.photo || currentUser?.photo}
          alt="Profile Image"
          className="rounded-full h-24 w024 object-cover cursor-pointer self-center mt-2 "
        />
        <p className="text-sm self-center">{fileUploadError ? (<span className="text-red-700">There was an error while uploading image (image must be lestt than 2mb)</span>) : filePerc > 0 && filePerc < 100 ? (<span className="text-slate-700">{`uploading ${filePerc}`}</span>) : filePerc === 100 ? (<span className="text-green-700">upload successfull</span>) : ""}</p>
        <input
          type="text"
          placeholder="userName"
          defaultValue={currentUser?.username}
          id="username"
          className="border p-3 rounded-lg"
          onChange={handleUpdate}
        />
        <input
          type="text"
          placeholder="email"
          defaultValue={currentUser?.email}
          id="email"
          className="border p-3 rounded-lg"
          onChange={handleUpdate}
        />
        <input
          type="password"
          placeholder="password"
          defaultValue='********'
          id="password"
          className="border p-3 rounded-lg"
          onChange={handleUpdate}
        />
        <button disabled={loading} className="bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80">
          {loading ? "loading" : "update"}
        </button>
      </form>

      <div className="flex justify-between mt-5">
        <span onClick={handleDelete} className="text-red-600 cursor-pointer">delete account </span>
        <span onClick={handleSignout} className="text-red-600 cursor-pointer">sign Out </span>
      </div>
      <p className="text-red-700 mt-5">{error ? error : ""}</p>
      <p className="text-green-700 mt-5 self-center">{updateSuccess ? "user updated" : ""}</p>

    </div>
  );
};

export default Profile;
