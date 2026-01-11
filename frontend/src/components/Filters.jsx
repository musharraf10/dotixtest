export default function Filters({ setFilters }) {
    return (
        <div className="flex flex-wrap gap-4">
            {/* Status Filter */}
            <div className="flex-1 min-w-[200px]">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                    Status
                </label>
                <select
                    className="
            w-full px-3 py-2 rounded-lg text-sm
            bg-white dark:bg-gray-800
            text-gray-900 dark:text-gray-100
            border border-gray-300 dark:border-gray-700
            focus:outline-none focus:ring-2 focus:ring-gray-900 dark:focus:ring-gray-100
            focus:border-transparent transition-shadow
          "
                    onChange={(e) =>
                        setFilters(f => ({ ...f, status: e.target.value }))
                    }
                >
                    <option value="">All Status</option>
                    <option value="pending">Pending</option>
                    <option value="running">Running</option>
                    <option value="completed">Completed</option>
                </select>
            </div>

            {/* Priority Filter */}
            <div className="flex-1 min-w-[200px]">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                    Priority
                </label>
                <select
                    className="
            w-full px-3 py-2 rounded-lg text-sm
            bg-white dark:bg-gray-800
            text-gray-900 dark:text-gray-100
            border border-gray-300 dark:border-gray-700
            focus:outline-none focus:ring-2 focus:ring-gray-900 dark:focus:ring-gray-100
            focus:border-transparent transition-shadow
          "
                    onChange={(e) =>
                        setFilters(f => ({ ...f, priority: e.target.value }))
                    }
                >
                    <option value="">All Priority</option>
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                </select>
            </div>
        </div>
    );
}
