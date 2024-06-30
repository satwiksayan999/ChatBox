import React, { useState } from 'react';
import Gendercheckbox from './Gendercheckbox';
import { Link } from 'react-router-dom';
import useSignup from '../../hooks/useSignup';

const Signup = () => {

    const [inputs, setinputs] = useState({
        fullname: "",
        username: "",
        password: "",
        confirmpassword: "",
        gender: "",
    });

    const { loading, SignUp } = useSignup();

    const handleCheckboxChange = (gender) => {
        setinputs({ ...inputs, gender })
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(inputs);

        await SignUp(inputs);
    }

    return (
        <div className='flex flex-col items-center justify-center min-w-96 mx-auto'>
            <div className='w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
                <h1 className='text-3xl font-semibold text-center text-gray-300'>
                    SignUp
                    <span className='text-blue-500'> ChatBox</span>
                </h1>

                <form onSubmit={handleSubmit}>
                    <div>
                        <label className='label p-2'>
                            <span className='text-base label-text'>Full name</span>
                        </label>

                        <input type="text" placeholder='full name' className='w-full input input-bordered h-10' value={inputs.fullname} onChange={(e) => setinputs({ ...inputs, fullname: e.target.value })}></input>
                    </div>

                    <div>
                        <label className='label p-2'>
                            <span className='text-base label-text'>Username</span>
                        </label>

                        <input type="text" placeholder='Username' className='w-full input input-bordered h-10' value={inputs.username} onChange={(e) => setinputs({ ...inputs, username: e.target.value })}></input>
                    </div>

                    <div>
                        <label className='label p-2'>
                            <span className='text-base label-text'>Password</span>
                        </label>

                        <input type="password" placeholder='enter password' className='w-full input input-bordered h-10' value={inputs.password} onChange={(e) => setinputs({ ...inputs, password: e.target.value })}></input>
                    </div>

                    <div>
                        <label className='label p-2'>
                            <span className='text-base label-text'>Confirm Password</span>
                        </label>

                        <input type="password" placeholder='enter confirmPassword' className='w-full input input-bordered h-10' value={inputs.confirmpassword} onChange={(e) => setinputs({ ...inputs, confirmpassword: e.target.value })}></input>
                    </div>

                    <Gendercheckbox onCheckboxChange={handleCheckboxChange} selectedGender={inputs.gender} />

                    <Link to='/login' className='text-sm hover:underline hover:text-blue-600 mt-2 inline-block'>Already have an Account</Link>

                    <div>
                        <button className='btn btn-block btn-sm mt-2 border border-slate-700' disabled={loading}>
                            {loading ? <span className='loading loading-spinner'></span> : "Sign up"}
                        </button>
                    </div>

                </form>

            </div>
        </div>
    )
};

export default Signup;
