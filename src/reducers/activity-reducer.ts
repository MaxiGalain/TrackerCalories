import { Activity } from "../types"

//Acciones que modifican nuestro estado.
export type ActivityActions = 
  { type: 'save-activity', payload: { newActivity: Activity } } |
  { type: 'set-activeId', payload: { id: Activity['id'] } }
type ActivityState = {
  activities : Activity[],
  activeId: Activity['id']
}
//Estado inicial
export const initialState : ActivityState = {
  activities: [],
  activeId: ''
}
//Reducer
export const activityReducer = (
  state : ActivityState = initialState,
  action : ActivityActions
) => {
  if (action.type === 'save-activity'){
    //Maneja logica para actualizar el state
    return {
      //Estado actualizado
      ...state, //Copia del state
      activities: [...state.activities, action.payload.newActivity]
    }
  }
  if (action.type === 'set-activeId'){
    return {
      ...state,
      activeId: action.payload.id
    }
  }

  return state
}