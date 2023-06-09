
import React, { FC } from 'react'

import styles from './index.module.scss'
interface DeleteConfirmationProps {
    message:string;
    onConfirm: ()=>void;
    onCancel: ()=>void;
     setShowConfirmation: (show: boolean) => void;
}

const DeleteConfirmation: FC<DeleteConfirmationProps>=({
    message,
    onConfirm,
    onCancel,
    setShowConfirmation,
}) => {
  return (
    <div className={styles.confirmation_container}>
     <div className={styles.pop_up_Box}>
      <h2>{message}</h2>
      <div className={styles.button}>
        <button onClick={() => {
  onConfirm();
  setShowConfirmation(false); // Hide the DeleteConfirmation component
}}>Confirm</button>
      <button onClick={onCancel}>Cancel</button>
      </div>
     </div>

    </div>
  )
}

export default DeleteConfirmation;

