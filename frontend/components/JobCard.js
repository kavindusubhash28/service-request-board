export default function JobCard({ job }) {
  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "open":
        return "bg-green-100 text-green-800";
      case "inprogress":
        return "bg-yellow-100 text-yellow-800";
      case "close":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <article className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm cursor-pointer">
      <div className="flex items-start justify-between mb-4">
        <span className="text-xs text-gray-500 font-medium">{job.createdAt ? new Date(job.createdAt).toLocaleDateString() : ""}</span>
        <span className={`inline-block rounded-full px-3 py-1 text-xs font-bold ${getStatusColor(job.status)}`}>
          {job.status ?? "Open"}
        </span>
      </div>
      <h3 className="text-lg font-bold text-gray-900 mb-2">{job.title}</h3>
      <p className="line-clamp-3 text-sm text-gray-600">{job.description}</p>
      <a href={`/jobs/${job._id}`} className="text-blue-600 mt-4 inline-block font-semibold text-sm">
        View Details →
      </a>
    </article>
  );
}
