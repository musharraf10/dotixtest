export default function PriorityBadge({ priority }) {
    const styles = {
        Low: 'bg-gray-50 text-gray-600 border-gray-200',
        Medium: 'bg-orange-50 text-orange-600 border-orange-200',
        High: 'bg-red-50 text-red-600 border-red-200',
    };

    return (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium border ${styles[priority]}`}>
            {priority}
        </span>
    );
}
