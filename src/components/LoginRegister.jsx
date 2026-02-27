import { useContext, useState } from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { CardContext } from '../../ContextAPI/ContextProvider'

const LoginRegister = () => {
  const navigate = useNavigate();
  const { login, register } = useContext(CardContext);
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleAuthAttempt = async (action) => {
    if (username.trim().length === 0 || password.trim().length === 0) {
      toast.error(`${action} failed: username and password are required`);
      return;
    }

    let success = false;
    if (action === 'Login') {
      success = await login({ username, password });
    } else {
      success = await register({ name, username, password });
    }

    if (success) {
      navigate('/');
    }
  };

  return (
    <div className='login-register'>
        <div className='form-input'>
            <h1 className='name-plate' >Name <span>(Optional)</span></h1>
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
        </div>

        <div className='form-input'>
            <h1>Username</h1>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
        </div>

        <div className='form-input'>
            <h1>Password</h1>
            <div className="password-input-wrap">
              <input
                className="password-input"
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                className="toggle-password-btn"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
        </div>

        <div className='submit-btns'>
            <button onClick={() => handleAuthAttempt('Login')}>LOG-IN</button>
            <button onClick={() => handleAuthAttempt('Register')}>REGISTER</button>
        </div>
    </div>
  )
}

export default LoginRegister
