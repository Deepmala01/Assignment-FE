import { useEffect, useState } from 'react'
import './App.css';
import './assets/boorstrap.min.css';
import User from './user';
import AddUserForm from './AddUserForm';

export const baseURL = 'http://127.0.0.1:8000';

function App() {
  const [users, setUsers] = useState([]);
  const [showAddUser, setShowAddUser] = useState(false);
  const [modalMode, setModalMode] = useState('add');
  const [selectedUser, setSelectedUser] = useState(null);

  const getUserList = () => {
    fetch(`${baseURL}/api/userlist`, {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((res) => {
      setUsers(res.data);
      console.log(res.data);
    });
  }

  useEffect(() => {
    getUserList();
  }, []); 
  
  const deleteUser = (id) => {
    fetch(`${baseURL}/api/deleteuser/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    })
    .then(() => {
     getUserList();
    })
  }

  const handleUserAdded = (newUser) => {
    setUsers(prevUsers => [...prevUsers, newUser]);
  }

  const handleNameClick = (user) => {
    setSelectedUser(user);
    setModalMode('view');
    setShowAddUser(true);
  }

  const handleModalClose = () => {
    setShowAddUser(false);
    setSelectedUser(null);
    setModalMode('add');
  }

  const handleUserUpdate = (updatedUser) => {
    setUsers(prevUsers => prevUsers.map(user => user.id === updatedUser.id ? updatedUser : user));
  }

  return (
    <>
      <div className="container">
        <div className="row main border border-dark">
          <div className="col">
            {users.sort((a, b) => b.points - a.points).map((user) => (
              <User 
                key={user.id} 
                user={user} 
                onDelete={deleteUser} 
                onNameClick={handleNameClick}
                userUpdate={handleUserUpdate}
              />
            ))}

            <div className="row">
              <div className="col d-flex justify-content-end">
                <button 
                  className="btn btn-primary mb-3" 
                  onClick={() => {
                    setModalMode('add');
                    setShowAddUser(true);
                  }}
                >
                  + Add User
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <AddUserForm 
        show={showAddUser} 
        onHide={handleModalClose}
        onUserAdded={handleUserAdded}
        mode={modalMode}
        userData={selectedUser}
      />
    </>
  )
}

export default App;