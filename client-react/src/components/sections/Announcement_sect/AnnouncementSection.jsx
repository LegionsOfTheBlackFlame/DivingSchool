 import React, { useState, useEffect } from 'react';
 
 export default function AnnouncementSection({ section }) {

    const [visible, setVisible] = useState(false);
  const [render, setRender] = useState(true);

  useEffect(() => {
    // trigger fade-in after mount
    setVisible(true);
  }, []);

  const handleClose = () => {
    // start fade-out
    setVisible(false);

    // remove from DOM after animation
    setTimeout(() => {
      setRender(false);
    }, 300); // match CSS duration
  };

  if (!render) return null;
 
 return (
    <section className={`announcement-section ${visible ? "show" : ""}`}>
      <div className="announcement-content">
        {section.blocks.map(block => {
          if (block.block_type === 'title') {
            return <h2 key={block.id} className="announcement-title">{block.content}</h2>
          }
          if (block.block_type === 'text') {
            return <p key={block.id} className="announcement-text">{block.content}</p>
          }
          if (block.block_type === 'image') {
            return <img key={block.id} src={block.content} alt="" className="announcement-image" />
          }
          return null;
        })}
      </div>
      <p className="close-button" onClick={handleClose}>x</p>
    </section>
  );
}