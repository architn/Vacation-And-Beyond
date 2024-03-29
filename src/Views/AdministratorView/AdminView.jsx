import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Navbar from '../../components/Navbar/Navbar.jsx'
import '../../Views/AdministratorView/AdminView.css'
import AdminViewPropertyUI from './AdminViewPropertyUI.jsx';
import AdminViewUserUI from './AdminViewUserUI.jsx';
import '../../Views/AdministratorView/AdminViewUserUI.css'
import Table from 'react-bootstrap/Table'
import Error from '../Error/Error.jsx'


function createUserAdminView(user){
  return (
    <div>
      <AdminViewUserUI 
      name={user.name} email={user.email} id={user._id}/>
    </div>
  )
}

function createPropertyAdminView(property){
  return (
    <div>
      <AdminViewPropertyUI title={property.Title}
          address={property.Street} 
          city={property.City} 
          state={property.State} 
          country = {property.Country}
          guests = {property.Guests}
          beds = {property.Beds}
          bathroom = {property.Bathrooms}
          cost = {property.Price}
          id={property._id} />
    </div>
  )
}


function AdminView() {
  const [users, setUsers] = useState([]);
  const [properties, setProperties] = useState([]);
  const [isUserViews, setViews] = useState(false);
  const isAdminLoggedIn = sessionStorage.getItem('isAdministrator');
  console.log(isAdminLoggedIn);
  function onChangeEvent(){
    var value = document.getElementById("drop").value;
    if(value==="Properties") {
      document.getElementById("prop").placeholder = "Search By Property";
      setViews(false)
    }
    else if(value==="Users") {
      document.getElementById("prop").placeholder = "Search By User";
      setViews('user')
    }else document.getElementById("prop").placeholder = "Search";
  }


  useEffect( () => {
    axios.get('http://localhost:3002/getAllUsers', { withCredentials: true})
    .then( (response) => {
      setUsers(response.data)
    })

    axios.get('http://localhost:3002/getAllProperties', { withCredentials: true})
    .then( (response) => {
      setProperties(response.data)
    })
  }, [])


  return (
    <div className='container'>
      {isAdminLoggedIn ?
      <div>
        <Navbar />
         <h4>Welcome to Administrator View</h4>
        <div className="row g-2 my-2">
        <label htmlFor='drop'>Search By: </label>
          <div className="col-4">
            
            <select  
            className="form-group col-6 input-group-text border-1" 
            name="searchCriteria" 
            id="drop"
           onChange={onChangeEvent}>
            <option value="Properties">Properties</option>
            <option value="Users">Users</option>
            </select>
          </div>

          <div className="col-4">
          <div className="input-group rounded">
          <input id="prop" 
          type="search" 
          name="searchText"
          className="form-control rounded select2"
           placeholder="Search" 
           aria-label="Search" 
           aria-describedby="search-addon"
           ></input>
          <span className="input-group-text border-3" id="search-addon">
          <button id="search-button" type="submit" className="btn btn-link"> <i className="fas fa-search"></i></button>
          </span>
        </div>
        </div>
        <br/><br/><br/><br/>
        
        </div>

      
        {isUserViews ? 
       <div> 
         <div className="row" id="tablerow">
            <div className="col-4">Name</div>
            <div className="col-4">Emails</div>
            <div className="col-4">Actions</div>
         </div>
           <tr>
           {users.map(createUserAdminView)}
             </tr>
          </div>
      
        :  
        <div> 
         <div className="row" id="tablecol">
            <div className="col-2">Title</div>
            <div className="col-2">City</div>
            <div className="col-2">State</div>
            <div className="col-2">Country</div>
            <div className="col-2">Price</div>
            <div className="col-2">Action</div>
         </div>
           <tr>
           {properties.map(createPropertyAdminView)}
             </tr>
          </div>
        
        }
      </div>
      : <Error /> }


     
    </div>
  )
}

// style={{backgroundColor:"black" ,color: "white"}}
// function OnChangeEvent() {
  
  
// }




export default AdminView