// import { useState } from 'react';
// import { AppBar, Toolbar, Button, Grid, Drawer, List, ListItem, ListItemText } from '@mui/material';
// import { Link, useNavigate } from 'react-router-dom';
// import { useSelector, useDispatch } from 'react-redux';
// import { logoutUser } from '../redux/actions';
// import { useTheme } from '@mui/material/styles';
// import useMediaQuery from '@mui/material/useMediaQuery';

// const Navbar = () => {
//   const [drawerOpen, setDrawerOpen] = useState(false);
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const { user } = useSelector((state) => state.auth);

//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
//   const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));

//   const handleLogout = () => {
//     dispatch(logoutUser());
//     navigate('/login');
//   };

//   const toggleDrawer = (open) => () => {
//     setDrawerOpen(open);
//   };

//   const menuItems = (
//     <>
//       {user && user.role === 'admin' && (
//         <>
//           <ListItem button component={Link} to="/create-category">
//             <ListItemText primary="Category" />
//           </ListItem>
//           <ListItem button component={Link} to="/create-service">
//             <ListItemText primary="Service" />
//           </ListItem>
//           <ListItem button component={Link} to="/view-users">
//             <ListItemText primary="Manage " />
//           </ListItem>
//         </>
//       )}

//       {user && user.role === 'worker' && (
//         <>
//           <ListItem button component={Link} to="/add-service">
//             <ListItemText primary="Add Service" />
//           </ListItem>
//           <ListItem>
//             <input
//               type="text"
//               placeholder="Search categories"
//               style={{ color: 'inherit', borderBottom: '1px solid white' }}
//             />
//           </ListItem>
//           <ListItem button component={Link} to="/works">
//             <ListItemText primary="Your Works" />
//           </ListItem>
//         </>
//       )}

//       {user && user.role === 'user' && (
//         <>
//           <ListItem>
//             <input
//               type="text"
//               placeholder="Search services"
//               style={{ color: 'inherit', borderBottom: '1px solid white' }}
//             />
//           </ListItem>
//         </>
//       )}

//       <ListItem button onClick={handleLogout}>
//         <ListItemText primary="Logout" />
//       </ListItem>
//     </>
//   );

//   return (
//     <AppBar position="static" color="primary" sx={{ width: '100%', paddingX: { xs: 2, sm: 4 }, paddingY: 1 }}>
//       <Toolbar sx={{ width: '100%', maxWidth: '1200px', marginX: 'auto', paddingY: { xs: 1, sm: 2 } }}>
//         {isMobile ? (
//           <>
//             <Button
//               onClick={toggleDrawer(true)}
//               sx={{ color: 'inherit', textTransform: 'none' }}
//             >
//               Menu
//             </Button>
//             <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
//               <List>
//                 {menuItems}
//               </List>
//             </Drawer>
//           </>
//         ) : (
//           <Grid container spacing={isTablet ? 1 : 2} justifyContent="flex-end" alignItems="center" sx={{ flexWrap: 'nowrap' }}>
//             {/* Wrap each item inside Grid item to make sure they align horizontally */}
//             {user && user.role === 'admin' && (
//               <>
//                 <Grid item>
//                   <Button color="inherit" component={Link} to="/create-category">
//                     Category
//                   </Button>
//                 </Grid>
//                 <Grid item>
//                   <Button color="inherit" component={Link} to="/create-service">
//                     Service 
//                   </Button>
//                 </Grid>
//                 <Grid item>
//                   <Button color="inherit" component={Link} to="/view-users">
//                     Manage 
//                   </Button>
//                 </Grid>
//               </>
//             )}

//             {user && user.role === 'worker' && (
//               <>
//                 <Grid item>
//                   <Button color="inherit" component={Link} to="/create-service">
//                     Category
//                   </Button>
//                 </Grid>
        
//                 <Grid item>
//                   <Button color="inherit" component={Link} to="/works">
//                     Bookings
//                   </Button>
//                 </Grid>
//               </>
//             )}

//             {user && user.role === 'user' && (
//                <>
//                <Grid item>
//                  <Button color="inherit" component={Link} to="/create-service">
//                    Category
//                  </Button>
//                </Grid>
       
//                <Grid item>
//                <Button color="inherit" component={Link} to={`/mybooking/${user.id}`}>
//                   My-Bookings
//                </Button>

//                 </Grid>

//              </> 
//             )}

//             <Grid item>
//               <Button color="inherit" onClick={handleLogout}>
//                 Logout
//               </Button>
//             </Grid>
//           </Grid>
//         )}
//       </Toolbar>
//     </AppBar>
//   );
// };

// export default Navbar;








import { useState } from 'react';
import { AppBar, Toolbar, Button, Grid, Drawer, List, ListItem, ListItemText, IconButton } from '@mui/material';
import { Menu as MenuIcon, Close as CloseIcon, Category as CategoryIcon, Build as ServiceIcon, People as ManageIcon, Search as SearchIcon, Logout as LogoutIcon } from '@mui/icons-material';
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
            <CategoryIcon sx={{ marginRight: 1 }} />
            <ListItemText primary="Category" />
          </ListItem>
          <ListItem button component={Link} to="/create-service">
            <ServiceIcon sx={{ marginRight: 1 }} />
            <ListItemText primary="Service" />
          </ListItem>
          <ListItem button component={Link} to="/view-users">
            <ManageIcon sx={{ marginRight: 1 }} />
            <ListItemText primary="Manage" />
          </ListItem>
        </>
      )}

      {user && user.role === 'worker' && (
        <>
          <ListItem button component={Link} to="/add-service">
            <ServiceIcon sx={{ marginRight: 1 }} />
            <ListItemText primary="Add Service" />
          </ListItem>
          <ListItem>
            <SearchIcon sx={{ marginRight: 1 }} />
            <input
              type="text"
              placeholder="Search categories"
              style={{ color: 'inherit', borderBottom: '1px solid #d1c4e9', background: 'transparent' }}
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
            <SearchIcon sx={{ marginRight: 1 }} />
            <input
              type="text"
              placeholder="Search services"
              style={{ color: 'inherit', borderBottom: '1px solid #d1c4e9', background: 'transparent' }}
            />
          </ListItem>
        </>
      )}

      <ListItem button onClick={handleLogout}>
        <LogoutIcon sx={{ marginRight: 1 }} />
        <ListItemText primary="Logout" />
      </ListItem>
    </>
  );

  return (
    <AppBar position="static" sx={{ bgcolor: '#6a1b9a', width: '100%', paddingX: { xs: 2, sm: 4 }, paddingY: 1 }}>
      <Toolbar sx={{ width: '100%', maxWidth: '1200px', marginX: 'auto', paddingY: { xs: 1, sm: 2 } }}>
        {isMobile ? (
          <>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={toggleDrawer(true)}
              sx={{ color: '#ffffff' }}
            >
              <MenuIcon />
            </IconButton>
            <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
              <IconButton onClick={toggleDrawer(false)} sx={{ alignSelf: 'flex-end', margin: 1 }}>
                <CloseIcon />
              </IconButton>
              <List sx={{ bgcolor: '#fafafa', color: '#6a1b9a' }}>
                {menuItems}
              </List>
            </Drawer>
          </>
        ) : (
          <Grid container spacing={isTablet ? 1 : 2} justifyContent="flex-end" alignItems="center" sx={{ flexWrap: 'nowrap' }}>
            {user && user.role === 'admin' && (
              <>
                <Grid item>
                  <Button color="inherit" component={Link} to="/create-category">
                    <CategoryIcon sx={{ marginRight: 1 }} /> Category
                  </Button>
                </Grid>
                <Grid item>
                  <Button color="inherit" component={Link} to="/create-service">
                    <ServiceIcon sx={{ marginRight: 1 }} /> Service
                  </Button>
                </Grid>
                <Grid item>
                  <Button color="inherit" component={Link} to="/view-users">
                    <ManageIcon sx={{ marginRight: 1 }} /> Manage
                  </Button>
                </Grid>
              </>
            )}

            {user && user.role === 'worker' && (
              <>
                <Grid item>
                  <Button color="inherit" component={Link} to="/create-service">
                    <ServiceIcon sx={{ marginRight: 1 }} /> Add Service
                  </Button>
                </Grid>
                <Grid item>
                  <Button color="inherit" component={Link} to="/works">
                    Your Works
                  </Button>
                </Grid>
              </>
            )}

            {user && user.role === 'user' && (
              <>
                 <Grid item>
                  <Button color="inherit" component={Link} to="/create-service">
                    <ServiceIcon sx={{ marginRight: 1 }} /> Add Service
                  </Button>
                </Grid>
                <Grid item>
                  <Button color="inherit" component={Link} to={`/mybooking/${user.id}`}>
                    My Bookings
                  </Button>
                </Grid>
              </>
            )}

            <Grid item>
              <Button color="inherit" onClick={handleLogout}>
                <LogoutIcon sx={{ marginRight: 1 }} /> Logout
              </Button>
            </Grid>
          </Grid>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
