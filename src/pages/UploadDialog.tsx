import React, { useState, useCallback } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import { useDropzone, FileRejection } from 'react-dropzone';
import { useAuth } from '../contexts/AuthProvider';

interface UploadDialogProps {
    open: boolean;
    onClose: () => void;
    jobsActive: number
    setJobsActive: React.Dispatch<React.SetStateAction<number>>;
}


const UploadDialog: React.FC<UploadDialogProps> = ({ open, onClose, setJobsActive, jobsActive }) => {
    const [files, setFiles] = useState<File[]>([]);
    const { token } = useAuth();

    const handleUpload = () => {
        const file = files[0]

        const endpoint = "http://localhost:8000/api/taskscheduler/render-tasks/run_task/"
        fetch(endpoint, {
            method:'POST',
            body: file,
            headers: {
                'Authorization': `Token ${token}`,
                'Content-Type': 'application/octet-stream'
            }
        })
        .then(response => response.json())
        .then((data: any) => {
            console.log('Upload successful:', data);
            setJobsActive(jobsActive + 1)
            onClose();
        })
    }
    const onDrop = useCallback((acceptedFiles: File[], fileRejections: FileRejection[]) => {
        setFiles(acceptedFiles);
        if (fileRejections.length > 0) {
            console.log('Rejected files:', fileRejections);
        }
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, maxFiles: 1});

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
                {files.length > 0 && (
                    <ul className="mt-4">
                        {files.map((file, index) => (
                            <li key={index}>{file.name}</li>
                        ))}
                    </ul>
                )}
            </DialogContent>
            <DialogActions>
                <Button color="secondary" onClick={onClose}>Cancel</Button>
                <Button color="primary" onClick={handleUpload}>Upload</Button>
            </DialogActions>
        </Dialog>
    );
};

export default UploadDialog;
