import { useState } from "react";
import "./App.css";

function App() {
  const [shortenedUrl, setShortenedUrl] = useState<string | null>();
  const [urlToShorten, setUrlToShorten] = useState<string | null>();
  const [slugToGetCounter, setSlugToGetCounter] = useState<string | null>();
  const [counter, setCounter] = useState<number | null>();

  const handleShorten = async () => {
    if (!urlToShorten) {
      alert("invalid url! write a valid one");
      return;
    }

    const response = await fetch("http://localhost:3000/api/url/shorten/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url: urlToShorten }),
    });
    const data: { url: string } = await response.json();

    setShortenedUrl(data.url);
  };

  const handleCounter = async () => {
    if (!slugToGetCounter) {
      alert("invalid url! write a valid one");
      return;
    }

    const response = await fetch(
      `http://localhost:3000/api/url/${slugToGetCounter}`,
    );
    const data = await response.json();

    if (response.status === 404) {
      alert(data.message);
    }

    if (response.status === 200) {
      setCounter(data.count);
    }
  };

  return (
    <div className="wrapper">
      <div className="main-container">
        <h2>Short your url!</h2>
        <h3>Yes you heard right!</h3>
        <h3> Your URL will go from this:</h3>
        <h4>🫸https://your-beautiful-gigantic-smelling-strange-url.com🫷</h4>
        <h3>To this:</h3>
        <h4>🫸https://our-tiny-url.com/J4b0R4🫷</h4>
        <div>
          <input
            type="text"
            onChange={(e) => setUrlToShorten(e.target.value)}
            placeholder="https://google.com.br"
          />
          <button type="button" onClick={handleShorten}>
            Go
          </button>
        </div>
      </div>
      {shortenedUrl && (
        <div className="shortened-url">
          <h4>Look at this beauty!</h4>
          <div>
            <a href={shortenedUrl}>{shortenedUrl.replace("http://", "")} </a>
          </div>
        </div>
      )}
      <div className="click-container">
        <h2>
          Want to know how many clicks your shorten got? Put the code below and
          find it!
        </h2>
        <div>
          <input
            type="text"
            onChange={(e) => setSlugToGetCounter(e.target.value)}
            placeholder="12"
          />
          <button type="button" onClick={handleCounter}>
            Tell me!
          </button>
        </div>
        {counter || (counter === 0 && <h2>Wow! {counter} clicks!</h2>)}
      </div>
    </div>
  );
}

export default App;
