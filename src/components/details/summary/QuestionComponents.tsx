import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
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
import { Check, Copy, Download, Star } from 'lucide-react';
import {
  ShortResultType,
  LongResultType,
  CheckboxResultType,
  RadioResultType,
  DropdownResultType,
  StarRatingResultType,
  ImageSelectResultType,
  NumberResultType,
  DateResultType,
  EmailResultType,
  FileUploadResultType,
  RangeResultType,
} from '../../../types/form-details.types';
import { copyToClipboard } from '../../../utils/copyToClipboard';
import { useInView } from '../../../hooks/useInView';
import ImagePlaceholder from '../../common/ImagePlaceholder';
import { useState } from 'react';
import { useModal } from '@/hooks/useModal';
import Modal from '@/components/common/Modal';
import Button from '@/components/common/Button';

const POLLLOOP_RED_01 = '#fbbaba';
const POLLLOOP_GREEN_01 = '#b3f5b3';
const POLLLOOP_BLUE_01 = '#B3E2FF';
const POLLLOOP_PURPLE_01 = '#928fd7';
const POLLLOOP_BROWN_01 = '#85582B';
const POLLLOOP_YELLOW_01 = '#FFD700';
const POLLLOOP_WHITE = '#FFFFFF';

const DX_DY_SPACE = 10;
const TOP_SPACE = 50;
const LEFT_SPACE = 20;

const COLORS = [POLLLOOP_RED_01, POLLLOOP_BLUE_01, POLLLOOP_GREEN_01, POLLLOOP_PURPLE_01];

const ShortTypeComponent: React.FC<{ results: ShortResultType[] }> = ({ results }) => {
  return (
    <div className="pr-4 scrollable">
      <ul className="p-1 space-y-2 h-[200px]">
        {results.map((result, index) => (
          <li
            onClick={() => copyToClipboard(result.value, '텍스트가 복사되었습니다.')}
            key={index}
            className="flex items-center justify-between gap-2 px-3 py-1 text-sm border rounded-lg cursor-pointer transition-smooth group hover:shadow-primary hover:border-pollloop-orange border-pollloop-brown-01 border-opacity-30 bg-pollloop-brown-01/15"
          >
            <p className="break-all">{result.value}</p>
            <Copy size={14} className="flex-shrink-0 hidden ml-1 group-hover:block" />
          </li>
        ))}
      </ul>
    </div>
  );
};

const LongTypeComponent: React.FC<{ results: LongResultType[] }> = ({ results }) => {
  return (
    <div className="pr-4 scrollable">
      <ul className="p-1 space-y-2 h-[200px]">
        {results.map((result, index) => (
          <li
            onClick={() => copyToClipboard(result.value, '텍스트가 복사되었습니다.')}
            key={index}
            className="flex items-center justify-between gap-2 px-3 py-1 text-sm border rounded-lg cursor-pointer transition-smooth group hover:shadow-primary hover:border-pollloop-orange border-pollloop-brown-01 border-opacity-30 bg-pollloop-brown-01/15"
          >
            <p className="break-all">{result.value}</p>
            <Copy size={14} className="flex-shrink-0 hidden ml-1 group-hover:block" />
          </li>
        ))}
      </ul>
    </div>
  );
};

const CheckboxComponent: React.FC<{ results: CheckboxResultType[] }> = ({ results }) => {
  const { width } = useWindowSize();
  const { ref, isInView } = useInView<HTMLDivElement>();

  const CustomTooltip: React.FC<TooltipProps<string, string>> = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const { label, count, values } = payload[0].payload;

      return (
        <div
          className="hidden lg:block"
          style={{
            backgroundColor: POLLLOOP_WHITE,
            border: `1px solid ${POLLLOOP_BROWN_01}`,
            borderRadius: '4px',
            padding: '15px',
            whiteSpace: 'normal',
            maxWidth: width * 0.5,
            pointerEvents: 'auto',
          }}
        >
          {label === '기타' ? (
            <ul className="flex flex-col gap-2">
              <li
                className="list-disc scrollable"
                style={{
                  minWidth: '250px',
                  maxWidth: '500px',
                  maxHeight: '250px',
                  overflowY: 'auto',
                  padding: '4px',
                  pointerEvents: 'auto',
                }}
                onWheel={e => {
                  e.stopPropagation();
                }}
              >
                {values
                  .filter((value: string) => value !== '')
                  .map((value: string, index: number) => (
                    <p key={index} className="flex items-center pr-4">
                      <span className="py-1 mr-2 text-sm text-pollloop-brown-01/50 ">{`#${index + 1}`}</span>
                      <span>{value}</span>
                    </p>
                  ))}
              </li>
            </ul>
          ) : (
            <p>{label}</p>
          )}
          {label === '기타' ? (
            <p className="mt-2 text-sm text-right text-[#8884d8]">{`참여자 수: ${count}명 | 기타 (내용없음): ${values?.filter((value: string) => value === '').length}`}</p>
          ) : (
            <p className="mt-2 text-sm text-right text-[#8884d8]">{`참여자 수: ${count}명`}</p>
          )}
        </div>
      );
    }
    return null;
  };

  const getLabelShortened = (label: string, labelCount: number) => {
    let maxChars;
    if (labelCount <= 3) {
      maxChars = Math.max(15, Math.floor(width / 40));
    } else {
      maxChars = Math.max(10, Math.floor(width / 150));
    }

    return label.length > maxChars ? `${label.slice(0, maxChars)}...` : label;
  };

  return (
    <div ref={ref} className="scrollable" style={{ opacity: isInView ? 1 : 0 }}>
      <div
        className="min-w-[600px] overflow-hidden w-full"
        style={{
          width: width <= 600 ? `${Math.max(600, results.length * 100)}px` : '100%',
        }}
      >
        <ResponsiveContainer width="100%" height={450}>
          <BarChart
            data={results}
            margin={{
              top: TOP_SPACE,
              right: 40,
              left: LEFT_SPACE,
              bottom: 30,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke={POLLLOOP_BROWN_01} opacity={0.5} />
            <XAxis
              dataKey="label"
              height={100}
              interval={0}
              allowDataOverflow={true}
              axisLine={{ stroke: POLLLOOP_BROWN_01 }}
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
                      dy={DX_DY_SPACE}
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
              label={{
                value: '참여자 수(명)',
                angle: 0,
                position: 'top',
                offset: 30,
                style: {
                  fill: POLLLOOP_BROWN_01,
                  fontSize: '14px',
                },
              }}
              tickFormatter={value => `${value}`}
              tick={{ fill: POLLLOOP_BROWN_01 }}
              dx={-DX_DY_SPACE}
              axisLine={{ stroke: POLLLOOP_BROWN_01 }}
            />
            <Tooltip
              formatter={value => [`${value}명`, '참여자 수']}
              content={<CustomTooltip />}
              cursor={{ fill: POLLLOOP_BROWN_01, fillOpacity: 0.1 }}
              wrapperStyle={{
                visibility: 'visible',
                position: 'absolute',
                zIndex: 50,
                transition: 'none',
              }}
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
              isAnimationActive={isInView}
              animationDuration={800}
              animationEasing="ease-in-out"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

const RadioComponent: React.FC<{ results: RadioResultType[] }> = ({ results }) => {
  const { width } = useWindowSize();
  const { ref, isInView } = useInView<HTMLDivElement>();

  const RADIAN = Math.PI / 180;

  const processedData = results.map(item => ({
    ...item,
    count: item.count === 0 ? 0.1 : item.count,
  }));

  const CustomTooltip: React.FC<TooltipProps<string, string>> = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const { label, values } = payload[0].payload;
      const actualCount = results.find(r => r.label === label)?.count || 0;
      return (
        <div
          className="hidden lg:block"
          style={{
            backgroundColor: POLLLOOP_WHITE,
            border: `1px solid ${POLLLOOP_BROWN_01}`,
            borderRadius: '4px',
            padding: '15px',
            whiteSpace: 'normal',
            maxWidth: width * 0.5,
            pointerEvents: 'auto',
          }}
        >
          {label === '기타' ? (
            values?.filter((value: string) => value !== '').length > 0 ? (
              <ul className="flex flex-col gap-2">
                <li
                  className="list-disc scrollable"
                  style={{
                    minWidth: '150px',
                    maxWidth: '500px',
                    minHeight: '30px',
                    maxHeight: '250px',
                    overflowY: 'auto',
                    padding: '4px',
                    pointerEvents: 'auto',
                  }}
                  onWheel={e => {
                    e.stopPropagation();
                  }}
                >
                  {values
                    .filter((value: string) => value !== '')
                    .map((value: string, index: number) => (
                      <p key={index} className="flex items-center pr-4">
                        <span className="py-1 mr-2 text-sm text-pollloop-brown-01/50 ">{`#${index + 1}`}</span>
                        <span>{value}</span>
                      </p>
                    ))}
                </li>
              </ul>
            ) : (
              <p>기타</p>
            )
          ) : (
            <p>{label}</p>
          )}
          <p className="mt-2 text-sm text-right text-pollloop-purple-01">
            {`참여자 수: ${actualCount}명${
              label === '기타' && values?.filter((value: string) => value === '').length > 0
                ? ` | 기타 (내용없음): ${values?.filter((value: string) => value === '').length}`
                : ''
            }`}
          </p>
        </div>
      );
    }
    return null;
  };

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

    const dataItem = results[index];

    if (dataItem) {
      const { label, count } = dataItem;
      const dynamicMaxLength = Math.max(8, Math.floor(width / 80));
      const displayText =
        label.length > dynamicMaxLength ? `${label.slice(0, dynamicMaxLength)}...` : label;

      return (
        <g>
          <title>{label}</title>
          <text
            x={x}
            y={y}
            fill={POLLLOOP_BROWN_01}
            textAnchor={x > cx ? 'start' : 'end'}
            dominantBaseline="central"
            style={{ fontSize: '14px' }}
          >
            {`${displayText} (${count} 명)`}
          </text>
        </g>
      );
    }

    return null;
  };

  return (
    <div ref={ref} className="scrollable" style={{ opacity: isInView ? 1 : 0 }}>
      <div className="min-w-[600px] overflow-hidden pb-10">
        <ResponsiveContainer width="100%" height={350}>
          <PieChart>
            <Tooltip content={<CustomTooltip />} />
            <Pie
              data={processedData}
              cx="50%"
              cy="50%"
              labelLine={true}
              label={renderCustomizedLabel}
              outerRadius={120}
              fill={POLLLOOP_PURPLE_01}
              dataKey="count"
              isAnimationActive={isInView}
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
    </div>
  );
};

const DropdownComponent: React.FC<{ results: DropdownResultType[] }> = ({ results }) => {
  const { width } = useWindowSize();
  const { ref, isInView } = useInView<HTMLDivElement>();

  const RADIAN = Math.PI / 180;

  const processedData = results.map(item => ({
    ...item,
    count: item.count === 0 ? 0.1 : item.count,
  }));

  const CustomTooltip: React.FC<TooltipProps<string, string>> = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const { label, values } = payload[0].payload;
      const actualCount = results.find(r => r.label === label)?.count || 0;
      return (
        <div
          className="hidden lg:block"
          style={{
            backgroundColor: POLLLOOP_WHITE,
            border: `1px solid ${POLLLOOP_BROWN_01}`,
            borderRadius: '4px',
            padding: '15px',
            whiteSpace: 'normal',
            maxWidth: width * 0.5,
            pointerEvents: 'auto',
          }}
        >
          {label === '기타' ? (
            values?.filter((value: string) => value !== '').length > 0 ? (
              <ul className="flex flex-col gap-2">
                <li
                  className="list-disc scrollable"
                  style={{
                    minWidth: '150px',
                    maxWidth: '500px',
                    minHeight: '30px',
                    maxHeight: '250px',
                    overflowY: 'auto',
                    padding: '4px',
                    pointerEvents: 'auto',
                  }}
                  onWheel={e => {
                    e.stopPropagation();
                  }}
                >
                  {values
                    .filter((value: string) => value !== '')
                    .map((value: string, index: number) => (
                      <p key={index} className="flex items-center pr-4">
                        <span className="py-1 mr-2 text-sm text-pollloop-brown-01/50 ">{`#${index + 1}`}</span>
                        <span>{value}</span>
                      </p>
                    ))}
                </li>
              </ul>
            ) : (
              <p>기타</p>
            )
          ) : (
            <p>{label}</p>
          )}
          <p className="mt-2 text-sm text-right text-pollloop-purple-01">
            {`참여자 수: ${actualCount}명${
              label === '기타' && values?.filter((value: string) => value === '').length > 0
                ? ` | 기타 (내용없음): ${values?.filter((value: string) => value === '').length}`
                : ''
            }`}
          </p>
        </div>
      );
    }
    return null;
  };

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

    const dataItem = results[index];

    if (dataItem) {
      const { label, count } = dataItem;
      const dynamicMaxLength = Math.max(10, Math.floor(width / 80));
      const displayText =
        label.length > dynamicMaxLength ? `${label.slice(0, dynamicMaxLength)}...` : label;

      return (
        <g>
          <title>{label}</title>
          <text
            x={x}
            y={y}
            fill={POLLLOOP_BROWN_01}
            textAnchor={x > cx ? 'start' : 'end'}
            dominantBaseline="central"
            style={{ fontSize: '14px' }}
          >
            {`${displayText} (${count} 명)`}
          </text>
        </g>
      );
    }

    return null;
  };

  return (
    <div ref={ref} className="scrollable" style={{ opacity: isInView ? 1 : 0 }}>
      <div className="min-w-[600px] overflow-hidden pb-10">
        <ResponsiveContainer width="100%" height={350}>
          <PieChart>
            <Tooltip content={<CustomTooltip />} />
            <Pie
              data={processedData}
              cx="50%"
              cy="50%"
              labelLine={true}
              label={renderCustomizedLabel}
              outerRadius={120}
              fill={POLLLOOP_PURPLE_01}
              dataKey="count"
              isAnimationActive={isInView}
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
    </div>
  );
};

const RangeComponent: React.FC<{ results: RangeResultType[] }> = ({ results }) => {
  const { ref, isInView } = useInView<HTMLDivElement>();
  const { width } = useWindowSize();

  const CustomTooltip: React.FC<TooltipProps<string, string>> = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const { label, count } = payload[0].payload;

      return (
        <div
          className="hidden md:block"
          style={{
            backgroundColor: POLLLOOP_WHITE,
            border: `1px solid ${POLLLOOP_BROWN_01}`,
            borderRadius: '4px',
            padding: '15px',
            whiteSpace: 'normal',
            maxWidth: width * 0.5,
          }}
        >
          <p>{label}</p>
          <p className="mt-2 text-sm text-right text-pollloop-purple-01">{`참여자 수: ${count}명`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="scrollable" style={{ opacity: isInView ? 1 : 0 }}>
      <div ref={ref} className="min-w-[600px] overflow-hidden pb-10">
        <ResponsiveContainer width="100%" height={340}>
          <AreaChart
            data={results}
            margin={{
              top: TOP_SPACE,
              right: 30,
              left: LEFT_SPACE,
              bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke={POLLLOOP_BROWN_01} opacity={0.5} />
            <XAxis
              dy={DX_DY_SPACE}
              dataKey="label"
              tick={{
                fill: POLLLOOP_BROWN_01,
              }}
              domain={['dataMin', 'dataMax']}
              allowDataOverflow
              axisLine={{ stroke: POLLLOOP_BROWN_01 }}
            />
            <YAxis
              label={{
                value: '참여자 수(명)',
                angle: 0,
                position: 'top',
                offset: 30,
                style: {
                  fill: POLLLOOP_BROWN_01,
                  fontSize: '14px',
                },
              }}
              tickFormatter={value => `${value}`}
              tick={{
                fill: POLLLOOP_BROWN_01,
              }}
              axisLine={{ stroke: POLLLOOP_BROWN_01 }}
              dx={-DX_DY_SPACE}
            />
            <Tooltip
              formatter={count => [`${count}명`, '참여자 수']}
              content={<CustomTooltip />}
              cursor={{
                fill: POLLLOOP_BROWN_01,
                fillOpacity: 0.2,
                stroke: POLLLOOP_BROWN_01,
                strokeWidth: 0.5,
              }}
            />
            <Area
              key={isInView ? 'visible' : 'hidden'}
              type="monotone"
              dataKey="count"
              stroke={POLLLOOP_PURPLE_01}
              fill={POLLLOOP_PURPLE_01}
              isAnimationActive={isInView}
              animationBegin={0}
              animationDuration={1200}
              animationEasing="ease-in-out"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

const StarRatingComponent: React.FC<{ results: StarRatingResultType[] }> = ({ results }) => {
  const { width } = useWindowSize();
  const { ref, isInView } = useInView<HTMLDivElement>();

  const renderStars = (rating: number) => {
    return (
      <foreignObject x="-60" y="10" width="120" height="40">
        <div className="flex items-center justify-center space-x-0">
          {[...Array(rating)].map((_, index) => (
            <Star
              key={index}
              size={20}
              color={POLLLOOP_BROWN_01}
              fill={POLLLOOP_YELLOW_01}
              strokeWidth={0.3}
            />
          ))}
        </div>
      </foreignObject>
    );
  };

  return (
    <div ref={ref} className="scrollable" style={{ opacity: isInView ? 1 : 0 }}>
      <div
        className="min-w-[600px] overflow-hidden w-full"
        style={{
          width: width <= 600 ? `${Math.max(600, results.length * 100)}px` : '100%',
        }}
      >
        <ResponsiveContainer width="100%" height={390}>
          <BarChart
            data={results as StarRatingResultType[]}
            margin={{
              top: TOP_SPACE,
              right: 50,
              left: 30,
              bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke={POLLLOOP_BROWN_01} opacity={0.5} />
            <XAxis
              height={100}
              interval={0}
              dataKey="value"
              allowDataOverflow={true}
              axisLine={{ stroke: POLLLOOP_BROWN_01 }}
              tick={({ x, y, index }) => (
                <g transform={`translate(${x},${y})`}>{renderStars(index + 1)}</g>
              )}
            />
            <YAxis
              label={{
                value: '참여자 수(명)',
                angle: 0,
                position: 'top',
                offset: 30,
                style: {
                  fill: POLLLOOP_BROWN_01,
                  fontSize: '14px',
                },
              }}
              tickFormatter={value => `${value}`}
              tick={{ fill: POLLLOOP_BROWN_01 }}
              axisLine={{ stroke: POLLLOOP_BROWN_01 }}
              dx={-DX_DY_SPACE}
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
              isAnimationActive={isInView}
              animationDuration={800}
              animationEasing="ease-in-out"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

const ImageSelectComponent: React.FC<{ results: ImageSelectResultType[] }> = ({ results }) => {
  const { ref, isInView } = useInView<HTMLDivElement>();
  const { width } = useWindowSize();

  const Image = ({
    src,
    alt,
    className,
    style,
    iconSize,
  }: {
    src: string;
    alt: string;
    className?: string;
    style?: React.CSSProperties;
    iconSize?: number;
  }) => {
    const [hasError, setHasError] = useState(false);

    if (!src || hasError) {
      return (
        <ImagePlaceholder
          iconSize={iconSize}
          className="object-cover object-center border rounded-lg border-pollloop-brown-03"
          style={style}
        />
      );
    }

    return (
      <img
        src={src}
        alt={alt}
        className={className}
        style={style}
        onError={() => setHasError(true)}
      />
    );
  };

  const renderImages = (index: number) => {
    const imageUrl = results[index - 1].label;
    const imageSize = Math.min(width / 8, 100);

    return (
      <foreignObject x={-(imageSize / 2)} y="10" width={100} height={100}>
        <Image
          src={imageUrl}
          alt={`image-${index}`}
          iconSize={imageSize / 2}
          className="object-cover object-center border rounded-lg border-pollloop-brown-03"
          style={{
            width: `${imageSize}px`,
            height: `${imageSize}px`,
          }}
        />
      </foreignObject>
    );
  };

  return (
    <div ref={ref} className="scrollable" style={{ opacity: isInView ? 1 : 0 }}>
      <div
        className="min-w-[600px] overflow-hidden w-full"
        style={{
          width: width <= 600 ? `${Math.max(600, results.length * 100)}px` : '100%',
        }}
      >
        <ResponsiveContainer width="100%" height={400}>
          <BarChart
            data={results as ImageSelectResultType[]}
            margin={{
              top: TOP_SPACE,
              right: 50,
              left: 30,
              bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke={POLLLOOP_BROWN_01} opacity={0.5} />
            <XAxis
              height={120}
              interval={0}
              dataKey="value"
              allowDataOverflow={true}
              axisLine={{ stroke: POLLLOOP_BROWN_01 }}
              tick={({ x, y, index }) => (
                <g transform={`translate(${x},${y})`}>{renderImages(index + 1)}</g>
              )}
            />
            <YAxis
              label={{
                value: '참여자 수(명)',
                angle: 0,
                position: 'top',
                offset: 30,
                style: {
                  fill: POLLLOOP_BROWN_01,
                  fontSize: '14px',
                },
              }}
              tickFormatter={value => `${value}`}
              tick={{ fill: POLLLOOP_BROWN_01 }}
              axisLine={{ stroke: POLLLOOP_BROWN_01 }}
              dx={-DX_DY_SPACE}
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
              isAnimationActive={isInView}
              animationDuration={800}
              animationEasing="ease-in-out"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

const NumberComponent: React.FC<{ results: NumberResultType[] }> = ({ results }) => {
  const { ref, isInView } = useInView<HTMLDivElement>();
  const { width } = useWindowSize();

  const processData = () => {
    const countMap = results.reduce<Record<number, number>>((acc, { value }) => {
      acc[value] = (acc[value] || 0) + 1;
      return acc;
    }, {});

    return Object.entries(countMap)
      .map(([value, count]): { value: number; count: number } => ({
        value: Number(value),
        count,
      }))
      .sort((a, b) => a.value - b.value);
  };

  const CustomTooltip: React.FC<TooltipProps<string, string>> = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const { value, count } = payload[0].payload;

      return (
        <div
          className="hidden md:block"
          style={{
            backgroundColor: `${POLLLOOP_WHITE}`,
            border: `1px solid ${POLLLOOP_BROWN_01}`,
            borderRadius: '4px',
            padding: '15px',
            whiteSpace: 'normal',
            maxWidth: width * 0.5,
          }}
        >
          <p>{value}</p>
          <p className="mt-2 text-sm text-right text-pollloop-purple-01">{`참여자 수: ${count}명`}</p>
        </div>
      );
    }
    return null;
  };

  const processedData = processData();

  const getLabelShortened = (label: string, labelCount: number) => {
    let maxChars;
    if (labelCount <= 3) {
      maxChars = Math.max(15, Math.floor(width / 40));
    } else {
      maxChars = Math.max(10, Math.floor(width / 150));
    }

    return label.length > maxChars ? `${label.slice(0, maxChars)}...` : label;
  };

  return (
    <div className="scrollable" style={{ opacity: isInView ? 1 : 0 }}>
      <div ref={ref} className="min-w-[600px] overflow-hidden">
        <ResponsiveContainer width="100%" height={380}>
          <LineChart
            data={processedData}
            margin={{
              top: TOP_SPACE,
              right: 30,
              left: 20,
              bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke={POLLLOOP_BROWN_01} opacity={0.5} />
            <XAxis
              dataKey="value"
              height={100}
              interval={0}
              allowDataOverflow={true}
              axisLine={{ stroke: POLLLOOP_BROWN_01 }}
              tick={props => {
                const { x, y, payload } = props;
                const labelCount = (results as NumberResultType[]).length;
                const shouldRotate = labelCount > 4;
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
              label={{
                value: '참여자 수(명)',
                angle: 0,
                position: 'top',
                offset: 30,
                style: {
                  fill: POLLLOOP_BROWN_01,
                  fontSize: '14px',
                },
              }}
              tickFormatter={value => `${value}`}
              tick={{ fill: POLLLOOP_BROWN_01 }}
              dx={-DX_DY_SPACE}
              axisLine={{ stroke: POLLLOOP_BROWN_01 }}
            />
            <Tooltip
              formatter={count => [`${count}명`, '참여자 수']}
              content={<CustomTooltip />}
              cursor={{
                fill: POLLLOOP_BROWN_01,
                fillOpacity: 0.2,
                stroke: POLLLOOP_BROWN_01,
                strokeWidth: 0.5,
              }}
            />
            <Line
              key={isInView ? 'visible' : 'hidden'}
              type="monotone"
              dataKey="count"
              stroke={POLLLOOP_PURPLE_01}
              activeDot={{ r: 8 }}
              isAnimationActive={isInView}
              animationBegin={0}
              animationDuration={1200}
              animationEasing="ease-in-out"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

const DateComponent: React.FC<{ results: DateResultType[] }> = ({ results }) => {
  const { ref, isInView } = useInView<HTMLDivElement>();

  const processData = () => {
    const countMap: { [key: string]: number } = {};

    results.forEach(result => {
      countMap[result.value] = (countMap[result.value] || 0) + 1;
    });

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

  const processedData = processData();
  const { width } = useWindowSize();

  const CustomTooltip: React.FC<TooltipProps<string, string>> = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div
          className="hidden md:block"
          style={{
            backgroundColor: POLLLOOP_WHITE,
            border: `1px solid ${POLLLOOP_BROWN_01}`,
            borderRadius: '4px',
            padding: '15px',
            whiteSpace: 'normal',
            maxWidth: width * 0.5,
          }}
        >
          <p>{`${data.yearMonth}.${String(data.day).padStart(2, '0')}`}</p>
          <p className="mt-2 text-sm text-right text-pollloop-purple-01">{`참여자 수: ${data.count}명`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="scrollable" style={{ opacity: isInView ? 1 : 0 }}>
      <div ref={ref} className="min-w-[600px] overflow-hidden pb-10">
        <ResponsiveContainer width="100%" height={500}>
          <ScatterChart
            margin={{
              top: TOP_SPACE,
              right: 30,
              left: 20,
              bottom: 50,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke={POLLLOOP_BROWN_01} opacity={0.5} />
            <XAxis
              label={{
                value: '년월 (YYYY.MM)',
                position: 'bottom',
                offset: 30,
                style: {
                  fill: POLLLOOP_BROWN_01,
                  fontSize: '14px',
                },
              }}
              type="category"
              dataKey="yearMonth"
              name="년월"
              angle={-45}
              textAnchor="end"
              height={60}
              dy={DX_DY_SPACE}
              tick={{
                fill: POLLLOOP_BROWN_01,
              }}
              axisLine={{ stroke: POLLLOOP_BROWN_01 }}
            />
            <YAxis
              label={{
                value: '날짜 (DD)',
                angle: 0,
                position: 'top',
                offset: 30,
                style: {
                  fill: POLLLOOP_BROWN_01,
                  fontSize: '14px',
                },
              }}
              dx={-DX_DY_SPACE}
              type="number"
              dataKey="day"
              name="일"
              domain={[0, 31]}
              ticks={[1, 5, 10, 15, 20, 25, 30, 31]}
              tick={{
                fill: POLLLOOP_BROWN_01,
              }}
              axisLine={{ stroke: POLLLOOP_BROWN_01 }}
            />
            <Tooltip
              content={<CustomTooltip />}
              cursor={{
                fill: POLLLOOP_BROWN_01,
                fillOpacity: 0.2,
                stroke: POLLLOOP_BROWN_01,
                strokeWidth: 0.5,
              }}
            />
            <Scatter
              data={isInView ? processedData : []}
              fill={POLLLOOP_PURPLE_01}
              shape={(props: any) => {
                const {
                  tooltipPosition,
                  tooltipPayload,
                  zAxis,
                  yAxis,
                  xAxis,
                  yearMonth,
                  ...circleProps
                } = props;
                return (
                  <circle
                    r={Math.sqrt(props.payload.count) * 5}
                    fill={POLLLOOP_PURPLE_01}
                    fillOpacity={0.6}
                    data-yearmonth={yearMonth}
                    {...circleProps}
                  />
                );
              }}
              isAnimationActive={true}
              animationDuration={1200}
              animationEasing="ease-in-out"
            />
          </ScatterChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

const EmailComponent: React.FC<{ results: EmailResultType[] }> = ({ results }) => {
  return (
    <div className="pr-4 scrollable">
      <ul className="p-1 space-y-2 h-[200px]">
        {results.map((result, index) => (
          <li
            onClick={() => copyToClipboard(result.value, '이메일이 복사되었습니다.')}
            key={index}
            className="flex items-center justify-between gap-2 px-3 py-1 text-sm border rounded-lg cursor-pointer group hover:shadow-primary hover:border-pollloop-orange border-pollloop-brown-01 border-opacity-30 bg-pollloop-brown-01/15"
          >
            <p className="break-all">{result.value}</p>
            <Copy size={14} className="flex-shrink-0 hidden ml-1 group-hover:block" />
          </li>
        ))}
      </ul>
    </div>
  );
};

const FileUploadComponent: React.FC<{ results: FileUploadResultType[] }> = ({ results }) => {
  const [downloadedFiles, setDownloadedFiles] = useState<string[]>([]);
  const [selectedFile, setSelectedFile] = useState<{
    id: string;
    name: string;
    url: string | null;
  } | null>(null);
  const { isOpen, open, close } = useModal();

  const handleDownload = (fileId: string, fileName: string, e: React.MouseEvent) => {
    e.preventDefault();
    const url = e.currentTarget.getAttribute('href');
    setSelectedFile({ id: fileId, name: fileName, url });
    open();
  };

  const handleConfirmDownload = () => {
    if (selectedFile?.url) {
      console.log(selectedFile.url);
      const newWindow = window.open(selectedFile.url, '_blank');
      if (newWindow) {
        newWindow.blur();
        window.focus();
        setTimeout(() => {
          newWindow.close();
          setDownloadedFiles(prev => [...prev, selectedFile.id]);
        }, 500);
      }
    }
    close();
  };

  return (
    <>
      <div className="pr-4 scrollable">
        <ul className="p-1 space-y-2 h-[200px]">
          {results.map(result => {
            const fullPath = result.value;
            const fileNameWithExtension = fullPath.substring(fullPath.lastIndexOf('/') + 1);
            const fileId = fullPath;
            const isDownloaded = downloadedFiles.includes(fileId);

            return (
              <li
                key={fileId}
                className="flex items-center justify-between gap-2 px-3 py-1 text-sm border rounded-lg cursor-pointer group hover:shadow-primary hover:border-pollloop-orange border-pollloop-brown-01 border-opacity-30 bg-pollloop-brown-01/15"
              >
                <a
                  href={`https://${fullPath}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={e => handleDownload(fileId, fileNameWithExtension, e)}
                  className="flex items-center justify-between w-full"
                >
                  <p className="break-all">{fileNameWithExtension}</p>
                  {isDownloaded ? (
                    <Check size={14} className="flex-shrink-0 ml-1" />
                  ) : (
                    <Download size={14} className="flex-shrink-0 hidden ml-1 group-hover:block" />
                  )}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
      <Modal isOpen={isOpen} onClose={close} width="sm">
        <Modal.Header title="파일 다운로드" onClose={close} />
        <Modal.Content>
          <p>{selectedFile?.name} 파일을 다운로드하시겠습니까?</p>
        </Modal.Content>
        <Modal.Footer>
          <Button variant="neutral" onClick={close} flex>
            취소
          </Button>
          <Button onClick={handleConfirmDownload} flex>
            확인
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export {
  ShortTypeComponent,
  LongTypeComponent,
  CheckboxComponent,
  RadioComponent,
  DropdownComponent,
  RangeComponent,
  StarRatingComponent,
  ImageSelectComponent,
  NumberComponent,
  DateComponent,
  EmailComponent,
  FileUploadComponent,
};
