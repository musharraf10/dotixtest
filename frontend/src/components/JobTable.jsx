import PriorityBadge from './PriorityBadge';
import StatusBadge from './StatusBadge';
import { useNavigate } from 'react-router-dom';

export default function JobTable({ jobs, onRun, runningJobId }) {
    const navigate = useNavigate();

    return (
        <div className="overflow-hidden rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm">
            <table className="w-full">
                <thead className="bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                            Task Name
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                            Priority
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                            Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                            Created
                        </th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                            Action
                        </th>
                    </tr>
                </thead>

                <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                    {jobs.map(job => {
                        const isRunning = runningJobId === job.id;
                        const isDisabled = job.status !== 'pending' || isRunning;

                        return (
                            <tr
                                key={job.id}
                                onClick={() => navigate(`/jobs/${job.id}`)}
                                className="cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                            >
                                <td className="px-6 py-4 text-sm font-medium">
                                    {job.taskName}
                                </td>

                                <td className="px-6 py-4">
                                    <PriorityBadge priority={job.priority} />
                                </td>

                                <td className="px-6 py-4">
                                    <StatusBadge status={job.status} />
                                </td>

                                <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                                    {new Date(job.createdAt).toLocaleDateString('en-US', {
                                        month: 'short',
                                        day: 'numeric',
                                        year: 'numeric',
                                        hour: '2-digit',
                                        minute: '2-digit',
                                    })}
                                </td>

                                {/* Action column (excluded from row click) */}
                                <td
                                    className="px-6 py-4 text-right"
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    <button
                                        disabled={isDisabled}
                                        onClick={() => onRun(job.id)}
                                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all
                      ${isDisabled
                                                ? 'bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-500 cursor-not-allowed'
                                                : 'bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-200 active:scale-95'
                                            }`}
                                    >
                                        {isRunning ? 'Starting...' : 'Run Job'}
                                    </button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}
