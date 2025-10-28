import { useState, useEffect, useMemo } from "react";
import { toast } from "react-toastify";
import { useAuth } from "../context/authContext";
import { format } from "date-fns";
import {
  collection,
  addDoc,
  serverTimestamp,
  onSnapshot,
  query,
  where,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../firebase/firebase";

const useTasks = () => {
  const { authUser } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [loadingTasks, setLoadingTasks] = useState(true);

  useEffect(() => {
    const q = query(
      collection(db, "tasks"),
      where("userId", "==", authUser.uid)
    );

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const taskList = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setTasks(taskList);
        setLoadingTasks(false);
      },
      (error) => {
        console.error(error);
        toast.error("Failed to listen for tasks");
      }
    );

    return () => unsubscribe();
  }, [authUser]);

  const addTask = async (task) => {
    if (!task.title) return;

    try {
      await addDoc(collection(db, "tasks"), {
        title: task.title,
        totalPomos: task.totalPomos,
        completedPomos: 0,
        isCompleted: false,
        createdAt: serverTimestamp(),
        userId: authUser.uid,
      });
      toast.success("Task added!");
    } catch (error) {
      toast.error("Failed to add task");
    }
  };

  const updateTask = async (id, changes) => {
    try {
      const taskRef = doc(db, "tasks", id);
      await updateDoc(taskRef, {
        ...changes,
        updatedAt: serverTimestamp(),
      });
      toast.success("Task updated!");
    } catch (error) {
      toast.error("Failed to update task");
    }
  };

  const deleteTask = async (id) => {
    try {
      const taskRef = doc(db, "tasks", id);
      await deleteDoc(taskRef);
      toast.success("Task deleted!");
    } catch (error) {
      toast.error("Failed to delete task");
    }
  };

  const useWeeklyPomodoroData = () => {
    return useMemo(() => {
      const weekData = [
        { name: "Mon", pomodoro: 0 },
        { name: "Tue", pomodoro: 0 },
        { name: "Wed", pomodoro: 0 },
        { name: "Thu", pomodoro: 0 },
        { name: "Fri", pomodoro: 0 },
        { name: "Sat", pomodoro: 0 },
        { name: "Sun", pomodoro: 0 },
      ];

      tasks.forEach((task) => {
        if (!task.completedPomos || !task.updatedAt) return;

        const date = task.updatedAt.toDate
          ? task.updatedAt.toDate()
          : new Date(task.updatedAt);
        const day = format(date, "EEE");
        const dayEntry = weekData.find((d) => d.name === day);
        if (dayEntry) dayEntry.pomodoro += task.completedPomos;
      });

      return weekData;
    }, [tasks]);
  };

  return {
    tasks,
    addTask,
    updateTask,
    deleteTask,
    loadingTasks,
    useWeeklyPomodoroData,
  };
};

export default useTasks;
