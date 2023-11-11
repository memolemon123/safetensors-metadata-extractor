import Box from '@mui/material/Box';
import { Explanation } from './explanation/explanation';
import { ExtractorCore } from './extractor-core/extractor-core';

export function MetadataExtractor() {
    return (
        <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Explanation></Explanation>
            <ExtractorCore></ExtractorCore>
        </Box>
    );
}