// src/data/mockData.js

export const mockStudents = [
  { id: 1, name: "Aarav Sharma", email: "aarav@example.com", phone: "9876543210", course: "Mathematics", grade: "10th", status: "active", joinDate: "2024-01-15", avatar: "AS" },
  { id: 2, name: "Priya Patel", email: "priya@example.com", phone: "9876543211", course: "Science", grade: "11th", status: "active", joinDate: "2024-02-01", avatar: "PP" },
  { id: 3, name: "Rohan Verma", email: "rohan@example.com", phone: "9876543212", course: "English", grade: "9th", status: "inactive", joinDate: "2024-01-20", avatar: "RV" },
  { id: 4, name: "Sneha Gupta", email: "sneha@example.com", phone: "9876543213", course: "Mathematics", grade: "12th", status: "active", joinDate: "2024-03-05", avatar: "SG" },
  { id: 5, name: "Vikram Singh", email: "vikram@example.com", phone: "9876543214", course: "Physics", grade: "11th", status: "active", joinDate: "2024-02-15", avatar: "VS" },
  { id: 6, name: "Ananya Iyer", email: "ananya@example.com", phone: "9876543215", course: "Chemistry", grade: "12th", status: "active", joinDate: "2024-01-10", avatar: "AI" },
  { id: 7, name: "Arjun Nair", email: "arjun@example.com", phone: "9876543216", course: "Biology", grade: "10th", status: "active", joinDate: "2024-03-20", avatar: "AN" },
  { id: 8, name: "Kavya Reddy", email: "kavya@example.com", phone: "9876543217", course: "History", grade: "9th", status: "inactive", joinDate: "2024-02-28", avatar: "KR" },
];

export const mockTeachers = [
  { id: 1, name: "Dr. Ramesh Kumar", email: "ramesh@coaching.com", phone: "9811223344", subject: "Mathematics", experience: "8 years", students: 24, status: "active", avatar: "RK" },
  { id: 2, name: "Mrs. Sunita Joshi", email: "sunita@coaching.com", phone: "9811223345", subject: "Science", experience: "5 years", students: 18, status: "active", avatar: "SJ" },
  { id: 3, name: "Mr. Deepak Chauhan", email: "deepak@coaching.com", phone: "9811223346", subject: "English", experience: "10 years", students: 30, status: "active", avatar: "DC" },
  { id: 4, name: "Ms. Neha Agarwal", email: "neha@coaching.com", phone: "9811223347", subject: "Physics", experience: "6 years", students: 15, status: "inactive", avatar: "NA" },
  { id: 5, name: "Mr. Suresh Mehta", email: "suresh@coaching.com", phone: "9811223348", subject: "Chemistry", experience: "12 years", students: 22, status: "active", avatar: "SM" },
];

export const mockCourses = [
  { id: 1, name: "Advanced Mathematics", code: "MATH101", teacher: "Dr. Ramesh Kumar", students: 24, duration: "6 months", fee: 8000, status: "active", schedule: "Mon, Wed, Fri" },
  { id: 2, name: "Science Fundamentals", code: "SCI101", teacher: "Mrs. Sunita Joshi", students: 18, duration: "4 months", fee: 6500, status: "active", schedule: "Tue, Thu, Sat" },
  { id: 3, name: "English Communication", code: "ENG101", teacher: "Mr. Deepak Chauhan", students: 30, duration: "3 months", fee: 5000, status: "active", schedule: "Mon, Wed" },
  { id: 4, name: "Physics Mastery", code: "PHY101", teacher: "Ms. Neha Agarwal", students: 15, duration: "5 months", fee: 7500, status: "inactive", schedule: "Tue, Fri" },
  { id: 5, name: "Chemistry Lab", code: "CHEM101", teacher: "Mr. Suresh Mehta", students: 22, duration: "4 months", fee: 7000, status: "active", schedule: "Mon, Thu, Sat" },
];

export const mockAttendance = [
  { id: 1, student: "Aarav Sharma", course: "Mathematics", date: "2024-12-01", status: "present" },
  { id: 2, student: "Priya Patel", course: "Science", date: "2024-12-01", status: "present" },
  { id: 3, student: "Rohan Verma", course: "English", date: "2024-12-01", status: "absent" },
  { id: 4, student: "Sneha Gupta", course: "Mathematics", date: "2024-12-01", status: "present" },
  { id: 5, student: "Vikram Singh", course: "Physics", date: "2024-12-01", status: "late" },
  { id: 6, student: "Ananya Iyer", course: "Chemistry", date: "2024-12-01", status: "present" },
  { id: 7, student: "Arjun Nair", course: "Biology", date: "2024-12-01", status: "present" },
  { id: 8, student: "Kavya Reddy", course: "History", date: "2024-12-01", status: "absent" },
];

export const analyticsData = {
  monthlyEnrollments: [
    { month: "Jul", students: 12 }, { month: "Aug", students: 19 },
    { month: "Sep", students: 15 }, { month: "Oct", students: 22 },
    { month: "Nov", students: 28 }, { month: "Dec", students: 35 },
  ],
  attendanceOverview: [
    { name: "Present", value: 72, color: "#10b981" },
    { name: "Absent", value: 15, color: "#ef4444" },
    { name: "Late", value: 13, color: "#f59e0b" },
  ],
  revenueData: [
    { month: "Jul", revenue: 45000 }, { month: "Aug", revenue: 62000 },
    { month: "Sep", revenue: 55000 }, { month: "Oct", revenue: 78000 },
    { month: "Nov", revenue: 85000 }, { month: "Dec", revenue: 92000 },
  ],
  coursePopularity: [
    { course: "Math", students: 24 }, { course: "Science", students: 18 },
    { course: "English", students: 30 }, { course: "Physics", students: 15 },
    { course: "Chemistry", students: 22 },
  ],
};
