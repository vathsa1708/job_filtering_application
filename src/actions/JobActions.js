// src/actions/jobActions.js
export const FETCH_JOBS_REQUEST = 'FETCH_JOBS_REQUEST';
export const FETCH_JOBS_SUCCESS = 'FETCH_JOBS_SUCCESS';
export const FETCH_JOBS_FAILURE = 'FETCH_JOBS_FAILURE';

export const fetchJobs = (limit, offset) => {
  return async (dispatch) => {
    dispatch({ type: FETCH_JOBS_REQUEST });
    try {
      const response = await fetch("https://api.weekday.technology/adhoc/getSampleJdJSON", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ limit, offset })
      });
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      console.log("Data from API:", data); 
      dispatch({ type: FETCH_JOBS_SUCCESS, payload: data });
    } catch (error) {
      console.error("Error fetching data:", error.message);
      dispatch({ type: FETCH_JOBS_FAILURE, payload: error.message });
    }
  };
};
