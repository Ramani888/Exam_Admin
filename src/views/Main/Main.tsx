import React, { Suspense, useEffect } from 'react'
import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Sidebar from '../../components/Sidebar/Sidebar';
import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom'

import { LogoutContainer, LogoutTitle } from './Main.styled';
import LogoutIcon from '@mui/icons-material/Logout';
import Batch from '../Batch/Batch';
import Dashboard from '../Dashboard/Dashboard';
import Subject from '../Subject/Subject';
import Topic from '../Topic/Topic';
import SubjectiveQuestions from '../SubjectiveQuestions/SubjectiveQuestions';
import AddSubjectiveQuestions from '../SubjectiveQuestions/AddSubjectiveQuestions/AddSubjectiveQuestions';
import AddObjectiveQuestions from '../ObjectiveQuestions/AddObjectiveQuestions/AddObjectiveQuestions';
import ObjectiveQuestions from '../ObjectiveQuestions/ObjectiveQuestions';
import ExamCreation from '../ExamCreation/ExamCreation';
import NewExamCreation from '../ExamCreation/NewExamCreation/NewExamCreation';
import ExamScheduler from '../ExamScheduler/ExamScheduler';
import NewExamScheduler from '../ExamScheduler/NewExamScheduler/NewExamScheduler';
import Candidates from '../Candidates/Candidates';
import NewCandidates from '../Candidates/NewCandidates/NewCandidates';
import LoginView from '../Login/Login';
import AccountMenu from '../../components/AccountMenu/AccountMenu';

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const drawerWidth = 270;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  background: "#0a3157",
  color: "#ffffff",
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  background: "#0a3157",
  overflowX: "hidden",
  color: "#ffffff",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const Main = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

    const handleDrawerClose = () => {
      setOpen(false);
    };

    // useEffect(() => {
    //   document.title = 'Vr Fashion';
    // }, [location]);

    const getRoutes = () => {
      return (
        <Suspense>
          <Routes location={location}>
            <Route
              path="/dashboard"
              element={
                <Suspense>
                  <Dashboard />
                </Suspense>
              }
            />
            <Route
              path="/question-bank/subject"
              element={
                <Suspense>
                  <Subject />
                </Suspense>
              }
            />
            <Route
              path="/question-bank/topic"
              element={
                <Suspense>
                  <Topic />
                </Suspense>
              }
            />
            <Route
              path="/candidates/batch"
              element={
                <Suspense>
                  <Batch />
                </Suspense>
              }
            />
            <Route
              path="/question-bank/subjective-questions"
              element={
                <Suspense>
                  <SubjectiveQuestions />
                </Suspense>
              }
            />
            <Route
              path="/question-bank/new-subjective-question"
              element={
                <Suspense>
                  <AddSubjectiveQuestions />
                </Suspense>
              }
            />
            <Route
              path="/question-bank/objective-questions"
              element={
                <Suspense>
                  <ObjectiveQuestions />
                </Suspense>
              }
            />
            <Route
              path="/question-bank/new-objective-question"
              element={
                <Suspense>
                  <AddObjectiveQuestions />
                </Suspense>
              }
            />
            <Route
              path="/exam-management/exam-creation"
              element={
                <Suspense>
                  <ExamCreation />
                </Suspense>
              }
            />
            <Route
              path="/exam-management/new-exam-creation"
              element={
                <Suspense>
                  <NewExamCreation />
                </Suspense>
              }
            />
            <Route
              path="/exam-management/exam-scheduler"
              element={
                <Suspense>
                  <ExamScheduler />
                </Suspense>
              }
            />
            <Route
              path="/exam-management/new-exam-scheduler"
              element={
                <Suspense>
                  <NewExamScheduler />
                </Suspense>
              }
            />
            <Route
              path="/candidates/candidate-data"
              element={
                <Suspense>
                  <Candidates />
                </Suspense>
              }
            />
            <Route
              path="/candidates/new-candidate-data"
              element={
                <Suspense>
                  <NewCandidates />
                </Suspense>
              }
            />

            <Route
              path="/Login"
              element={
                <Suspense>
                  <LoginView />
                </Suspense>
              }
            />

            <Route path="*" element={<Navigate to={'/dashboard'} />} />
          </Routes>
        </Suspense>
      )
    }

    const handleLogout = () => {
      localStorage.removeItem('Admin')
      navigate('/Login')
    }

    useEffect(() => {
      if (location.pathname === '/') {
        navigate('/dashboard')
      }
    }, [])

    useEffect(() => {
      const adminDataString = localStorage.getItem('Admin');
      if (adminDataString) {
        if (location.pathname === '/Login') {
          navigate('/')
        }
        try {
          const adminData = JSON.parse(adminDataString);
        } catch (error) {
          console.error("Error parsing admin data:", error);
        }
      } else {
        navigate('/Login')
      }
    }, [location.pathname])

    // useEffect(() => {
    //   const adminDataString = localStorage.getItem('Admin');
    //   if (adminDataString) {
    //     if (location.pathname === '/Login') {
    //       navigate('/')
    //     }
    //     try {
    //       const adminData = JSON.parse(adminDataString);
    //     } catch (error) {
    //       console.error("Error parsing admin data:", error);
    //     }
    //   } else {
    //     navigate('/Login')
    //   }
    // }, [location.pathname])

    return (
      <>
        {location.pathname === '/Login' ? (
          <>
            {getRoutes()}
          </>
        ) : (
          <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar position="fixed" open={open}>
              <Toolbar>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                edge="start"
                sx={{
                marginRight: 5,
                ...(open && { display: 'none' }),
                }}
              >
                <MenuIcon />
              </IconButton>
              {open && (
                <IconButton onClick={handleDrawerClose} sx={{marginRight: '10px'}}>
                  {theme.direction === 'rtl' ? <ChevronRightIcon sx={{color: '#ffffff'}}/> : <ChevronLeftIcon sx={{color: '#ffffff'}}/>}
                </IconButton>
              )}
              <div style={{display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center'}}>
                <Typography variant="h6" noWrap component="div">
                  Project Title
                </Typography>
                <AccountMenu />
              </div>
              </Toolbar>
            </AppBar>
            <Drawer variant="permanent" open={open}>
              <DrawerHeader sx={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
              {/* <IconButton onClick={handleDrawerClose}>
                {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
              </IconButton> */}
              {/* <img src='/VR_Fashion_Logo.jpeg' height={60} width={60}></img> */}
              </DrawerHeader>
              <Divider />
              <Sidebar open={open} handleDrawerOpen={handleDrawerOpen}/>
              {/* <LogoutContainer onClick={() => handleLogout()}>
                <LogoutIcon />
                <LogoutTitle>Logout</LogoutTitle>
              </LogoutContainer> */}
            </Drawer>
            <Box component="main" sx={{ flexGrow: 1, m: 2, height: 'calc(100%)', overflowY: 'hidden' }}>
              <DrawerHeader />
              <Box component="main" sx={{ height: 'calc(100vh - 100px)', overflowX: 'hidden', overflowY: 'auto' }}>
                {getRoutes()}
              </Box>
            </Box>
          </Box>
        )}
      </>
    );
}

export default Main;
