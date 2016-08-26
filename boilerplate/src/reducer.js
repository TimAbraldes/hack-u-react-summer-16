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
  students: [],
  isCreating: false,
  isGetting: false,
});

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.STUDENT_CREATE_BEGIN:
      return {
        ...state,
        isCreating: true,
      };
    case ActionTypes.STUDENT_CREATE_SUCCESS:
      console.log(`student created`);
      return state;
    case ActionTypes.STUDENT_CREATE_FAIL:
      console.log(`student creation failed: ${action.payload}`);
      return state;
    case ActionTypes.STUDENT_CREATE_FINALLY:
      return {
        ...state,
        isCreating: false,
      };

    case ActionTypes.GET_STUDENTS_BEGIN:
      return {
        ...state,
        isGetting: true,
      };
    case ActionTypes.GET_STUDENTS_SUCCESS:
      console.log('got students');
      return state;
    case ActionTypes.GET_STUDENTS_FAIL:
      console.log(`failed getting students: ${action.payload}`);
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
      console.log(`Setting students: ${action.payload}`);
      return {
        ...state,
        students: action.payload,
      };

    default:
      return state;
  }
}

const PrivateActionCreators = Object.freeze({
  newStudentBegin: () => ({
    type: ActionTypes.STUDENT_CREATE_BEGIN,
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
    dispatch(PrivateActionCreators.newStudentBegin());

    console.log(`creating student: ${getState().newStudentName}`);

    try {
      const returnedStudents = await apiCreateNewStudent({
        name: getState().newStudentName,
      });
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
