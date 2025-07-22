import React, { useState, FormEvent } from "react";
import { motion } from "framer-motion";

type TaskType = "Work" | "Personal" | "Event";

interface Task {
  id: number;
  title: string;
  type: TaskType;
  description: string;
  createdAt: Date;
}

const LOCAL_STORAGE_DAY = "dayTasks";
const LOCAL_STORAGE_MONTH = "monthTasks";

const getSavedTasks = (key: string): Task[] => {
  const saved = localStorage.getItem(key);
  if (!saved) return [];
  try {
    return JSON.parse(saved).map((t: any) => ({
      ...t,
      createdAt: new Date(t.createdAt),
    }));
  } catch {
    localStorage.removeItem(key);
    return [];
  }
};

const List: React.FC = () => {
  const [dayTasks, setDayTasks] = useState<Task[]>(() => getSavedTasks(LOCAL_STORAGE_DAY));
  const [monthTasks, setMonthTasks] = useState<Task[]>(() => getSavedTasks(LOCAL_STORAGE_MONTH));

  const [isAddModalDayOpen, setIsAddModalDayOpen] = useState(false);
  const [isAddModalMonthOpen, setIsAddModalMonthOpen] = useState(false);

  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  const [formTitle, setFormTitle] = useState("");
  const [formType, setFormType] = useState<TaskType>("Work");
  const [formDescription, setFormDescription] = useState("");

  const clearForm = () => {
    setFormTitle("");
    setFormType("Work");
    setFormDescription("");
  };

  const openAddModalDay = () => {
    clearForm();
    setIsAddModalDayOpen(true);
  };
  const closeAddModalDay = () => setIsAddModalDayOpen(false);

  const openAddModalMonth = () => {
    clearForm();
    setIsAddModalMonthOpen(true);
  };
  const closeAddModalMonth = () => setIsAddModalMonthOpen(false);

  const openDetailModal = (task: Task) => {
    setSelectedTask(task);
    setIsDetailModalOpen(true);
  };
  const closeDetailModal = () => {
    setSelectedTask(null);
    setIsDetailModalOpen(false);
  };

  const handleAddTaskDay = (e: FormEvent) => {
    e.preventDefault();
    if (!formTitle.trim() || !formType || !formDescription.trim()) return;
    const newTask: Task = {
      id: Date.now(),
      title: formTitle.trim(),
      type: formType,
      description: formDescription.trim(),
      createdAt: new Date(),
    };
    const newTasks = [newTask, ...dayTasks];
    setDayTasks(newTasks);
    localStorage.setItem(LOCAL_STORAGE_DAY, JSON.stringify(newTasks));
    closeAddModalDay();
  };

  const handleAddTaskMonth = (e: FormEvent) => {
    e.preventDefault();
    if (!formTitle.trim() || !formType || !formDescription.trim()) return;
    const newTask: Task = {
      id: Date.now(),
      title: formTitle.trim(),
      type: formType,
      description: formDescription.trim(),
      createdAt: new Date(),
    };
    const newTasks = [newTask, ...monthTasks];
    setMonthTasks(newTasks);
    localStorage.setItem(LOCAL_STORAGE_MONTH, JSON.stringify(newTasks));
    closeAddModalMonth();
  };

  const handleDeleteTask = (id: number, isDayTask: boolean) => {
    if (isDayTask) {
      const newTasks = dayTasks.filter((t) => t.id !== id);
      setDayTasks(newTasks);
      localStorage.setItem(LOCAL_STORAGE_DAY, JSON.stringify(newTasks));
    } else {
      const newTasks = monthTasks.filter((t) => t.id !== id);
      setMonthTasks(newTasks);
      localStorage.setItem(LOCAL_STORAGE_MONTH, JSON.stringify(newTasks));
    }
    closeDetailModal();
  };

  const renderTaskList = (
    tasks: Task[],
    openAddModal: () => void,
    openDetail: (task: Task) => void
  ) => (
    <div className="flex flex-col h-[58vh] border border-gray-300 rounded-lg p-2 overflow-y-auto">
      {tasks.length === 0 ? (
        <div
          onClick={openAddModal}
          className="flex items-center justify-center cursor-pointer h-full select-none text-4xl font-bold text-gray-400 hover:text-gray-600 transition"
          title="Add task"
        >
          +
        </div>
      ) : (
        <>
          <div className="flex flex-col gap-4">
            {tasks.map((task) => (
              <div
                key={task.id}
                onClick={() => openDetail(task)}
                className="cursor-pointer flex justify-between items-center border border-gray-300 rounded p-2 hover:bg-[#928DAB]/20 transition"
              >
                <div className="flex flex-col">
                  <span className="font-semibold text-[#1F1C2C]">{task.title}</span>
                  <span className="text-sm text-gray-600">{task.type}</span>
                </div>
                <div className="text-xs text-gray-500 select-none">
                  {task.createdAt.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>
              </div>
            ))}
          </div>

          <div
            onClick={openAddModal}
            className="flex justify-center items-center cursor-pointer mt-4 mb-2 select-none rounded border border-gray-400 py-2 text-4xl font-bold text-gray-400 hover:text-gray-600 transition"
            title="Add task"
          >
            +
          </div>
        </>
      )}
    </div>
  );

  return (
    <>
      <main
        className="h-screen w-screen"
        style={{ background: "linear-gradient(180deg, #928DAB 6%, #1F1C2C 100%)" }}
      >
        <h1 className="text-3xl text-white font-black font-serif flex justify-center pt-5 mb-5">
          Your To-Do-List
        </h1>

        <div
          className="grid grid-cols-1 grid-rows-2 gap-5 min-h-screen pt-2 pb-[15dvh] w-[60dvw] mx-auto
          sm:grid-cols-1 sm:grid-rows-2 sm:mt-[5dvh]
          md:grid-cols-2 md:h-[150dvh] md:w-full md:pr-[15dvw] md:pl-[5dvw]
          lg:grid-cols-2 lg:h-[170dvh] lg:w-full lg:pr-[10dvw] lg:pl-[5dvw]
          xl:grid-cols-2 xl:h-[170dvh] xl:w-full xl:pr-[10dvw] xl:pl-[5dvw]"
        >
          <div className="bg-white border-3 border-dashed rounded-lg p-5 flex flex-col">
            <h2 className="font-black text-center text-3xl mb-2">Day</h2>
            {renderTaskList(dayTasks, openAddModalDay, openDetailModal)}
          </div>

          <div className="bg-white border-3 border-dashed rounded-lg p-5 flex flex-col">
            <h2 className="font-black text-center text-3xl mb-2">Month</h2>
            {renderTaskList(monthTasks, openAddModalMonth, openDetailModal)}
          </div>
        </div>

        {isAddModalDayOpen && (
          <motion.form
            onSubmit={handleAddTaskDay}
            drag
            dragConstraints={{ left: -100, right: 100, top: -100, bottom: 100 }}
            className="p-6 w-96 bg-white rounded-lg shadow-lg flex flex-col items-start justify-center cursor-grab fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50"
            whileTap={{ cursor: "grabbing" }}
          >
            <h1 className="text-center font-black text-2xl w-full mb-4">Add New Day Task</h1>

            <div className="relative w-full mb-4">
              <input
                id="title-day"
                value={formTitle}
                onChange={(e) => setFormTitle(e.target.value)}
                className="peer w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-[#928DAB] transition"
                required
              />
              <label
                htmlFor="title-day"
                className="absolute left-3 top-2 text-gray-500 text-sm pointer-events-none peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 transition-all"
              >
                Task Title
              </label>
            </div>

            <div className="relative w-full mb-4">
              <select
                value={formType}
                onChange={(e) => setFormType(e.target.value as TaskType)}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-[#928DAB] transition"
                required
              >
                <option value="Work">Work</option>
                <option value="Personal">Personal</option>
                <option value="Event">Event</option>
              </select>
              <label className="absolute left-3 -top-4 text-gray-500 text-sm select-none pointer-events-none">
                Task Type
              </label>
            </div>

            <div className="relative w-full mb-4">
              <textarea
                value={formDescription}
                onChange={(e) => setFormDescription(e.target.value)}
                rows={5}
                className="peer w-full border border-gray-300 rounded px-3 py-2 resize-y focus:outline-none focus:border-[#928DAB] transition"
                required
              />
              <label
                htmlFor="description-day"
                className="absolute left-3 top-2 text-gray-500 text-sm pointer-events-none peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 transition-all"
              >
                Description
              </label>
            </div>

            <nav className="flex gap-3 w-full justify-end">
              <button
                type="submit"
                className="bg-[#928DAB] text-white px-4 py-2 rounded-lg hover:bg-[#6D6484] transition duration-300"
              >
                Save
              </button>
              <button
                type="button"
                onClick={closeAddModalDay}
                className="bg-[#C3BDD4] text-[#1F1C2C] px-4 py-2 rounded-lg hover:bg-[#928DAB] transition duration-300"
              >
                Cancel
              </button>
            </nav>
          </motion.form>
        )}

        {isAddModalMonthOpen && (
          <motion.form
            onSubmit={handleAddTaskMonth}
            drag
            dragConstraints={{ left: -100, right: 100, top: -100, bottom: 100 }}
            className="p-6 w-96 bg-white rounded-lg shadow-lg flex flex-col items-start justify-center cursor-grab fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50"
            whileTap={{ cursor: "grabbing" }}
          >
            <h1 className="text-center font-black text-2xl w-full mb-4">Add New Month Task</h1>

            <div className="relative w-full mb-4">
              <input
                id="title-month"
                value={formTitle}
                onChange={(e) => setFormTitle(e.target.value)}
                className="peer w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-[#928DAB] transition"
                required
              />
              <label
                htmlFor="title-month"
                className="absolute left-3 top-2 text-gray-500 text-sm pointer-events-none peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 transition-all"
              >
                Task Title
              </label>
            </div>

            <div className="relative w-full mb-4">
              <select
                value={formType}
                onChange={(e) => setFormType(e.target.value as TaskType)}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-[#928DAB] transition"
                required
              >
                <option value="Work">Work</option>
                <option value="Personal">Personal</option>
                <option value="Event">Event</option>
              </select>
              <label className="absolute left-3 -top-4 text-gray-500 text-sm select-none pointer-events-none">
                Task Type
              </label>
            </div>

            <div className="relative w-full mb-4">
              <textarea
                value={formDescription}
                onChange={(e) => setFormDescription(e.target.value)}
                rows={5}
                placeholder="Write your task description..."
                className="peer w-full border border-gray-300 rounded px-3 py-2 resize-y focus:outline-none focus:border-[#928DAB] transition"
                required
              />
              <label
                htmlFor="description-month"
                className="absolute left-3 top-2 text-gray-500 text-sm pointer-events-none peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 transition-all"
              >
                Description
              </label>
            </div>

            <nav className="flex gap-3 w-full justify-end">
              <button
                type="submit"
                className="bg-[#928DAB] text-white px-4 py-2 rounded-lg hover:bg-[#6D6484] transition duration-300"
              >
                Save
              </button>
              <button
                type="button"
                onClick={closeAddModalMonth}
                className="bg-[#C3BDD4] text-[#1F1C2C] px-4 py-2 rounded-lg hover:bg-[#928DAB] transition duration-300"
              >
                Cancel
              </button>
            </nav>
          </motion.form>
        )}

        {isDetailModalOpen && selectedTask && (
          <div className="w-full h-full fixed top-0 left-0 flex items-center justify-center bg-transparent z-50">
            <motion.div
              drag
              dragConstraints={{ left: -100, right: 100, top: -100, bottom: 100 }}
              className="p-6 w-96 bg-white rounded-lg shadow-lg flex flex-col items-start justify-center cursor-grab relative"
              whileTap={{ cursor: "grabbing" }}
            >
              <h1 className="text-center font-black text-2xl w-full mb-4">Task Details</h1>

              <div className="mb-2">
                <span className="font-semibold">Title: </span>
                <span>{selectedTask.title}</span>
              </div>
              <div className="mb-2">
                <span className="font-semibold">Type: </span>
                <span>{selectedTask.type}</span>
              </div>
              <div className="mb-2">
                <span className="font-semibold">Created at: </span>
                <span>{selectedTask.createdAt.toLocaleString()}</span>
              </div>
              <div className="mb-4 whitespace-pre-wrap border border-gray-300 rounded p-2 w-full max-h-48 overflow-y-auto">
                {selectedTask.description || <i>No description provided</i>}
              </div>

              <nav className="flex gap-3 w-full justify-end">
                <button
                  onClick={() =>
                    handleDeleteTask(
                      selectedTask.id,
                      dayTasks.some((t) => t.id === selectedTask.id)
                    )
                  }
                  className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition duration-300"
                >
                  Delete
                </button>
                <button
                  onClick={closeDetailModal}
                  className="bg-[#C3BDD4] text-[#1F1C2C] px-4 py-2 rounded-lg hover:bg-[#928DAB] transition duration-300"
                >
                  Close
                </button>
              </nav>
            </motion.div>
          </div>
        )}
      </main>
    </>
  );
};

export default List;

