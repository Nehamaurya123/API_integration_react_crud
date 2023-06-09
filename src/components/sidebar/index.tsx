import { FC } from 'react';
import styles from './index.module.scss';
import { Link } from 'react-router-dom';

const SidebarComponent: FC<any> = () => {
  return (
    <div className={styles.sidebar}>
        <>
          <div className={styles.top_menu}>
             <div className={styles.dashboard}>Dashboard</div>
                 <div className={styles.menu}>
                    <Link to='/add'>
                <div className={styles.name}>Add Books</div></Link>
              </div>
             
              <div className={styles.menu}>
                <Link to='/show'>
                 <div className={styles.name}>Show All Books</div></Link>
              </div>
            
            
          </div>
          
        </>
    </div>
  );
};

export default SidebarComponent;




// import React from 'react'

// const SidebarComponent = () => {
//   return (
//     <div>
      
//     </div>
//   )
// }

// export default SidebarComponent

