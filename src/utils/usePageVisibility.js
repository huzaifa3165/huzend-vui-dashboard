import { useState, useEffect } from "react";
function usePageVisibility(callback) {
  const [startTime, setStartTime] = useState(Date.now());
  const [endTime, setEndTime] = useState(null);

  useEffect(() => {
    let hidden;
    let visibilityChange;

    if (typeof document.hidden !== "undefined") {
      hidden = "hidden";
      visibilityChange = "visibilitychange";
    } else if (typeof document.msHidden !== "undefined") {
      hidden = "msHidden";
      visibilityChange = "msvisibilitychange";
    } else if (typeof document.webkitHidden !== "undefined") {
      hidden = "webkitHidden";
      visibilityChange = "webkitvisibilitychange";
    }

    function handleVisibilityChange() {
      if (document[hidden]) {
        setEndTime(Date.now());
        callback((endTime - startTime) / 1000);
      } else {
        setStartTime(Date.now());
      }
    }

    document.addEventListener(visibilityChange, handleVisibilityChange);
    window.addEventListener("beforeunload", () => {
      setEndTime(Date.now());
      callback((endTime - startTime) / 1000);
    });

    return () => {
      document.removeEventListener(visibilityChange, handleVisibilityChange);
      window.removeEventListener("beforeunload", () => {
        callback(totalTime);
      });
    };
  }, [endTime]);

  return null;
}

export default usePageVisibility;
