import Box from '@mui/material/Box';
import Highlight from 'react-highlight';
import 'highlight.js/styles/stackoverflow-dark.css'
export function ResultJson({ jsoncontent }: { jsoncontent: string }) {
    return (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Box sx={{ width: "100%", whiteSpace: "pre-wrap", wordBreak: "break-all", textAlign: "left" }}>
                <Highlight className="json">
                    {jsoncontent}
                </Highlight>
            </Box>
        </Box>
    );
}