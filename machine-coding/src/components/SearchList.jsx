import React, { useCallback, useEffect, useState, useRef } from 'react'
import { debounce } from 'lodash';

export default function SearchList() {
    const [list, setList] = useState([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(false);
    const inputHandler = (e) => {
        setSearch(e.target.value);
    }
    const cache = useRef({});
    const getProductList = async () => {
        try {
            if (!search.trim()) {
                setList([]);
                return;
            }
            if (cache.current[search]) {
                console.log("cache.current[search]", cache.current[search])
                setList(cache.current[search]);
                return;
            }


            try {
                const response = await fetch(`https://dummyjson.com/products/search?q=${search}`);
                const data = await response.json();
                cache.current[search] = data.products || [];
                setList(data?.products || []);
            } catch (error) {
                console.error("Error fetching products:", error);
                setList([]);
            } finally {
                setLoading(false);
            }
        } catch (error) {
            setList([])
            console.error("Error", error)

        } finally {
            setLoading(false)
        }
    }

    // Create a debounced version of getProductList function
    const debouncedGetProductList = useCallback(debounce(getProductList, 400), [search]);

    useEffect(() => {
        debouncedGetProductList();

    }, [search, debouncedGetProductList]);

    return (
        <>
            <div className="">
                {loading ? (<span>Loading...</span>) : ""}

            </div>
            <input onChange={inputHandler} value={search} placeholder="Search products..." />
            {list?.map((item) => (
                <div key={item.id}>
                    <p>{item.title}</p>
                </div>
            ))}

        </>
    )
}
