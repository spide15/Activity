import React, { useState , useEffect} from "react";
import { Todo } from "./Todo";
import { TodoForm } from "./TodoForm";
import { v4 as uuidv4 } from "uuid";
import { EditTodoForm } from "./EditTodoForm";

export const TodoWrapper = () => {
  const [todos, setTodos] = useState([]);
  const [motivationalQuotes, setMotivationalQuotes] = useState([]);
  const [currentMotivationalQuote, setCurrentMotivationalQuote] = useState("");

  useEffect(() => {
    // Fetch and set the array of motivational quotes when the component mounts
    fetchMotivationalQuotes();
  }, []);

  useEffect(() => {
    // Set a random motivational quote from the array when the array changes
    setRandomMotivationalQuote();
  }, [motivationalQuotes]);

  const fetchMotivationalQuotes = async () => {
    try {
      // You can fetch your array of motivational quotes here
      const quotesArray = [
        "The road to success is always under construction. - Lily Tomlin",
        "Success is not final, failure is not fatal: It is the courage to continue that counts. - Winston Churchill",
        "Don't watch the clock; do what it does. Keep going. - Sam Levenson",
        "The only way to do great work is to love what you do. - Steve Jobs",
        "Your time is limited, don't waste it living someone else's life. - Steve Jobs",
        "Success is walking from failure to failure with no loss of enthusiasm. - Winston S. Churchill",
        "The secret of success is to do the common things uncommonly well. - John D. Rockefeller Jr.",
        "Success usually comes to those who are too busy to be looking for it. - Henry David Thoreau",
        "Don't be afraid to give up the good to go for the great. - John D. Rockefeller",
        "Your time is limited, don't waste it living someone else's life. - Steve Jobs",
        "Success is not in what you have, but who you are. - Bo Bennett",
        "The best way to predict the future is to create it. - Peter Drucker",
        "The harder you work for something, the greater you'll feel when you achieve it. - Unknown",
        "Don't let yesterday take up too much of today. - Will Rogers",
        "The future belongs to those who believe in the beauty of their dreams. - Eleanor Roosevelt",
        "Success is the sum of small efforts, repeated day in and day out. - Robert Collier",
        "The only place where success comes before work is in the dictionary. - Vidal Sassoon",
        "The only limit to our realization of tomorrow will be our doubts of today. - Franklin D. Roosevelt",
        "Success is not the key to happiness. Happiness is the key to success. - Albert Schweitzer",
        "Believe you can and you're halfway there. - Theodore Roosevelt"
      ];

      setMotivationalQuotes(quotesArray);
    } catch (error) {
      console.error("Error fetching motivational quotes:", error);
    }
  };

  const setRandomMotivationalQuote = () => {
    if (motivationalQuotes.length > 0) {
      const randomIndex = Math.floor(Math.random() * motivationalQuotes.length);
      setCurrentMotivationalQuote(motivationalQuotes[randomIndex]);
    }
  };


  const addTodo = (todo) => {
    setTodos([
      ...todos,
      { id: uuidv4(), task: todo, completed: false, isEditing: false },
    ]);
  }

  const deleteTodo = (id) => setTodos(todos.filter((todo) => todo.id !== id));

  const toggleComplete = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  }

  const editTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isEditing: !todo.isEditing } : todo
      )
    );
  }

  const editTask = (task, id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, task, isEditing: !todo.isEditing } : todo
      )
    );
  };
    // Calculate the count of pending tasks
    const pendingTasksCount = todos.filter((todo) => !todo.completed).length;


  return (
    <div className="TodoWrapper">
        <h1>{currentMotivationalQuote}</h1>
      
      <TodoForm addTodo={addTodo} />
      {/* display todos */}
      {todos.map((todo) =>
        todo.isEditing ? (
          <EditTodoForm editTodo={editTask} task={todo} />
        ) : (
          <Todo
            key={todo.id}
            task={todo}
            deleteTodo={deleteTodo}
            editTodo={editTodo}
            toggleComplete={toggleComplete}
          />
        )
      )}
      <h3>Pending Tasks: {pendingTasksCount}</h3> {/* Display the count of pending tasks */}
    </div>
  );
};
