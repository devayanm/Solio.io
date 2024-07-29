import React from "react";
import Notice from "./Notice";
import AttendanceReport from "./AttendanceReport";
import TrainingPlacement from "./TrainingPlacement";
import ClassSchedule from "./ClassSchedule";
import OpenCommunity from "./OpenCommunity";

const Academic = () => {
  return (
    <div>
      <Notice />
      <AttendanceReport />
      <TrainingPlacement />
      <ClassSchedule />
      <OpenCommunity />
    </div>
  );
};

export default Academic;
