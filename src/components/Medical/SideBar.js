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
                <MenuItem>MedicalHome</MenuItem>
                <MenuItem>MedicalAddPatient</MenuItem>
            </Menu>
        </div>
    );
};

export default HeaderBar;