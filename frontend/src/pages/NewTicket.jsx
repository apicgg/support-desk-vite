import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { createTicket, reset } from '../features/tickets/ticketSlice'
import Spinner from '../components/Spinner'

const NewTicket = () => {
  const { user } = useSelector((state) => state.auth)
  const { isLoading, isError, isScuccess, message } = useSelector(
    (state) => state.ticket
  )

  const [name] = useState(user.name)
  const [email] = useState(user.email)
  const [product, setProduct] = useState('iPhone')
  const [description, setDescription] = useState('')

  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }
    if (isScuccess) {
      dispatch(reset())
      navigate('/tickets')
    }

    dispatch(reset())
  }, [isError, isScuccess, dispatch, navigate, message])

  const onSubmit = (e) => {
    e.preventDefault()

    dispatch(createTicket({ product, description }))
  }

  if (isLoading) {
    return <Spinner />
  }

  return (
    <>
      <section className='heading'>
        <h1>Create New Ticket</h1>
        <p>Please fill out the below form</p>
      </section>

      <section className='form'>
        <div className='form-group'>
          <label htmlFor='name'>Customer Name</label>
          <input type='text' value={name} className='form-control' disabled />
        </div>

        <div className='form-group'>
          <label htmlFor='name'>Customer Email</label>
          <input type='text' value={email} className='form-control' disabled />
        </div>

        <form onSubmit={onSubmit}>
          <div className='form-group'>
            <label htmlFor='product'>Product</label>
            <select
              name='product'
              id='product'
              value={product}
              onChange={(e) => setProduct(e.target.value)}
            >
              <option value='iPhone'>iPhone</option>
              <option value='iPad'>iPad</option>
              <option value='Macbook Air'>Macbook Air</option>
              <option value='Macbook Pro'>Macbook Pro</option>
              <option value='iPad'>iPad</option>s
            </select>
          </div>

          <div className='form-group'>
            <label htmlFor='description'>Description of the issue</label>
            <textarea
              name='description'
              id='description'
              className='form-control'
              placeholder='Description'
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>

          <div className='form-group'>
            <button className='btn btn-block'>Submit</button>
          </div>
        </form>
      </section>
    </>
  )
}
export default NewTicket
