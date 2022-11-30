import * as React from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Menu from '@mui/material/Menu'
import MenuIcon from '@mui/icons-material/Menu'
import Container from '@mui/material/Container'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import Tooltip from '@mui/material/Tooltip'
import MenuItem from '@mui/material/MenuItem'
import FolderIcon from '@mui/icons-material/Folder'
import { Link, useNavigate } from 'react-router-dom'
import { getCurrentUser } from '../../services/auth.service'
import { colorPrimary } from '../../utils/colors'

function ResponsiveAppBar() {
  const navigate = useNavigate()
  const [anchorElNav, setAnchorElNav] = React.useState(null)
  const [anchorElUser, setAnchorElUser] = React.useState(null)
  const [settings, setSettings] = React.useState([])
  const [pagesObject, setPagesObject] = React.useState([])

  React.useEffect(() => {
    const userObject = getCurrentUser()
    if (!userObject) {
      setSettings([{ text: 'Log in', link: '/login' }, { text: 'Sign up', link: '/signup' }])
      setPagesObject([])
    } else {
      setSettings([{ text: 'Profile', link: '/' }, { text: 'Logout', link: 'logout' }])
      setPagesObject([{ text: 'Dashboard', link: '/' }, { text: 'Transactions', link: '/history' }, { text: 'Create account', link: '/account' }, { text: 'Create transaction', link: '/transaction' }, { text: 'Register record', link: '/record' }])
    }
  }, [])

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget)
  }
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget)
  }

  const handleCloseNavMenu = () => {
    setAnchorElNav(null)
  }

  const handleCloseUserMenu = (settingItem) => {
    setAnchorElUser(null)
    if (settingItem.link) {
      const isLinkNavigate = (settingItem.link).includes('/')
      if (isLinkNavigate) {
        navigate(settingItem.link)
      } else {
        localStorage.removeItem('user')
        navigate('/login')
      }
    }
  }

  return (
    <AppBar position="static" style={{ backgroundColor: colorPrimary }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'white',
              textDecoration: 'none',
            }}
          >
            FT
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            {pagesObject.length > 0
              && (
                <>
                  <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={handleOpenNavMenu}
                    color="inherit"
                  >
                    <MenuIcon />
                  </IconButton>
                  <Menu
                    id="menu-appbar"
                    anchorEl={anchorElNav}
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'left',
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'left',
                    }}
                    open={Boolean(anchorElNav)}
                    onClose={handleCloseNavMenu}
                    sx={{
                      display: { xs: 'block', md: 'none' },
                    }}
                  >
                    {pagesObject.map((page) => (
                      <MenuItem key={page.text} onClick={handleCloseNavMenu}>
                        <Link to={page.link}>
                          <Typography
                            key={page.text}
                            textAlign="center"
                            color="black"
                          >
                            {page.text}
                          </Typography>
                        </Link>
                      </MenuItem>
                    ))}
                  </Menu>

                </>
              )}

          </Box>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'white',
              textDecoration: 'none',
            }}
          >
            FT
          </Typography>
          {pagesObject.length > 0
            && (
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              {pagesObject.map((page) => (
                <Button
                  key={page.text}
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, display: 'block' }}
                >
                  <Link to={page.link}>
                    <Typography textAlign="center" color="white">{page.text}</Typography>
                  </Link>
                </Button>
              ))}
            </Box>
            )}

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar>
                  <FolderIcon />
                </Avatar>
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting.text} onClick={() => handleCloseUserMenu(setting)}>
                  <Typography textAlign="center">{setting.text}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}
export default ResponsiveAppBar
