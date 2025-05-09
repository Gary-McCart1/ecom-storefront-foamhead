import React from 'react'
import { Product } from '../types/product'

interface Props {
    product: Product;
}

const DiscountValue = ({product}: Props) => {

  return (
    <div className="bg-[#659f9c] px-3 text-white py-1">
        <p className="font-semibold font-sans">Save ${product.originalPrice - product.price}</p>
    </div>
  )
}

export default DiscountValue