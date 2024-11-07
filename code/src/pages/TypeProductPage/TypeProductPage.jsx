import React, { useEffect, useState } from 'react'
import NavbarComponent from '../../components/NavbarComponent/NavbarComponent'
import CardComponent from '../../components/CardComponent/CardComponent'
import {  Col, Pagination, Row } from 'antd'
import { WrapperNavbar, WrapperProducts } from './style'
import { useLocation } from 'react-router'
import * as ProductService from '../../service/ProductService'
import { useSelector } from 'react-redux'
import { useDebounce } from '../../hooks/useDebounce'


const TypeProductPage = () => {
  const searchProduct = useSelector((state) => state?.product?.search)
  const searchDebounce = useDebounce(searchProduct, 800)

  const {state} = useLocation()
  const [products, setProducts] = useState([])
  const [panigate, setPanigate] = useState({
    page:0,
    limit:10,
    total:1
})
  const fetchProductType = async (type, page, limit) => {
    const res = await ProductService.getProductType(type, page, limit)
    if(res?.status === 'OK'){
      setProducts(res?.data)
      setPanigate({...panigate, total:res?.totalPage})
      console.log('res',res)
    }else{

    }
  }

  useEffect (() => {
    if(state){
      fetchProductType(state, panigate.page, panigate.limit)
    }
  },[state, panigate.page, panigate.limit])


  const onChange = (current, pageSize) =>{
    setPanigate({...panigate, page: current - 1, limit: pageSize})
  }
  return (
    <div style={{ width: '100%', background: '#e7dee2', height:'calc(100vh - 64px)'}}> 
       <div style={{ width:'100%',height:'100%', background: '#e7dee2'}}>
    <Row style={{ height:'100%', flexWrap:'nowrap', paddingTop:'10px'}}>
        <WrapperNavbar span={4} >
            <NavbarComponent /> 
        </WrapperNavbar>  
         <Col span={20} style={{display:'flex',padding:'0 10px', flexDirection:'column', justifyContent:'space-between'}}>
          <WrapperProducts>
            {products?.filter((pro) => {
              if(searchDebounce === ''){
                return pro
              }else if(pro?.name?.toLowerCase()?.includes(searchDebounce?.toLowerCase())){
                return pro
              }
            })?.map((data) => {
              return(
                <CardComponent 
                  key={data._id}
                  countInStock={data.countInStock}
                  description={data.description}
                  image={data.image}
                  name={data.name}
                  price={data.price}
                  rating={data.rating}
                  type={data.type}
                  selled={data.selled}
                  discount={data.discount}
                  id={data._id}
                />

              )
            })}
          </WrapperProducts>
            <Pagination align="start" defaultCurrent={panigate.page + 1} total={panigate?.total} onChange={onChange} style={{ textAlign:'center', margin:'0 auto'}}/>
        </Col>
    </Row>
  </div> 
    </div>


  )
}

export default TypeProductPage