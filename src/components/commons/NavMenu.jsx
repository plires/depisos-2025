import {
  Menu,
  SubMenu,
  MenuItem,
  MenuButton,
  MenuDivider,
} from '@szhsin/react-menu'
import { NavLink } from 'react-router-dom'
import '@szhsin/react-menu/dist/index.css'
import '@szhsin/react-menu/dist/transitions/zoom.css'
import ChevronRight from '@/components/commons/ChevronRight'

const NavMenu = () => {
  return (
    <>
      <Menu
        menuButton={
          <button
            style={{ marginLeft: 20 }}
            type='button'
            className='btn btnProducts'
          >
            Productos
            <ChevronRight
              className='transition'
              style={{ marginLeft: 5, color: '#000000' }}
            />
          </button>
        }
        transition
      >
        <SubMenu label='Revestimientos'>
          <MenuItem>
            <NavLink className='transition' to={'productos/wall-panel'}>
              Wall Panel
            </NavLink>
          </MenuItem>
          <MenuItem>
            <NavLink className='transition' to={'productos/siding'}>
              Siding
            </NavLink>
          </MenuItem>
          <MenuItem>
            <NavLink className='transition' to={'productos/perfiles'}>
              Perfiles
            </NavLink>
          </MenuItem>
          <MenuDivider />
          <MenuItem>
            <NavLink className='transition' to={'productos/flat-panel'}>
              Flat Panel
            </NavLink>
          </MenuItem>
          <MenuDivider />
          <MenuItem>
            <NavLink className='transition' to={'productos/vinyl-panel'}>
              Vinyl Panel
            </NavLink>
          </MenuItem>
        </SubMenu>
        <MenuDivider />
        <MenuItem>
          <NavLink className='transition' to={'productos/deck-dual'}>
            Deck Dual
          </NavLink>
        </MenuItem>
        <MenuDivider />
        <MenuItem>
          <NavLink className='transition' to={'productos/pisos-melaminicos'}>
            Pisos a Prueba de Agua
          </NavLink>
        </MenuItem>
        <MenuDivider />
        <MenuItem>
          <NavLink className='transition' to={'productos/cielorrasos'}>
            Cielorraso Impreso
          </NavLink>
        </MenuItem>
      </Menu>
      <Menu
        menuButton={
          <button type='button' className='btn'>
            <NavLink className='transition' to={'/nosotros'}>
              Nosotros
            </NavLink>
          </button>
        }
        transition
      ></Menu>
      {/* <Menu
        menuButton={
          <button type='button' className='btn'>
            <NavLink className='transition' to={'/blog'}>
              Blog
            </NavLink>
          </button>
        }
        transition
      ></Menu> */}
      <Menu
        menuButton={
          <button type='button' className='btn'>
            <NavLink className='transition' to={'/profesionales'}>
              Profesionales
            </NavLink>
          </button>
        }
        transition
      ></Menu>
      <Menu
        menuButton={
          <button type='button' className='btn'>
            <NavLink className='transition' to={'/sustentabilidad'}>
              Sustentabilidad
            </NavLink>
          </button>
        }
        transition
      ></Menu>
      <Menu
        menuButton={
          <button type='button' className='btn'>
            <NavLink className='transition' to={'/contacto'}>
              Contacto
            </NavLink>
          </button>
        }
        transition
      ></Menu>
    </>
  )
}
export default NavMenu
