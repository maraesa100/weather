import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { MenuObj, getMenuData, hasMenu, MenuRequestLoading } from './menuSlice'
import styles from './Menu.module.css'

import feedrLogo from '../../img/feedr-logo-1.png'

export function Menu() {
  const Menu = useSelector(MenuObj)
  const MenuSuccess = useSelector(hasMenu)
  const MenuLoading = useSelector(MenuRequestLoading)
  const dispatch = useDispatch()
  const [menuSearchTerm, setSearchTerm] = useState('')

  return (
    <div className={styles.container}>
      <img src={feedrLogo} alt='' className={styles.icon} />
      <h1>Menu App</h1>

      <div>
        <input
          type='text'
          name='menu_name_input'
          id=''
          onChange={e => setSearchTerm(e.target.value)}
          placeholder='Search for menu items...'
        />
      </div>
      <button onClick={() => dispatch(getMenuData(String(menuSearchTerm)))}>
        Get Menu
      </button>
      {MenuLoading && !MenuSuccess && <div>Loading</div>}
      {MenuSuccess && (
        <div>
          <h2>{Menu.items}</h2>
        </div>
      )}
    </div>
  )
}
