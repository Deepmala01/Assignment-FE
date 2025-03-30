import { useState } from 'react'
import './App.css';
import './assets/boorstrap.min.css';
import { baseURL } from './App';


function User({user, onDelete, onNameClick, userUpdate}) {
  const [points, setPoints] = useState(user.points);

  //  update points on server
  const updatePoints = (type) => {
    const updatedPoints = type === 'add' ? points + 1 : points - 1;
    const {created_at, updated_at, qr_code_path, id, ...userdata} = user;

    fetch(`${baseURL}/api/updateuser/${user.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({...userdata, points:updatedPoints})
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      setPoints(updatedPoints);
      userUpdate({...user, points:updatedPoints});
    });
  }

  return (
    <>
      <div className="row p-2">
        <div className="col"><button onClick={() => onDelete(user.id) } className='btn btn-danger'>x</button></div>
            <div className="name col">
              <span 
                style={{ cursor: 'pointer', color: '#0d6efd' }}
                onClick={() => onNameClick(user)}
              >
                {user.name}
              </span>
            </div>
            <div className="buttons col">
                <button className='btn btn-outline-dark m-1' onClick={() => updatePoints('add')}>+</button>
                <button className='btn btn-outline-dark m-1' onClick={() => updatePoints('remove')}>-</button>
            </div>
            <div className="points col">{points} points</div>
        </div>
    </>
  )
}

export default User;
