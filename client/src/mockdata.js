import { v4 as uuidv4 } from "uuid";

export const generateMockPosts = (page, limit) => {
  const posts = [];
  for (let i = 0; i < limit; i++) {
    posts.push({
      id: uuidv4(),
      title: `Post Title ${(page - 1) * limit + i + 1}`,
      description: `This is a description for post ${
        (page - 1) * limit + i + 1
      }`,
      imageUrl: "https://via.placeholder.com/500x250",
      timestamp: "Just now",
    });
  }
  return posts;
};

///////////

// mockdata.js

// Mock data for courses
export const courses = [
  { id: 1, name: "B.Tech" },
  { id: 2, name: "M.Tech" },
  { id: 3, name: "BCA" },
  { id: 4, name: "MCA" },
  { id: 5, name: "BBA" },
];

// Mock data for departments
export const departments = [
  { id: 1, name: "Computer Science" },
  { id: 2, name: "Electronics" },
  { id: 3, name: "Mechanical" },
  { id: 4, name: "Civil" },
  // Add more departments as needed
];

// Mock data for years
export const years = [
  { id: 1, name: "1st Year" },
  { id: 2, name: "2nd Year" },
  { id: 3, name: "3rd Year" },
  { id: 4, name: "4th Year" },
];

// Mock data for schedules
export const schedules = [
  {
    course: "B.Tech",
    department: "Computer Science",
    year: "1st Year",
    data: [
      {
        day: "Monday",
        subject: "Data Structures",
        time: "9:00 AM - 11:00 AM",
        teacher: "Prof. Smith",
      },
      {
        day: "Wednesday",
        subject: "Operating Systems",
        time: "10:00 AM - 12:00 PM",
        teacher: "Prof. Johnson",
      },
      {
        day: "Friday",
        subject: "Database Systems",
        time: "1:00 PM - 3:00 PM",
        teacher: "Prof. Williams",
      },
    ],
  },
  {
    course: "B.Tech",
    department: "Electronics",
    year: "1st Year",
    data: [
      {
        day: "Tuesday",
        subject: "Analog Circuits",
        time: "9:00 AM - 11:00 AM",
        teacher: "Prof. Brown",
      },
      {
        day: "Thursday",
        subject: "Digital Electronics",
        time: "10:00 AM - 12:00 PM",
        teacher: "Prof. Davis",
      },
      {
        day: "Friday",
        subject: "Signal Processing",
        time: "2:00 PM - 4:00 PM",
        teacher: "Prof. Miller",
      },
    ],
  },
  // Add more schedules as needed
];

// Mock data for grades
export const grades = [
  {
    course: "B.Tech",
    department: "Computer Science",
    year: "1st Year",
    data: [
      { semester: "Semester 1", subject: "Data Structures", grade: "A" },
      { semester: "Semester 1", subject: "Operating Systems", grade: "B+" },
      { semester: "Semester 1", subject: "Database Systems", grade: "A-" },
      // Add backlog grades if necessary
    ],
  },
  {
    course: "B.Tech",
    department: "Electronics",
    year: "1st Year",
    data: [
      { semester: "Semester 1", subject: "Analog Circuits", grade: "A" },
      { semester: "Semester 1", subject: "Digital Electronics", grade: "B" },
      { semester: "Semester 1", subject: "Signal Processing", grade: "B+" },
      // Add backlog grades if necessary
    ],
  },
  // Add more grades as needed
];

// Mock data for academic resources
export const academicResources = [
  {
    title: "Library Resources",
    url: "https://example.com/library-resources",
  },
  {
    title: "Lecture Notes",
    url: "https://example.com/lecture-notes",
  },
  {
    title: "Online Tutorials",
    url: "https://example.com/online-tutorials",
  },
  // Add more resources as needed
];

// Mock data for university fest and departmental announcements
export const additionalAcademicInfo = [
  {
    title: "University Fest Details",
    url: "https://example.com/university-fest",
  },
  {
    title: "Study Notes and Guides",
    url: "https://example.com/study-notes",
  },
  {
    title: "Departmental Announcements",
    url: "https://example.com/department-announcements",
  },
  // Add more details as needed
];
