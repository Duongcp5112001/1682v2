import React from 'react';
import Wrapper from "./wrapper";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();


function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Wrapper/>
    </QueryClientProvider>
  );
}

export default App;
