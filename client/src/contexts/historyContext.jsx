import { createContext, useReducer } from "react";

export const HistoryContext = createContext();

export const HistoryReducer = (state, action) => {
  switch (action.type) {
    case "SET_DATA":
      return {
        ...state,
        data: action.payload,
        lastFetched: action.lastFetched,
        history: {
          ...state.history,
          [action.lastFetched]: action.payload, // Store the new data in the history field using the requestKey as the identifier
        },
      };

    case "SET_ERROR":
      return { ...state, error: action.payload };

    default:
      return state;
  }
};

export const HistoryProvider = ({ children }) => {
  const [state, dispatch] = useReducer(HistoryReducer, {
    data: {
      events: [],
      births: [],
      deaths: [],
    },
    history: {},
    error: null,
    lastFetched: null,
  });

  const fetchData = async (month, day, signal) => {
    console.log("fetching");
    const requestKey = `${month}_${day}`;
  
    if (state.lastFetched === requestKey) {
      return;
    }
  
    // Try to get data from localStorage first
    const localData = localStorage.getItem(requestKey);
    if (localData) {
      const parsedData = JSON.parse(localData);
      dispatch({ type: "SET_DATA", payload: parsedData, lastFetched: requestKey });
      return;
    }
  
    try {
      const response = await fetch(
        `https://otdih-api.onrender.com/data/${month}/${day}`,
        { signal }
      );
      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
      }
      const data = await response.json();
      console.log(data);
      dispatch({ type: "SET_DATA", payload: data, lastFetched: requestKey });
  
      // Store data in localStorage
      localStorage.setItem(requestKey, JSON.stringify(data));
    } catch (error) {
      if (error.name === 'AbortError') {
        console.log('Fetch aborted');
      } else {
        console.error("Error fetching data:", error);
        dispatch({ type: "SET_ERROR", payload: error });
      }
    }
  };

  return (
    <HistoryContext.Provider value={{ ...state, fetchData }}>
      {children}
    </HistoryContext.Provider>
  );
};