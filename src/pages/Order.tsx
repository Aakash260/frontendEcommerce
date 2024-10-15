import { ReactElement, useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Column } from 'react-table'
import TableHOC from '../components/admin/TableHOC'
import { Skeleton } from '../components/Loader'
import { useMyOrdersQuery } from '../redux/api/orderApi'
import { CustomError } from '../types/api-types'
import { UserReducerInitail } from '../types/reducer-types'

type DataType={
    _id:string,
    amount:number,
    quantity:number,
    discount:number,
    status:ReactElement,
    action:ReactElement
}

const column: Column<DataType>[]=[
    {
    Header:"ID",
    accessor:"_id",
},
{
    Header:"Quantity",
    accessor:"quantity",
},
{
    Header:"Discount",
    accessor:"discount",
},
{
    Header:"Amount",
    accessor:"amount",
},
{
    Header:"Status",
    accessor:"status",
},
{
    Header:"Action",
    accessor:"action",
},
]
const order = () => {
 
    const {user}=useSelector((state:{userReducer:UserReducerInitail})=>state.userReducer)

    const {isLoading,data,isError,error}=useMyOrdersQuery(user?._id!)
 
    if(isError) toast.error((error as CustomError).data.message)
 
    const [rows,setRows]=useState<DataType[]>([
       
    ])

    useEffect(() => {
        if (data)
          setRows(
            data.orders.map((i) => ({
              _id: i._id,
              amount: i.total,
              discount: i.discount,
              quantity: i.orderItems.length,
              status: (
                <span
                  className={
                    i.status === "Processing"
                      ? "red"
                      : i.status === "Shipped"
                      ? "green"
                      : "purple"
                  }
                >
                  {i.status}
                </span>
              ),
              action: <Link to={`/admin/transaction/${i._id}`}>Manage</Link>,
            }))
          );
      }, [data]);
    
const Table=TableHOC<DataType>(column,rows,"dashboard-product-box","Orders",rows.length>6)()
    return (
    <div className='container'>
        <h1>Orders</h1>
        <main>{ isLoading ? <Skeleton/>:Table}</main>


    </div>
  )
}

export default order