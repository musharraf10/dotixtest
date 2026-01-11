import { useState } from 'react';
import { createJob } from '../api/jobsApi';
import { useNavigate } from 'react-router-dom';

export default function CreateJob() {
    const [form, setForm] = useState({
        taskName: '',
        payload: '',
        priority: 'Low'
    });
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();

    const validate = () => {
        const newErrors = {};

        if (!form.taskName.trim()) {
            newErrors.taskName = 'Task name is required';
        }

        if (!form.payload.trim()) {
            newErrors.payload = 'Payload is required';
        } else {
            try {
                JSON.parse(form.payload);
            } catch {
                newErrors.payload = 'Payload must be valid JSON';
            }
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const submit = async () => {
        if (!validate()) return;

        setIsSubmitting(true);
        try {
            await createJob({
                ...form,
                payload: JSON.parse(form.payload)
            });
            navigate('/');
        } catch {
            alert('Failed to create job. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                    Create Job
                </h1>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                    Schedule a new job with custom payload and priority
                </p>
            </div>

            {/* Form Card */}
            <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 shadow-sm p-8">
                <div className="space-y-6">
                    {/* Task Name */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Task Name <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            className={`w-full px-4 py-2.5 rounded-lg text-sm transition-shadow
                bg-white dark:bg-gray-800
                text-gray-900 dark:text-gray-100
                border ${errors.taskName
                                    ? 'border-red-300 bg-red-50 dark:bg-red-950'
                                    : 'border-gray-300 dark:border-gray-700'}
                focus:outline-none focus:ring-2 focus:ring-gray-900 dark:focus:ring-gray-100`}
                            placeholder="e.g., Send welcome email"
                            value={form.taskName}
                            onChange={e => {
                                setForm({ ...form, taskName: e.target.value });
                                if (errors.taskName) setErrors({ ...errors, taskName: null });
                            }}
                        />
                        {errors.taskName && (
                            <p className="mt-1.5 text-sm text-red-600">{errors.taskName}</p>
                        )}
                    </div>

                    {/* Priority */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Priority Level
                        </label>
                        <select
                            className="w-full px-4 py-2.5 rounded-lg text-sm
                bg-white dark:bg-gray-800
                text-gray-900 dark:text-gray-100
                border border-gray-300 dark:border-gray-700
                focus:outline-none focus:ring-2 focus:ring-gray-900 dark:focus:ring-gray-100"
                            value={form.priority}
                            onChange={e => setForm({ ...form, priority: e.target.value })}
                        >
                            <option>Low</option>
                            <option>Medium</option>
                            <option>High</option>
                        </select>
                        <p className="mt-1.5 text-xs text-gray-500 dark:text-gray-400">
                            Select the execution priority for this job
                        </p>
                    </div>

                    {/* Payload */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Payload (JSON) <span className="text-red-500">*</span>
                        </label>
                        <textarea
                            className={`w-full px-4 py-3 rounded-lg text-sm font-mono leading-relaxed resize-y transition-shadow
                bg-gray-50 dark:bg-gray-800
                text-gray-900 dark:text-gray-100
                border ${errors.payload
                                    ? 'border-red-300 bg-red-50 dark:bg-red-950'
                                    : 'border-gray-300 dark:border-gray-700'}
                focus:outline-none focus:ring-2 focus:ring-gray-900 dark:focus:ring-gray-100`}
                            rows={6}
                            placeholder='{
  "userId": 123,
  "email": "user@example.com",
  "template": "welcome"
}'
                            value={form.payload}
                            onChange={e => {
                                setForm({ ...form, payload: e.target.value });
                                if (errors.payload) setErrors({ ...errors, payload: null });
                            }}
                        />
                        {errors.payload && (
                            <p className="mt-1.5 text-sm text-red-600">{errors.payload}</p>
                        )}
                        <p className="mt-1.5 text-xs text-gray-500 dark:text-gray-400">
                            Enter a valid JSON object with job-specific data
                        </p>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-3 pt-4">
                        <button
                            onClick={submit}
                            disabled={isSubmitting}
                            className="px-6 py-2.5 rounded-lg text-sm font-medium transition-all
                bg-gray-900 dark:bg-gray-100
                text-white dark:text-gray-900
                hover:bg-gray-800 dark:hover:bg-gray-200
                focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900
                disabled:opacity-50 disabled:cursor-not-allowed active:scale-95"
                        >
                            {isSubmitting ? 'Creating...' : 'Create Job'}
                        </button>

                        <button
                            onClick={() => navigate('/')}
                            className="px-6 py-2.5 rounded-lg text-sm font-medium transition-all
                bg-white dark:bg-gray-800
                text-gray-700 dark:text-gray-200
                border border-gray-300 dark:border-gray-700
                hover:bg-gray-50 dark:hover:bg-gray-700
                focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
