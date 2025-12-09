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

const NavMenu = ({ closeNavMobile }) => {
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
        <SubMenu label='Línea wpc'>
          <MenuItem>
            <NavLink
              onClick={() => closeNavMobile()}
              className='transition'
              to={'productos/wall-panel'}
            >
              Wall Panel
            </NavLink>
          </MenuItem>
          <MenuDivider />
          <MenuItem>
            <NavLink
              onClick={() => closeNavMobile()}
              className='transition'
              to={'productos/siding'}
            >
              Siding
            </NavLink>
          </MenuItem>
          <MenuDivider />
          <MenuItem>
            <NavLink
              onClick={() => closeNavMobile()}
              className='transition'
              to={'productos/perfiles'}
            >
              Perfiles
            </NavLink>
          </MenuItem>
          <MenuDivider />
          <MenuItem>
            <NavLink
              onClick={() => closeNavMobile()}
              className='transition'
              to={'productos/deck-dual'}
            >
              Deck Dual
            </NavLink>
          </MenuItem>
        </SubMenu>

        <MenuDivider />

        <MenuItem>
          <NavLink
            onClick={() => closeNavMobile()}
            className='transition'
            to={'productos/flat-panel'}
          >
            Flat Panel
          </NavLink>
        </MenuItem>

        <MenuDivider />

        <SubMenu label='Cielorraso'>
          <MenuItem>
            <NavLink
              onClick={() => closeNavMobile()}
              className='transition'
              to={'productos/cielorraso/foliados'}
            >
              Foliados
            </NavLink>
          </MenuItem>
          <MenuDivider />
          <MenuItem>
            <NavLink
              onClick={() => closeNavMobile()}
              className='transition'
              to={'productos/cielorraso/printer'}
            >
              Printer
            </NavLink>
          </MenuItem>
        </SubMenu>

        <MenuDivider />

        <SubMenu label='Vinyl Panel'>
          <MenuItem>
            <NavLink
              onClick={() => closeNavMobile()}
              className='transition'
              to={'productos/vinyl-panel/plenos'}
            >
              Plenos
            </NavLink>
          </MenuItem>
          <MenuDivider />
          <MenuItem>
            <NavLink
              onClick={() => closeNavMobile()}
              className='transition'
              to={'productos/vinyl-panel/foliados'}
            >
              Foliados
            </NavLink>
          </MenuItem>
          <MenuDivider />
          <MenuItem>
            <NavLink
              onClick={() => closeNavMobile()}
              className='transition'
              to={'productos/vinyl-panel/printer'}
            >
              Printer
            </NavLink>
          </MenuItem>
        </SubMenu>

        <MenuDivider />

        <SubMenu label='Pisos Waterproof'>
          <MenuItem>
            <NavLink
              onClick={() => closeNavMobile()}
              className='transition'
              to={'productos/pisos-waterproof/melaminicos'}
            >
              Melaminicos
            </NavLink>
          </MenuItem>
          <MenuDivider />
          <MenuItem>
            <NavLink
              onClick={() => closeNavMobile()}
              className='transition'
              to={'productos/pisos-waterproof/spc'}
            >
              SPC
            </NavLink>
          </MenuItem>
        </SubMenu>
      </Menu>
      <Menu
        menuButton={
          <button type='button' className='btn'>
            <NavLink
              onClick={() => closeNavMobile()}
              className='transition'
              to={'/nosotros'}
            >
              Nosotros
            </NavLink>
          </button>
        }
        transition
      ></Menu>
      <Menu
        menuButton={
          <button type='button' className='btn'>
            <NavLink
              onClick={() => closeNavMobile()}
              className='transition'
              to={'/profesionales'}
            >
              Profesionales
            </NavLink>
          </button>
        }
        transition
      ></Menu>
      <Menu
        menuButton={
          <button type='button' className='btn'>
            <NavLink
              onClick={() => closeNavMobile()}
              className='transition'
              to={'/sustentabilidad'}
            >
              Sustentabilidad
            </NavLink>
          </button>
        }
        transition
      ></Menu>
      <Menu
        menuButton={
          <button type='button' className='btn'>
            <NavLink
              onClick={() => closeNavMobile()}
              className='transition'
              to={'/contacto'}
            >
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
