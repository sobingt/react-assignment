import { Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';

import { history } from '_helpers';
import { Nav, PrivateRoute } from '_components';
import { Home } from 'home';
import { Login } from 'login';
 import UserCard from 'card/card';

import NewCard from 'NewCard/New';
export { App };

function App() {
    // init custom history object to allow navigation from 
    // anywhere in the react app (inside or outside components)
    //aa
    history.navigate = useNavigate();
    history.location = useLocation();

    return (
        <div className="app-container bg-light">
            <Nav />
            <div className="container pt-4 pb-4">
                <Routes>
                <Route
                        path="/"
                        element={<Home />
                           
                        }
                    />
                    <Route path="/login" element={<Login />} />
                    <Route path="/card" element={<UserCard/>} />
                    <Route path="/new/card" element={<NewCard/>}/> 
                     <Route path="*" element={<Navigate to="/" />} />
                </Routes>
            </div>
        </div>
    );
}
