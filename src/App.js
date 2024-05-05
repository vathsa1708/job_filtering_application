import React from 'react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit'; // Import configureStore from Redux Toolkit

import jobReducer from './reducers/JobReducer'; // Import jobReducer from reducers directory
import SearchJobs from './components/SearchJobs';
// import JobCard from './components/JobCard';

// Create Redux store with middleware
const store = configureStore({
  reducer: {
    job: jobReducer // Assuming "job" is the key under which jobReducer should be stored
  },
});

const App = () => {
  return (
    <Provider store={store}>
      <div className="App">
        {/* <JobCard/> */}
        <SearchJobs />
      </div>
    </Provider>
  );
}

export default App;
