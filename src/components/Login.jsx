import { useState } from "react";
import { useNavigate } from "react-router";

export default function Login(props) {
    const[credentials,setCredentials] = useState({email:"",password:""});
    let navigate = useNavigate();
    const handlesubmit = async (event) => {
        event.preventDefault();
        const response= await fetch("http://127.0.0.1:5000/api/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body:JSON.stringify({
                email:credentials.email,
                password:credentials.password,
            }),
        });
        const json = await response.json();
        if(json.success){
            // redirect to homepage and save authtoken
            localStorage.setItem("token",json.authtoken); // saves token in local storage
            props.showAlert("Login Successfull","success");
            navigate("/", { replace: true });
        }
        else{
            props.showAlert("Invalid Credentials","danger");
        }
    }

    const onchange = (event)=>{
        setCredentials({...credentials,[event.target.name]:event.target.value}); // spread operator will keep original value intact and update the value accordingly
    };
    return (
        <>
            <form onSubmit={handlesubmit}>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" className="form-control" name= "email" id="exampleInputEmail1" aria-describedby="emailHelp" value = {credentials.email} onChange={onchange}  />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" value = {credentials.password}  name = "password" className="form-control" id="exampleInputPassword1" onChange={onchange} />
                </div>
                <button type="submit" className="btn btn-primary" >Submit</button>
            </form>
        </>
    );
}
