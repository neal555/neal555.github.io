/* eslint-disable react-hooks/exhaustive-deps */
import "./App.css";
import React, { useEffect, useState } from "react";
import {
  CardInfo,
  Error,
  HistoryItem,
  Item,
  Loading,
  Pane,
  TopBar,
} from "./components";
import axios from "axios";
import BinIcon from "./assets/binIcon.svg";

function App() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [countries, setCountries] = useState([]);
  const [currentSelected, setCurrentSelected] = useState(null);
  const [history, setHistory] = useState([]);
  const [searchField, setSearchField] = useState("");
  const [list, setList] = useState([]);

  useEffect(() => {
    getCountries();
  }, []);

  useEffect(() => {
    setList(countries);
  }, [countries]);

  useEffect(() => {
    if (searchField.length > 0) {
      const filteredCountries = countries.filter((country) => {
        return country.name
          .toLowerCase()
          .startsWith(searchField.trim().toLowerCase());
      });
      setList(filteredCountries);
    } else {
      setList(countries);
    }
  }, [searchField]);

  const getCountries = async () => {
    try {
      setLoading(true);
      const options = {
        headers: {
          "x-rapidapi-host": "country-info.p.rapidapi.com",
          "x-rapidapi-key":
            "7d6e399c96msh60a8ed4c7c3018cp12d6d2jsn76fc16ed24e3",
        },
      };
      const resp = await axios.get(
        "https://country-info.p.rapidapi.com/",
        options
      );
      setCountries(resp.data);
      setLoading(false);
    } catch (e) {
      setLoading(false);
      setError(true);
    }
  };

  const addToHistory = (item) => {
    const element = {
      ...item,
      clicks: 1,
    };
    let newHistory = history;
    const existInHistory = history.find((i) => i.code === element.code);
    if (existInHistory) {
      newHistory = history.map((i) => {
        if (i.code === item.code) {
          i.clicks += 1;
        }
        return i;
      });
      setHistory(newHistory);
    } else {
      newHistory.push(element);
      newHistory.sort((a, b) => {
        if (a.name > b.name) {
          return 1;
        }
        if (a.name < b.name) {
          return -1;
        }
        return 0;
      });
      setHistory(newHistory);
    }
  };
  const handleChange = (e) => {
    setSearchField(e.target.value);
  };

  return (
    <div className="App">
      <TopBar />
      {loading ? (
        <Loading />
      ) : error ? (
        <Error
          role="alert"
          onRetry={() => {
            setLoading(true);
            setError(false);
            getCountries();
          }}
        />
      ) : (
        <div className="app-content" data-testid={"data"}>
          <Pane
            title={
              <div className="countries-header">
                <h1>Countries</h1>
                <input
                  className="search-input"
                  type="search"
                  placeholder="Search countries"
                  onChange={handleChange}
                />
              </div>
            }
          >
            {list.length > 0 ? (
              list.map((item) => (
                <Item
                  key={item.code}
                  flag={item?.flag ?? null}
                  name={item?.name ?? null}
                  onClick={() => {
                    setCurrentSelected(item);
                    addToHistory(item);
                  }}
                />
              ))
            ) : (
              <p className="no-data">There are no countries</p>
            )}
          </Pane>

          <Pane>{currentSelected && <CardInfo item={currentSelected} />}</Pane>
          <Pane
            title={
              <div className="history-header">
                <h1>History</h1>
                {history.length > 0 && (
                  <img
                    className="bin-icon"
                    onClick={() => setHistory([])}
                    src={BinIcon}
                    alt="binIcon"
                  />
                )}
              </div>
            }
          >
            {history.map((item) => (
              <HistoryItem
                key={item.code}
                flag={item.flag}
                name={item.name}
                count={item.clicks}
                onClick={() => {
                  setCurrentSelected(item);
                  addToHistory(item);
                }}
              />
            ))}
          </Pane>
        </div>
      )}
    </div>
  );
}

export default App;
