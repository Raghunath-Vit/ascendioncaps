// import { Link, useNavigate } from 'react-router-dom';
// import { useSelector, useDispatch } from 'react-redux';
// import { logoutUser } from '../redux/actions';

// const Navbar = () => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const { user } = useSelector((state) => state.auth);

//   const handleLogout = () => {
//     dispatch(logoutUser());
//     navigate('/login');
//   };

//   return (
//     <nav>
//       <h1>Welcome {user ? user.name : 'Guest'}</h1>
      
//       {user && (
//         <ul>
//           {/* Links for Admin */}
//           {user.role === 'admin' && (
//             <>
//               <li><Link to="/create-category">Create Category</Link></li>
//               <li><Link to="/create-service">Create Service</Link></li>
//               <li><Link to="/view-users">View All Users</Link></li>
//             </>
//           )}

//           {/* Links for Worker */}
//           {user.role === 'worker' && (
//             <>
//               <li><Link to="/create-service">Create Service</Link></li>
//               <li><input type="text" placeholder="Search categories" /></li>
//               <li><Link to="/works">Works</Link></li>
//             </>
//           )}

//           {/* Links for User */}
//           {user.role === 'user' && (
//             <>
//               <li><input type="text" placeholder="Search categories" /></li>
//               {/* The search will be implemented separately */}
//             </>
//           )}

//            {/* Common Links */}
//            <li>   
//             <button onClick={handleLogout}>Logout</button>
//           </li>
//         </ul>
//       )}
//     </nav>
//   );
// };

// export default Navbar;
import { useState } from 'react';
import { AppBar, Toolbar, Button, Grid, Drawer, List, ListItem, ListItemText } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../redux/actions';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate('/login');
  };

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  const menuItems = (
    <>
      {user && user.role === 'admin' && (
        <>
          <ListItem button component={Link} to="/create-category">
            <ListItemText primary="Category Management" />
          </ListItem>
          <ListItem button component={Link} to="/create-service">
            <ListItemText primary="Service Management" />
          </ListItem>
          <ListItem button component={Link} to="/view-users">
            <ListItemText primary="Manage Users" />
          </ListItem>
        </>
      )}

      {user && user.role === 'worker' && (
        <>
          <ListItem button component={Link} to="/create-service">
            <ListItemText primary="Add Service" />
          </ListItem>
          <ListItem>
            <input
              type="text"
              placeholder="Search categories"
              style={{ color: 'inherit', borderBottom: '1px solid white' }}
            />
          </ListItem>
          <ListItem button component={Link} to="/works">
            <ListItemText primary="Your Works" />
          </ListItem>
        </>
      )}

      {user && user.role === 'user' && (
        <>
          <ListItem>
            <input
              type="text"
              placeholder="Search services"
              style={{ color: 'inherit', borderBottom: '1px solid white' }}
            />
          </ListItem>
        </>
      )}

      <ListItem button onClick={handleLogout}>
        <ListItemText primary="Logout" />
      </ListItem>
    </>
  );

  return (
    <AppBar position="static" color="primary" sx={{ width: '100%', paddingX: { xs: 2, sm: 4 }, paddingY: 1 }}>
      <Toolbar sx={{ width: '100%', maxWidth: '1200px', marginX: 'auto', paddingY: { xs: 1, sm: 2 } }}>
        {isMobile ? (
          <>
            <Button
              onClick={toggleDrawer(true)}
              sx={{ color: 'inherit', textTransform: 'none' }}
            >
              Menu
            </Button>
            <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
              <List>
                {menuItems}
              </List>
            </Drawer>
          </>
        ) : (
          <Grid container spacing={isTablet ? 1 : 2} justifyContent="flex-end" alignItems="center" sx={{ flexWrap: 'nowrap' }}>
            {/* Wrap each item inside Grid item to make sure they align horizontally */}
            {user && user.role === 'admin' && (
              <>
                <Grid item>
                  <Button color="inherit" component={Link} to="/create-category">
                    Category Management
                  </Button>
                </Grid>
                <Grid item>
                  <Button color="inherit" component={Link} to="/create-service">
                    Service Management
                  </Button>
                </Grid>
                <Grid item>
                  <Button color="inherit" component={Link} to="/view-users">
                    Manage Users
                  </Button>
                </Grid>
              </>
            )}

            {user && user.role === 'worker' && (
              <>
                <Grid item>
                  <Button color="inherit" component={Link} to="/create-service">
                    Add Service
                  </Button>
                </Grid>
                <Grid item>
                  <input
                    type="text"
                    placeholder="Search categories"
                    style={{ color: 'inherit', borderBottom: '1px solid white' }}
                  />
                </Grid>
                <Grid item>
                  <Button color="inherit" component={Link} to="/works">
                    Your Works
                  </Button>
                </Grid>
              </>
            )}

            {user && user.role === 'user' && (
              <Grid item>
                <input
                  type="text"
                  placeholder="Search services"
                  style={{ color: 'inherit', borderBottom: '1px solid white' }}
                />
              </Grid>
            )}

            <Grid item>
              <Button color="inherit" onClick={handleLogout}>
                Logout
              </Button>
            </Grid>
          </Grid>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;



