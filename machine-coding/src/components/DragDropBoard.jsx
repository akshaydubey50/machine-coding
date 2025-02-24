import React, { useRef, useState } from 'react'
import DragDropJson from "../constant/DragDrop.json";


export default function DragDropBoard() {
const [data,setData]=useState(DragDropJson);
const dragItem=useRef();
const dragContainer=useRef();


    const Container = ({ taskList, title }) => {
        const onDragStart = (e,item,title) => {
            e.target.style.opacity="0.5";
            dragItem.current=item;
            dragContainer.current=title

         }
        const onDragClose = (e) => {e.target.style.opacity="1" }

        const onDrop=(e,targetContainer)=>{
            const item= dragItem.current;
            const sourceContainer=dragContainer.current;

            setData((prev)=>{
                const newData={...prev};
                newData[sourceContainer]=newData[sourceContainer].filter((i)=>i!==item)
                newData[targetContainer]=[...newData[targetContainer],item]
                return newData

            })

        }


        const onHandleDragOver=(e)=>{
            e.preventDefault();
        }
        return (
            <div className='flex flex-col  '
            onDrop={(e)=>onDrop(e,title)}
            onDragOver={onHandleDragOver}
            >
                <h1 className='font-500 text-2xl mb-4'>{title}</h1>
                {taskList.map((item) => (
                    <React.Fragment key={item}>
                        <div className='my-1 px-4 py-4 rounded-md bg-white cursor-move' draggable
                        onDragStart={(e)=>onDragStart(e,item,title)}
                        onDragEnd={onDragClose}
                        >
                            {item}
                        </div>

                    </React.Fragment>
                ))}
            </div>
        )
    }

    return (
        <div className='h-screen bg-blue-950 py-10'>
            <div className="flex gap-20 bg-gray-200 rounded-xl p-6  my-4 max-w-6xl mx-auto ">

                {Object.keys(data).map((container,index) => {
                    return (
                        <React.Fragment key={index}>

                            <Container taskList={data[container]} title={container} />
                        </React.Fragment>
                    )

                })}
            </div>


        </div>
    )
}
