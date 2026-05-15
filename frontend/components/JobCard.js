"use client";

export default function JobCard({ job }) {
  return (
    <article className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{job.title}</h3>
      <p className="text-sm text-gray-600 dark:text-gray-300 mt-2 line-clamp-4">{job.description}</p>
      <div className="mt-4 flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
        <span className="inline-block px-2 py-1 text-xs bg-gray-100 dark:bg-slate-700 rounded">{job.priority ?? 'General'}</span>
        <span>{job.createdAt ? new Date(job.createdAt).toLocaleDateString() : ''}</span>
      </div>
    </article>
  );
}
