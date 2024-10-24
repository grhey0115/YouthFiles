import React from "react";
import { usePage, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { Container, Box, Typography, Card as MuiCard, CardContent, Grid, Button } from '@mui/material';
import styled from "styled-components";
import DocumentScannerIcon from '@mui/icons-material/DocumentScanner';
import SecurityIcon from '@mui/icons-material/Security';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';

const HelpCenter = () => {
    const { auth } = usePage().props;

    return (
        <AuthenticatedLayout user={auth}>
            <Container maxWidth="lg">
                <StyledWrapper>
                    <Header>
                        <Typography variant="h4" component="h1" gutterBottom>
                            Get Assistance from Our Help Center
                        </Typography>
                        <Typography variant="body1" color="textSecondary">
                            Need help with document requests, tanod services, or borrowing equipment and facilities? Our Help Center is here to assist you with all your needs.
                        </Typography>
                    </Header>
                    <Grid container spacing={2} justifyContent="center">
                        <Grid item xs={12} sm={6} md={3}>
                            {/* Use Inertia Link to navigate to SKDocumentRequestForm */}
                            <Link href="/document-request">
                                <CustomCard 
                                    title="Document Request" 
                                    color="#007bff" 
                                    icon={<DocumentScannerIcon sx={{ fontSize: 40 }} />} 
                                />
                            </Link>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <CustomCard 
                                title="Tanod Request" 
                                color="#28a745" 
                                icon={<SecurityIcon sx={{ fontSize: 40 }} />} 
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <CustomCard 
                                title="Borrow Equipment" 
                                color="#ffc107" 
                                icon={<FitnessCenterIcon sx={{ fontSize: 40 }} />} 
                            />
                        </Grid>
                    </Grid>
                    <HowItWorks />
                </StyledWrapper>
            </Container>
        </AuthenticatedLayout>
    );
};

const CustomCard = ({ title, color, icon }) => {
    return (
        <MuiCard sx={{ 
            backgroundColor: color, 
            color: 'white', 
            height: 150, 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center',
            borderRadius: '8px', // Rounded corners
            boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)' // Soft shadow
        }}>
            <CardContent>
                <Box display="flex" flexDirection="column" alignItems="center">
                    {icon}
                    <Typography variant="h6" component="div" align="center" sx={{ mt: 1 }}>
                        {title}
                    </Typography>
                </Box>
            </CardContent>
        </MuiCard>
    );
};

const HowItWorks = () => {
    return (
        <Box sx={{ mt: 5, textAlign: 'center' }}>
            <Typography variant="h5" gutterBottom>
                How it works
            </Typography>
            <Typography variant="body1" color="textSecondary">
                Get started with 3 easy steps
            </Typography>
            <Grid container spacing={4} justifyContent="center" sx={{ mt: 2 }}>
                <Grid item xs={12} sm={4}>
                    <StepCard number="1" title="Application Entry" />
                </Grid>
                <Grid item xs={12} sm={4}>
                    <StepCard number="2" title="Payment" />
                </Grid>
                <Grid item xs={12} sm={4}>
                    <StepCard number="3" title="Pick Up" />
                </Grid>
            </Grid>
        </Box>
    );
};

const StepCard = ({ number, title }) => {
    return (
        <MuiCard sx={{ 
            height: 120, 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            padding: 2, 
            borderRadius: '8px', // Rounded corners 
            boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)' // Soft shadow
        }}>
            <CardContent>
                <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#007bff' }}>
                    {number}
                </Typography>
                <Typography variant="body1" color="textSecondary">
                    {title}
                </Typography>
            </CardContent>
        </MuiCard>
    );
};

const StyledWrapper = styled.div`
    padding: 40px 20px; // Adjusted padding
    background-color: #f9fafb; // Light background similar to PSA
    border-radius: 10px;
`;

const Header = styled(Box)`
    margin-bottom: 30px;
    text-align: center;
`;

export default HelpCenter;
