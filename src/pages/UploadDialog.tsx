import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import { useDropzone } from 'react-dropzone';

interface UploadDialogProps {
    open: boolean;
    onClose: () => void;
}

const UploadDialog: React.FC<UploadDialogProps> = ({ open, onClose }) => {
    const { getRootProps, getInputProps, isDragActive } = useDropzone();

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Upload Files</DialogTitle>
            <DialogContent>
                <div {...getRootProps()} className="p-6 border-2 border-dashed border-gray-300 text-center">
                    <input {...getInputProps()} />
                    {
                        isDragActive ?
                        <p className="text-gray-500">Drop the files here ...</p> :
                        <p className="text-gray-500">Drag 'n' drop some files here, or click to select files</p>
                    }
                </div>
            </DialogContent>
            <DialogActions>
                <Button color="secondary" onClick={onClose}>Cancel</Button>
                <Button color="primary" onClick={onClose}>Upload</Button>
            </DialogActions>
        </Dialog>
    );
};

export default UploadDialog;
