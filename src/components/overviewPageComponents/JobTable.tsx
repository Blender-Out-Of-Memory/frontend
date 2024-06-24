import React, { useState } from "react";

function TableHeader({ content }: { content: string }) {
    return (
        <th
            scope="col"
            className={
                "px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
            }
        >
            {content}
        </th>
    );
}

function TableField({ content, last }: { content: string; last?: boolean }) {
    return (
        <td
            className={`px-6 py-4 whitespace-nowrap ${last == true ? "rounded-lg" : ""}`}
        >
            {content}
        </td>
    );
}

const JobTable = () => {
    const mockJobs = [
        {
            id: 1,
            job: "105020573_cinema_bokeh_v001",
            started: "2022-01-29 10:20",
            completedAt: "2022-01-29 10:40",
            duration: "42s",
            progress: 100,
            status: "Completed",
            action: "View Details",
        },
        {
            id: 2,
            job: "105020568_ocean_artistic_v013",
            submitted: "2022-01-29",
            started: "2022-01-29 11:05",
            completedAt: "2022-01-29 11:25",
            duration: "1m 12s",
            progress: 100,
            status: "Completed",
            action: "View Details",
        },
        {
            id: 3,
            job: "105020560_4k_Atlantic_Dome_Light",
            started: "2022-01-30 10:32",
            completedAt: "2022-01-30 11:02",
            duration: "3s",
            progress: 100,
            status: "Completed",
            action: "View Details",
        },
        {
            id: 4,
            job: "105020530_MiOps_FeelinBreezish_v02",
            started: "2022-01-30 12:00",
            completedAt: "2022-01-30 12:30",
            duration: "10s",
            progress: 100,
            status: "Completed",
            action: "View Details",
        },
        {
            id: 5,
            job: "105020527_Houdini_15_SeaWeed_v01",
            started: "2022-01-30 13:45",
            completedAt: "2022-01-30 14:15",
            duration: "15s",
            progress: 100,
            status: "Completed",
            action: "View Details",
        },
    ];
    const [jobs, setJobs] = useState(mockJobs);

    return (
        <div className="ml-12 mr-12 mt-5 mb-5 max-h-[calc(100vh-140px)] overflow-auto">
            <table className="min-w-full divide-y divide-gray-200 rounded-lg border border-gray-300">
                <thead className="bg-secondary-navy text-white sticky top-0 rounded-lg">
                    <tr>
                        <TableHeader content="id" />
                        <TableHeader content="job" />
                        <TableHeader content="started" />
                        <TableHeader content="completed" />
                        <TableHeader content="duration" />
                        <TableHeader content="progress" />
                        <TableHeader content="status" />
                        <TableHeader content="Download" />
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {jobs.map((job) => (
                        <tr key={job.id}>
                            <TableField
                                content={job.id.toString()}
                            ></TableField>
                            <TableField content={job.job}></TableField>
                            <TableField content={job.started}></TableField>
                            <TableField content={job.completedAt}></TableField>
                            <TableField content={job.duration}></TableField>
                            <TableField
                                content={job.progress.toString()}
                            ></TableField>
                            <TableField
                                content={job.status}
                                last={true}
                            ></TableField>
                            <th scope="col" className="px-6 py-3">
                                {" "}
                                <button>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        stroke="currentColor"
                                        className="size-6"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3"
                                        />
                                    </svg>
                                </button>
                            </th>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default JobTable;
