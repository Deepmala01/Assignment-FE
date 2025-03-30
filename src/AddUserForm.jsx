import { useState, useEffect } from 'react';
import { baseURL } from './App';

function AddUserForm({ show, onHide, onUserAdded, mode = 'add', userData = null }) {
  const [formData, setFormData] = useState({
    name: '',
    points: 0,
    age: '',
    address: ''
  });

  useEffect(() => {
    if (mode === 'view' && userData) {
      setFormData(userData);
    } else {
      // Reset form when modal is closed or mode changes to add
      setFormData({
        name: '',
        points: 0,
        age: '',
        address: ''
      });
    }
  }, [mode, userData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (mode === 'add') {
      fetch(`${baseURL}/api/createuser`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify(formData)
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        onUserAdded(data.data);
        onHide();
      })
      .catch(error => {
        console.error('Error adding user:', error);
      });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleClose = () => {
    setFormData({
      name: '',
      points: 0,
      age: '',
      address: ''
    });
    onHide();
  };

  return (
    <div className={`modal ${show ? 'show' : ''}`} style={{ display: show ? 'block' : 'none' }}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{mode === 'add' ? 'Add New User' : 'User Details'}</h5>
            <button type="button" className="btn-close" onClick={handleClose}></button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  disabled={mode === 'view'}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="age" className="form-label">Age</label>
                <input
                  type="number"
                  className="form-control"
                  id="age"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  required
                  disabled={mode === 'view'}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="address" className="form-label">Address</label>
                <input
                  type="text"
                  className="form-control"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                  disabled={mode === 'view'}
                />
              </div>
              {mode !== 'add' && <div className="mb-3">
                <label htmlFor="points" className="form-label">Points</label>
                <input
                  type="number"
                  className="form-control"
                  id="points"
                  name="points"
                  value={formData.points}
                  onChange={handleChange}
                  required
                  disabled={mode === 'view'}
                />
              </div>}
              {mode === 'add' && (
                <button type="submit" className="btn btn-primary">Add User</button>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddUserForm; 