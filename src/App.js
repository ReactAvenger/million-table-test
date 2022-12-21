import React from 'react';
import TableComponent from './components/Table';
import { StyledEngineProvider } from '@mui/material/styles';

function App() {
  return (
    <StyledEngineProvider injectFirst>
      <TableComponent />
    </StyledEngineProvider>
  );
}

export default App;
