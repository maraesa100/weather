import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppThunk, RootState } from '../../app/store'
import axios from 'axios'

interface SingleMenuItem {
  id: number
  name: string
  dietaries: Array<string>
}

interface MenuState {
  loading: boolean
  hasErrors: boolean
  hasMenuData: boolean
  errorMessage: string
  MenuData: {
    items: Array<SingleMenuItem>
  }
}

const initialState: MenuState = {
  loading: false,
  hasErrors: false,
  hasMenuData: false,
  errorMessage: '',
  MenuData: {
    items: []
  }
}

export const menuSlice = createSlice({
  name: 'Menu',
  initialState,
  reducers: {
    getMenu: state => {
      state.loading = true
    },
    getMenuSuccess: (state, { payload }) => {
      state.MenuData = payload
      state.loading = false
      state.hasErrors = false
      state.hasMenuData = true
    },
    getMenuFailure: (state, { payload }) => {
      state.errorMessage = payload
      state.loading = false
      state.hasErrors = false
    }
  }
})

export const { getMenu, getMenuFailure, getMenuSuccess } = menuSlice.actions

export function getMenuData(menu: string): AppThunk {
  return (dispatch: any) => {
    dispatch(getMenu())
    setTimeout(() => {
      // mocks API delay
      axios
        .get('http://localhost:8080/api/meals/')
        .then(result => {
          console.log('debug', result)
          dispatch(getMenuSuccess(result.data))
        })
        .catch(error => {
          dispatch(getMenuFailure(error.message))
        })
    }, 1000)
  }
}

export const MenuObj = (state: RootState) => state.Menu.MenuData
export const hasMenu = (state: RootState) => state.Menu.hasMenuData
export const MenuRequestLoading = (state: RootState) => state.Menu.loading

export default menuSlice.reducer
