/* eslint-disable @typescript-eslint/no-explicit-any */

type Endpoint = {
  build: (...args: any[]) => string;
  pattern: string;
};

export const STUDENT_ENDPOINTS = {
  fetchStudents: {
    build: () => "students/",
    pattern: "students/",
  },
} satisfies Record<string, Endpoint>;

export const SUBJECT_ENDPOINTS = {
  fetchSubjects: {
    build: () => "subjects/",
    pattern: "subjects",
  },
} satisfies Record<string, Endpoint>;
