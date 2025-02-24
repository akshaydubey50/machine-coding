import React, { useEffect, useState } from 'react'

export default function InfiniteScroll() {
    const [data,setData]=useState([]);
    const [page,setPage]=useState(1);

    useEffect(()=>{
        fetch("https://picsum.photos/v2/list?page="+page+"&limit=3").then((res)=>res.json()).then((arr)=>setData((prev)=>[...prev,...arr]))
    },[page])


    useEffect(()=>{
        const observer = new IntersectionObserver((param)=>{
            console.log(param)
            if (param[0].isIntersecting) {
                observer.unobserve(lastImage);
                    setPage((pageNo) => pageNo + 1);

            }
        })

        const lastImage=document.querySelector(".image-container:last-child");
        console.log("lastImage::::",lastImage)

        if(!lastImage){
            return
        }
        observer.observe(lastImage)
    },[data])

    const List =({list})=>{
        return(
            <>
            {list?.map((item)=>(
                <div key={`${item.id}`} className='image-container'>
                <img src={`${item?.download_url}`}  loading='eager' className='h-[350px] w-[250px] rounded-lg shadow-2xl object-cover m-1'/> 
             </div>
            ))}
            </>
        )
    }
  return (
    <div className='h-screen flex flex-col justify-center items-center'>
        <List list={data}/>
    </div>
  )
}
