'use client';

import { useRouter, useSearchParams } from 'next/navigation';

export function TimeFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentTime = searchParams.get('time') || '30d';

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newTime = e.target.value;
    const params = new URLSearchParams(searchParams.toString());
    params.set('time', newTime);
    params.set('page', '1'); // Reset to page 1 on filter change
    router.push(`/popular?${params.toString()}`);
  };

  return (
    <div className="relative">
      <select
        value={currentTime}
        onChange={handleChange}
        className="appearance-none bg-[#141414] border border-white/10 text-white text-sm rounded-lg px-4 py-2 pr-10 focus:outline-none focus:border-white/20 cursor-pointer"
      >
        <option value="24h">Last 24 Hours</option>
        <option value="7d">Last 7 Days</option>
        <option value="30d">Last 30 Days</option>
        <option value="3m">Last 3 Months</option>
        <option value="6m">Last 6 Months</option>
        <option value="1y">Last Year</option>
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-zinc-400">
        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
        </svg>
      </div>
    </div>
  );
}
