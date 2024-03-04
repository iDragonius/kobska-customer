import styles from './NavbarLoading.module.scss'

function NavbarLoading() {
  return (
    <div className={styles.main}>
      <ul className={styles.wrapper}>
        {[1, 2, 3, 4, 5, 6].map(i => (
          <li key={i}>
            <span
              className={styles.element}
              style={{
                animationDelay: `${i * 0.05}s`,
                animationDuration: '1s'
              }}
            ></span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default NavbarLoading
