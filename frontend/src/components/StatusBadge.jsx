export default function PriorityBadge({ priority }) {
    const styles = {
        Low:
            'bg-gray-50 text-gray-600 border-gray-200 ' +
            'dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700',

        Medium:
            'bg-orange-50 text-orange-600 border-orange-200 ' +
            'dark:bg-orange-900/30 dark:text-orange-300 dark:border-orange-800',

        High:
            'bg-red-50 text-red-600 border-red-200 ' +
            'dark:bg-red-900/30 dark:text-red-300 dark:border-red-800',
    };

    return (
        <span
            className={`inline-flex items-center px-2.5 py-0.5
        rounded-md text-xs font-medium border
        transition-colors ${styles[priority]}`}
        >
            {priority}
        </span>
    );
}
