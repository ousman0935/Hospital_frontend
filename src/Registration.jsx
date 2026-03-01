//import { Link } from 'react-router-dom';
import './registration.css'
import { useQuery } from '@tanstack/react-query';
import Login from './Login';
import { useState } from 'react';
import { fetchHospitals } from './adminDashbord/api/hospitals';
import axios from 'axios'
import { faHospital } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faEnvelope,
  faLock,
  faPhone,
  faUserShield,
  faStethoscope,
  faBriefcase
} from "@fortawesome/free-solid-svg-icons";
import { toast } from 'react-toastify';


function Registration(){
  const [Role,setRole]=useState("");
  const[showLogin,setShowLogin]=useState(false)
  const[showPassword,setShowPassword]=useState(false)
  const[showConfirmPassword ,setShowConfirmPassword]=useState(false)
  const[Specialization,setSpecilization]=useState();
  const [Experience,setExperience]=useState(0);

  const [Name,setFullName]=useState();
  const [Phone,setPhone]=useState();
  const [Password1,setPassword]=useState();
  const [Password2,setPassword2]=useState();
  const [Email,setEmail]=useState();
  const [hospital,setHospital]=useState();

  const {data:hospitalls=[],
}
        =useQuery({
          queryKey:["Hospitals"],
          queryFn:fetchHospitals
        });

    const SubmitForm=async(e)=>{
   e.preventDefault();
  
      try {
        let Payload={ Phone,Email,Password1,Password2,Name,Role}
        
            if(Role==="doctor"){
            Payload={...Payload,  Specialization,Experience};
       await axios.post("https://hospital-b2mt.onrender.com/docter",Payload)
       toast.success("Registration Succesfull Doctor");
     
      }
      else
      {
          await axios.post("https://hospital-b2mt.onrender.com/user",
        Payload)}
           toast.success("Registration Succesfull user");
      } catch (error) {
        toast.error("somthing went Wrong");
        console.log(error);
      }
    }
    return (  
      <>
   <div className="flex justify-center items-start min-h-screen 
   bg-gray-100 py-0 sm:py-10">
  <form onSubmit={SubmitForm}
    className="
      w-full max-w-lg
      bg-white/80 backdrop-blur-xl
      rounded-3xl
      shadow-[0_30px_80px_rgba(0,0,0,0.35)]
      border border-white/40
      p-2 sm:p-8
    "
  >
    {/* Header */}
    <div className="text-center mb-8">
      <h1 className="text-3xl font-extrabold text-gray-800">
        Create Account
      </h1>
      <p className="text-gray-500 mt-2">
        Register to access ClinicBooking
      </p>
    </div>

    {/* Namse */}
    <div className="relative mb-5">
      <FontAwesomeIcon icon={faUser} className="absolute top-1/2 left-4 -translate-y-1/2 text-blue-500" />
      <input onChange={(e)=>setFullName(e.target.value)}
        id="name"
        type="text"
        placeholder=" "
        className="peer w-full pl-12 pr-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
      />
      <label
        htmlFor="name"
        className="absolute left-12 top-1/2 -translate-y-1/2 text-gray-400 text-sm transition-all
                   peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-sm
                   peer-focus:-top-3 peer-focus:text-xs peer-focus:text-blue-500
                   peer-valid:-top-3 peer-valid:text-xs peer-valid:text-blue-500"
      >
        Full Name
      </label>
    </div>

   {/* Email */}
<div className="relative mb-5 mt-3">
  <FontAwesomeIcon icon={faEnvelope} className="absolute top-1/2 left-4 -translate-y-1/2 text-blue-500" />
  <input
    id="Email"
    onChange={(e) => setEmail(e.target.value)}
    type="text"
    placeholder="Enter your email"
    className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
  />
  <label
    htmlFor="Email"
    className="absolute left-10 -top-2.5 px-2 bg-white text-xs font-medium text-blue-500 transition-all"
  >
    Email Address
  </label>
</div>

{/* Phone */}
<div className="relative mb-5 mt-3">
  {/* Added faPhone icon to match the Email field style */}
  <FontAwesomeIcon icon={faPhone} className="absolute top-1/2 left-4 -translate-y-1/2 text-blue-500" />
  <input
    id="Phone"
    name="Phone"
    onChange={(e) => setPhone(e.target.value)}
    type="tel"
    placeholder="09..."
    required
    pattern="^(\+2519\d{8}|09\d{8})$"
    maxLength="13"
    inputMode="numeric"
    className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
  />
  <label
    htmlFor="Phone"
    className="absolute left-10 -top-2.5 px-2 bg-white text-xs font-medium text-blue-500 transition-all"
  >
    Phone Number
  </label>
</div>
    {/* Password */}
    <div className="relative mb-5">
      <FontAwesomeIcon icon={faLock} className="absolute top-1/2 left-4 -translate-y-1/2 text-blue-500" />
      <input
        id="password"
        onChange={(e)=>setPassword(e.target.value)}
        type={showPassword ? "text" : "password"}
        placeholder=" "
        className="peer w-full pl-12 pr-12 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
      />
      <label
        htmlFor="password"
        className="absolute left-12 top-1/2 -translate-y-1/2 text-gray-400 text-sm transition-all
                   peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-sm
                   peer-focus:-top-3 peer-focus:text-xs peer-focus:text-blue-500
                   peer-valid:-top-3 peer-valid:text-xs peer-valid:text-blue-500"
      >
        Password
      </label>
      {/* Show password toggle */}
      <button
        type="button"
        onClick={() => setShowPassword(!showPassword)}
        className="absolute top-1/2 right-4 -translate-y-1/2 text-gray-500 hover:text-gray-700"
      >
        {showPassword ? "Hide" : "Show"}
      </button>
    </div>

    {/* Password22 */}
    <div className="relative mb-5">
      <FontAwesomeIcon icon={faLock} className="absolute top-1/2 left-4 -translate-y-1/2 text-blue-500" />
      <input
        id="password2"
         onChange={(e)=>setPassword2(e.target.value)}

        type={showConfirmPassword ? "text" : "password"}
        placeholder=" "

        className="peer w-full pl-12 pr-12 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
      />
      <label
        htmlFor="password2"
        className="absolute left-12 top-1/2 -translate-y-1/2 text-gray-400 text-sm transition-all
                   peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-sm
                   peer-focus:-top-3 peer-focus:text-xs peer-focus:text-blue-500
                   peer-valid:-top-3 peer-valid:text-xs peer-valid:text-blue-500"
      >
       Confirm Password
      </label>
      {/* Show password toggle */}
     <button
        type="button"
        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
        className="absolute top-1/2 right-4 -translate-y-1/2 text-gray-500 hover:text-gray-700"
      >
        {showConfirmPassword ? "Hide" : "Show"}
      </button>



    </div>
    {/* Password */}
   

<div className="relative mb-6">

  {/* Label appears ABOVE but keeps same spacing structure */}
  {Role && (
    <label
      htmlFor="role"
      className="absolute -top-5 left-12 text-sm font-medium text-blue-600"
    >
      Role
    </label>
  )}

  <FontAwesomeIcon
    icon={faUserShield}
    className="absolute top-1/2 left-4 -translate-y-1/2 text-blue-500"
  />

  <select
    id="role"
    value={Role}
    onChange={(e) => setRole(e.target.value)}
    className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none bg-white"
  >
    <option value="" disabled>
      Select Role
    </option>
    <option value="doctor">Doctor</option>
    <option value="admin">Admin</option>
    <option value="user">User</option>
  </select>

</div>

  {/* Doctor Fields */}
{Role === "doctor" && (
  <div className="mt-6 rounded-2xl bg-white p-2 sm-p-6 shadow-lg border border-gray-100">
    <h3 className="text-lg font-semibold text-gray-700 mb-4">
      Doctor Information
    </h3>

  {/* Specialization */}
<div className="relative mb-6">
  <FontAwesomeIcon
    icon={faStethoscope}
    className="absolute top-1/2 left-4 -translate-y-1/2 text-blue-500"
  />

  <select
    name="Specialization"
    required
    onChange={(e)=>setSpecilization(e.target.value)}
    defaultValue=""
    className="peer w-full pl-12 pr-2 sm-pr-4 py-3 rounded-xl border border-gray-300
               focus:border-blue-500 focus:ring-2 focus:ring-blue-200
               outline-none transition bg-white"
  >
    <option value="" disabled hidden></option>
    <option value="General Physician">General Physician</option>
    <option value="Cardiologist">Cardiologist</option>
    <option value="Dermatologist">Dermatologist</option>
    <option value="Pediatrician">Pediatrician</option>
    <option value="Orthopedic">Orthopedic</option>
    <option value="Neurologist">Neurologist</option>
    <option value="Gynecologist">Gynecologist</option>
    <option value="Psychiatrist">Psychiatrist</option>
    <option value="Ophthalmologist">Ophthalmologist</option>
    <option value="Dentist">Dentist</option>
    <option value="ENT Specialist">ENT Specialist</option>
  </select>

  <label
    className="absolute left-12 top-1/2 -translate-y-1/2 
    text-gray-400 text-sm
               transition-all pointer-events-none
               peer-focus:-top-2
               peer-focus:text-xs
               peer-focus:text-blue-500
               peer-valid:-top-2
               peer-valid:text-xs
               peer-valid:text-blue-500
               bg-white px-1"
  >
    Specialization
  </label>
</div>


    {/* Experience */}
    <div className="relative mb-6">
      <FontAwesomeIcon
        icon={faBriefcase}
        className="absolute top-1/2 left-4 -translate-y-1/2 text-blue-500"
      />

      <input
        name="Experience"
        type="number"
        onChange={(e)=>setExperience(e.target.value)}
        required
        placeholder=" "
        className="peer w-full pl-12 pr-4 py-3 rounded-xl border border-gray-300
                   focus:border-blue-500 focus:ring-2 focus:ring-blue-200
                   outline-none transition"
      />

      <label
        className="absolute left-12 top-1/2 -translate-y-1/2 text-gray-400 text-sm
                   transition-all pointer-events-none
                   peer-placeholder-shown:top-1/2
                   peer-placeholder-shown:text-sm
                   peer-focus:-top-2
                   peer-focus:text-xs
                   peer-focus:text-blue-500
                   peer-valid:-top-2
                   peer-valid:text-xs
                   peer-valid:text-blue-500
                   bg-white px-1"
      >
        Experience (years)
      </label>
    </div>
{/* Hospital */}
<div className="relative mb-6">
  <FontAwesomeIcon
    icon={faHospital}
    className="absolute top-1/2 left-4 -translate-y-1/2 text-blue-500"
  />

  <select
    name="hospital"
    value={hospital}
    onChange={(e) => setHospital(e.target.value)}
    required
    defaultValue=""
    className="peer w-full pl-12 pr-2 sm-pr-4 py-3 rounded-xl border border-gray-300
               focus:border-blue-500 focus:ring-2 focus:ring-blue-200
               outline-none transition bg-white"
  >
 <option value="" disabled hidden></option>
    { hospitalls.map((h)=>(
     <option key={h._id} value={h._id}>{h.Name}</option>
    ))

    }

    {/*
    <option value="St. Paul Hospital">St. Paul Hospital</option>
    <option value="Myungsung Hospital">Myungsung Hospital</option>
    <option value="Adama General Hospital">Adama General Hospital</option>
 */}
    </select>

  <label
    className="absolute left-12 top-1/2 -translate-y-1/2 text-gray-400 text-sm
               transition-all pointer-events-none
               peer-focus:-top-2
               peer-focus:text-xs
               peer-focus:text-blue-500
               peer-valid:-top-2
               peer-valid:text-xs
               peer-valid:text-blue-500
               bg-white px-1"
  >
    Hospital
  </label>
</div>


  </div>
)}

    {/* Footer */}
    <div className="flex flex-col gap-4 mt-6">
      <button type='button' onClick={() => setShowLogin(true)} className="text-blue-600 text-sm hover:underline">
        Already have an account?
      </button>

      <button
        type="submit"
        className="
          w-full py-3 rounded-xl
          bg-gradient-to-r from-blue-600 to-indigo-600
          text-white font-semibold
          shadow-[0_15px_35px_rgba(37,99,235,0.45)]
          hover:shadow-[0_20px_45px_rgba(37,99,235,0.65)]
          hover:-translate-y-0.5
          transition-all
        "
      >
        Create Account
      </button>
    </div>
  </form>
</div>

    {showLogin && (
      <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/40 backdrop-blur-md px-4">
        
        <div className="
          relative w-full max-w-lg
          bg-transparent
          animate-scaleIn
        ">
          
          <Login onClose={() => setShowLogin(false)} />
    
        </div>
      </div>
    )}
</>
    );
}
export default Registration;