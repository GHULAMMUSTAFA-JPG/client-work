"use client";
import { Icon } from "@iconify/react/dist/iconify.js";
import Image from "next/image";
import { useAuth } from "@/contexts/AuthContext";
import { defaultImagePath } from "@/components/constants";
import { useEffect, useRef, useState } from "react";
import { handleFileUpload, updateProfileInformation } from "@/@api";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Link from "next/link";
import HowToInstall from "@/components/HowToInstall";
import { withAuthRole } from "@/utils/withAuthRole";
import { Tooltip } from "@mui/material";

function App() {
 
  return (
      <div className="container-fluid">
     
        <div className="row my-3">
          <div className="col-12">
            <div className="d-flex justify-content-between align-items-end mb-3">
              <p className="mb-0 fw-medium fs-16">
              <svg id="Icon_feather-settings" data-name="Icon feather-settings" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
  <path id="Path_861" data-name="Path 861" d="M15,12a3,3,0,1,1-3-3A3,3,0,0,1,15,12Z" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
  <path id="Path_862" data-name="Path 862" d="M19.4,15a1.65,1.65,0,0,0,.33,1.82l.06.06a2,2,0,1,1-2.83,2.83l-.06-.06a1.663,1.663,0,0,0-2.82,1.18V21a2,2,0,0,1-4,0v-.09A1.65,1.65,0,0,0,9,19.4a1.65,1.65,0,0,0-1.82.33l-.06.06a2,2,0,1,1-2.83-2.83l.06-.06a1.663,1.663,0,0,0-1.18-2.82H3a2,2,0,1,1,0-4h.09A1.65,1.65,0,0,0,4.6,9a1.65,1.65,0,0,0-.33-1.82l-.06-.06A2,2,0,1,1,7.04,4.29l.06.06a1.65,1.65,0,0,0,1.82.33H9a1.65,1.65,0,0,0,1-1.51V3a2,2,0,0,1,4,0v.09a1.663,1.663,0,0,0,2.82,1.18l.06-.06a2,2,0,1,1,2.83,2.83l-.06.06a1.65,1.65,0,0,0-.33,1.82V9a1.65,1.65,0,0,0,1.51,1H21a2,2,0,0,1,0,4h-.09A1.65,1.65,0,0,0,19.4,15Z" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
</svg> &nbsp;
Settings</p>  
</div>
<div className="settings-card">

      <div className="section-block">
      <div className="d-flex justify-content-between">

      <p className="fw-medium fs-16">Profile Information</p>
      <a href="#" className="btn btn-primary">Edit</a>
      </div>
      <div className="form-container mt-3">

        <div className="form-group">
            <label htmlFor="fullname">Full Name:</label>
            <input type="text" id="fullname" name="fullname" required placeholder="John Doe" />
        </div>
        <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" required placeholder="john@example.com" />
        </div>
     
</div>
</div>



 <div className="section-block">
      <div className="d-flex justify-content-between">

      <p className="fw-medium fs-16">Connected Accounts</p>
      
      </div>

      <div className="stripes_Cont d-flex justify-content-between">
      <div className="stripe_icon"> <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-linkedin h-6 w-6 text-blue-600"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect width="4" height="12" x="2" y="9"></rect><circle cx="4" cy="4" r="2"></circle></svg> LinkedIn </div>
      <div className="buttonbox"> 
      <a href="#" className="btn btn-outline-primary">Connect</a>

      </div>
      </div>

      <div className="stripes_Cont d-flex justify-content-between">
      <div className="stripe_icon"> <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-building2 h-6 w-6 text-gray-600"><path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z"></path><path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2"></path><path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2"></path><path d="M10 6h4"></path><path d="M10 10h4"></path><path d="M10 14h4"></path><path d="M10 18h4"></path></svg> Company Profile </div>
      <div className="buttonbox"> 
      <a href="#" className="btn btn-outline-primary">Update</a>

      </div>
      </div>

      <div className="stripes_Cont d-flex justify-content-between">
      <div className="stripe_icon"><img src="https://e1cdn.social27.com/digitalevents/chatbot/Stripe_Logo%2C_revised_2016.svg" alt="Stripe" className="h-6" />  Stripe Account </div>
      <div className="buttonbox"> 
      <a href="#" className="btn btn-outline-primary">Connect</a>

      </div>
      </div>
      


      
 </div>



 <div className="section-block">
      <div className="d-flex justify-content-between">

      <p className="fw-medium fs-16">Quick Actions</p>
      
      </div>

      <div className="stripes_Cont d-flex justify-content-between">
      <div className="stripe_icon"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-history h-5 w-5 text-gray-600"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path><path d="M3 3v5h5"></path><path d="M12 7v5l4 2"></path></svg>Invoice History </div>
      <div className="buttonbox"> 
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-external-link h-5 w-5 text-gray-400"><path d="M15 3h6v6"></path><path d="M10 14 21 3"></path><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path></svg>

      </div>
      </div>

      <div className="stripes_Cont d-flex justify-content-between">
      <div className="stripe_icon"> <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-credit-card h-5 w-5 text-gray-600"><rect width="20" height="14" x="2" y="5" rx="2"></rect><line x1="2" x2="22" y1="10" y2="10"></line></svg> Stripe Dashboard </div>
      <div className="buttonbox"> 
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-external-link h-5 w-5 text-gray-400"><path d="M15 3h6v6"></path><path d="M10 14 21 3"></path><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path></svg>

      </div>
      </div>


      


      
 </div>



<div className="FooterboxSettings d-flex justify-content-between">
<div className="box_footer">
      <div>
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-file-text h-4 w-4"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"></path><path d="M14 2v4a2 2 0 0 0 2 2h4"></path><path d="M10 9H8"></path><path d="M16 13H8"></path><path d="M16 17H8"></path></svg>
&nbsp;<span>Terms Service</span>
</div>

      <div>
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-shield h-4 w-4"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"></path></svg>
      &nbsp;<span>Privacy Policy</span>
</div>


</div>
<div className="box_footer">

<button className="btn btn-primary-outline flex items-center space-x-2 text-red-600 hover:text-red-700 hover:bg-red-50 px-4 py-2 rounded-md"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-log-out h-5 w-5"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" x2="9" y1="12" y2="12"></line></svg><span>Log Out</span></button>
</div>
</div>





</div>









           
       </div>
    </div>
     </div>
  );
}

export default App;