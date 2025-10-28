import { calculateSessionDuration } from "../utils/calculateSessionDuration";
import { useState } from "react";
import { useAuth } from "../context/authContext";
import { toast } from "react-toastify";
import {
  addDoc,
  collection,
  getDoc,
  doc,
  updateDoc,
  serverTimestamp,
  writeBatch,
} from "firebase/firestore";
import { db } from "../firebase/firebase";
import { useActiveTask } from "../context/taskContext";

const useSessionLogger = () => {
  const { authUser } = useAuth();
  const { activeTask } = useActiveTask();
  const [activeSessionId, setActiveSessionId] = useState(null);
  const startSession = async (mode) => {
    if (mode !== "work") return;
    try {
      const sessionCollection = collection(db, "sessions");
      const sessionRef = await addDoc(sessionCollection, {
        userId: authUser.uid,
        taskId: activeTask.taskId || null,
        mode,
        startedAt: serverTimestamp(),
        endedAt: null,
        duration: 0,
      });
      setActiveSessionId(sessionRef.id);
    } catch (error) {
      // console.error(error.msg);
    }
  };

  const endSession = async (activeSessionId) => {
    if (!activeSessionId) return;

    try {
      const sessionRef = doc(db, "sessions", activeSessionId);
      const sessionSnap = await getDoc(sessionRef);

      if (!sessionSnap.exists()) {
        console.error("Session not found");
        return;
      }

      const sessionData = sessionSnap.data();
      const { taskId } = sessionData;
      console.log({ taskId });

      // calculate duration
      const duration = calculateSessionDuration(sessionData.startedAt);

      const batch = writeBatch(db);

      // 1️⃣ update session document
      batch.update(sessionRef, {
        endedAt: serverTimestamp(),
        duration,
      });
      console.log({ taskId });

      // 2️⃣ update related task
      if (taskId) {
        const taskRef = doc(db, "tasks", taskId);
        const taskSnap = await getDoc(taskRef);

        if (taskSnap.exists()) {
          const task = taskSnap.data();
          const newCompletedPomos = (task.completedPomos || 0) + 1;
          const taskCompleted = newCompletedPomos >= task.totalPomos;
          console.log("Task update payload:", {
            completedPomos: newCompletedPomos,
            isCompleted: taskCompleted,
          });

          batch.update(taskRef, {
            completedPomos: newCompletedPomos,
            isCompleted: taskCompleted,
            updatedAt: serverTimestamp(),
          });
        }
      }

      await batch.commit();
      console.log("✅ Session and task updated successfully!");
    } catch (error) {
      console.error("Error ending session:", error);
    }
  };

  return {
    startSession,
    endSession,
    activeSessionId,
  };
};

export default useSessionLogger;
