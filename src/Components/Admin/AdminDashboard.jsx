import React, { useState, useEffect } from 'react';
import { Box, Button, Typography } from '@mui/material';
import AdminNavbar from '../Admin/AdminNavbar';
import UserTable from '../Admin/UserTable';
import PropertyTable from '../Admin/PropertyTable';
import { useTheme } from 'next-themes'; // Import useTheme to get the current theme
 
const AdminDashboard = () => {
    const [selectedSection, setSelectedSection] = useState('users'); // Default section
    const [users, setUsers] = useState([]);
    const [properties, setProperties] = useState([]);
    const { theme } = useTheme(); // Get the current theme
 
    useEffect(() => {
        // Fetch data based on selected section
        if (selectedSection === 'users') {
            fetchUsers();
        } else if (selectedSection === 'properties') {
            fetchProperties();
        }
    }, [selectedSection]);
 
    const fetchUsers = async () => {
        try {
            const response = await fetch('http://localhost:5176/api/Admin/customers');
            const data = await response.json();
            setUsers(data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };
 
    const fetchProperties = async () => {
        try {
            const response = await fetch('http://localhost:5176/api/Admin/properties');
            const data = await response.json();
            setProperties(data);
        } catch (error) {
            console.error('Error fetching properties:', error);
        }
    };
 
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', position: 'relative', minHeight: '100vh' }}>
            {/* Navigation Bar */}
            <AdminNavbar />
 
            {/* Main content area */}
            <Box
                sx={{
                    flexGrow: 1,
                    padding: '24px',
                    marginTop: '20px', // Adjusted marginTop to bring the box higher
                    borderRadius: '8px',
                    boxShadow: 2,
                    color: theme === 'dark' ? 'white' : 'black', // Set text color based on theme
                    transition: 'color 0.3s ease', // Add transition for text color
                }}
            >
                <Typography
                    variant="h4"
                    gutterBottom
                    sx={{
                        fontWeight: 'bold',
                        color: theme === 'dark' ? 'white' : 'black', // Change title color based on theme
                        transition: 'color 0.3s ease', // Add transition for title color
                        marginTop: '10px', // Maintain margin to position text closer to the nav bar
                    }}
                >
                    Admin Dashboard
                </Typography>
 
                {/* Section Buttons */}
                <Box sx={{ marginBottom: '20px', display: 'flex', gap: '20px' }}>
                    <Button
                        variant={selectedSection === 'users' ? 'contained' : 'outlined'}
                        color="primary"
                        onClick={() => setSelectedSection('users')}
                        sx={{
                            borderRadius: '8px',
                            padding: '10px 20px',
                            '&:hover': {
                                bgcolor: selectedSection === 'users' ? '#1976d2' : 'rgba(25, 118, 210, 0.1)', // Darken on hover
                            },
                            color: theme === 'dark' ? 'white' : 'black', // Button text color based on theme
                        }}
                    >
                        Users
                    </Button>
                    <Button
                        variant={selectedSection === 'properties' ? 'contained' : 'outlined'}
                        color="primary"
                        onClick={() => setSelectedSection('properties')}
                        sx={{
                            borderRadius: '8px',
                            padding: '10px 20px',
                            '&:hover': {
                                bgcolor: selectedSection === 'properties' ? '#1976d2' : 'rgba(25, 118, 210, 0.1)', // Darken on hover
                            },
                            color: theme === 'dark' ? 'white' : 'black', // Button text color based on theme
                        }}
                    >
                        Properties
                    </Button>
                </Box>
 
                {/* Conditionally render the tables based on selected section */}
                {selectedSection === 'users' && <UserTable users={users} />}
                {selectedSection === 'properties' && <PropertyTable properties={properties} />}
            </Box>
        </Box>
    );
};
 
export default AdminDashboard;