import { combineReducers } from 'redux'
import {
  FILTER_DATA, INVALIDATE_REDDIT,
  REQUEST_POSTS, RECEIVE_POSTS
} from '../actions'

const filter = (state = {}, action) => {

  switch (action.type) {
    case FILTER_DATA:
      return action.filterData
    default:
      return state
  }
}

const date = new Date();

const postsByFilter = (state = {
  isFetching: false,
  didInvalidate: true,
  items: [],
  filterData:{
    selected:'gt37',
    datetime: date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate()+'T00:00:00'
  }
}, action) => {

  switch (action.type) {
    case INVALIDATE_REDDIT:
      return {
        ...state,
        didInvalidate: true
      }
    case REQUEST_POSTS:
      return {
        ...state,
        isFetching: true,
        didInvalidate: false
      }
    case RECEIVE_POSTS:
      return {
        ...state,
        isFetching: false,
        didInvalidate: false,
        items: action.posts,
        lastUpdated: action.receivedAt
      }
    default:
      return state
  }
}

// const postsByFilter = (state = { }, action) => {

//   let key = 
//   switch (action.type) {
//     case INVALIDATE_REDDIT:
//     case RECEIVE_POSTS:
//     case REQUEST_POSTS:
//       return {
//         ...state,
//         [action.filterData]: posts(state[action.filterData], action)
//       }
//     default:
//       return state
//   }
// }

const rootReducer = combineReducers({
  postsByFilter,
  filter
})

export default rootReducer
