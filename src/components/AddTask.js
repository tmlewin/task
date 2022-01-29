import { useState } from 'react'

import React from 'react'

const AddTask = ({onAdd}) => {
    const [text, setText ] = useState('')
    const [day, setDay] = useState('')
    const [reminder, setReminder] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!text) {
            alert('Please fill all fields')
            return
        }
        onAdd({text,day,reminder})
        setText('')
        setDay('')
        setReminder(false)
    }

        

    return (
        <form onSubmit={handleSubmit} className='add-form' >
            <div className='form-control'>
                <label>Task</label>
                <input type='text'  value={text} onChange={(e) => setText(e.target.value)} placeholder='Enter task' />
            </div>
            <div className='form-control'>
                <label>Day & Time</label>
                <input type='text'  value={day} onChange={(e) => setDay(e.target.value)} placeholder='Enter Day and Time' />
            </div>
            <div className='form-control form-control-check'>
                <label>Set Reminder</label>
                <input type='checkbox'  
                checked={reminder} 
                value={reminder}
                onChange={(e) => setReminder(e.currentTarget.checked)} />
            </div>
            <input type= 'submit' value='save task' className='btn btn-block' />

                
            </form>
    )
}

export default AddTask
