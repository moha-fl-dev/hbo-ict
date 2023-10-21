import { DepartmentsLayout, WorkspaceRootLayout } from '@hbo-ict/ui';
import { useIsFetching } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

const data = [
  {
    name: 'Jan',
    total: Math.floor(Math.random() * 5000) + 1000,
    uv: Math.floor(Math.random() * 5000) + 1000,
    pv: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: 'Feb',
    total: Math.floor(Math.random() * 5000) + 1000,
    uv: Math.floor(Math.random() * 5000) + 1000,
    pv: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: 'Mar',
    total: Math.floor(Math.random() * 5000) + 1000,
    uv: Math.floor(Math.random() * 5000) + 1000,
    pv: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: 'Apr',
    total: Math.floor(Math.random() * 5000) + 1000,
    uv: Math.floor(Math.random() * 5000) + 1000,
    pv: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: 'May',
    total: Math.floor(Math.random() * 5000) + 1000,
    uv: Math.floor(Math.random() * 5000) + 1000,
    pv: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: 'Jun',
    total: Math.floor(Math.random() * 5000) + 1000,
    uv: Math.floor(Math.random() * 5000) + 1000,
    pv: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: 'Jul',
    total: Math.floor(Math.random() * 5000) + 1000,
    uv: Math.floor(Math.random() * 5000) + 1000,
    pv: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: 'Aug',
    total: Math.floor(Math.random() * 5000) + 1000,
    uv: Math.floor(Math.random() * 5000) + 1000,
    pv: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: 'Sep',
    total: Math.floor(Math.random() * 5000) + 1000,
    uv: Math.floor(Math.random() * 5000) + 1000,
    pv: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: 'Oct',
    total: Math.floor(Math.random() * 5000) + 1000,
    uv: Math.floor(Math.random() * 5000) + 1000,
    pv: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: 'Nov',
    total: Math.floor(Math.random() * 5000) + 1000,
    uv: Math.floor(Math.random() * 5000) + 1000,
    pv: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: 'Dec',
    total: Math.floor(Math.random() * 5000) + 1000,
    uv: Math.floor(Math.random() * 5000) + 1000,
    pv: Math.floor(Math.random() * 5000) + 1000,
  },
];

export default function ManageDepartments() {
  const [barData, setBarData] = React.useState(data);
  const isFetching = useIsFetching();
  const router = useRouter();

  useEffect(() => {
    setBarData(
      data.map((item) => {
        return {
          ...item,
          total: Math.floor(Math.random() * 5000) + 1000,
          uv: Math.floor(Math.random() * 5000) + 1000,
          pv: Math.floor(Math.random() * 5000) + 1000,
        };
      })
    );
  }, [router.query.department]);

  if (isFetching > 0) {
    return (
      <div className="fixed top-0 left-0 z-50 flex items-center justify-center w-screen h-screen bg-white bg-opacity-50">
        {/* <div className="w-20 h-20 border-4 border-gray-15 rounded-full animate-spin"></div> */}
        <svg
          xmlns="http://www.w3.org/150/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="animate-spin"
        >
          <line x1="12" x2="12" y1="2" y2="6" />
          <line x1="12" x2="12" y1="18" y2="22" />
          <line x1="4.93" x2="7.76" y1="4.93" y2="7.76" />
          <line x1="16.24" x2="19.07" y1="16.24" y2="19.07" />
          <line x1="2" x2="6" y1="12" y2="12" />
          <line x1="18" x2="22" y1="12" y2="12" />
          <line x1="4.93" x2="7.76" y1="19.07" y2="16.24" />
          <line x1="16.24" x2="19.07" y1="7.76" y2="4.93" />
        </svg>
      </div>
    );
  }

  if (!router.query.department) {
    return <div className="col-span-4 bg-slate-50/50">No data to display</div>;
  }

  return (
    <div className="col-span-4 bg-slate-50/50 flex flex-col justify-evenly items-center gap-2">
      <h1 className="font-bold text-3xl text-slate-400">
        {router.query.department}
      </h1>
      {router.query.department && (
        <ResponsiveContainer height={350} width={'100%'}>
          <LineChart data={barData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="name"
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="pv" stroke="#8884d8" />
            <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}

ManageDepartments.getLayout = function getLayout(page: JSX.Element) {
  return (
    <WorkspaceRootLayout>
      <DepartmentsLayout>{page}</DepartmentsLayout>
    </WorkspaceRootLayout>
  );
};
