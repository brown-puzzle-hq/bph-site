function Dot() {
  return (
    <div className="absolute -start-1.5 mt-1.5 h-3 w-3 rounded-full border border-white bg-white dark:border-gray-900 dark:bg-gray-700"></div>
  );
}

type TimelineItem = {
  title: string;
  description: string;
};

export default function Timeline({ timeline }: { timeline: TimelineItem[] }) {
  return (
    <div className="relative rounded-2xl border border-gray-400 px-6">
      <div className="relative border-s border-gray-200 dark:border-gray-700">
        {timeline.map(({ title, description }) => (
          <div className="ms-4">
            <Dot />
            <p>
              <strong>{title}</strong>
            </p>
            <p className="text-main-accent">{description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
