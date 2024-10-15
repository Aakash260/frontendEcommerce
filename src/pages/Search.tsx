import { useState } from 'react'
import toast from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import ProductCard from '../components/ProductCard'
import { useCategoriesQuery, useSearchProductsQuery } from '../redux/api/productApi'
import { addToCart } from '../redux/reducer/cartReducer'
import { CustomError } from '../types/api-types'
import { CartItem } from '../types/types'
const Search = () => {
 const {data:categoriesResponse,isLoading:loadingCategories,isError,error}=useCategoriesQuery("")
  const [search,setSearch]=useState("")
  const [sort,setSort]=useState("")
  const [maxPrice,setMaxPrice]=useState(0)
  const [category,setCategory]=useState("")
  const [page,setPage]=useState(1)

const dispatch=useDispatch();

  const addToCarthandler=(cartItem:CartItem)=>{
    if(cartItem.stock<1){
      return toast.error("Out of Stock")
    }
    dispatch(addToCart(cartItem));
    toast.success('added to cart')
    }



  const isNextPage=page>1;
  const isPrevPage=page<4;
 
 if (isError){
  const err= error as CustomError
toast.error(err.data.message) 
}
//  console.log(categoriesResponse)

const {isLoading:productLoading,data:searchedData,isError:productIsError,error:productError}=useSearchProductsQuery({search,sort,category,page,price:maxPrice})
// console.log("🚀 ~ Search ~ searchedData:", searchedData)

if(productIsError){
  const err= productError as CustomError
  toast.error(err.data.message)
}
return (
    <div className='product-search-page'>
      <aside>
        <h2>Filters</h2>
        <div>
          <h4>Sort</h4>
          <select value={sort} onChange={(e)=>setSort(e.target.value)}>
            <option value="">None</option>
            <option value="asc">Price (Low to High)</option>
            <option value="dsc">Price (High to Low)</option>
          </select>
        </div>

        <div>
          <h4>Max Price :{maxPrice || ""}</h4>
          <input type="range" min={100} max={100000} value={maxPrice} onChange={(e)=>setMaxPrice(Number(e.target.value))}/>
        </div>

        <div>
          <h4>Category</h4>
          <select value={category} onChange={(e)=>setCategory(e.target.value)}>
            <option value="">All</option>
            {
              loadingCategories===false && categoriesResponse?.categories.map((i)=>{
               return <option key={i} value={i}>{i}</option>
              })
            }
          </select>
        </div>

        
      </aside>
      <main>
      
          <h1>Products</h1>
         <input type="text" placeholder='Search by name...' value={search} onChange={(e)=>setSearch(e.target.value)} />
        <div className="search-product-list">
{
  searchedData?.product.map((i)=>{
    return <ProductCard key={i._id} productId={i._id} name={i.name} price={i.price} stock={i.stock} handler={addToCarthandler} photo={i.photo}/>

  })
}
        </div>


        

{
  searchedData && searchedData.totalPage>1 &&(
    <article>
          <button disabled={!isPrevPage} onClick={()=>setPage(prev=>prev-1)}>Prev</button>
          <span>{page} of {searchedData.totalPage}</span>
          <button disabled={!isNextPage} onClick={()=>setPage(prev=>prev+1)}>Next</button>
        </article>
  )
}

      </main>
    </div>
  )
}

export default Search