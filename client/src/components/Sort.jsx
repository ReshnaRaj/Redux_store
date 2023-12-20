import React from 'react'

const Sort = () => {
  return (
    <div className="dropdown dropdown-bottom">
  <div tabIndex={0} role="button" className="btn m-1">Sorted By:</div>
  <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
    <li><a>Lastly added</a></li>
    <li><a>lastly updated</a></li>
  </ul>
</div>
  )
}

export default Sort