# CoachPro — Coaching Management System

A complete, modern React frontend for managing a coaching center.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm start
```

The app opens at **http://localhost:3000**

---

## 🔑 Demo Accounts

| Role    | Email                     | Password  |
|---------|---------------------------|-----------|
| Admin   | admin@coachpro.com        | admin     |
| Teacher | teacher@coachpro.com      | teacher   |
| Student | student@coachpro.com      | student   |

> Tip: Click the demo account buttons on the login screen to auto-fill credentials.

---

## 📁 Project Structure

```
src/
├── components/
│   ├── common/         # Reusable: Modal, DataTable, StatCard, ProtectedRoute
│   └── layout/         # AppLayout, Sidebar, Navbar
├── context/
│   └── AppContext.js   # Global state with useReducer
├── data/
│   └── mockData.js     # Sample data for all entities
├── pages/
│   ├── auth/           # Login / Signup
│   ├── dashboard/      # Analytics + charts
│   ├── students/       # CRUD for students
│   ├── teachers/       # CRUD for teachers
│   ├── courses/        # CRUD + card/table views
│   └── attendance/     # Mark + view attendance
├── App.js              # Router + lazy loading
└── index.css           # Global styles + dark/light theme
```

---

## ✨ Features

- **Authentication** — Login/Signup with role-based access (Admin/Teacher/Student)
- **Dashboard** — 4 stat cards + 4 Recharts visualizations (Area, Bar, Pie, Horizontal Bar)
- **Students** — Add/Edit/Delete with search, pagination, status badges
- **Teachers** — Full CRUD with subject assignment
- **Courses** — CRUD with table and card/grid view toggle
- **Attendance** — Mark present/absent/late per student, save to state, view recent records
- **Dark/Light Theme** — Toggle via navbar, persisted in localStorage
- **Toast Notifications** — Via react-hot-toast
- **Form Validation** — React Hook Form + Yup schemas
- **Lazy Loading** — All pages use React.lazy + Suspense
- **Responsive** — Works on mobile and desktop

---

## 🛠 Tech Stack

| Library            | Purpose                    |
|--------------------|----------------------------|
| React 18           | UI framework               |
| React Router v6    | Client-side routing        |
| Context API        | Global state management    |
| React Hook Form    | Form handling              |
| Yup                | Schema validation          |
| Recharts           | Charts and analytics       |
| react-hot-toast    | Notifications              |
| Lucide React       | Icons                      |
| Google Fonts       | Syne + DM Sans typography  |

---

## 🔌 API Integration

All pages use mock data from `src/data/mockData.js`.

To connect a real API, replace the mock data with Axios calls:

```js
// Example: replace mock with API call
import axios from 'axios';

const BASE_URL = 'https://your-api.com/api';

export const fetchStudents = () => axios.get(`${BASE_URL}/students`);
export const createStudent = (data) => axios.post(`${BASE_URL}/students`, data);
export const updateStudent = (id, data) => axios.put(`${BASE_URL}/students/${id}`, data);
export const deleteStudent = (id) => axios.delete(`${BASE_URL}/students/${id}`);
```

Then update AppContext actions to call these instead of dispatching directly.

---

## 🎨 Theming

CSS variables in `src/index.css` control all colors:

```css
.dark  { --bg-primary: #0f0f14; --accent: #6366f1; ... }
.light { --bg-primary: #f5f5f9; --accent: #6366f1; ... }
```

Toggle by clicking the ☀️/🌙 button in the top navbar.
