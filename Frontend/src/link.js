import React from 'react'
import "./link.scss"
export default function Links() {
    const items =[ "Home","Recruiters","Contact"];
  return (
    <div className='links' >
       {items.map(item=>(
        < a href={`#${item}`} key={item}>{item}</a>
       ))}
    </div>
  )
}
