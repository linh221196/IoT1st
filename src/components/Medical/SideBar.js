import { Menu, MenuItem } from 'react-pro-sidebar';

const HeaderBar = () => {
    return (
        <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-around',
            backgroundColor: '#333',
            color: '#fff',
            width: '100%',
            padding: '10px 0',
            position: 'fixed',
            top: 0,
            zIndex: 1000
        }}>
            <Menu style={{ display: 'flex', flexDirection: 'row' }}>
                <MenuItem>Pie charts</MenuItem>
                <MenuItem>Line charts</MenuItem>
                <MenuItem>Google maps</MenuItem>
                <MenuItem>Open street maps</MenuItem>
            </Menu>
        </div>
    );
};

export default HeaderBar;