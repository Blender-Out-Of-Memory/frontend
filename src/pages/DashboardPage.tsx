import JobTable from "../components/overviewPageComponents/JobTable";
import TopBar from "../components/common/TopBar";
import React, { useState } from 'react';
import UploadDialog from './UploadDialog'; 
import { useAuth } from "../contexts/AuthProvider";

const DashboardPage = () => {
    const [open, setOpen] = useState(false);
    const [jobsActive, setJobsActive] = useState<number>(0);
    const { username } = useAuth();

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    return (
        <div className="flex flex-col h-screen">
            <TopBar></TopBar>
            <div className="bg-bg-primary overflow-hidden flex-grow">
                <div className="flex flex-row ml-12 mr-12 mt-8 gap-8">
                    <div className="flex flex-row items-center bg-secondary-navy w-2/4 h-20 rounded-md justify-between">
                        <div className="text-2xl text-white indent-10">
                            Hallo, {username}!
                        </div>
                        <button
                            onClick={handleOpen}
                            type="submit"
                            className="bg-primary text-white focus:ring-4 w-1/4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-10"
                        >
                            Launch Render
                        </button>
                        <UploadDialog open={open} onClose={handleClose} jobsActive={jobsActive} setJobsActive={setJobsActive}/>
                    </div>
                    <div className="bg-secondary-navy w-1/4 h-20 rounded-md pt-3 pb-2 pl-5 pr-5">
                        <div className="text-text-white font-bold text-lg">
                            Jobs Active
                        </div>
                        <div className="text-white text-lg">{jobsActive}</div>
                    </div>
                    <div className="bg-secondary-navy w-1/4 h-20 rounded-md pt-3 pb-2 pl-5 pr-5">
                        <div className="text-text-white font-bold text-lg">
                            Jobs Completed
                        </div>
                        <div className="text-white text-lg">0</div>
                    </div>
                </div>
                <JobTable jobsActive={jobsActive}></JobTable>
            </div>
        </div>
    );
};

export default DashboardPage;
