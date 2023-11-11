import { useDropzone, FileError } from 'react-dropzone';
import { extname } from 'path-browserify';
import { handleSafetensors } from './handle-safetensor/handle-safetensor';
import { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Snackbar from '@mui/material/Snackbar';
import AlertTitle from '@mui/material/AlertTitle';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import { Alert } from '../../../../util/alert/alert';
import styled from '@emotion/styled';
import { mq, breakpoints } from '../../../../util/style/breakpoint';

const SAFETENSORS_EXT = ".safetensors";

const InputRootBox = styled.div(({ accepted }: { accepted: boolean }) => ({
    width: '100%',
    [mq[0]]: {
        width: breakpoints[0]
    },
    border: 'dashed',
    cursor: 'pointer',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: "center",
    alignItems: "center",
    boxSizing: 'border-box',
    minHeight: '250px',
    borderColor: '#C8C8C8',
    backgroundColor: accepted ? '#a6dda8' : '#F0F0F0',
    '&:hover': {
        backgroundColor: '#dddddd',
    }
}));

function validateSafetensors(file: File): FileError | null {
    if (file.name == null) return null;
    if (extname(file.name).toLowerCase() !== SAFETENSORS_EXT) {
        return {
            code: "file extension error",
            message: "The specified file is not a safetensors type file."
        };
    }
    return null;
}

export function SafetensorsInput({ setJsoncontent }: { setJsoncontent: React.Dispatch<React.SetStateAction<string>> }) {
    const [showParseError, setShowParseError] = useState(false);
    const [parseError, setParseError] = useState("");
    const { getRootProps, getInputProps, fileRejections, isDragAccept } = useDropzone({
        multiple: false,
        onDrop(acceptedFiles, fileRejections, event) {
            setJsoncontent("");
        },
        onDropAccepted(files, event) {
            handleSafetensors(
                files[0],
                (s) => setJsoncontent(s),
                (errmsg) => {
                    setParseError(errmsg);
                    setShowParseError(true);
                }
            );
        },
        validator: validateSafetensors
    })

    const fileRejectionItem = fileRejections.map(({ file, errors }) => (
        <Alert severity="error" sx={{ mt: "30px" }}>
            <AlertTitle>Extraction Error</AlertTitle>
            <Box width={{ xs: "100%", sm: "inherit" }}>
                {file.name.length > 100 ? file.name.slice(1, 100) + "..." : file.name}
                <ul style={{ margin: 0, textAlign: "left" }}>
                    {errors.map(e => (
                        <li key={e.code} style={{ listStyle: "none" }}>{e.message}</li>
                    ))}
                </ul>
            </Box>
        </Alert>
    ))[0];

    const handleSnackClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setShowParseError(false);
    };

    return (
        <Box sx={{ width: "100%", mt: "20px", display: "flex", flexDirection: "column", alignItems: "center" }}>
            <InputRootBox {...getRootProps({ accepted: isDragAccept })}>
                <input {...getInputProps()}></input>
                <Box>
                    <UploadFileIcon sx={{ width: "2.5em", height: "2.5em" }}></UploadFileIcon>
                    <Typography variant='body2' sx={{ mt: "5px" }}>Drag & drop a safetensors file here, <br />or click to select a safetensors</Typography>
                </Box>
            </InputRootBox>
            {fileRejectionItem}
            <Snackbar
                open={showParseError}
                autoHideDuration={6000}
                onClose={handleSnackClose}
                message="Note archived"
            >
                <Alert severity="error" onClose={handleSnackClose}>{parseError}</Alert>
            </Snackbar>
        </Box>
    );
}