import { createContext, useEffect, useReducer, useCallback } from "react";
import PropTypes from "prop-types";

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

  const getCity = useCallback(
    async function getCity(id) {
      if (Number(id) === currentCity.id) return;
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
    },
    [currentCity.id]
  );

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

export { CitiesProvider, CitiesContext };

CitiesProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
