import react, { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [keyword, setKeyword] = useState("");
  const [unsplashClientID, setunspalshClientID] = useState(
    "e3NO13lr26z5Ipfp7onlor9nq8o_MLHpBTXj4b7WCZQ"
  );
  const [googleClientID, setgoogleClientID] = useState(
    "AIzaSyC8R000AjFpeZMxrg55VEo_OAB7Y55k3Ao"
  );
  const [googlecx, setgooglecx] = useState("455dc19891fcbe13f");
  const [imageResult, setImageResult] = useState([]);
  const [textResult, setTextResult] = useState([]);
  const [showImage, setshowImage] = useState(true);

  const searchHandler = async (event) => {
    await setKeyword(event.target.value);
  };
  const submitHandler = (event) => {
    event.preventDefault();
    const imageurl = `https://api.unsplash.com//search/photos?page=1&per_page=50&query=${keyword}&client_id=${unsplashClientID}`;
    const texturl = `https://www.googleapis.com/customsearch/v1?key=${googleClientID}&cx=${googlecx}&q=${keyword}`;

    axios.get(imageurl).then((response) => {
      console.log(response);
      setImageResult(response.data.results);
    }).catch(errorHandler);
    axios.get(texturl).then((response) => {
      console.log(response);
      setTextResult(response.data.items);
    }).catch(errorHandler);
  };
  const errorHandler = (err) => {
    document.querySelector(".container").innerHTML="<h1>No results found</h1>"
  }
  const typeHandler = (event) => {
    if (event.target.id === "image") {
      setshowImage(true);
      document.querySelector(".imageBtn").classList.add("activeBtn");
      document.querySelector(".textBtn").classList.remove("activeBtn");
    } else {
      setshowImage(false);
      document.querySelector(".imageBtn").classList.remove("activeBtn");
      document.querySelector(".textBtn").classList.add("activeBtn");
    }
  };

  var stringToHTML = (str) => {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  };

  return (
    <div className="App">
      <div className="header">
        <div className="searchArea">
          <input
            type="text"
            onChange={searchHandler}
            placeholder="Search here..."
            value={keyword}
            name="keyword"
            size="20"
            className="searchBar"
          />
          <button type="submit" onClick={submitHandler} className="submit">
            Search
          </button>
          <div className="buttons">
          <button
            onClick={typeHandler}
            id="image"
            className="imageBtn activeBtn"
          >
            Images
          </button>
          <button onClick={typeHandler} id="text" className="textBtn">
            Text
          </button>
        </div>
        </div>
        
      </div>
      <div className="contentBody">

        <div className="filters">

        </div>
        
        <div className="container">
          {showImage ? (
            <div className="imageContainer">
              {imageResult.map((photo) => (
                <img src={photo.urls.small} alt="" />
              ))}
            </div>
          ) : (
            <div className="textContainer">
              {textResult.map((text) => (
                <div>
                  <a href={text.link}>
                    <h2>{text.title}</h2>
                  </a>
                  {text.htmlSnippet}<br/><br/>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;

// AIzaSyC8R000AjFpeZMxrg55VEo_OAB7Y55k3Ao
// <script async src="https://cse.google.com/cse.js?cx=455dc19891fcbe13f"></script>
{
  /* <div class="gcse-search"></div> */
}
