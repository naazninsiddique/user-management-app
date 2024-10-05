import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function UserForm({ addUser }) {  // Place addUser here in the function parameter
  const [user, setUser] = useState({ name: '', email: '', phone: '' });
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
        .then(response => response.json())
        .then(data => setUser(data))
        .catch(error => console.error('Error fetching user:', error));
    }
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const method = id ? 'PUT' : 'POST';
    const url = id ? `https://jsonplaceholder.typicode.com/users/${id}` : 'https://jsonplaceholder.typicode.com/users';

    fetch(url, {
      method: method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user)
    })
    .then(response => response.json())
    .then(data => {
      if (!id) {
        addUser(data); // Call addUser to update the list in UserList
      }
      navigate('/');  // Navigate back to the user list
    })
    .catch(error => console.error('Error:', error));
  };

  return (
    <div>
      <h1>{id ? 'Edit User' : 'Add User'}</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name</label>
          <input
            type="text"
            value={user.name}
            onChange={(e) => setUser({ ...user, name: e.target.value })}
            required
          />
        </div>
        <div>
          <label>Email</label>
          <input
            type="email"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            required
          />
        </div>
        <div>
          <label>Phone</label>
          <input
            type="text"
            value={user.phone}
            onChange={(e) => setUser({ ...user, phone: e.target.value })}
            required
          />
        </div>
        <button type="submit">Save</button>
      </form>
    </div>
  );
}

export default UserForm;
