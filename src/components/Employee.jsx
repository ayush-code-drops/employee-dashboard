import React from 'react'
import styles from './styles.module.css'
function Employee(data) {
  return (
      <div>
          <h5>{data.name}</h5>
          <em>{data.role}, {data.department}</em>
          
    </div>
  )
}

export default Employee