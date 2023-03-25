import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { userActions,cardActions } from '_store';

export { Home };

function Home() {
    const dispatch = useDispatch();
    const { user: authUser } = useSelector(x => x.auth);
    const { users } = useSelector(x => x.users);
    // const data = useSelector(x=>x.card)
    const navi =useNavigate()
    useEffect(() => {
        dispatch(userActions.getAll());
        // eslint-disable-next-line react-hooks/exhaustive-deps
        dispatch(cardActions.cards())
        // console.log(data)
        // dispatch(cardActions.cards())
    }, []);
    const handlerChange=()=>{
        navi('/cards')
    }
    return (
        <div>
            <h1>Hi {authUser?.user.name}!</h1>
            <p>You're logged in with React 18 + Redux & JWT!!</p>
            <h3>Users from secure api end point:</h3>
            {users.length &&
                <ul>
                    {users.map(user =>
                        <li key={user.id}>{user.firstName} {user.lastName}</li>
                    )}
                </ul>
            }
            <button onClick={handlerChange} className="btn btn-primary float-right">Go To Card</button>
            {users.loading && <div className="spinner-border spinner-border-sm"></div>}
            {users.error && <div className="text-danger">Error loading users: {users.error.message}</div>}
        </div>
    );
}
