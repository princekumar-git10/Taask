
import { useEffect, useState } from "react";
import "./App.css";

const weeks = [
  {
    title: "Week 1",
    subtitle: "Array Fundamentals",
    tasks: [
      "Running Sum",
      "Richest Customer Wealth",
      "Contains Duplicate",
      "Maximum Subarray",
      "Best Time to Buy and Sell Stock",
      "Move Zeroes",
      "Revision + Two Sum",
    ],
  },
  {
    title: "Week 2",
    subtitle: "String Fundamentals",
    tasks: [
      "Reverse String",
      "Valid Anagram",
      "Valid Palindrome",
      "Longest Common Prefix",
      "First Occurrence in a String",
      "String Revision",
    ],
  },
  {
    title: "Week 3",
    subtitle: "Sorting",
    tasks: [
      "Sort an Array",
      "Squares of a Sorted Array",
      "Merge Sorted Array",
      "Height Checker",
      "Sort Colors",
      "Sorting Revision",
      "Search Insert Position",
    ],
  },
  {
    title: "Week 4",
    subtitle: "Binary Search & Revision",
    tasks: [
      "Binary Search",
      "Guess Number",
      "First Bad Version",
      "First and Last Position",
      "Sqrt(x)",
      "Search in Rotated Sorted Array",
      "Revision",
      "Number of Good Pairs",
      "Final Practice Test",
      "Catch-up or Weak-topic Revision",
    ],
  },
];

const STORAGE_KEY = "leetcode-30-day-progress";

function App() {
  const [completed, setCompleted] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(completed));
  }, [completed]);

  const allTasks = weeks.flatMap((week) => week.tasks);
  const totalTasks = allTasks.length;
  const completedCount = completed.length;
  const progress = Math.round((completedCount / totalTasks) * 100);

  const toggleTask = (task) => {
    setCompleted((previous) =>
      previous.includes(task)
        ? previous.filter((item) => item !== task)
        : [...previous, task]
    );
  };

  const resetProgress = () => {
    if (window.confirm("Are you sure you want to reset your progress?")) {
      setCompleted([]);
    }
  };

  let dayNumber = 0;

  return (
    <main className="app">
      <header className="header">
        <div>
          <p className="eyebrow">DSA JOURNEY</p>
          <h1>30-Day LeetCode Tracker</h1>
          <p className="description">
            One question at a time. Stay consistent.
          </p>
        </div>

        <button className="reset-btn" onClick={resetProgress}>
          Reset progress
        </button>
      </header>

      <section className="progress-section">
        <div className="progress-info">
          <div>
            <p className="progress-label">Overall progress</p>
            <h2>{completedCount}/{totalTasks}</h2>
          </div>

          <span className="percentage">{progress}%</span>
        </div>

        <div className="progress-track">
          <div
            className="progress-fill"
            style={{ width: `${progress}%` }}
          />
        </div>

        <p className="progress-caption">
          {completedCount === totalTasks
            ? "Congratulations! You completed the challenge."
            : `${totalTasks - completedCount} questions remaining`}
        </p>
      </section>

      <section className="weeks">
        {weeks.map((week, weekIndex) => {
          const weekCompleted = week.tasks.filter((task) =>
            completed.includes(task)
          ).length;

          return (
            <section className="week-card" key={week.title}>
              <div className="week-header">
                <div>
                  <p className="week-number">
                    {week.title.toUpperCase()}
                  </p>
                  <h3>{week.subtitle}</h3>
                </div>

                <span className="week-count">
                  {weekCompleted}/{week.tasks.length}
                </span>
              </div>

              <div className="task-list">
                {week.tasks.map((task) => {
                  dayNumber++;
                  const currentDay = dayNumber;
                  const isDone = completed.includes(task);

                  return (
                    <label
                      className={`task ${isDone ? "completed" : ""}`}
                      key={task}
                    >
                      <span className="day-number">
                        {String(currentDay).padStart(2, "0")}
                      </span>

                      <input
                        type="checkbox"
                        checked={isDone}
                        onChange={() => toggleTask(task)}
                      />

                      <span className="task-name">{task}</span>

                      {isDone && (
                        <span className="done-label">Done</span>
                      )}
                    </label>
                  );
                })}
              </div>
            </section>
          );
        })}
      </section>

      <footer className="footer">
        <p>Consistency beats intensity.</p>
      </footer>
    </main>
  );
}

export default App;
