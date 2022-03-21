import React, { useEffect, useState } from 'react'
import styles from './styles.module.css'
import axios from 'axios'
import ClipLoader from "react-spinners/ClipLoader";
function Dashboard() {
  const [name,setName]=useState("")
  const [department,setDepartment]=useState("")
  const [gender,setGender]=useState("")
    const [role, setRole] = useState("")
    const [salary, setSalary] = useState("")
    const [employees, setEmployees] = useState([])
    
    //Indicators
    const [loading, setIsloading] = useState(false);
    const [error, setIsEror] = useState(false)
    

    const handleSubmit = (e) => {
        e.preventDefault();
        let payload = {
            id: employees.length + 1,
            name: name,
            department: department,
            gender: gender,
            role: role,
            salary:salary
        }
        
        try {
            axios.post('https://json-server-deploy-mock.herokuapp.com/employees', payload)
            setEmployees([...employees,payload])
        } catch (error) {
           setIsEror(true) 
        }
       
    }
    const getData = () => {
      return  axios.get("https://json-server-deploy-mock.herokuapp.com/employees")
    }

    useEffect(() => {
        setIsloading(true)
        getData().then((res) => {
            setEmployees(res.data)
            setIsloading(false)
            console.log(res.data)
        }).catch((err) => {
          setIsEror(true)
      }) 
    },[])
    
    const handleGender = (e) => {
        setGender(e.target.value)
        console.log(e.target.value)
    }

  return (
      <div>
          <h3>Add Employee</h3>
          <form className={styles.form} onSubmit={(e) => handleSubmit(e)}>
              <input onChange={(e)=>setName(e.target.value)} type="text"  placeholder='Employee Name'/>
              <input onChange={(e)=>setDepartment(e.target.value)} type="text"  placeholder='Employee Department'/>
              
             
              <select onChange={(e)=>handleGender(e)} name="gender" id="emp-gender">
    <option value="">Choose Gender</option>
    <option value="male">Male</option>
    <option value="female">Female</option>
              </select>
              <input onChange={(e)=>setRole(e.target.value)} type="text"  placeholder='Employee Role'/>
              <input onChange={(e)=>setSalary(e.target.value)} type="text" placeholder='Employee Salary' />
              <input type="submit" value="Add Employee" />
          </form>

          <h3>Employees</h3>
          <ClipLoader loading={loading} size={50} color='red'/>
          <table className={styles.table}>
              <thead>
               <tr>
                  <th>Name</th>
                  <th>Department</th>
                  <th>Gender</th>
                  <th>Role</th>
                  <th>Salary</th>
              </tr>   
              </thead>

              <tbody>
               {employees?.map((item) => {
                  return (
                      <tr key={item.id}>
                          <td>{item.name}</td>
                          <td>{item.department}</td>
                          <td>{item.gender}</td>
                          <td>{item.role}</td>
                          <td>₹{item.salary}</td>
                      </tr>
                  )
              })}   
              </tbody>
              

              
</table>
    </div>
  )
}

export default Dashboard