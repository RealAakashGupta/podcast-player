import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';
import {PodcastGrid} from './container/PodcastGrid'

function App() {
  const [rssFeed, setRssFeed] = 
                  useState("https://feeds.simplecast.com/tOjNXec5");

  const [quickFilter, setQuickFilter] = useState('');
  const [inputFeedUrl, setInputFeedUrl] = useState('https://feeds.simplecast.com/tOjNXec5');

  const [feedUrls, setFeedUrls] = useState([
    {name: "WebRush", url: 'https://feeds.simplecast.com/tOjNXec5'},
    {name: "The Evil Tester Show", url: 'https://feed.pod.co/the-evil-tester-show'},
    {name: "The Change Log", url: 'https://changelog.com/podcast/feed'},
    {name: "JS Party", url: 'https://changelog.com/jsparty/feed'},
    {name: "Founders Talk", url: 'https://changelog.com/founderstalk/feed'}
  ])

  const handleLoadFeedClick =()=>{
    const inputRssFeed = document.getElementById("rssFeedUrl").value;
    setRssFeed(inputRssFeed);
  }

const handleFilterChange=(event)=>{
  setQuickFilter(event.target.value);
}

  return (
    <div className="App">
      <h1>Podcast Player</h1>

      <div>
        <label htmlFor = "podacasts">Choose a podcast: </label>
        <select name="podcasts" id="podcasts" value={inputFeedUrl}
        onChange={(event)=>setInputFeedUrl(event.target.value)}>
          {feedUrls.map((feed)=>
          <option value={feed.url} key={feed.url}>
            {feed.name}
          </option>)}
        </select>
      </div>
      <div>
        <label htmlFor='rssFeedUrl'>Feed URL:</label>
        <input type = "text" id="rssFeedUrl" name='rssFeedUrl'
        style={{width:"80%"}} value={inputFeedUrl}
        onChange={(event)=>setInputFeedUrl(event.target.value)}
        />
        <button onClick={handleLoadFeedClick}>Load</button>
      </div>

      <div>
        <label htmlFor='quickFilter'>Quick Filter: </label>
        <input type='text' id='quickFilter' name='quickFilter'
          value={quickFilter} onChange={handleFilterChange}/>

      </div>
      <PodcastGrid
      rssfeed= {rssFeed}
      height="500px"
      width="100%"
      quickFilter = {quickFilter}
      ></PodcastGrid>
    </div>
  );
}

export default App;
