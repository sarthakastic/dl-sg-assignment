import { useNavigate } from 'react-router-dom'

import styles from './NotFound.module.css'

const NotFound = ({text,subtext}:{text?:string,subtext?:string}) => {

    const navigate = useNavigate()
  return (
    <div className={styles.notFoundContainer} >
        <p className={styles.text} >{text}</p>
        <p className={styles.subText} >{subtext}</p>
        <div className={styles.linkText}  onClick={()=>navigate('/')} >Go to Home</div>
    </div>
  )
}

export default NotFound