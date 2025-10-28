import { Timestamp } from "firebase/firestore";

export const calculateSessionDuration = (startTime) => {
  const endTime = Timestamp.now();
  const duration = endTime.seconds - startTime.seconds;
  return duration;
};
