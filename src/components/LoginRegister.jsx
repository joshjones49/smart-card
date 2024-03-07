import React from 'react'

const LoginRegister = () => {
  return (
    <div className='login-register'>
        <div className='form-input'>
            <h1>Name</h1>
            <input type="text" placeholder="Name"/>
        </div>

        <div className='form-input'>
            <h1>Username</h1>
            <input type="text" placeholder="Username"/>
        </div>

        <div className='form-input'>
            <h1>Password</h1>
            <input type="password" placeholder="Password"/>
        </div>

        <div className='submit-btns'>
            <button>LOG-IN</button>
            <button>REGISTER</button>
        </div>
    </div>
  )
}

export default LoginRegister
