import Footer from '@/app/components/Footer'
import Navigation from '@/app/components/Navigation'
import ProductInfo from '@/app/components/ProductInfo'
import React from 'react'

const ProductPage = () => {
  return (
    <div className="">
        <Navigation opaque={true} home={false} />
        <div className="page">
            <ProductInfo />
        </div>
        <Footer />
      </div>
  )
}

export default ProductPage