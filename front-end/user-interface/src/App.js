import React, { useState } from 'react';
import './App.css'; // Assuming you have a CSS file for styles

function App() {
  const [isBoxExpanded, setIsBoxExpanded] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  // Your items array would be populated with actual data, possibly including images and additional text
  const items = [
    { id: 1, text: 'Item 1', title: "Text", imageUrl: '/path/to/image', detailText: 'This is some detailed text for Item 1.' },
    { id: 2, text: 'Item 2', title: "Text", imageUrl: '/path/to/image', detailText: 'This is some detailed text for Item 1.' },
    { id: 3, text: 'Item 3', title: "Text", imageUrl: '/path/to/image', detailText: 'This is some detailed text for Item 1.' },
    { id: 4, text: 'Item 4', title: "Text", imageUrl: '/path/to/image', detailText: 'This is some detailed text for Item 1.' },
    { id: 5, text: 'Item 5', title: "Text", imageUrl: '/path/to/image', detailText: 'This is some detailed text for Item 1.' },
    { id: 6, text: 'Item 6', title: "Text", imageUrl: '/path/to/image', detailText: 'This is some detailed text for Item 1.' },

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
      <h1>{item.title}</h1>
      <div className="content-layout">
        <div className="main-image" style={{ backgroundImage: `url(${item.imageUrl})` }}>This is an image</div>
        <div className="side-content">
          <div className="side-image">This is an image</div>
          <div className="side-text">{item.detailText}</div>
        </div>
      </div>
    </div>
  );

  // The main render method checks whether to display the grid or the expanded content
  return (
    <div className="App">
      <header className="App-header">
        God's Eye
      </header>
      {isBoxExpanded && selectedItem ? (
        <ExpandedContent item={selectedItem} />
      ) : (
        <div className="grid-container">
          {items.map(item => (
            <div key={item.id} className="grid-item" onClick={() => handleBoxClick(item)}>
              <div className="image-placeholder">This is an image</div>
              <div className="text-placeholder">{item.text}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
