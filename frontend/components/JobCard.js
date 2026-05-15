export default function JobCard({ job }) {
  return (
    <article className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
      <h3 className="text-lg font-semibold text-gray-900">{job.title}</h3>
      <p className="mt-2 line-clamp-4 text-sm text-gray-600">{job.description}</p>
      <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
        <span className="inline-block rounded bg-gray-100 px-2 py-1 text-xs">{job.priority ?? "General"}</span>
        <span>{job.createdAt ? new Date(job.createdAt).toLocaleDateString() : ""}</span>
      </div>
      <a href={`/jobs/${job._id}`} className="text-blue-500 mt-3 inline-block">
        View Details
      </a>
    </article>
  );
}
