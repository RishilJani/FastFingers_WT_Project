import React from 'react';
import ReactDOM from 'react-dom/client';
import Layout from './Layout';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './myfiles/Login';
import NormalMode from './myfiles/NormalMode';
import TimeMode from './myfiles/TimeMode';
import ShowAll from './myfiles/ShowAll';

const root = ReactDOM.createRoot(document.getElementById('root'));
// setting title
document.title = 'FastFingers';
root.render(
  <> 
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Login />} /> {/* for login */}
          <Route path='/signup' element={<Login />} /> {/* for sign up */}
          <Route path='/delete' element={<Login/>} /> {/* to delete an account */}
          <Route path='/normalmode' element={<NormalMode />} /> {/* normal mode */}
          <Route path='/timemode' element={<TimeMode />} />{/* time mode */}
          <Route path='/showall' element={<ShowAll />} />{/* to see all speed and accuracy */}
        </Route>
      </Routes>
    </BrowserRouter>
  </>
);


