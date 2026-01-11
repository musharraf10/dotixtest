import { useEffect, useState } from 'react';
import { fetchJobs, runJob } from '../api/jobsApi';
import JobTable from '../components/JobTable';
import Filters from '../components/Filters';

export default function Dashboard() {
    const [jobs, setJobs] = useState([]);
    const [filters, setFilters] = useState({});
    const [loading, setLoading] = useState(false);
    const [runningJobId, setRunningJobId] = useState(null);

    const loadJobs = async () => {
        setLoading(true);
        const res = await fetchJobs(filters);
        setJobs(res.data);
        setLoading(false);
    };

    useEffect(() => {
        loadJobs();
    }, [filters]);

    const handleRunJob = async (jobId) => {
        try {
            setRunningJobId(jobId);
            await runJob(jobId);
            await loadJobs();
        } catch (err) {
            console.error('Failed to run job', err);
            alert('Failed to start job');
        } finally {
            setRunningJobId(null);
        }
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                    Dashboard
                </h1>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                    Manage and monitor your scheduled jobs
                </p>
            </div>

            {/* Filters */}
            <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-6 shadow-sm">
                <Filters setFilters={setFilters} />
            </div>

            {/* Loading State */}
            {loading && (
                <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-12 text-center shadow-sm">
                    <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-gray-900 dark:border-gray-200 border-r-transparent"></div>
                    <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
                        Loading jobs...
                    </p>
                </div>
            )}

            {/* Empty State */}
            {!loading && jobs.length === 0 && (
                <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-12 text-center shadow-sm">
                    <div className="mx-auto w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-4">
                        <svg
                            className="w-12 h-12 text-gray-400 dark:text-gray-500"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                            />
                        </svg>
                    </div>

                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                        No jobs found
                    </h3>

                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
                        {Object.keys(filters).some(key => filters[key])
                            ? 'Try adjusting your filters to see more results.'
                            : 'Get started by creating your first job.'}
                    </p>

                    {!Object.keys(filters).some(key => filters[key]) && (
                        <a
                            href="/create"
                            className="inline-flex items-center px-4 py-2 bg-gray-900 dark:bg-gray-100
                text-white dark:text-gray-900 text-sm font-medium rounded-lg
                hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
                        >
                            Create Job
                        </a>
                    )}
                </div>
            )}

            {/* Job Table */}
            {!loading && jobs.length > 0 && (
                <JobTable
                    jobs={jobs}
                    onRun={handleRunJob}
                    runningJobId={runningJobId}
                />
            )}
        </div>
    );
}
