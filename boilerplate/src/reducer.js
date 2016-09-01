import { newStudent as apiCreateNewStudent, getStudents as apiGetStudents } from '../api';

const ActionTypes = Object.freeze({
  STUDENT_CREATE_BEGIN: 'STUDENT_CREATE_BEGIN',
  STUDENT_CREATE_SUCCESS: 'STUDENT_CREATE_SUCCESS',
  STUDENT_CREATE_FAIL: 'STUDENT_CREATE_FAIL',
  STUDENT_CREATE_FINALLY: 'STUDENT_CREATE_FINALLY',

  NEW_STUDENT_CHANGE_NAME: 'NEW_STUDENT_CHANGE_NAME',

  GET_STUDENTS_BEGIN: 'GET_STUDENTS_BEGIN',
  GET_STUDENTS_SUCCESS: 'GET_STUDENTS_SUCCESS',
  GET_STUDENTS_FAIL: 'GET_STUDENTS_FAIL',
  GET_STUDENTS_FINALLY: 'GET_STUDENTS_FINALLY',

  SET_STUDENTS: 'SET_STUDENTS',
});

const initialState = Object.freeze({
  newStudentName: '',

  creatingStudent: null,
  students: [],
  isGetting: false,
});

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.STUDENT_CREATE_BEGIN:
      return {
        ...state,
        creatingStudent: action.payload,
      };
    case ActionTypes.STUDENT_CREATE_SUCCESS:
      return state;
    case ActionTypes.STUDENT_CREATE_FAIL:
      console.error(`student creation failed: ${action.payload}`);
      return state;
    case ActionTypes.STUDENT_CREATE_FINALLY:
      return {
        ...state,
        creatingStudent: null,
      };

    case ActionTypes.GET_STUDENTS_BEGIN:
      return {
        ...state,
        isGetting: true,
      };
    case ActionTypes.GET_STUDENTS_SUCCESS:
      return state;
    case ActionTypes.GET_STUDENTS_FAIL:
      console.error(`failed getting students: ${action.payload}`);
      return state;
    case ActionTypes.GET_STUDENTS_FINALLY:
      return {
        ...state,
        isGetting: false,
      };

    case ActionTypes.NEW_STUDENT_CHANGE_NAME:
      return {
        ...state,
        newStudentName: action.payload,
      };

    case ActionTypes.SET_STUDENTS:
      return {
        ...state,
        students: action.payload,
      };

    default:
      return state;
  }
}

const PrivateActionCreators = Object.freeze({
  newStudentBegin: (newStudent) => ({
    type: ActionTypes.STUDENT_CREATE_BEGIN,
    payload: newStudent,
  }),
  newStudentSuccess: () => ({
    type: ActionTypes.STUDENT_CREATE_SUCCESS,
  }),
  newStudentFail: (e) => ({
    type: ActionTypes.STUDENT_CREATE_FAIL,
    payload: e,
  }),
  newStudentFinally: () => ({
    type: ActionTypes.STUDENT_CREATE_FINALLY,
  }),

  getStudentsBegin: () => ({
    type: ActionTypes.GET_STUDENTS_BEGIN,
  }),
  getStudentsSuccess: () => ({
    type: ActionTypes.GET_STUDENTS_SUCCESS,
  }),
  getStudentsFail: (e) => ({
    type: ActionTypes.GET_STUDENTS_FAIL,
    payload: e,
  }),
  getStudentsFinally: () => ({
    type: ActionTypes.GET_STUDENTS_FINALLY,
  }),

  setStudents: (students) => ({
    type: ActionTypes.SET_STUDENTS,
    payload: students,
  }),
});

export const ActionCreators = Object.freeze({
  submitNewStudent: () => async (dispatch, getState) => {
    const newStudent = {
      name: getState().newStudentName,
    };

    dispatch(PrivateActionCreators.newStudentBegin(newStudent));

    try {
      const returnedStudents = await apiCreateNewStudent(newStudent);
      dispatch(PrivateActionCreators.setStudents(returnedStudents));
      dispatch(PrivateActionCreators.newStudentSuccess());
    } catch (e) {
      dispatch(PrivateActionCreators.newStudentFail(e));
    }

    dispatch(PrivateActionCreators.newStudentFinally());
  },

  getStudents: () => async (dispatch, getState) => {
    dispatch(PrivateActionCreators.getStudentsBegin());

    try {
      const fetchedStudents = await apiGetStudents();
      dispatch(PrivateActionCreators.setStudents(fetchedStudents));
      dispatch(PrivateActionCreators.getStudentsSuccess(fetchedStudents));
    } catch (e) {
      dispatch(PrivateActionCreators.getStudentsFail(e));
    }

    dispatch(PrivateActionCreators.getStudentsFinally());
  },

  newStudentChangeName: name => ({
    type: ActionTypes.NEW_STUDENT_CHANGE_NAME,
    payload: name,
  }),
});
