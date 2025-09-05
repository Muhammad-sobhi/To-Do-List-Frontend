import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  IconButton,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
} from "@mui/material";
import { Edit, Delete, Add } from "@mui/icons-material";

// Initial mock data
const initialTasks = {
  backlog: [
    { id: "1", title: "Set up project", description: "Initialize repo and config" },
    { id: "2", title: "Install dependencies", description: "React, MUI, DnD" },
  ],
  inProgress: [
    { id: "3", title: "Build Login UI", description: "Basic login form" },
  ],
  review: [],
  done: [
    { id: "4", title: "Create wireframes", description: "Sketch Kanban layout" },
  ],
};

const columns = {
  backlog: "Backlog",
  inProgress: "In Progress",
  review: "Review",
  done: "Done",
};

export default function Dashboard() {
  const [tasks, setTasks] = useState(initialTasks);
  const [openDialog, setOpenDialog] = useState(false);
  const [currentCol, setCurrentCol] = useState(null);
  const [editingTask, setEditingTask] = useState(null);
  const [form, setForm] = useState({ title: "", description: "" });

  const onDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination) return;

    if (source.droppableId === destination.droppableId) {
      const items = Array.from(tasks[source.droppableId]);
      const [moved] = items.splice(source.index, 1);
      items.splice(destination.index, 0, moved);

      setTasks((prev) => ({
        ...prev,
        [source.droppableId]: items,
      }));
    } else {
      const sourceItems = Array.from(tasks[source.droppableId]);
      const destItems = Array.from(tasks[destination.droppableId]);

      const [moved] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, moved);

      setTasks((prev) => ({
        ...prev,
        [source.droppableId]: sourceItems,
        [destination.droppableId]: destItems,
      }));
    }
  };

  // 🔹 Open Add Task Dialog
  const handleAddTask = (col) => {
    setCurrentCol(col);
    setEditingTask(null);
    setForm({ title: "", description: "" });
    setOpenDialog(true);
  };

  // 🔹 Open Edit Task Dialog
  const handleEditTask = (col, task) => {
    setCurrentCol(col);
    setEditingTask(task);
    setForm({ title: task.title, description: task.description });
    setOpenDialog(true);
  };

  // 🔹 Delete Task
  const handleDeleteTask = (col, id) => {
    setTasks((prev) => ({
      ...prev,
      [col]: prev[col].filter((t) => t.id !== id),
    }));
  };

  // 🔹 Save Task (add or update)
  const handleSaveTask = () => {
    if (!form.title.trim()) return;

    if (editingTask) {
      // Update
      setTasks((prev) => ({
        ...prev,
        [currentCol]: prev[currentCol].map((t) =>
          t.id === editingTask.id ? { ...t, ...form } : t
        ),
      }));
    } else {
      // Add
      const newTask = {
        id: Date.now().toString(),
        title: form.title,
        description: form.description,
      };
      setTasks((prev) => ({
        ...prev,
        [currentCol]: [...prev[currentCol], newTask],
      }));
    }
    setOpenDialog(false);
  };

  return (
    <Box p={3}>
      <Typography variant="h4" mb={3}>
        📝 ToDo Kanban Board
      </Typography>

      <DragDropContext onDragEnd={onDragEnd}>
        <Grid container spacing={2}>
          {Object.keys(columns).map((colKey) => (
            <Grid item xs={12} sm={6} md={3} key={colKey}>
              <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                <Typography variant="h6">{columns[colKey]}</Typography>
                <IconButton size="small" onClick={() => handleAddTask(colKey)}>
                  <Add fontSize="small" />
                </IconButton>
              </Box>

              <Droppable droppableId={colKey}>
                {(provided) => (
                  <Box
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    sx={{
                      minHeight: "400px",
                      backgroundColor: "#f4f5f7",
                      borderRadius: 2,
                      p: 1,
                    }}
                  >
                    {tasks[colKey].map((task, index) => (
                      <Draggable key={task.id} draggableId={task.id} index={index}>
                        {(provided) => (
                          <Card
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            sx={{ mb: 1 }}
                          >
                            <CardContent>
                              <Typography variant="subtitle1" fontWeight="bold">
                                {task.title}
                              </Typography>
                              <Typography variant="body2" color="text.secondary">
                                {task.description}
                              </Typography>

                              <Box mt={1} display="flex" justifyContent="flex-end">
                                <IconButton size="small" onClick={() => handleEditTask(colKey, task)}>
                                  <Edit fontSize="small" />
                                </IconButton>
                                <IconButton size="small" onClick={() => handleDeleteTask(colKey, task.id)}>
                                  <Delete fontSize="small" />
                                </IconButton>
                              </Box>
                            </CardContent>
                          </Card>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </Box>
                )}
              </Droppable>
            </Grid>
          ))}
        </Grid>
      </DragDropContext>

      {/* Add/Edit Task Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} fullWidth>
        <DialogTitle>{editingTask ? "Edit Task" : "Add Task"}</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            margin="dense"
            label="Title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />
          <TextField
            fullWidth
            margin="dense"
            label="Description"
            multiline
            minRows={2}
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button onClick={handleSaveTask} variant="contained">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
