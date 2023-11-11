import Paper from "@mui/material/Paper";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";


export function Footer() {
    return (
        <Paper elevation={3} sx={{
            width: '100%',
            position: 'fixed',
            bottom: 0,
        }}>
            <Container>
                <Typography variant="body1" component="div">
                    Copyright 2023 SAFETENSORS METADATA EXTRACTOR All Rights Reserved
                </Typography>
            </Container>
        </Paper>
    );
}