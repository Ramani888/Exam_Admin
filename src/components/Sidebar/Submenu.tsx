import React, { useEffect } from 'react'
import { Collapse, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import InboxIcon from '@mui/icons-material/MoveToInbox';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import { Link, useLocation } from 'react-router-dom';
import { getUserData, isPathIncluded } from '../../utils/helpers/global';

interface Props {
    open: boolean;
    item: any;
    handleDrawerOpen: () => void;
}

const Submenu: React.FC<Props> = ({ open, item, handleDrawerOpen }) => {
    const userData = getUserData();
    const { Icon } = item;
    const theme = useTheme();
    const location = useLocation();
    const [nestedOpen, setNestedOpen] = React.useState(false);

    const handleNestedToggle = () => {
        if (open) {
            setNestedOpen(!nestedOpen);
        } else {
            handleDrawerOpen()
            setNestedOpen(!nestedOpen);
        }
    };

    useEffect(() => {
        if (!open) {
            setNestedOpen(false)
        }
    }, [open])

    useEffect(() => {
        const isPathPresent = isPathIncluded(location.pathname, item?.subNav, item?.path);
        if (isPathPresent && open) {
            setNestedOpen(true)
        } else {
            setNestedOpen(false)
        }
    }, [location.pathname, open])
  return (
    <>
        <ListItem disablePadding sx={{ display: 'block' }}>
            <ListItemButton
                sx={{
                    minHeight: 48,
                    justifyContent: open ? 'initial' : 'center',
                    backgroundColor: isPathIncluded(location.pathname, item?.subNav, item?.path) && !nestedOpen ? '#274b6d' : 'transparent',
                    borderRight: isPathIncluded(location.pathname, item?.subNav, item?.path) && !nestedOpen ? '3px solid #1876d1' : 'none',
                    px: 2.5,
                }}
                onClick={handleNestedToggle}
                component={Link}
                to={!item?.subNav && item?.path}
            >
                <ListItemIcon
                    sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                    }}
                >
                    <Icon sx={{color: '#ffffff'}}/>
                </ListItemIcon>
                <ListItemText primary={item?.title} sx={{ opacity: open ? 1 : 0 }} />
                {open && item?.subNav && (nestedOpen ? <ExpandLess /> : <ExpandMore />)}
            </ListItemButton>
            {item?.subNav && (
                <Collapse in={nestedOpen} timeout="auto" unmountOnExit>
                    <List>
                        {item?.subNav?.map((subItem: any, index: number) => {
                            const { Icon } = subItem;
                            const isSelected = location.pathname === subItem.path;
                            const findPermission = userData?.permissionGroups?.find((permission: any) => permission?.group === subItem?.title);
                            if (findPermission?.permissions?.read) {
                                return (
                                    <ListItem disablePadding sx={{background: isSelected ? '#274b6d' : 'transparent', borderRight: isSelected ? '3px solid #1876d1' : 'none', paddingLeft: 7}}>
                                        <ListItemButton
                                            component={Link}
                                            to={subItem?.path}
                                        >
                                            {/* <ListItemIcon
                                                sx={{
                                                minWidth: 0,
                                                mr: open ? 3 : 'auto',
                                                justifyContent: 'center',
                                                }}
                                            >
                                                <Icon sx={{color: '#ffffff'}}/>
                                            </ListItemIcon> */}
                                            <ListItemText primary={subItem?.title} />
                                        </ListItemButton>
                                    </ListItem>
                                )
                            }
                        })}
                    </List>
                </Collapse>
            )}
        </ListItem>
    </>
  )
}

export default Submenu