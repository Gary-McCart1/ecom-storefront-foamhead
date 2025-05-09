"use client"
import { TiStarFullOutline, TiStarHalfOutline } from "react-icons/ti";

interface Props {
    num: string
}

const Stars = ({num}: Props) => {
    const starArray = []
    for(let i = 0; i < Number(num.split(".")[0]); i++){
        starArray.push(<TiStarFullOutline className="text-[#e89160]" />)
    }
    if(Number(num.split(".")[1])){
        starArray.push(<TiStarHalfOutline className="text-[#e89160]" />)
    }

  return (
    <>
        {starArray.map((star, index) => (
            <span className="px-[2px]" key={index}>{star}</span>
        ))}
    </>
  )
}

export default Stars