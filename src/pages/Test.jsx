import { Menu, MenuItem, MenuButton } from '@szhsin/react-menu'
import '@szhsin/react-menu/dist/index.css'
import '@szhsin/react-menu/dist/transitions/zoom.css'

export default function Test() {
  return (
    <Menu
      menuButton={
        <button type='button' className='btn'>
          Acciones
        </button>
      }
      transition
    >
      <MenuItem>Cut</MenuItem>
      <MenuItem>Copy</MenuItem>
      <MenuItem>Paste</MenuItem>
    </Menu>
  )
}
