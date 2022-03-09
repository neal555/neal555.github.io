import "./App.css";
import {
  CardInfo,
  Error,
  HistoryItem,
  Item,
  Loading,
  Pane,
  TopBar,
} from "./components";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [countries, setCountries] = useState([]);
  const [currentSelected, setCurrentSelected] = useState(null);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    getCountries();
  }, []);

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
      setHistory(newHistory);
    }
  };

  return (
    <div className="App">
      <TopBar />
      {loading ? (
        <Loading />
      ) : error ? (
        <Error
          onRetry={() => {
            setLoading(true);
            setError(false);
            getCountries();
          }}
        />
      ) : (
        <div className="app-content">
          <Pane>
            {countries.map((item) => (
              <Item
                key={item.code}
                flag={item?.flag ?? null}
                name={item?.name ?? null}
                onClick={() => {
                  setCurrentSelected(item);
                  addToHistory(item);
                }}
              />
            ))}
          </Pane>

          <Pane>{currentSelected && <CardInfo item={currentSelected} />}</Pane>
          <Pane>
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
