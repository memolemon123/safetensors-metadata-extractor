import Box from '@mui/material/Box';
import { ResultJson } from './result-json/result-json';
import { CopyButton } from './copy-button/copy-button';
import { breakpoints } from '../../../../util/style/breakpoint';

export function ResultArea({ jsoncontent }: { jsoncontent: string }) {

    return (
        <>
            {(!!jsoncontent) &&
                <Box minWidth={{ xs: "none", sm: breakpoints[0] }} maxWidth={{ xs: "100%", sm: "80%" }} sx={{ position: "relative", mt: "30px" }}>
                    <ResultJson jsoncontent={jsoncontent}></ResultJson>
                    <CopyButton jsoncontent={jsoncontent}></CopyButton>
                </Box>
            }
        </>
    );
}