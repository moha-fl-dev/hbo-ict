import { SummaryLink, TeamsLayout, WorkspaceRootLayout } from '@hbo-ict/ui';
import {
  LockOpen1Icon,
  LockClosedIcon,
  Link1Icon,
  LinkNone1Icon,
} from '@radix-ui/react-icons';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import {
  ResponsiveContainer,
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Line,
} from 'recharts';

const data = [
  {
    name: 'Jan',
    total: Math.floor(Math.random() * 50) + 100,
    uv: Math.floor(Math.random() * 50) + 100,
    pv: Math.floor(Math.random() * 50) + 100,
  },
  {
    name: 'Feb',
    total: Math.floor(Math.random() * 50) + 100,
    uv: Math.floor(Math.random() * 50) + 100,
    pv: Math.floor(Math.random() * 50) + 100,
  },
  {
    name: 'Mar',
    total: Math.floor(Math.random() * 50) + 100,
    uv: Math.floor(Math.random() * 50) + 100,
    pv: Math.floor(Math.random() * 50) + 100,
  },
  {
    name: 'Apr',
    total: Math.floor(Math.random() * 50) + 100,
    uv: Math.floor(Math.random() * 50) + 100,
    pv: Math.floor(Math.random() * 50) + 100,
  },
  {
    name: 'May',
    total: Math.floor(Math.random() * 50) + 100,
    uv: Math.floor(Math.random() * 50) + 100,
    pv: Math.floor(Math.random() * 50) + 100,
  },
  {
    name: 'Jun',
    total: Math.floor(Math.random() * 50) + 100,
    uv: Math.floor(Math.random() * 50) + 100,
    pv: Math.floor(Math.random() * 50) + 100,
  },
  {
    name: 'Jul',
    total: Math.floor(Math.random() * 50) + 100,
    uv: Math.floor(Math.random() * 50) + 100,
    pv: Math.floor(Math.random() * 50) + 100,
  },
  {
    name: 'Aug',
    total: Math.floor(Math.random() * 50) + 100,
    uv: Math.floor(Math.random() * 50) + 100,
    pv: Math.floor(Math.random() * 50) + 100,
  },
  {
    name: 'Sep',
    total: Math.floor(Math.random() * 50) + 100,
    uv: Math.floor(Math.random() * 50) + 100,
    pv: Math.floor(Math.random() * 50) + 100,
  },
  {
    name: 'Oct',
    total: Math.floor(Math.random() * 50) + 100,
    uv: Math.floor(Math.random() * 50) + 100,
    pv: Math.floor(Math.random() * 50) + 100,
  },
  {
    name: 'Nov',
    total: Math.floor(Math.random() * 50) + 100,
    uv: Math.floor(Math.random() * 50) + 100,
    pv: Math.floor(Math.random() * 50) + 100,
  },
  {
    name: 'Dec',
    total: Math.floor(Math.random() * 50) + 100,
    uv: Math.floor(Math.random() * 50) + 100,
    pv: Math.floor(Math.random() * 50) + 100,
  },
];

export default function ManageTeams() {
  const router = useRouter();
  const [chartData, setChartData] = useState(data);
  useEffect(() => {
    setChartData(
      data.map((item) => {
        return {
          ...item,
          total: Math.floor(Math.random() * 50) + 100,
          uv: Math.floor(Math.random() * 50) + 100,
          pv: Math.floor(Math.random() * 50) + 100,
        };
      })
    );
  }, [router.query.team]);

  if (!router.query.team) {
    return (
      <div className="col-span-4 bg-slate-50/50 flex flex-col items-center justify-center">
        <span className="text-slate-200">Select a team</span>
      </div>
    );
  }

  return (
    <div className="col-span-4 bg-slate-50/50 flex flex-col justify-evenly items-center gap-2 p-4">
      <h1 className="font-bold text-3xl text-slate-400">{router.query.team}</h1>
      <div className="grid grid-cols-2 gap-2">
        <SummaryLink
          max={100}
          min={10}
          icon={<LockOpen1Icon />}
          label={'Total open'}
          href={`/workspace/tickets?team=${encodeURIComponent(
            router.query.team as string
          )}&state=open`}
        />

        <SummaryLink
          max={100}
          min={10}
          icon={<LockClosedIcon />}
          label={'Total closed'}
          href={`/workspace/tickets?team=${encodeURIComponent(
            router.query.team as string
          )}&state=closed`}
        />
        <SummaryLink
          max={100}
          min={10}
          icon={<Link1Icon />}
          label={'Total assigned'}
          href={`/workspace/tickets?team=${encodeURIComponent(
            router.query.team as string
          )}&state=assigned`}
        />
        <SummaryLink
          max={100}
          min={10}
          icon={<LinkNone1Icon />}
          label={'Total unassigned'}
          href={`/workspace/tickets?team=${encodeURIComponent(
            router.query.team as string
          )}&state=unassigned`}
        />
      </div>
      <ResponsiveContainer
        height={350}
        width={'100%'}
        className="lg:block hidden"
      >
        <LineChart data={chartData}>
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
    </div>
  );
}

ManageTeams.getLayout = function getLayout(page: JSX.Element) {
  return (
    <WorkspaceRootLayout>
      <TeamsLayout>{page}</TeamsLayout>
    </WorkspaceRootLayout>
  );
};
