import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
function Input(props) {
  return (
    <div>
        <input type={props.type} className={props.className} id={props.id} placeholder={props.placeholder} onBlur={props.onBlur} name = {props.name} onChange = {props.onChange} value = {props.value}/>
    </div>
  )
}

export default Input