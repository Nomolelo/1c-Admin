// in src/App.js
import React from 'react';
import { Admin, Resource } from 'react-admin';
import jsonServerProvider from 'ra-data-json-server';
//import { PostList, PostEdit, PostCreate } from './posts';
import { PostList } from './posts';

import { UserList } from './users';
import PostIcon from '@material-ui/icons/Book';
import UserIcon from '@material-ui/icons/Group';
import Dashboard from './Dashboards'
import authProvider from './authProvider';
// import dataProvider from './dataProvider';

// in src/App.js
import simpleRestProvider from 'ra-data-simple-rest';


// const App = () => (
//     <Admin dataProvider={simpleRestProvider('http://127.0.0.1:8000/api/')}>
//         <Resource name="posts" list={PostList} />
//     </Admin>
// );

// export default App;


const dataProvider = jsonServerProvider('http://jsonplaceholder.typicode.com');


const App = () => (
  <Admin dashboard={Dashboard} dataProvider={dataProvider} authProvider={authProvider}>
      {/* <Resource name="posts" list={PostList} edit={PostEdit} create={PostCreate} icon={PostIcon}/> */}
      <Resource name="posts" list={PostList} icon={PostIcon}/>

      <Resource name="users" list={UserList} icon={UserIcon}/>
  </Admin>
);

export default App;
