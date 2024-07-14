import React, { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthProvider";

interface Job {
  id: number;
  job: string;
  started: string;
  completedAt: string;
  duration: string;
  progress: number;
  status: string;
  action?: string; // Optional field
}

interface JobTableProps {
    jobsActive : number
}

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

const JobTable: React.FC<JobTableProps> = ({ jobsActive }) => {
    const [jobs, setJobs] = useState<Job[]>([]);

    useEffect(() => {
        fetchData();
    }, [jobsActive]);

  const { token } = useAuth();

    const fetchData = async () => {
    try {
          const endpoint = "http://localhost:8000/api/taskscheduler/render-tasks/";
          const response = await fetch(endpoint, {
            method: "GET",
            headers: {
              Authorization: `Token ${token}`,
            },
          });
          const jsonData = await response.json();
          console.log(jsonData)
          const formattedJobs: Job[] = jsonData.map((job: any) => ({
          id: job.taskID_Int || 0,
          job: job.job || 'Unknown',
          started: job.started || 'N/A',
          completedAt: job.completedAt || 'N/A',
          duration: job.duration || 'N/A',
          progress: job.stage || 0,
          status: job.stage || 'Unknown',
          action: job.action || 'View Details',
            }));
            setJobs(formattedJobs);
        } catch (error) {
          console.error("Error loggin out:", error);
        }
    }

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
