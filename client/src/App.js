
import './App.css';
import Sidebar from './components/Sidebar';
import AllRoutes from './Routes/AllRoutes';
import { Box } from '@chakra-ui/react';

function App() {
  return (
    <div className="App">
      <Box display="flex" gap="2%">
        <Box width="18%">
          <Sidebar />
        </Box>
        <Box width="80%">
          <AllRoutes />
        </Box>

      </Box>
    </div>
  );
}

export default App;
