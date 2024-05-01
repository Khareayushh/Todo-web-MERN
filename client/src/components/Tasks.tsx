import { useState } from "react"

const Tasks = ({_id, description, title, done}: any) => {
    const isTaskDone = done;
    const [isActive, setIsActive] = useState(isTaskDone);

    
    
    return (
        <div className="flex gap-4 mb-2 items-center" key={_id}>
            <span className={`w-4 h-4 content[""] border border-black rounded-full cursor-pointer ${isActive && 'bg-blue-400 duration-300'}`} onClick={() => setIsActive(!isActive)}></span>
            <div className={`${isActive && 'text-slate-400 duration-300'}`}>
                <div className='grid grid-cols-[300px_400px] gap-4 items-center'>
                    <p className="truncate font-semibold text-xl">{title}</p>
                    <p className="truncate text-lg"> {description}</p>
                </div>
                <p className={`h-[2px] bg-slate-400 line transform ${isActive && 'translate-y-[-13px]'} transition-transform duration-300 `}></p>
            </div>
        </div>
    )
}

export default Tasks
