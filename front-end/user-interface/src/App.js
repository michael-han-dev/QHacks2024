import React, { useState, useEffect } from 'react';
import './App.css';
import vid from './media/demo1.mp4';
import img from './media/output_plot.png'
import logo from './media/logo.jpeg'



function DateTimeDisplay() {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <span>{currentDateTime.toLocaleTimeString()}</span>
  );
}


function App() {
  const [isBoxExpanded, setIsBoxExpanded] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const items = [
    { id: 1, text: '401 HWY', videoUrl: vid, imageUrl: img, detailText: 'This is some detailed text for Item 1.' },
    { id: 2, text: '401 HWY', videoUrl: vid, imageUrl: img, detailText: 'This is some detailed text for Item 2.' },
    { id: 3, text: '401 HWY', videoUrl: vid, imageUrl: img, detailText: 'This is some detailed text for Item 3.' },
    { id: 4, text: '401 HWY', videoUrl: vid, imageUrl: img, detailText: 'This is some detailed text for Item 4.' },
    { id: 5, text: '401 HWY', videoUrl: vid, imageUrl: img, detailText: 'This is some detailed text for Item 5.' },
    { id: 6, text: '401 HWY', videoUrl: vid, imageUrl: img, detailText: 'This is some detailed text for Item 6.' },

  ];

  // Handles clicking on a grid item
  const handleBoxClick = (item) => {
    setIsBoxExpanded(true);
    setSelectedItem(item);
  };

  // Handles closing the expanded view
  const handleClose = () => {
    setIsBoxExpanded(false);
    setSelectedItem(null);
  };

  // Component for the expanded content view
  const ExpandedContent = ({ item }) => (
    <div className="expanded-container">
      <div className="close-button" onClick={handleClose}>X</div>
      <h1 className=''>{item.text}</h1>
      <div className="content-layout">
        <video className="main-video" autoPlay loop muted>
          <source src={item.videoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="side-content">
          <img className="side-image" src={item.imageUrl} alt=""></img>
          <div className="side-text">{item.detailText}</div>
        </div>
        <div className = "expanded-hud">
          <div className="expanded-hud-text">
            <div>Speed Limit: 100 km/h</div>
            <div>Lanes: 3</div>
            <div>Distance: 300 m</div>
            <div>Time: <DateTimeDisplay /></div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="App">
      <header className="header">
        <div className="App-header">
          <img className="logo" src={logo} alt=""></img>
          DIONYSUS
        </div>
        <div className="subheader">
          Driver Impairment Observation Network Yielding Safety Under Supervision
        </div>
      </header>
      {isBoxExpanded && selectedItem ? (
        <ExpandedContent item={selectedItem} />
      ) : (
        <div className="grid-container">
          {items.map(item => (
            <div key={item.id} className="grid-item" onClick={() => handleBoxClick(item)}>
              <video className="image-placeholder" autoPlay loop muted>
                <source src={item.videoUrl} type="video/mp4"/>
              </video>
              <div className="text-placeholder">{item.text}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;