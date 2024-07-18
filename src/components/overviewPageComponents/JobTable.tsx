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
    setJobsActive: React.Dispatch<React.SetStateAction<number>>;
    jobsCompleted : number
    setJobsCompleted: React.Dispatch<React.SetStateAction<number>>;
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

function extractTimeComponents(dateTimeString: string) {
  const [datePart, timePart] = dateTimeString.split(', ');

  const [hours, minutes, seconds] = timePart.split(':').map(Number);

  return { hours, minutes, seconds };
}

function formattedTime(time: string | null): string {
    if (!time){
        return "N/A"
    }
    const date = new Date(time);
    const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: '2-digit',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
        timeZone: 'UTC'
    }
    return new Intl.DateTimeFormat('de-DE', options).format(date);
}

function diff(fromTimestamp: string | null, toTimestamp: string | null): string {
    if (!fromTimestamp || !toTimestamp) {
        return "N/A";
    }
    
    const { hours: fromHours, minutes: fromMinutes, seconds: fromSeconds } = extractTimeComponents(fromTimestamp);
    const { hours: toHours, minutes: toMinutes, seconds: toSeconds } = extractTimeComponents(toTimestamp);

    const fromTotalSeconds = fromHours * 3600 + fromMinutes * 60 + fromSeconds;
    const toTotalSeconds = toHours * 3600 + toMinutes * 60 + toSeconds;

    let differenceInSeconds = Math.abs(toTotalSeconds - fromTotalSeconds);

    const hours = Math.floor(differenceInSeconds / 3600);
    differenceInSeconds -= hours * 3600;

    const minutes = Math.floor(differenceInSeconds / 60);
    differenceInSeconds -= minutes * 60;

    const seconds = differenceInSeconds;
    return `${minutes}m ${seconds}s`;

}

const JobTable: React.FC<JobTableProps> = ({ jobsActive, setJobsActive, setJobsCompleted}) => {
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

    //const [jobs, setJobs] = useState<Job[]>([])

    useEffect(() => {
        fetchData();
    }, [jobsActive]);

    useEffect(() => {
    const interval = setInterval(() => {
      updateJobProgress();
    }, 5000); // Update every 5 seconds

    return () => clearInterval(interval);
  }, [jobs]);

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
          id: job.TaskID_Int,
          job: job.job || 'Unknown',
          started: formattedTime(job.StartedAt),
          completedAt: formattedTime(job.FinishedAt),
          duration: diff(job.startedAt, job.FinishedAt)|| 'N/A',
          progress: job.stage || 0,
          status: job.Stage || 'Unknown',
          action: job.action || 'View Details',
            }));
            setJobs(formattedJobs);
            let activeCount = 0;
            let completedCount = 0;
            for (const job of formattedJobs) {
                if (job.status === "6-FIN" || job.status === "7-EXP") {
                    completedCount++;
                } else {
                    activeCount++;
                }
                setJobsCompleted(completedCount);
                setJobsActive(activeCount);
            }
        } catch (error) {
          console.error("Error loggin out:", error);
        }
    }

      const updateJobProgress = async () => {
    try {
      const updatedJobs = await Promise.all(
        jobs.map(async (job) => {
          const response = await fetch(
            `http://localhost:8000/api/taskscheduler/render-tasks/${job.id}/job-progress/`,
            {
              method: "GET",
              headers: {
                Authorization: `Token ${token}`,
              },
            }
          );
          const jsonData = await response.json();
          return {
            ...job,
            completedAt: formattedTime(jsonData.finishedAt),
            duration: diff(job.started, formattedTime(jsonData.finishedAt)),
            progress: jsonData.totalProgress || job.progress,
            status: jsonData.Stage || job.status,
          };
        })
      );
      setJobs(updatedJobs);
      let activeCount = 0;
        let completedCount = 0;
        for (const job of updatedJobs) {
            if (job.status === "6-FIN" || job.status === "7-EXP") {
                completedCount++;
            } else {
                activeCount++;
            }
        }
        setJobsCompleted(completedCount);
        setJobsActive(activeCount);

    } catch (error) {
      console.error("Error updating job progress:", error);
    }
  };

  const handleDownload = async (fileId : number) => {
        try {
            const response = await fetch(`http://localhost:8000/api/taskscheduler/render-tasks/${fileId}/download/`, {
                method: 'GET',
                headers: {
                    'Authorization': `Token ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error('Download failed');
            }

            const contentDisposition = response.headers.get('Content-Disposition');
            let filename = 'download'; // default filename
            if (contentDisposition) {
                const filenameMatch = contentDisposition.match(/filename="?(.+)"?/i);
                if (filenameMatch) {
                    filename = filenameMatch[1];
                }
            }

            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.style.display = 'none';
            a.href = url;
            a.download = filename; 
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error('Download error:', error);
        }
    };


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
                        <TableHeader content="Sync" />
                    </tr>
                </thead>
                <tbody className="bg-background-secondary divide-y divide-gray-200 text-text-normal">
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
                            <button className="focus:outline-none" onClick={() => handleDownload(job.id)}>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth={1.5}
                                            stroke={job.status !== "6-FIN" ? 'lightgrey' : 'black'}
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
                            <th scope="col" className="px-6 py-3">
                                <button>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
                                        stroke="currentColor"
                                        strokeWidth={0.5}
                                        className="size-6"
                                    >
                                        <path d="M21.66 10.37a.62.62 0 0 0 .07-.19l.75-4a1 1 0 0 0-2-.36l-.37 2a9.22 9.22 0 0 0-16.58.84 1 1 0 0 0 .55 1.3 1 1 0 0 0 1.31-.55A7.08 7.08 0 0 1 12.07 5a7.17 7.17 0 0 1 6.24 3.58l-1.65-.27a1 1 0 1 0-.32 2l4.25.71h.16a.93.93 0 0 0 .34-.06.33.33 0 0 0 .1-.06.78.78 0 0 0 .2-.11l.08-.1a1.07 1.07 0 0 0 .14-.16.58.58 0 0 0 .05-.16zM19.88 14.07a1 1 0 0 0-1.31.56A7.08 7.08 0 0 1 11.93 19a7.17 7.17 0 0 1-6.24-3.58l1.65.27h.16a1 1 0 0 0 .16-2L3.41 13a.91.91 0 0 0-.33 0H3a1.15 1.15 0 0 0-.32.14 1 1 0 0 0-.18.18l-.09.1a.84.84 0 0 0-.07.19.44.44 0 0 0-.07.17l-.75 4a1 1 0 0 0 .8 1.22h.18a1 1 0 0 0 1-.82l.37-2a9.22 9.22 0 0 0 16.58-.83 1 1 0 0 0-.57-1.28z"></path>
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
