import uuid from 'node-uuid';
import _ from 'lodash';

function _setStudents(students) {
  return localStorage.setItem('_students', JSON.stringify(students));
}

function _getStudents() {
  return JSON.parse(localStorage.getItem('_students')) || [];
}

export async function addEntry(studentId, entry) {
  const students = await getStudents();
  const student = students.find(student => student.id === studentId);
  if (!student) {
    throw new Error('Student ID not found');
  }

  student.entries = student.entries || [];
  student.entries = [
    ...student.entries,
    entry
  ];

  _setStudents(students);

  return students;
}

export async function deleteStudent(studentId) {
  const students = await getStudents();
  const newStudents = _.reject(students, student => student.id === studentId);
  _setStudents(newStudents);
  return newStudents;
}

export function newStudent(student) {
  let students;
  try {
    students = _getStudents();
  } catch (e) {
    students = [];
  }

  if (typeof students !== 'object') {
    students = [];
  }

  student.id = uuid.v1();
  student.entries = [];

  students = [
    ...students,
    student,
  ];

  _setStudents(students);

  const promise = new Promise((resolve, reject) => {
    setTimeout(() => resolve(students), 750);
  });

  return promise;
}

export function getStudents() {
  const promise = new Promise((resolve, reject) => {
    setTimeout(() =>
      resolve(_getStudents()), 750);
  });

  return promise;
}
