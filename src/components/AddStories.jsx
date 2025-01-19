import React, { useRef, useState, useEffect } from "react";
import '../../src/css/AddStories.css'; // Correctly import your CSS file
import { Story } from "../../src/models/Story";
import UploadedStories from "./UploadedStories";
import { useViewStoryContext } from "../context/ViewStoryContext";  
import StoryViewer from "./StoryViewer";  

export default function AddStories() {
  const refInputElement = useRef(null);
  const [storyData, setStoryData] = useState([]);
  const [isStoryAvailable, setIsStoryAvailable] = useState(true);
  const {viewImage} = useViewStoryContext();

  useEffect(() => {
    const existingStories = JSON.parse(localStorage.getItem("stories")) || [];
    if (existingStories.length != 0) {
      setIsStoryAvailable(false);
      setStoryData(existingStories);
    }
  }, [isStoryAvailable])

  const generateUniqueId = (existingStories) => {
    return existingStories.length + 1;
  };

  const resizeImage = (file, maxWidth = 1000, maxHeight = 1000) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      const reader = new FileReader();

      reader.onload = function (e) {
        img.onload = function () { 
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');

          // Calculate the new dimensions
          const ratio = Math.min(maxWidth / img.width, maxHeight / img.height);
          const width = img.width * ratio;
          const height = img.height * ratio;

          canvas.width = width;
          canvas.height = height;

          // Draw the resized image onto the canvas
          ctx.drawImage(img, 0, 0, width, height);

          // Convert the canvas to a Base64 string
          const resizedBase64 = canvas.toDataURL(file.type);
          resolve(resizedBase64);
        };
        img.src = e.target.result;
      };
      reader.readAsDataURL(file);
    });
  };

  const handleFileSelect = async (event) => {
    const file = event.target.files[0];

    if (!file) return;

    try {
      const base64Output = await resizeImage(file);
      const existingStories = JSON.parse(localStorage.getItem("stories")) || [];

      const uniqueId = generateUniqueId(existingStories);
      const updatedStory = new Story(
        uniqueId,
        base64Output,
        Date.now(),
        false,
        false
      );
      if (updatedStory) {
        setIsStoryAvailable(false);
      }
      existingStories.push(updatedStory);
      setStoryData(existingStories.sort((a,b)=>b.ImageUploadedTime - a.ImageUploadedTime));
      localStorage.setItem("stories", JSON.stringify(existingStories.sort((a,b)=>b.ImageUploadedTime - a.ImageUploadedTime)));
    } catch (error) {
      console.error("Error processing the file:", error);
    }
  };

  const handleAddStories = () => {
    if (refInputElement.current) {
      refInputElement.current.click();
    }
  };

  return (
    <>
    {!viewImage ?
      <div className="story-parent-container">
        <div className="stories-heading">Stories</div>
        <div className="stories-contianer">
          <div className="stories-wrapper">
            <div className="add-stories" onClick={handleAddStories}>+</div>
            <div className="add-stories-text">Add Stories</div>
            <input type="file" accept="image/*" onChange={handleFileSelect} ref={refInputElement} style={{ display: "none" }} />
          </div>
          <div className="uploaded-stories-wrapper">
            {storyData.length != 0 && <UploadedStories storyData={storyData}></UploadedStories>}
          </div>
        </div>
      <div className="no-story-placeholder">
        {isStoryAvailable && "No stories yet. Click the + button to add your first story!"}
      </div>
    </div> 
    :
      <StoryViewer></StoryViewer>
    }
    </>
  );
}
