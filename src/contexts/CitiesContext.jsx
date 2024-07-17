import { createContext, useEffect, useContext, useReducer } from "react";

const BASE_URL = "http://localhost:8000/";
const CitiesContext = createContext();

const initialState = {
  cities: [],
  currentCity: {},
  isLoading: false,
  errors: null,
};
function reduce(state, action) {
  switch (action.type) {
    case "loading":
      return {
        ...state,
        isLoading: true,
      };
    case "cities/loaded":
      return {
        ...state,
        isLoading: false,
        cities: action.payload,
      };
    case "city/loaded":
      return {
        ...state,
        isLoading: false,
        currentCity: action.payload,
      };
    case "city/created":
      return {
        ...state,
        isLoading: false,
        cities: [...state.cities, action.payload],
        currentCity: action.payload,
      };
    case "city/deleted":
      return {
        ...state,
        isLoading: false,
        cities: state.cities.filter((city) => city.id !== action.payload),
        currentCity: {},
      };

    case "rejected":
      return {
        ...state,
        errors: action.payload,
        isLoading: false,
      };

    default:
      return state;
  }
}
function CitiesProvider({ children }) {
  const [{ cities, isLoading, currentCity }, dispatch] = useReducer(
    reduce,
    initialState
  );

  useEffect(function () {
    async function fetchCities() {
      dispatch({
        type: "loading",
      });
      try {
        const response = await fetch(`${BASE_URL}cities`);
        const data = await response.json();
        dispatch({
          type: "cities/loaded",
          payload: data,
        });
      } catch (error) {
        dispatch({
          type: "rejected",
          payload: error.message,
        });
      }
    }
    fetchCities();
  }, []);

  async function getCity(id) {
    dispatch({
      type: "loading",
    });

    try {
      const response = await fetch(`${BASE_URL}cities/${id}`);
      const data = await response.json();
      dispatch({
        type: "city/loaded",
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: "rejected",
        payload: error.message,
      });
    }
  }

  async function createCity(newCity) {
    dispatch({
      type: "loading",
    });
    try {
      const response = await fetch(`${BASE_URL}cities`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newCity),
      });
      const data = await response.json();
      dispatch({
        type: "city/created",
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: "rejected",
        payload: error.message,
      });
    }
  }

  async function deleteCity(id) {
    dispatch({
      type: "loading",
    });
    try {
      await fetch(`${BASE_URL}cities/${id}`, {
        method: "DELETE",
      });
      dispatch({
        type: "city/deleted",
        payload: id,
      });
    } catch (error) {
      dispatch({
        type: "rejected",
        payload: error.message,
      });
    }
  }

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        getCity,
        createCity,
        deleteCity,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

function useCities() {
  const context = useContext(CitiesContext);
  if (!context)
    throw new Error("useCities must be used within a CitiesProvider");
  return context;
}

export { CitiesProvider, useCities };
