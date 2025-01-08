import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Area,
  AreaChart,
  Line,
  TooltipProps,
  ScatterChart,
  Scatter,
} from 'recharts';
import useWindowSize from '../../../hooks/useWindowSize';
import { Star } from 'lucide-react';
import {
  ShortResultType,
  LongResultType,
  CheckboxResultType,
  RadioResultType,
  DropdownResultType,
  RangeResultType,
  StarRatingResultType,
  ImageSelectResultType,
  NumberResultType,
  DateResultType,
  EmailResultType,
  FileUploadResultType,
} from '../../../types/form-details.types';

const POLLLOOP_BROWN_01 = '#85582B';
const POLLLOOP_PURPLE_01 = '#8884d8';
const STAR_COLOR = '#FFD700';

const ShortAnswerComponent: React.FC<{ result: ShortResultType }> = ({ result }) => {
  return (
    <li className="px-3 py-1 text-sm border rounded-lg border-pollloop-brown-01 border-opacity-30 bg-pollloop-brown-01/15">
      {result.value}
    </li>
  );
};

const LongAnswerComponent: React.FC<{ result: LongResultType }> = ({ result }) => {
  return (
    <li className="px-3 py-1 text-sm border rounded-lg border-pollloop-brown-01 border-opacity-30 bg-pollloop-brown-01/15">
      {result.value}
    </li>
  );
};
/*  { label: 'TypeScript 타입 정의', count: 78 }, */
const CheckboxComponent: React.FC<{ results: CheckboxResultType[] }> = ({ results }) => {
  const { width } = useWindowSize();

  const CustomTooltip: React.FC<TooltipProps<string, string>> = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const { label, count } = payload[0].payload;

      return (
        <div
          className="hidden md:block"
          style={{
            backgroundColor: '#fff',
            border: '1px solid #ccc',
            borderRadius: '4px',
            padding: '15px',
            whiteSpace: 'normal',
            maxWidth: width * 0.5,
          }}
        >
          <p>{label}</p>
          <p className="mt-2 text-sm text-right text-[#8884d8]">{`참여자 수: ${count}명`}</p>
        </div>
      );
    }
    return null;
  };

  const getLabelShortened = (label: string, labelCount: number) => {
    // 레이블 개수에 따라 최대 글자 수 동적 설정
    let maxChars;
    if (labelCount <= 3) {
      maxChars = Math.max(15, Math.floor(width / 40)); // 레이블이 적을 때는 더 많은 글자 허용
    } else {
      maxChars = Math.max(10, Math.floor(width / 150)); // 레이블이 많을 때는 글자 수 제한
    }

    return label.length > maxChars ? `${label.slice(0, maxChars)}...` : label;
  };

  return (
    <div className="min-w-[600px] w-full">
      <ResponsiveContainer width="100%" height={350}>
        <BarChart
          data={results as CheckboxResultType[]}
          margin={{
            top: 30,
            right: 50,
            left: 30,
            bottom: 30,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="label"
            height={100}
            interval={0}
            allowDataOverflow={true}
            tick={props => {
              const { x, y, payload } = props;
              const labelCount = (results as CheckboxResultType[]).length;
              const shouldRotate = labelCount > 3;
              const rotation = shouldRotate ? 'rotate(-30)' : 'rotate(0)';
              const textAnchor = shouldRotate ? 'end' : 'middle';

              return (
                <g transform={`translate(${x},${y})`}>
                  <text
                    x={0}
                    y={0}
                    dy={20}
                    textAnchor={textAnchor}
                    fill={POLLLOOP_BROWN_01}
                    style={{ fontSize: '14px' }}
                    transform={rotation}
                  >
                    {getLabelShortened(payload.value, labelCount)}
                  </text>
                </g>
              );
            }}
          />
          <YAxis
            tickFormatter={value => `${value}명`}
            tick={{ fill: POLLLOOP_BROWN_01 }}
            dx={-20}
          />
          <Tooltip
            formatter={value => [`${value}명`, '참여자 수']}
            content={<CustomTooltip />}
            cursor={{ fill: POLLLOOP_BROWN_01, fillOpacity: 0.1 }}
          />
          <Bar
            dataKey="count"
            fill={POLLLOOP_PURPLE_01}
            radius={[4, 4, 0, 0]}
            label={{
              fill: POLLLOOP_BROWN_01,
              dy: -5,
              position: 'top',
              style: { fontWeight: 700 },
            }}
            minPointSize={5}
            maxBarSize={50}
            isAnimationActive={true}
            animationDuration={800}
            animationEasing="ease-in-out"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

const RadioComponent: React.FC<{ results: RadioResultType[] }> = ({ results }) => {
  const COLORS = [
    '#FFB3B3', // 연한 빨강색
    '#B3E2FF', // 연한 하늘색
    '#B3FFB3', // 연한 녹색
    POLLLOOP_PURPLE_01, // 연한 보라색
  ];

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    index,
  }: {
    cx: number;
    cy: number;
    midAngle: number;
    innerRadius: number;
    outerRadius: number;
    percent: number;
    index: number;
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 1.3;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    // 데이터 항목을 가져옵니다.
    const dataItem = results[index];

    if (dataItem) {
      const { label, count } = dataItem; // label과 count를 가져옵니다.
      return (
        <text
          x={x}
          y={y}
          fill={POLLLOOP_BROWN_01}
          textAnchor={x > cx ? 'start' : 'end'}
          dominantBaseline="central"
          style={{ fontSize: '14px' }}
        >
          {`${label} (${count})`} {/* 레이블과 참여자 수를 함께 표시 */}
        </text>
      );
    }

    return null;
  };

  return (
    <div className="min-w-[600px] w-full h-auto my-5">
      <ResponsiveContainer width="100%" height={350}>
        <PieChart>
          <Pie
            data={results}
            cx="50%"
            cy="50%"
            labelLine={true}
            label={renderCustomizedLabel}
            outerRadius={120}
            fill="#8884d8"
            dataKey="count"
            isAnimationActive={true}
            animationDuration={800}
            animationEasing="ease-in-out"
          >
            {results.map((_, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

const DropdownComponent: React.FC<{ results: DropdownResultType[] }> = ({ results }) => {
  const COLORS = [
    '#FFB3B3', // 연한 빨강색
    '#B3E2FF', // 연한 하늘색
    '#B3FFB3', // 연한 녹색
    POLLLOOP_PURPLE_01, // 연한 보라색
  ];

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    index,
  }: {
    cx: number;
    cy: number;
    midAngle: number;
    innerRadius: number;
    outerRadius: number;
    percent: number;
    index: number;
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 1.3;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    // 데이터 항목을 가져옵니다.
    const dataItem = results[index];

    if (dataItem) {
      const { label, count } = dataItem; // label과 count를 가져옵니다.
      return (
        <text
          x={x}
          y={y}
          fill={POLLLOOP_BROWN_01}
          textAnchor={x > cx ? 'start' : 'end'}
          dominantBaseline="central"
          style={{ fontSize: '14px' }}
        >
          {`${label} (${count})`} {/* 레이블과 참여자 수를 함께 표시 */}
        </text>
      );
    }

    return null;
  };

  return (
    <div className="min-w-[600px] w-full h-auto my-5">
      <ResponsiveContainer width="100%" height={350}>
        <PieChart>
          <Pie
            data={results}
            cx="50%"
            cy="50%"
            labelLine={true}
            label={renderCustomizedLabel}
            outerRadius={120}
            fill="#8884d8"
            dataKey="count"
            isAnimationActive={true}
            animationDuration={800}
            animationEasing="ease-in-out"
          >
            {results.map((_, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

const RangeComponent: React.FC<{ results: RangeResultType[] }> = ({ results }) => {
  const { width } = useWindowSize();
  const CustomTooltip: React.FC<TooltipProps<string, string>> = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const { label, count } = payload[0].payload;

      return (
        <div
          className="hidden md:block"
          style={{
            backgroundColor: '#fff',
            border: '1px solid #ccc',
            borderRadius: '4px',
            padding: '15px',
            whiteSpace: 'normal',
            maxWidth: width * 0.5,
          }}
        >
          <p>{label}</p>
          <p className="mt-2 text-sm text-right text-[#8884d8]">{`참여자 수: ${count}명`}</p>
        </div>
      );
    }
    return null;
  };
  return (
    <div className="min-w-[600px] w-full h-auto my-5">
      <ResponsiveContainer width="100%" height={350}>
        <AreaChart
          width={500}
          height={400}
          data={results}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="value" />
          <YAxis />
          <Tooltip
            formatter={count => [`${count}명`, '참여자 수']}
            content={<CustomTooltip />}
            cursor={{ fill: POLLLOOP_BROWN_01, fillOpacity: 0.2 }}
          />
          <Area type="monotone" dataKey="count" stroke="#8884d8" fill="#8884d8" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

const StarComponent: React.FC<{ results: StarRatingResultType[] }> = ({ results }) => {
  const renderStars = (rating: number) => {
    return (
      <foreignObject x="-60" y="10" width="120" height="40">
        <div className="flex items-center justify-center space-x-0">
          {[...Array(rating)].map((_, index) => (
            <Star
              key={index}
              size={20}
              color={POLLLOOP_BROWN_01}
              fill={STAR_COLOR}
              strokeWidth={0.3}
            />
          ))}
        </div>
      </foreignObject>
    );
  };

  return (
    <div className="min-w-[600px] w-full">
      <ResponsiveContainer width="100%" height={350}>
        <BarChart
          data={results as StarRatingResultType[]}
          margin={{
            top: 30,
            right: 50,
            left: 30,
            bottom: 30,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            height={100}
            interval={0}
            dataKey="value"
            allowDataOverflow={true}
            tick={({ x, y, index }) => (
              <g transform={`translate(${x},${y})`}>{renderStars(index + 1)}</g>
            )}
          />
          <YAxis
            tickFormatter={value => `${value}명`}
            tick={{ fill: POLLLOOP_BROWN_01 }}
            dx={-20}
          />
          <Bar
            dataKey="count"
            fill={POLLLOOP_PURPLE_01}
            radius={[4, 4, 0, 0]}
            label={{
              fill: POLLLOOP_BROWN_01,
              dy: -5,
              position: 'top',
              style: { fontWeight: 700 },
            }}
            minPointSize={5}
            maxBarSize={50}
            isAnimationActive={true}
            animationDuration={800}
            animationEasing="ease-in-out"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

const ImageSelectComponent: React.FC<{ results: ImageSelectResultType[] }> = ({ results }) => {
  const { width } = useWindowSize();

  const renderImages = (index: number) => {
    const imageUrl = results[index - 1].imageUrl;
    const imageSize = width / 20; // 이미지 크기 계산

    return (
      <foreignObject
        x={-imageSize / 2} // 이미지 크기의 절반만큼 왼쪽으로 이동
        y="10"
        width={imageSize}
        height={imageSize}
      >
        <img
          src={imageUrl}
          alt={`image-${index}`}
          className="object-cover bg-pollloop-brown-03"
          style={{
            width: `${imageSize}px`,
            height: `${imageSize}px`,
          }}
        />
      </foreignObject>
    );
  };

  return (
    <div className="min-w-[600px] w-full">
      <ResponsiveContainer width="100%" height={350}>
        <BarChart
          data={results as ImageSelectResultType[]}
          margin={{
            top: 30,
            right: 50,
            left: 30,
            bottom: 30,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            height={100}
            interval={0}
            dataKey="value"
            allowDataOverflow={true}
            tick={({ x, y, index }) => (
              <g transform={`translate(${x},${y})`}>{renderImages(index + 1)}</g>
            )}
          />
          <YAxis
            tickFormatter={value => `${value}명`}
            tick={{ fill: POLLLOOP_BROWN_01 }}
            dx={-20}
          />
          <Bar
            dataKey="count"
            fill={POLLLOOP_PURPLE_01}
            radius={[4, 4, 0, 0]}
            label={{
              fill: POLLLOOP_BROWN_01,
              dy: -5,
              position: 'top',
              style: { fontWeight: 700 },
            }}
            minPointSize={5}
            maxBarSize={50}
            isAnimationActive={true}
            animationDuration={800}
            animationEasing="ease-in-out"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

const NumberComponent: React.FC<{ results: NumberResultType[] }> = ({ results }) => {
  const { width } = useWindowSize();
  const CustomTooltip: React.FC<TooltipProps<string, string>> = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const { label, count } = payload[0].payload;

      return (
        <div
          className="hidden md:block"
          style={{
            backgroundColor: '#fff',
            border: '1px solid #ccc',
            borderRadius: '4px',
            padding: '15px',
            whiteSpace: 'normal',
            maxWidth: width * 0.5,
          }}
        >
          <p>{label}</p>
          <p className="mt-2 text-sm text-right text-[#8884d8]">{`참여자 수: ${count}명`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="min-w-[600px] w-full">
      <ResponsiveContainer width="100%" height={350}>
        <LineChart
          width={500}
          height={300}
          data={results}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="value" />
          <YAxis
            type="number"
            dataKey="day"
            name="일"
            domain={[0, 31]}
            ticks={[...Array(31)].map((_, i) => i + 1)} // 1부터 31까지 모든 날짜 표시
          />
          <Tooltip
            formatter={count => [`${count}명`, '참여자 수']}
            content={<CustomTooltip />}
            cursor={{ fill: POLLLOOP_BROWN_01, fillOpacity: 0.2 }}
          />
          <Legend />
          <Line type="monotone" dataKey="count" stroke="#8884d8" activeDot={{ r: 8 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

const DateComponent: React.FC<{ results: DateResultType[] }> = ({ results }) => {
  // 날짜별 응답 수를 계산하고 데이터 가공
  const processData = () => {
    const countMap: { [key: string]: number } = {};
    // 날짜별 카운트
    results.forEach(result => {
      countMap[result.value] = (countMap[result.value] || 0) + 1;
    });

    // 데이터 구조화
    return Object.entries(countMap)
      .map(([date, count]) => {
        const dateObj = new Date(date);
        return {
          date,
          yearMonth: `${dateObj.getFullYear()}.${String(dateObj.getMonth() + 1).padStart(2, '0')}`,
          day: dateObj.getDate(),
          count,
        };
      })
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  };

  const chartData = processData();
  const { width } = useWindowSize();
  const CustomTooltip: React.FC<TooltipProps<string, string>> = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div
          className="hidden md:block"
          style={{
            backgroundColor: '#fff',
            border: '1px solid #ccc',
            borderRadius: '4px',
            padding: '15px',
            whiteSpace: 'normal',
            maxWidth: width * 0.5,
          }}
        >
          <p>{`${data.yearMonth}.${String(data.day).padStart(2, '0')}`}</p>
          <p className="mt-2 text-sm text-right text-[#8884d8]">{`참여자 수: ${data.count}명`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="min-w-[600px] w-full">
      <ResponsiveContainer width="100%" height={700}>
        <ScatterChart
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 50,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            type="category"
            dataKey="yearMonth"
            name="년월"
            angle={-45}
            textAnchor="end"
            height={60}
          />
          <YAxis
            type="number"
            dataKey="day"
            name="일"
            domain={[0, 31]}
            ticks={[1, 5, 10, 15, 20, 25, 30, 31]} // 5 단위로 설정하고 마지막 31 추가
            tickFormatter={value => `${value}일`}
          />
          <Tooltip content={<CustomTooltip />} />
          <Scatter
            data={chartData}
            fill={POLLLOOP_PURPLE_01}
            shape={(props: any) => (
              <circle
                r={Math.sqrt(props.payload.count) * 5} // 참여자 수에 따라 점 크기 조절
                fill={POLLLOOP_PURPLE_01}
                fillOpacity={0.6}
                {...props}
              />
            )}
          />
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  );
};

const EmailComponent: React.FC<{ result: EmailResultType }> = ({ result }) => {
  return <li>{result.value}</li>;
};

const FileUploadComponent: React.FC<{ result: FileUploadResultType }> = ({ result }) => {
  return <li>{result.value}</li>;
};

export {
  ShortAnswerComponent,
  LongAnswerComponent,
  CheckboxComponent,
  RadioComponent,
  DropdownComponent,
  RangeComponent,
  StarComponent,
  ImageSelectComponent,
  NumberComponent,
  DateComponent,
  EmailComponent,
  FileUploadComponent,
};
