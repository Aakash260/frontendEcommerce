import { createApi,fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { AllCategoriesResponse, AllProductsResponse, DeleteProductResponse, MessageResponse, NewProductRequest, ProductResponse, SearchProductResponse, SearchProductResquest, UpdateProductRequest } from "../../types/api-types";

export const productApi=createApi({
reducerPath:'productApi',
baseQuery:fetchBaseQuery({
    baseUrl:`${import.meta.env.VITE_SERVER}/api/v1/product/`,
}),
tagTypes:["product"],
endpoints:(build)=>({
    latestProducts:build.query<AllProductsResponse,string>({query:()=>"latest",providesTags:["product"]}),
    allProducts:build.query<AllProductsResponse,string>({query:(id)=>`admin-products?id=${id}`,providesTags:["product"]}),
    categories:build.query<AllCategoriesResponse,string>({query:()=>`categories`,providesTags:["product"]}),
    searchProducts:build.query<SearchProductResponse,SearchProductResquest>({
        query:({price,search,sort,category,page})=>{
let base=`all?search=${search}&page=${page}`
if(price) base+=`&price=${price}`
if(sort) base+=`&sort=${sort}`
if(category) base+=`&category=${category}`
        return base
        },
        providesTags:["product"]
    }),

    productDetails:build.query<ProductResponse,string>({query:(id)=>id,providesTags:["product"]}),


    newProduct:build.mutation<MessageResponse,NewProductRequest>({query:({formData,id})=>({
        url:`new?id=${id}`,
        method: "POST",
        body:formData,
    }),invalidatesTags:["product"]}),

   updateProduct:build.mutation<MessageResponse,UpdateProductRequest>({query:({formData,userId,ProductId})=>({
        url:`${ProductId}?id=${userId}`,
        method: "PUT",
        body:formData,
    }),invalidatesTags:["product"]}),

    deleteProduct:build.mutation<MessageResponse,DeleteProductResponse>({query:({userId,ProductId})=>({
        url:`${ProductId}?id=${userId}`,
        method: "DELETE",
        
    }),invalidatesTags:["product"]}),
}),

})

export const {useLatestProductsQuery,useAllProductsQuery,useCategoriesQuery,useSearchProductsQuery,useNewProductMutation,useProductDetailsQuery,useUpdateProductMutation,useDeleteProductMutation}=productApi