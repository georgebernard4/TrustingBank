import { useLocation } from 'react-router-dom';

function LoginPage() {
  const location = useLocation();
  
  // Access location state
  const navLoggedOut = location.state ? location.state.navLoggedOut : null;

  // ... rest of the code
}

navigate({
  pathname:"/login/", 
  state: { navLoggedOut: newNavLoggedOut }
})