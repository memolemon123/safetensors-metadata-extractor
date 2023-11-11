import { useEffect, useState } from "react";
import Box from '@mui/material/Box';
import { SafetensorsInput } from "./safetensors-input/safetensors-input";
import { ResultArea } from "./result-area/result-area";
import Snackbar from '@mui/material/Snackbar';
import { Alert } from "../../../util/alert/alert";

export function ExtractorCore() {
    const [jsoncontent, setJsoncontent] = useState<string>("");
    const [doSuccessSnack, setDoSuccessSnack] = useState(false);

    useEffect(() => {
        setDoSuccessSnack(!!jsoncontent);
    }, [jsoncontent])

    const handleSnackClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setDoSuccessSnack(false);
    };
    return (
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <SafetensorsInput setJsoncontent={setJsoncontent}></SafetensorsInput>
            <ResultArea jsoncontent={jsoncontent}></ResultArea>
            <Snackbar
                open={doSuccessSnack}
                autoHideDuration={6000}
                onClose={handleSnackClose}
                message="Note archived"
            >
                <Alert severity="success" onClose={handleSnackClose}>Metadata Extracted!</Alert>
            </Snackbar>
        </Box >
    );
}