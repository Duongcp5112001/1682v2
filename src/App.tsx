import React from 'react';
import Wrapper from "./wrapper";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { message } from 'antd';

const queryClient = new QueryClient();
message.config({
  duration: 2,
  maxCount: 1,
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Wrapper/>
    </QueryClientProvider>
  );
}

export default App;
