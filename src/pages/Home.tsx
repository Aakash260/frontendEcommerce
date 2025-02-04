import toast from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { Skeleton } from '../components/Loader'
import ProductCard from '../components/ProductCard'
import { useLatestProductsQuery } from '../redux/api/productApi'
import { addToCart } from '../redux/reducer/cartReducer'
import { CartItem } from '../types/types'

const Home = () => {

const dispatch=useDispatch()

const addToCarthandler=(cartItem:CartItem)=>{
if(cartItem.stock<1){
  return toast.error("Out of Stock")
}
dispatch(addToCart(cartItem));
toast.success('added to cart')
}

const {data,isError,isLoading}=useLatestProductsQuery("")
 
 if(isError) toast.error('can not fetch the product')

  return (
    <div className="home">
      <section>
        <h1>Latest Product
        <Link to="/search" className='findmore'>More</Link>
        </h1>
        <main className="main">
          { isLoading?<Skeleton width='80vw'/>:
            data?.products.map((i)=>{
          return <ProductCard key={i._id} productId={i._id} name={i.name} price={i.price} stock={i.stock} handler={addToCarthandler} photo={i.photo}/>

            })
          }
        </main>
      </section>
      </div>
  )
}

export default Home