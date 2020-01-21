import { EventEmitter } from "events";
import Dispatcher from "../appDispatcher";
import actionTypes from "../actions/actionTypes";

const CHANGE_EVENT = "change";
let _courses = [];
let _authors = [];

class CourseStore extends EventEmitter {
  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  }

  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }

  emitChange() {
    this.emit(CHANGE_EVENT);
  }

  getCourses() {
    return _courses;
  }

  getCourseBySlug(slug) {
    return _courses.find(course => course.slug === slug);
  }

  getAuthors() {
    return _authors;
  }
}

const store = new CourseStore();
Dispatcher.register(action => {
  switch (action.actionType) {
    case actionTypes.DELETE_COURSE:
      _courses = _courses.filter(c => c.id !== parseInt(action.id, 10));
      store.emitChange();
      break;
    case actionTypes.CREATE_COURSE:
      _courses.push(action.course);
      store.emitChange();
      break;
    case actionTypes.UPDATE_COURSE:
      _courses = _courses.map(c =>
        c.id === action.course.id ? action.course : c
      );
      store.emitChange();
      break;
    case actionTypes.LOAD_COURSES:
      _courses = action.courses;
      store.emitChange();
      break;
    case actionTypes.LOAD_AUTHORS:
      _authors = action.authors;
      store.emitChange();
      break;

    default:
  }
});
export default store;
