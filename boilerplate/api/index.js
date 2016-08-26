import uuid from 'node-uuid';

export function newStudent(student) {
  return new Promise((resolve, reject) => {
    let students;
    try {
      students = JSON.parse(localStorage.getItem('_students')) || [];
    } catch (e) {
      students = [];
    }

    if (typeof students !== 'object') {
      students = [];
    }

    student.id = uuid.v1();

    students = [
      ...students,
      student,
    ];

    localStorage.setItem('_students', JSON.stringify(students));

    window.setTimeout(resolve.bind(null, students), 1500);
  });
}

export function getStudents() {
  return new Promise((resolve, reject) => {
    window.setTimeout(resolve.bind(null, JSON.parse(localStorage.getItem('_students')) || []), 1500);
  });
}
