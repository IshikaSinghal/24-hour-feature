import React, { useEffect, useState } from "react";
import '../../src/css/AddStories.css';
import { useViewStoryContext } from "../context/ViewStoryContext";

export default function UploadedStories(props) {
  const { setViewImage, setStoryIndex} = useViewStoryContext();
  const handleTimeStamp = (timeStamp) => {
    const currentDateTimeOffset = Date.now();
    const dateTimeDiff = currentDateTimeOffset - timeStamp;
    const calculatedHours = Math.floor(dateTimeDiff / (1000 * 60 * 60));
    const calculatedMinutes = Math.floor((dateTimeDiff % (1000 * 60 * 60)) / (1000 * 60));
    const calculatedSeconds = Math.floor((dateTimeDiff % (1000 * 60)) / 1000);
    if (calculatedHours > 0) {
      return `${calculatedHours} ${calculatedHours == 1 ? `hour ago ` : `hours ago`}`;
    }
    else if (calculatedMinutes > 0) {
      return `${calculatedMinutes} ${calculatedMinutes == 1 ? `minute ago ` : `minutes ago`}`;
    }
    else if (calculatedSeconds > 0) {
      return `${calculatedSeconds} ${calculatedSeconds == 1 ? `second ago ` : `seconds ago`}`;
    }
    else {
      return "Just now";
    }
  }

  const handleViewImage = (index) => {
    setViewImage(true);
    setStoryIndex(index);
  }

  return (
    <div className="stories-data-container">
      {props.storyData.map((x,index) => (
        <div key={x.Id} className="added-stories-container" onClick={()=>handleViewImage(index)}>
          <div className="added-stories-container-image" style={{ border: `2px solid ${x.IsImageViewed ? 'rgb(156 163 175)' : 'rgb(96 165 250)'}`, }}>
            <img src={x.ImageUrl} alt=""/>
          </div>
          <div className="add-stories-text timestamp">{handleTimeStamp(x.ImageUploadedTime)}</div>
        </div>
      ))}
    </div>
  );
}
