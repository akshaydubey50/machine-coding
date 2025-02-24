import React, { useState } from "react";
import jsonData from "../constant/data.json"
const List = ({ record, addNodeList,deleteNode }) => {
    const [isExpanded, setIsExpanded] = useState({})

    const toggleExpanded = (item) => {
        setIsExpanded((prev) => ({ ...prev, [item.name]: !prev[item.name] }))
    }
    return (
        <>
            <div className="container">

                {record?.map((item) => (
                    <React.Fragment key={item?.id}>
                        <div className="list-record" onClick={() => toggleExpanded(item)}>
                            {item.isFolder && <span >
                                {isExpanded[item.name] ? " - " : " + "}
                            </span>}
                            <span>{item?.name}</span>
                            {item.isFolder &&
                                <>
                                    <span onClick={(e) => { addNodeList(item.id,true); e.stopPropagation() }}>
                                        <img src="https://static.vecteezy.com/system/resources/previews/000/440/965/original/vector-folder-icon.jpg" width="25px" height="25px" />
                                    </span>
                                    <span onClick={(e) => { addNodeList(item.id,false); e.stopPropagation() }}>
                                        <img src="https://icons.veryicon.com/png/o/system/dan_system/file-60.png" width="25px" height="25px" />
                                    </span>

                                </>

                            }
                        <span onClick={(e)=>{deleteNode(item.id);e.stopPropagation()}}>delete</span>
                        </div>
                        {item?.children && isExpanded[item?.name] && (
                            <List record={item?.children} addNodeList={addNodeList} deleteNode={deleteNode} />
                        )}
                    </React.Fragment>
                ))}
            </div>
        </>
    )
}

export default function Sidebar() {
    const [data, setData] = useState(jsonData);


    const deleteNode=(parentId)=>{

        const updateList = (list) => {
            return list
                .filter((item) => item.id !== parentId) // Remove item if it matches parentId
                .map((item) => ({
                    ...item,
                    children: item.children ? updateList(item.children) : [], // Recursively clean children
                }));
        };
    
        setData((prev)=>updateList(prev))

    }
    const addNodeList = (parentId,isFolder) => {
        const name = prompt("Enter Name")
        if(name.trim()) return;
        const updateList = (list) => {
            return list.map((item) => {
                if (item.id == parentId) {
                    return {
                        ...item,
                        children: [
                            ...item.children,
                            {
                                id: new Date(),
                                name: name,
                                isFolder: isFolder,
                                children: []
                            }
                        ]
                    }
                }
                if (item.children) {
                    return {
                        ...item,
                        children: updateList(item.children)
                    }
                }
                return item
            })
        }
        setData((prev) => updateList(prev))
    }

    return (
        <>
            <div className="sidebar-container">
                <List record={data} addNodeList={addNodeList} deleteNode={deleteNode} />
            </div>
        </>
    )
}