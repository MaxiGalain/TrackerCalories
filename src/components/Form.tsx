import { useState, ChangeEvent, FormEvent, Dispatch } from "react"
import { v4 as uuidv4 } from 'uuid'
import { categories } from "../data/categories"
import { Activity } from "../types"
import { ActivityActions } from "../reducers/activity-reducer"

type formProps = {
  dispatch: Dispatch<ActivityActions>
}

const initialState : Activity = {
  id: uuidv4(),
  category: 1,
  name: '',
  calories: 0
}

export default function Form({dispatch} : formProps) {

  const [activity, setActivity] = useState<Activity>(initialState)
  
  const handleChange = (e: ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLInputElement>) => {
    const isNumberField = ['category', 'calories'].includes(e.target.id)
    setActivity({
      ...activity, 
      [e.target.id] : isNumberField ? +e.target.value : e.target.value
    })
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    dispatch({type: "save-activity", payload: {newActivity: activity}})
    setActivity({
      ...initialState, 
      id: uuidv4()
    })
  }

  const isValidActivity = () => {
    const { name, calories } = activity
    return name.trim() !== '' && calories > 0
  }

  return (
    <form className="space-y-5 bg-white shadow p-10 rounded-lg" onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 gap-3">
        <label htmlFor="category" className="font-bold">
          Categor&iacute;a:
        </label>
        <select className="border border-slate-300 p-2 rounded-lg w-full bg-white" id="category" onChange={handleChange} value={activity.category}>
          {categories.map((category => 

            <option key={category.id} value={category.id}>
              {category.name}
            </option>

          ))}
        </select>
      </div>
      <div className="grid grid-cols-1 gap-3">
        <label htmlFor="name" className="font-bold">
          Actividad:
        </label>
        <input id="name" type="text" className="border border-slate-300 p-2 rounded-lg" placeholder="Ej. Comida, Jugo de naranja, ensalada, ejercicio, pesas, bicileta"
         value={activity.name} onChange={handleChange}></input>
      </div>
      <div className="grid grid-cols-1 gap-3">
        <label htmlFor="calories" className="font-bold">
          Calorias:
        </label>
        <input id="calories" type="number" className="border border-slate-300 p-2 rounded-lg" placeholder="Calorias. ej. 300 o 500" 
        value={activity.calories} onChange={handleChange}></input>
      </div>
      <input type="submit" className="bg-gray-800 hover:bg-gray-900 w-full p-2 font-bold uppercase text-white cursor-pointer disabled:opacity-10"
       value={activity.category === 1 ? 'Guardar comida' : 'Guardar ejercicio'} onChange={handleChange} disabled={!isValidActivity()}>
      </input>
    </form>
  )
}
