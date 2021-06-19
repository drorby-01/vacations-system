import React from 'react'
import { Link } from 'react-router-dom'

const AdminNav = () => {
    return (
        <ul className="nav">
        <li className="nav-item">
          <Link to={"/vacation/admin/add"} className="nav-link active" >Add Vacation</Link>
        </li>
        <li className="nav-item">
          <Link to={"/vacation/admin/vacationGraph"} className="nav-link active" >Vacation Graph</Link>
        </li>
        </ul>
    )
}

export default AdminNav
