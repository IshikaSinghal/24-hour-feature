import React, { useState, useEffect } from "react";
import '../../src/css/AddStories.css';
import { useViewStoryContext } from "../context/ViewStoryContext";

export default function StoryViewer() {
  const [storiesData, setStoriesData] = useState([]);
  const { viewImage, setViewImage, storyIndex, setStoryIndex } = useViewStoryContext();
  const [imagee, setImagee] = useState(null);
  const [progressBarState, setProgressBarState] = useState([]);


  useEffect(() => {
    const storedStories = JSON.parse(localStorage.getItem("stories")) || [];
    setStoriesData(storedStories);

    if (viewImage && storedStories[storyIndex]) {
      setImagee(storedStories[storyIndex]);
      setProgressBarState(
        storedStories.map((_, index) => {
          if (index === storyIndex) return "filling";
          if (index < storyIndex) return "filled";
          return "pending";
        })
      );
      setImageViewed(storedStories);
    }
  }, [viewImage, storyIndex]);


  useEffect(() => {
    if (viewImage && storiesData.length > 0 && imagee) {
      const timer = setTimeout(() => {
        if (storyIndex + 1 < storiesData.length) {
          setStoryIndex(storyIndex + 1);
        } else {
          setViewImage(false);
        }
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [imagee, storiesData, storyIndex, viewImage]);

  const setImageViewed = (stories) => {
    if (stories) {
      const updatedStories = stories.map((story, index) => {
        if (index === storyIndex) {
          return { ...story, IsImageViewed: true };
        }
        return story;
      });

      localStorage.setItem("stories", JSON.stringify(updatedStories));
    }
  };

  const handleCloseImageView = () => {
    setViewImage(false);

  }
  const itemWidth = `${100 / storiesData.length}%`;

  return (
    <div style={{ background: "black", display: "flex", flexDirection: "column", height: "100vh", width: "100%" }}>
      <div style={{ display: "flex", flexDirection: "row", marginBottom: "10px" }}>
        {storiesData.map((x, index) => (
          <div
            key={index}
            className="progressBar"
            style={{
              width: itemWidth,
            }}
          >
            <div
              className="progressBarDiv"
              style={{
                animation: progressBarState[index] === "filling" ? "fillBar 3s forwards" : "none",
                backgroundColor: progressBarState[index] === "filled" ? "rgb(199, 174, 174)" : "none",
                width: progressBarState[index] === "filled" ? "100%" : "none",
              }}
            ></div>
          </div>
        ))}
      </div>
      <div
        onClick={handleCloseImageView} className="crossButton"> x </div>
      <div style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center", overflow: "auto", marginBottom: "10px" }}>
        <img
          style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }}
          src={imagee?.ImageUrl}
          alt="Story Image"
        />
      </div>
    </div>
  );
}
