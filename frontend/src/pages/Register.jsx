import { useEffect, useState } from 'react'
import { FaUserAlt } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { register, reset } from '../features/auth/authSlice'

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  })

  const { name, email, password, password2 } = formData

  const dispatch = useDispatch()
  const navgate = useNavigate()

  // Global state
  const { user, isError, isSuccess, isLoading, message } = useSelector(
    (state) => state.auth
  )

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }
    if (isSuccess || user) {
      // Redirect
      navgate('/')
    }
    // Clear the state
    dispatch(reset())
  }, [user, isError, isSuccess, message, dispatch, navgate])

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const onSubmit = (e) => {
    e.preventDefault()

    if (password !== password2) {
      toast.error('Passwords do not match')
    } else {
      const userData = {
        name,
        email,
        password,
      }

      dispatch(register(userData))
    }
  }

  return (
    <>
      <section className='heading'>
        <h1>
          <FaUserAlt /> Register
        </h1>
        <p>Please create an account</p>
      </section>

      <section className='form'>
        <form onSubmit={onSubmit}>
          <div className='form-group'>
            <input
              type='text'
              name='name'
              id='name'
              value={name}
              placeholder='Enter your name'
              required
              onChange={onChange}
            />
          </div>
          <div className='form-group'>
            <input
              type='email'
              name='email'
              id='email'
              value={email}
              placeholder='Enter your email'
              required
              onChange={onChange}
            />
          </div>
          <div className='form-group'>
            <input
              type='password'
              name='password'
              id='password'
              value={password}
              placeholder='Enter password'
              required
              onChange={onChange}
            />
          </div>
          <div className='form-group'>
            <input
              type='password'
              name='password2'
              id='password2'
              value={password2}
              placeholder='Confirm password'
              required
              onChange={onChange}
            />
          </div>

          <div className='form-group'>
            <button className='btn btn-block'>Submit</button>
          </div>
        </form>
      </section>
    </>
  )
}

export default Register
