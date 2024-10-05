import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserList from './component/UserList';
import UserForm from './component/UserForm';
import UserDetail from './component/UserDetail';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<UserList />} />
          <Route path="/user/add" element={<UserForm />} />
          <Route path="/user/edit/:id" element={<UserForm />} />
          <Route path="/user/:id" element={<UserDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
