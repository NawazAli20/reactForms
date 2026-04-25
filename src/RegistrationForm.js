import React from "react";
import { useState } from "react";

function RegistrationForm() {
   // state variables 
   const [inputs, setInputs] = useState({});
   const [nameRequirements, setNameRequirements] =useState({length:true,case:true})
   const [passReqs, setPassReqs] = useState({
      length:true,
      case:true,
      special:true
   })

   
   function handleSubmit(event) {
      
      const target = event.target;
      
      //name requirement check 
      /*
      ** username must be at least four characters long 
      ** Only contain lowercase letters and digits
      */
      const name = target.username.value;
      const nameLength = name.length>=4; 
      const caseReq = /^[a-z|0-9]+$/.test(name);
      setNameRequirements({length:nameLength,case:caseReq});
      if(!nameLength||!caseReq)
         event.preventDefault();
  
   //password requirement check 
   /*
   ** at least six character long 
   ** at least contains one uppercase Alphabet 
   ** at least contain one special character of [!,@,#,$]
   */
      const password = target.password.value; 
      const lengthReq = password.length>=6; 
      const passCaseReq = /[A-Z]/.test(password); 
      const specialReq = /[!,@,#,$]/.test(password); 
      setPassReqs({length:lengthReq,case:passCaseReq,special:specialReq});
      
      if(!lengthReq||!caseReq||!specialReq)
         event.preventDefault();
   
   }

   function handleChange(event){
      const name = event.target.name;
      const value = event.target.value;
      //const {name, value} = event.target; alternatively 
      setInputs((prevState)=>({...prevState,[name]:value})); 
      //[name] is a dynamic name change for each field's name, e,g, username: value or password:value
   }
  
   return (
      <form onSubmit={handleSubmit} target="_blank" method="post" 
         action="https://wp.zybooks.com/form-viewer.php">
         <p>
            <label htmlFor="username">Username:</label>
            <input type="text"            
               id="username"
               name="username"
               value={inputs.username||""}
               onChange={handleChange}
            />
         </p>
            {!nameRequirements.length && <p className="error">Must be at least four characters long</p>}
            {!nameRequirements.case && <p className="error">Only lowercase letters and digits are accetable</p>}
         
         <p>
            <label htmlFor="password">Password:</label>
            <input type="password"
               id="password"
               name="password"
               value={inputs.password||""}
               onChange={handleChange}
            />
         </p>
            
            {!passReqs.length && <p className="error">Must be at least six characters</p> }
            {!passReqs.case && <p className="error">Must contain an uppercase characters</p> }
            {!passReqs.special && <p className="error">Must contain at least one of !,@,#,$</p> }

        
         <p>
            <button>Register</button>
         </p>
      </form>
   );
}

export default RegistrationForm;