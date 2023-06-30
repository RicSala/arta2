'use client'

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import qs from "query-string";

// I am gonna try to do it like this, but I am not sure if this is gonna work
// UPDATE: It works, but I am not sure if it is safe, so I am gonna use qs library

// const getAllQueryParams = (params) => {
//     let query = {};
//     let paramkeys = [
//         'category',
//     ]

//     paramkeys.forEach((key) => {
//         params.get(key) && (query[key] = params.get(key));
//     });
//     return query;
// }


// // given a query object, return a string of query params, skipping null values
// const getQueryString = (query) => {
//     let queryString = '';
//     Object.keys(query).forEach((key) => {
//         if (query[key]) {
//             queryString += `${key}=${query[key]}&`;
//         }
//     });
//     return queryString;
// }


const CategoryBox = ({
    label,
    description,
    icon: Icon, // REVIEW: we give an alias so we can use it as a component
    selected,
}) => {

    const router = useRouter();
    const params = useSearchParams();

    // TODO: Actually I don't want to do it with params but with url query. I guess I will have to do something like /categories/[cat] and create a page 
    const handleCategoryClick = useCallback(() => {



        let currentQuery = {};

        if (params) {
            // currentQuery = getAllQueryParams(params);
            currentQuery = qs.parse(params.toString());
        }

        const updatedQuery = {
            ...currentQuery,
            category: label,
        };

        if (params?.get("category") === label) { // If the category is already selected, we remove it from the query on click
            delete updatedQuery.category;
        }

        // const url = `/tatuadores?${getQueryString(updatedQuery)}`;
        const url = qs.stringifyUrl({
            url: '/',
            query: updatedQuery,
        },
            { skipNull: true }
        );


        router.push(url);

    }, [label, params, router]);

    return (
        <div

            onClick={handleCategoryClick}
            className={`
            flex
            flex-col
            items-center
            justify-center
            gap-2
            p-3
            border-b-2
            hover:text-neutral-800
            transition
            cursor-pointer
            ${selected ? "border-b-neutral-800" : "border-transparent"}
            ${selected ? "text-neutral-800" : "text-neutral-500"}
        `}>
            <Icon size={26} />
            <div className="font-medium text-sm">
                {label}
            </div>
        </div>
    )
};

export default CategoryBox;