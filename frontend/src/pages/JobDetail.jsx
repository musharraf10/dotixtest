import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchJobById } from '../api/jobsApi';
import StatusBadge from '../components/StatusBadge';
import PriorityBadge from '../components/PriorityBadge';

export default function JobDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [job, setJob] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchJobById(id)
            .then(res => setJob(res.data))
            .finally(() => setLoading(false));
    }, [id]);

    if (loading) {
        return (
            <div className="max-w-4xl mx-auto">
                <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-12 text-center shadow-sm">
                    <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-gray-900 dark:border-gray-200 border-r-transparent"></div>
                    <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
                        Loading job details...
                    </p>
                </div>
            </div>
        );
    }

    if (!job) {
        return (
            <div className="max-w-4xl mx-auto">
                <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-12 text-center shadow-sm">
                    <p className="text-gray-600 dark:text-gray-400">Job not found</p>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            {/* Header */}
            <div>
                <button
                    onClick={() => navigate('/')}
                    className="inline-flex items-center text-sm text-gray-600 dark:text-gray-400
            hover:text-gray-900 dark:hover:text-gray-100 mb-4 transition-colors"
                >
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Back to Dashboard
                </button>

                <div className="flex items-start justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                            {job.taskName}
                        </h1>
                        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                            Job ID: {job.id}
                        </p>
                    </div>
                    <StatusBadge status={job.status} />
                </div>
            </div>

            {/* Job Info */}
            <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800">
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                        Job Information
                    </h2>
                </div>

                <div className="p-6 space-y-4">
                    <div className="grid grid-cols-2 gap-6">
                        <div>
                            <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                                Priority
                            </p>
                            <PriorityBadge priority={job.priority} />
                        </div>

                        <div>
                            <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                                Status
                            </p>
                            <StatusBadge status={job.status} />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-6 pt-4 border-t border-gray-200 dark:border-gray-800">
                        <div>
                            <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                                Created At
                            </p>
                            <p className="text-sm text-gray-900 dark:text-gray-100">
                                {new Date(job.createdAt).toLocaleString('en-US', {
                                    month: 'long',
                                    day: 'numeric',
                                    year: 'numeric',
                                    hour: '2-digit',
                                    minute: '2-digit',
                                    second: '2-digit'
                                })}
                            </p>
                        </div>

                        <div>
                            <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                                Last Updated
                            </p>
                            <p className="text-sm text-gray-900 dark:text-gray-100">
                                {new Date(job.updatedAt).toLocaleString('en-US', {
                                    month: 'long',
                                    day: 'numeric',
                                    year: 'numeric',
                                    hour: '2-digit',
                                    minute: '2-digit',
                                    second: '2-digit'
                                })}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Payload */}
            <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800">
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                        Payload
                    </h2>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                        Job execution data in JSON format
                    </p>
                </div>

                <div className="p-6">
                    <pre className="bg-gray-900 dark:bg-gray-950 text-gray-100 p-5 rounded-lg text-sm overflow-x-auto font-mono leading-relaxed">
                        {JSON.stringify(JSON.parse(job.payload), null, 2)}
                    </pre>
                </div>
            </div>
        </div>
    );
}
