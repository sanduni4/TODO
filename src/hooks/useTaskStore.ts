import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type Task = {
  id: string;
  title: string;
  description: string;
  isCompleted: boolean;
};

type TaskStore = {
  tasks: Task[];
  addTask: (title: string, description: string) => void;
  deleteTask: (id: string) => void;
  editTask: (id: string, title: string, description: string) => void;
  markComplete: (id: string) => void;
  getAllTasks: () => Task[];
  loadTasksFromStorage: () => Promise<void>;
};

export const useTaskStore = create<TaskStore>((set, get) => ({
  tasks: [],

  addTask: async (title, description) => {
    const newTask: Task = {
      id: Math.random().toString(36).substring(2, 10),
      title,
      description,
      isCompleted: false,
    };
    const updatedTasks = [...get().tasks, newTask];
    set({ tasks: updatedTasks });
    await AsyncStorage.setItem('task-storage', JSON.stringify(updatedTasks));
  },

  deleteTask: async (id) => {
    const updatedTasks = get().tasks.filter(task => task.id !== id);
    set({ tasks: updatedTasks });
    await AsyncStorage.setItem('task-storage', JSON.stringify(updatedTasks));
  },

  editTask: async (id, title, description) => {
    const updatedTasks = get().tasks.map(task =>
      task.id === id ? { ...task, title, description } : task
    );
    set({ tasks: updatedTasks });
    await AsyncStorage.setItem('task-storage', JSON.stringify(updatedTasks));
  },

  markComplete: async (id) => {
    const updatedTasks = get().tasks.map(task =>
      task.id === id ? { ...task, isCompleted: !task.isCompleted } : task
    );
    set({ tasks: updatedTasks });
    await AsyncStorage.setItem('task-storage', JSON.stringify(updatedTasks));
  },

  getAllTasks: () => get().tasks,

  loadTasksFromStorage: async () => {
    const stored = await AsyncStorage.getItem('task-storage');
    if (stored) {
      const parsed = JSON.parse(stored);
      set({ tasks: parsed });
    }
  },
}));
