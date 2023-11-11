import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { MetadataExtractor } from "./metadata-extractor/metadata-extractor";
export function Home() {
    return (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Container sx={{ margin: "30px 0px 30px 0px" }}>
                <Paper sx={{ padding: "30px 0px 30px 0px" }}>
                    <MetadataExtractor></MetadataExtractor>

                </Paper>

            </Container>

        </Box>
    );
}