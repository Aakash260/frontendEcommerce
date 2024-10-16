import { ReactElement, useState,useEffect } from "react";
import { FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Column } from "react-table";
import AdminSidebar from "../../components/admin/AdminSidebar";
import TableHOC from "../../components/admin/TableHOC";
import { useAllProductsQuery } from "../../redux/api/productApi";
import { server } from "../../redux/store";
import toast from "react-hot-toast";
import { CustomError } from "../../types/api-types";
import { useSelector } from "react-redux";
import { UserReducerInitail } from "../../types/reducer-types";
 

interface DataType {
  photo: ReactElement;
  name: string;
  price: number;
  stock: number;
  action: ReactElement;
}

const columns: Column<DataType>[] = [
  {
    Header: "Photo",
    accessor: "photo",
  },
  {
    Header: "Name",
    accessor: "name",
  },
  {
    Header: "Price",
    accessor: "price",
  },
  {
    Header: "Stock",
    accessor: "stock",
  },
  {
    Header: "Action",
    accessor: "action",
  },
];
 
const Products = () => {
  const [rows, setRows] = useState<DataType[]>([]);

  const {user}=useSelector((state:{userReducer:UserReducerInitail})=>state.userReducer)

  const {isError,error,data}=useAllProductsQuery(user?._id!)

if(isError) toast.error((error as CustomError).data.message)


useEffect(() => {
  if(data) setRows(data.products.map((i)=>({
    photo:<img src={`${server}/${i.photo}`}/>,
    name:i.name,
    price:i.price,
    stock:i.stock,
    action:<Link to ={`/admin/product/${i._id}`}>Manage</Link>
  })))
}, [data])



  const Table = TableHOC<DataType>(
    columns,
    rows,
    "dashboard-product-box",
    "Products",
    rows.length > 6
  )();

  return (
    <div className="admin-container">
      <AdminSidebar />
      <main>{Table}</main>
      <Link to="/admin/product/new" className="create-product-btn">
        <FaPlus />
      </Link>
    </div>
  );
};

export default Products;
