import { useState } from "react";
import { useNavigate } from "react-router";

export default function Signup(props) {
    const[credentials,setCredentials] = useState({name:"",email:"",password:"",cpassword:""});
    let navigate = useNavigate();
    const handlesubmit = async (event) => {
        event.preventDefault();
        if(credentials.password!= credentials.cpassword){
            return  props.showAlert("Password doesn't match","danger");
        }
        const response= await fetch("http://127.0.0.1:5000/api/auth/createuser", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body:JSON.stringify({
                name:credentials.name,
                email:credentials.email,
                password:credentials.password,
            }),
        });
        const json = await response.json();
        console.log(json);
        if(json.success){
            // redirect to homepage and save authtoken
            localStorage.setItem("token",json.authtoken); // saves token in local storage
            props.showAlert("Account Created Successfully","success");
            navigate("/", { replace: true });
        }
        else{
            props.showAlert("Sorry, a user with this email already exists","danger");
        }
    }

    const onchange = (event)=>{
        setCredentials({...credentials,[event.target.name]:event.target.value}); // spread operator will keep original value intact and update the value accordingly
    };
    return (
        <>
        <div className = "container">
            <form onSubmit = {handlesubmit}>
            <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" name="name" onChange={onchange} id="name" aria-describedby="emailHelp"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" name="email" onChange={onchange} id="email" aria-describedby="emailHelp"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" name="password" onChange={onchange} id="password" required minLength={5}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="cpassword" className="form-label">Confirm Password</label>
                    <input type="password" className="form-control" name="cpassword" onChange={onchange} id="cpassword" required minLength={5}/>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
            </div>
        </>
    );
}

