import React, { useEffect } from 'react'
import { Collapse, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import InboxIcon from '@mui/icons-material/MoveToInbox';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import { Link, useLocation } from 'react-router-dom';
import { isPathIncluded } from '../../utils/helpers/global';

interface Props {
    open: boolean;
    item: any;
    handleDrawerOpen: () => void;
}

const Submenu: React.FC<Props> = ({ open, item, handleDrawerOpen }) => {
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
        const isPathPresent = isPathIncluded(location.pathname, item);
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
                    backgroundColor: ((isPathIncluded(location.pathname, item) && !open) || (isPathIncluded(location.pathname, item) && !nestedOpen)) ? '#1876d0' : 'transparent',
                    px: 2.5,
                }}
                onClick={handleNestedToggle}
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
                    <List sx={{ marginLeft: theme.spacing(2) }}>
                        {item?.subNav?.map((subItem: any, index: number) => {
                            const { Icon } = subItem;
                            const isSelected = location.pathname === subItem.path;
                            return (
                                <ListItem disablePadding sx={{background: isSelected ? '#1876d1' : 'transparent', borderTopLeftRadius: '7px', borderBottomLeftRadius: '7px'}}>
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
                        })}
                    </List>
                </Collapse>
            )}
        </ListItem>
    </>
  )
}

export default Submenu