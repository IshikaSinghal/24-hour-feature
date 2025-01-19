import React, { createContext, useState,useContext } from 'react';

const ViewStoryContext = createContext(undefined);
export function ViewStoryContextProvider({ children }) {
    const [viewImage, setViewImage] = useState(false);
      const [storyIndex, setStoryIndex] = useState(-1);
    
    return (
      <ViewStoryContext.Provider value={{ viewImage, setViewImage ,storyIndex,setStoryIndex}}>
        {children}
      </ViewStoryContext.Provider>
    );
  }


  export const useViewStoryContext = () => {
    const context = useContext(ViewStoryContext);
    if (!context) {
      throw new Error('useViewStoryContext must be used within an ViewStoryContext');
    }
    return context;
  };
  
