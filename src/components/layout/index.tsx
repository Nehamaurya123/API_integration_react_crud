import React, { FC } from 'react'
import SidebarComponent from '../sidebar'
import Header from '../header'

type  PageLayoutType={
  children?:any;
  showHeader?:boolean
}
const LayoutComponent :FC<PageLayoutType> =({children,})=> {
  return (
    <div>
      {/* {showHeader && <Header />} */}
      <Header />
      <SidebarComponent />
      {children}
    </div>
  )
};

export default LayoutComponent
