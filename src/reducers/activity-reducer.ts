import { Activity } from "../types"

//Acciones que modifican nuestro estado.
export type ActivityActions = 
  { type: 'save-activity', payload: { newActivity: Activity } } |
  { type: 'set-activeId', payload: { id: Activity['id'] } } |
  { type: 'delete-activeId', payload: { id: Activity['id'] } } |
  { type: 'reset-app' } 
export type ActivityState = {
  activities : Activity[],
  activeId: Activity['id']
}

const localStorageActivities = () : Activity[] => {
  const activities = localStorage.getItem('activities')
  return activities ? JSON.parse(activities) : []
}

//Estado inicial
export const initialState : ActivityState = {
  activities: localStorageActivities(),
  activeId: ''
}
//Reducer
export const activityReducer = (
  state : ActivityState = initialState,
  action : ActivityActions
) => {
  if (action.type === 'save-activity'){
    //Maneja logica para actualizar el state
    let updatedActivities : Activity[] = []
    
    if (state.activeId) {
      updatedActivities = state.activities.map( activity => activity.id === state.activeId ? action.payload.newActivity : activity )
    } else {
      updatedActivities = [...state.activities, action.payload.newActivity]
    }
    return {
      //Estado actualizado
      ...state, //Copia del state
      activities: updatedActivities,
      activeId: ''
    }
  }
  if (action.type === 'set-activeId') {
    return {
      ...state,
      activeId: action.payload.id
    }
  }

  if (action.type === "delete-activeId") {
    return {
      ...state,
      activities: state.activities.filter( activity => activity.id !== action.payload.id )
    }
  }

  if (action.type === "reset-app"){
    return {
      activities: [],
      activeId: ''
    }
  }

  return state
}