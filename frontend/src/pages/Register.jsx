import { useState } from 'react'
import { FaUserAlt } from 'react-icons/fa'

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  })

  const { name, email, password, password2 } = formData

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
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
        <form>
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
        </form>
      </section>
    </>
  )
}

export default Register
