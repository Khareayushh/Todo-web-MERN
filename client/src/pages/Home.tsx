import axios from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import {  X } from 'lucide-react'
import Tasks from '../components/Tasks';

const Home = () => {

    const navigate = useNavigate();
    const [monthName, setMonthName] = useState("");
    const [dayName, setDayName] = useState("");
    const [day, setDay] = useState(0);
    const [dataSize, setDataSize] = useState(0);
    const [plusClicked, setPlusClicked] = useState(false);
    const [todoData, setTodoData] = useState([{ title: "", description: "", _id: "", done: Boolean }]);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [isActive, setIsActive] = useState(false);

    // const tokenID = localStorage.getItem("tokenID");
    const getData = async (tokenID: any) => {

        try {
            const result = await axios.get("http://localhost:3000/user/todos", {
                headers: {
                    "Authorization": "bearer " + tokenID
                }
            })
            console.log(result.data);
            setTodoData(result.data);
            setDataSize(result.data.length);
        } catch (error) {
            navigate("/login");
        }
    }

    const handleSubmit = async (tokenID: any) => {
        // e.preventDefault();
        if (!title && !description) {
            console.log("write all things")
            return;
        }

        try {
            
            const result = await axios.post("http://localhost:3000/user/todos", {title, description}, {headers: {"Authorization": "bearer " + tokenID}});
            console.log(result);
            setPlusClicked(false);
            getData(tokenID);
        } catch (error) {
            console.log(error);
        }
    }

    const handlePlus = async (e: any) => {
        e.preventDefault();

        setPlusClicked(!plusClicked);
        console.log(plusClicked);
    }
    const tokenID = localStorage.getItem("tokenID");


    useEffect(() => {
        const tokenID = localStorage.getItem("tokenID");
        if (!tokenID) {
            navigate("/login");
            return;
        }
        getData(tokenID);

        const currentDate = new Date();
        const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

        const day = dayNames[currentDate.getDay()];
        const month = monthNames[currentDate.getMonth()];
        setDay(currentDate.getDate())
        setDayName(day);
        setMonthName(month);
    }, [])
    return (
        <div className="bg-[#5871dc] p-8">
            <div className="m-auto max-w-screen-lg bg-slate-200 rounded-lg">
                <div className="upper_mandatory_section p-8">
                    <div className="flex items-center justify-between">
                        <p className="text-xl font-semibold text-slate-600 font-mono">{dayName}, {day} {monthName}</p>
                        <button onClick={handlePlus} className="text-2xl text-white font-semibold w-10 h-10 bg-[#5871dc] rounded-full hover:bg-[#4561dd] duration-200 hover:translate-y-[-2px]">+</button>
                        {plusClicked && (
                            <div className="fixed inset-0 bg-black opacity-50 z-10" />
                        )}
                        {(plusClicked) && (
                            <div className="fixed inset-10 flex items-center justify-center z-20">
                                <div className="bg-white p-8 rounded-lg shadow-lg transform transition-transform duration-300 w-[500px]">
                                    {/* Your content inside the box */}

                                    <button onClick={() => { setPlusClicked(!plusClicked) }} className="ml-[96%] mb-2 hover:text-[#5871dc] duration-200">
                                        <X className="font-bold" />
                                    </button>
                                    <div className="flex items-center justify-between">
                                        <p className="text-xl font-semibold mr-2">Title</p>
                                        <textarea name="" id="" cols="10" rows="1" className='w-full bg-slate-200 rounded-md p-2' onChange={(e) => {
                                            if (e.target.value.length <= 30) {
                                                setTitle(e.target.value);
                                            }
                                        }}></textarea>
                                    </div>
                                    {(30 - title.length) ? (<p>Characters remaining-{30 - title.length}</p>) : (<p className='text-red-400'>Words exceeded</p>)}
                                    <div className="my-2">
                                        <p className="text-xl font-semibold">Description</p>
                                        <textarea name="description" id="" cols="30" rows="10" className="bg-slate-200 w-full rounded-md p-2" onChange={(e) => { setDescription(e.target.value) }}></textarea>
                                    </div>
                                    <div className="flex justify-end">
                                        <button className="bg-[#5871dc] rounded-md px-4 py-2 hover:bg-[#415ddd] duration-200 hover:text-white font-semibold" onClick={() => handleSubmit(tokenID)}>Save</button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                    <p className="text-[#5c75e2] font-bold text-lg">{dataSize} Tasks</p>
                </div>
                <div className="bg-[#5871dc] absolute top-0 left-0 h-full w-full -z-10"></div>
                <div className="px-8">
                    <div className="tasks overflow-y-auto max-h-96 pb-4">
                        {
                            todoData.map((todo) => {
                                return (
                                    <Tasks title={todo.title} description={todo.description} key={todo._id} done={todo.done}/>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home
