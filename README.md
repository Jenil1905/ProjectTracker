# 🚀 Project Tracker

## 🔗 Live Demo

👉 https://project-tracker-two-inky.vercel.app/

## 📂 GitHub Repository

👉 https://github.com/Jenil1905/ProjectTracker

---

# 📌 Overview

This is a **Project Tracker application** built using **React + TypeScript** that supports:

* Kanban Board (drag & drop)
* List View with Virtual Scrolling (500+ tasks)
* Timeline (Gantt-style view)
* Filtering with URL sync
* Simulated real-time collaboration

The focus of this project is **performance, scalability, and clean architecture**.

---

# 🛠️ Tech Stack

* React (Vite)
* TypeScript
* Zustand (state management)
* Tailwind CSS
* Vercel (deployment)

---

# 🧠 Key Design Decisions

## 1. State Management (Zustand)

Zustand is used instead of Context API to:

* avoid prop drilling
* keep global state simple and scalable
* improve performance with selective subscriptions

---

## 2. Custom Drag & Drop (No external libraries)

Implemented using:

* pointer events
* manual position tracking
* geometry-based drop detection

This provides:

* full control
* better understanding of event systems
* no dependency overhead

---

## 3. Virtual Scrolling (Performance Optimization)

Instead of rendering all tasks:

* Only visible rows (~20) are rendered
* Remaining space is simulated using container height
* Rows are dynamically updated based on scroll position

### Result:

* Smooth scrolling with 500+ tasks
* Minimal DOM nodes
* Better Lighthouse performance

---

## 4. Component Structure

```
components/
  Kanban/
  List/
  Timeline/
store/
types/
utils/
pages/
```

Separation ensures:

* reusability
* maintainability
* clear responsibilities

---

# ⚙️ Features Implemented

## 🟦 Kanban Board

* Drag & drop tasks between columns
* Column highlighting on hover
* Placeholder while dragging
* Column-wise task count
* Empty state handling

---

## 📋 List View

* Virtual scrolling (handles 500+ tasks)
* Sorting (Title, Priority, Due Date)
* Inline status editing
* Filters (status + priority)
* URL sync for filters
* Empty state with reset

---

## 📅 Timeline View

* Gantt-style visualization
* Task duration mapping
* Current day indicator
* Priority-based color coding

---

## 🔍 Filtering System

* Multi-select filters
* URL synchronization
* State persistence on refresh

---

## 🤝 Collaboration Simulation

* Random task updates (simulated users)
* User assignment to tasks

---

# ⚡ Performance

* Virtual scrolling reduces DOM nodes drastically
* Smooth rendering with large datasets
* Optimized re-renders using Zustand

---

# 📊 Lighthouse Score

![Lighthouse Score](./src/assets/Screenshot%20from%202026-03-25%2015-41-22.png)

---

# 🚀 Setup Instructions

```bash
git clone https://github.com/your-username/project-tracker
cd project-tracker
npm install
npm run dev
```

---

# 🌐 Deployment

Deployed using **Vercel**

---

# 🧪 Assumptions

* Tasks are generated locally (no backend)
* Collaboration is simulated (not real-time)
* Fixed row height used for virtual scrolling

---

# ⚠️ Limitations

* No backend persistence
* Basic drag behavior (no reordering inside column)
* Timeline view simplified for clarity

---

# 📌 Conclusion

This project focuses on:

* scalable frontend architecture
* performance optimization
* clean and maintainable code

---
