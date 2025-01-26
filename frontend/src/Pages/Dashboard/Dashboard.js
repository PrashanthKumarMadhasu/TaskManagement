import React, { useState, useEffect } from "react";
import styled from "styled-components";
import "./Dashboard.css";
import { RiCloseLine } from "react-icons/ri";
import { addTask, getTasks, updateTaskStatus, deleteTask } from "../../api";
import TaskCard from "../../Components/TaskCard";
import { handleToast } from "../../Utils/Toasts";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const Container = styled.div`
  flex: 1;
  height: 100%;
  display: flex;
  justify-content: center;
  padding: 22px 0px;
  overflow-y: scroll;
`;

const Wrapper = styled.div`
  flex: 1;
  max-width: 1400px;
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 22px;
  @media (max-width: 600px) {
    gap: 12px;
  }
`;

const CardWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  @media (max-width: 600px) {
    gap: 12px;
  }
`;

const StatusColumn = styled.div`
  flex: 1;
  min-width: 300px;
  max-width:300px;
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin: 10px;
  display: flex;
  flex-direction: column;
  justify-content:start;
  align-items: center;
`;

const Dashboard = () => {
  const [inputValues, setInputValues] = useState({
    title: "",
    status: "pending",
    description: "",
  });
  const [taskData, setTaskData] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e, name) => {
    setInputValues({ ...inputValues, [name]: e.target.value });
  };

  const addNewTask = async (newTask) => {
    setLoading(true);
    const token = localStorage.getItem("todo-app-token");
    if (!token) {
      handleToast("No authentication token found.", "red");
      return;
    }

    try {
      const res = await addTask(token, newTask);
      console.log("Response from backend:", res); // Log the response
      if (res.data.success) {
        handleToast(`Task Added`, "green");
        getAllTasks(); // Refresh task list
        setInputValues({ title: "", status: "todo", description: "" });
      }
    } catch (err) {
      console.error("Error adding task:", err);
      handleToast(`Failed to Add Task`, "red");
    }
  };

  const changeTaskStatus = async (task_id, taskStatus) => {
    const token = localStorage.getItem("todo-app-token");
    try {
      await updateTaskStatus(token, task_id, taskStatus);
      getAllTasks(); // Fetch updated data
    } catch (error) {
      console.error("Failed to update task status:", error);
      handleToast(`Failed to update task status`, "red");
    }
  };

  const getAllTasks = async () => {
    setLoading(true);
    const token = localStorage.getItem("todo-app-token");
    try {
      const res = await getTasks(token);
      console.log("Tasks fetched:", res.data); // Debug log
      setTaskData(res.data.tasks || []);
    } catch (err) {
      console.error("Failed to fetch tasks:", err.response?.data || err);
    } finally {
      setLoading(false);
    }
  };

  const deleteTaskHandler = async (taskId) => {
    if (!window.confirm("Are you sure you want to delete this task?")) return;
    const token = localStorage.getItem("todo-app-token");
    try {
      const res = await deleteTask(token, taskId);
      if (res.data.success) {
        // Remove task from taskData immediately, reflecting the delete action in the UI
        setTaskData((prevTasks) => prevTasks.filter((task) => task._id !== taskId));
        handleToast(`Task deleted successfully`, "green");
      } else {
        handleToast(`Failed to delete task`, "red");
      }
    } catch (err) {
      console.error("Failed to delete task:", err);
      handleToast(`Failed to delete task`, "red");
    }
  };

  const handleDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    // Ensure the drop is within the same list
    if (!destination) return;

    const taskId = draggableId; // The draggableId should be the task's _id
    const newStatus = destination.droppableId;

    // Call your updateTaskStatus function to change the status of the task
    changeTaskStatus(taskId, newStatus);
  };

  useEffect(() => {
    getAllTasks();
  }, []);

  const handleTask = () => {
    if (!inputValues.title.trim() || !inputValues.description.trim()) {
      handleToast("Title and Description are required", "red");
      return; // Exit the function if validation fails
    }
    const newTask = {
      name: inputValues.title, // Map 'title' from frontend to 'name' for the backend
      description: inputValues.description,
      status: inputValues.status,
    };
    console.log(`added task data ${JSON.stringify(newTask)}`);
    addNewTask(newTask);
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Container>
        <Wrapper>
          <div className="task-container">
            <div className="task-name-field">
              <div
                className="task-input-field"
              >
                <input
                  type="text"
                  placeholder="Enter the task"
                  value={inputValues.title}
                  onChange={(e) => handleInputChange(e, "title")}
                />
                <RiCloseLine
                  className={`clear-icon ${inputValues.title ? "filled" : ""}`}
                  onClick={() => setInputValues({ ...inputValues, title: "" })}
                />
              </div>
              <div>
                <select
                  className="status-dropdown"
                  value={inputValues.status}
                  onChange={(e) => handleInputChange(e, "status")}
                >
                  <option value="pending">pending</option>
                  <option value="completed">completed</option>
                  <option value="done">done</option>
                </select>
              </div>
            </div>

            <div className="task-description-field">
              <div className="description-field">
                <textarea
                  className="description-input-field"
                  value={inputValues.description}
                  onChange={(e) => handleInputChange(e, "description")}
                  rows={5}
                  placeholder="Description"
                />
              </div>
              <button className="add-button" onClick={handleTask}>
                Add Task
              </button>
            </div>
          </div>

          <div className="status-container">
            {loading ? (
              <p>Loading tasks...</p>
            ) : (
              <CardWrapper>
                {/* Pending Column */}
                <StatusColumn style={{ backgroundColor: "rgba(236, 143, 143, 0.92)" }}>
                  <h3 className="column-header">Pending</h3>
                  <Droppable droppableId="pending">
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        style={{
                          ...provided.droppableProps.style,
                          padding: "16px", // Add padding here
                          minHeight: "250px",
                          minWidth:"300px",
                          backgroundColor:"" // Optional: Ensure the droppable area is visible even when empty
                        }}
                      >
                        {taskData
                          .filter((task) => task.status === "pending")
                          .map((task, index) => (
                            <Draggable
                              draggableId={task._id.toString()}
                              index={index}
                              key={task._id}
                            >
                              {(provided) => (
                                <div 
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                  style={{
                                    ...provided.draggableProps.style,
                                  }}
                                >
                                  <TaskCard
                                    taskData={task}
                                    deleteTaskHandler={deleteTaskHandler}
                                  />
                                </div>
                              )}
                            </Draggable>
                          ))}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </StatusColumn>

                {/* Completed Column */}
                <StatusColumn style={{ backgroundColor: "rgba(236, 235, 172, 0.92)" }}>
                  <h3 className="column-header">Completed</h3>
                  <Droppable droppableId="completed">
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        style={{
                          ...provided.droppableProps.style,
                          padding: "16px", // Add padding here
                          minHeight: "250px",
                          minWidth:"300px",
                          backgroundColor:"" // Optional: Ensure the droppable area is visible even when empty
                        }}
                      >
                        {taskData
                          .filter((task) => task.status === "completed")
                          .map((task, index) => (
                            <Draggable
                              draggableId={task._id.toString()}
                              index={index}
                              key={task._id}
                            >
                              {(provided) => (
                                <div
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                  style={{
                                    ...provided.draggableProps.style,
                                  }}
                                >
                                  <TaskCard
                                    taskData={task}
                                    deleteTaskHandler={deleteTaskHandler}
                                  />
                                </div>
                              )}
                            </Draggable>
                          ))}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </StatusColumn>

                {/* Done Column */}
                <StatusColumn style={{ backgroundColor: "rgba(158, 219, 140, 0.92)" }}>
                  <h3 className="column-header">Done</h3>
                  <Droppable droppableId="done">
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        style={{
                          ...provided.droppableProps.style,
                          padding: "16px", // Add padding here
                          minHeight: "250px",
                          minWidth:"300px",
                          backgroundColor:"" // Optional: Ensure the droppable area is visible even when empty
                        }}
                      >
                        {taskData
                          .filter((task) => task.status === "done")
                          .map((task, index) => (
                            <Draggable
                              draggableId={task._id.toString()}
                              index={index}
                              key={task._id}
                            >
                              {(provided) => (
                                <div
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                  style={{
                                    ...provided.draggableProps.style,
                                  }}
                                >
                                  <TaskCard
                                    taskData={task}
                                    deleteTaskHandler={deleteTaskHandler}
                                  />
                                </div>
                              )}
                            </Draggable>
                          ))}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </StatusColumn>
              </CardWrapper>
            )}
          </div>
        </Wrapper>
      </Container>
    </DragDropContext>
  );
};

export default Dashboard;
