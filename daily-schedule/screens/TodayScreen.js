import React, { useState, useEffect } from "react";
import ScheduleDisplay from "../components/schedule";

const TodayScreen = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    // Update the time every minute to check for the current block
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000); // 60 * 1000 ms

    // Cleanup the interval on component unmount
    return () => clearInterval(timer);
  }, []);

  // Determine the correct schedule based on the day of the week
  const getDayKey = () => {
    const dayIndex = currentTime.getDay(); // Sunday = 0, Monday = 1, etc.

    // Tuesday or Thursday
    if (dayIndex === 2 || dayIndex === 4) {
      return "tth";
    }

    // Default to Monday/Wednesday/Friday schedule for MWF and weekends
    return "mwf";
  };

  const dayKey = getDayKey();

  return <ScheduleDisplay day={dayKey} currentTime={currentTime} />;
};

export default TodayScreen;
