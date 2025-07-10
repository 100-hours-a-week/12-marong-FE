import type { IMbtiUpdateInfo, IPostInfo } from "@/api/history/type";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Calendar,
  Eye,
  MessageSquare,
  TrendingUp,
  TrendingDown,
  Minus,
  Lightbulb,
  ChevronUp,
  ChevronDown,
} from "lucide-react";
import { useState } from "react";
import {
  Bar,
  BarChart,
  ReferenceLine,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";

function HistoryCard({
  post,
  hasNextPost,
}: {
  post: IPostInfo;
  hasNextPost: boolean;
}) {
  const [selectedPost, setSelectedPost] = useState<IPostInfo | null>(null);

  const formatDate = (timestamp: string) => {
    return new Date(timestamp).toLocaleDateString("ko-KR", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const truncateText = (text: string, maxLength = 50) => {
    return text.length > maxLength
      ? text.substring(0, maxLength) + "..."
      : text;
  };

  function getChangeIcon(before: number, after: number) {
    const diff = after - before;
    if (diff > 0) return <TrendingUp className="h-3 w-3 text-green-500" />;
    if (diff < 0) return <TrendingDown className="h-3 w-3 text-red-500" />;
    return <Minus className="h-3 w-3 text-gray-400" />;
  }

  function getChangeColor(before: number, after: number) {
    const diff = after - before;
    if (diff > 0) return "text-green-600";
    if (diff < 0) return "text-red-600";
    return "text-gray-500";
  }

  const colorBefore = "#a9887b";
  const colorDiff = "#c7b199";
  const colorEmpty = "#55403a";

  const getStackedChartData = (mbti: IMbtiUpdateInfo) => {
    return [
      ...["EI", "SN", "TF", "JP"].map((type) => {
        const current =
          type === "EI"
            ? mbti.eiScore
            : type === "SN"
            ? mbti.snScore
            : type === "TF"
            ? mbti.tfScore
            : mbti.jpScore;

        const isChanged = mbti.changedMbtiType === type;
        const diff = isChanged ? mbti.currentScore - mbti.previousScore : 0;

        return {
          dimension:
            type === "EI"
              ? "I/E"
              : type === "SN"
              ? "S/N"
              : type === "TF"
              ? "T/F"
              : "J/P",
          type,
          unchanged: !isChanged,
          base: isChanged ? (diff > 0 ? mbti.previousScore : current) : current,
          increased: isChanged && diff > 0 ? diff : 0,
          decreased: isChanged && diff < 0 ? Math.abs(diff) : 0,
          total: current,
        };
      }),
    ];
  };

  return (
    <Card className="relative border-brown-200">
      {hasNextPost && (
        <div className="absolute left-4 top-full w-0.5 h-4 z-0 bg-brown-200" />
      )}

      <CardHeader>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-primary flex-shrink-0" />
          <div className="flex items-center gap-1 text-sm font-bold">
            <Calendar className="h-3 w-3" />
            {formatDate(post.createdAt)}
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
        <Popover>
          <PopoverTrigger asChild>
            <div className="cursor-pointer group">
              <div className="flex items-start gap-2 p-2 rounded-lg hover:bg-muted/60 transition-colors">
                <MessageSquare className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                    {truncateText(post.content)}
                  </p>
                  <div className="flex items-center gap-1 mt-1">
                    <Eye className="h-3 w-3 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">
                      클릭하여 전체 보기
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </PopoverTrigger>

          <PopoverContent className="w-80 p-4" side="top" align="start">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <MessageSquare className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium">피드 내용</span>
              </div>
              <p className="text-base text-brown-dark font-bold">
                {post.groupName} - {post.manitteeName}
              </p>
              <img
                src={post.imageUrl}
                alt="feed-image"
                className="w-full h-auto rounded-lg"
              />
              <p className="text-sm leading-relaxed">{post.content}</p>
            </div>
          </PopoverContent>
        </Popover>

        {post.mbtiUpdate ? (
          <>
            <div className="text-center p-2 bg-muted/30 rounded-lg border space-y-1">
              <div className="text-sm">
                {post.mbtiUpdate.changedMbtiType === "EI"
                  ? "IE"
                  : post.mbtiUpdate.changedMbtiType}
              </div>
              <div className="flex items-center justify-center gap-1 mb-1">
                {getChangeIcon(
                  post.mbtiUpdate.previousScore,
                  post.mbtiUpdate.currentScore
                )}
                <span
                  className={`text-xs font-bold ${getChangeColor(
                    post.mbtiUpdate.previousScore,
                    post.mbtiUpdate.currentScore
                  )}`}
                >
                  {post.mbtiUpdate.currentScore -
                    post.mbtiUpdate.previousScore >
                  0
                    ? "+"
                    : ""}
                  {post.mbtiUpdate.currentScore - post.mbtiUpdate.previousScore}
                </span>
              </div>
              <div className="text-xs text-muted-foreground">
                {post.mbtiUpdate.previousScore}→{post.mbtiUpdate.currentScore}
              </div>
            </div>

            <div className="bg-brown-50 rounded-lg p-3">
              <div className="flex items-center gap-2 mb-2">
                <Lightbulb className="h-3 w-3 text-brown-600" />
                <span className="text-xs font-medium text-brown-900">
                  변화 분석
                </span>
              </div>
              <p className="text-xs text-brown-900 leading-relaxed">
                {post.mbtiUpdate.changeReason}
              </p>
            </div>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setSelectedPost(
                  selectedPost?.feedId === post.feedId ? null : post
                );
              }}
              className="w-full text-xs h-8"
            >
              <span>상세 차트</span>
              {selectedPost?.feedId === post.feedId ? (
                <ChevronUp className="h-3 w-3 ml-1" />
              ) : (
                <ChevronDown className="h-3 w-3 ml-1" />
              )}
            </Button>

            {selectedPost?.feedId === post.feedId && (
              <div className="space-y-4 border-t pt-4">
                <div className="text-sm font-medium">MBTI 변화 추이</div>
                <div className="flex items-center gap-2">
                  <ChartContainer
                    config={{
                      value: {
                        label: "점수",
                      },
                    }}
                    className="h-[150px]"
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={getStackedChartData(post.mbtiUpdate)}>
                        <XAxis dataKey="dimension" tick={{ fontSize: 10 }} />
                        <YAxis domain={[0, 100]} tick={{ fontSize: 10 }} />
                        <ReferenceLine
                          y={50}
                          stroke="#666"
                          strokeDasharray="2 2"
                        />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Bar
                          dataKey="base"
                          stackId="a"
                          fill={colorBefore}
                          animationDuration={400}
                        />
                        <Bar
                          dataKey="decreased"
                          stackId="a"
                          fill={colorEmpty}
                          animationBegin={400}
                        />
                        <Bar
                          dataKey="increased"
                          stackId="a"
                          fill={colorDiff}
                          animationBegin={400}
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="text-center p-2 bg-muted/30 rounded-lg border space-y-1">
            <div className="text-sm">MBTI 분석 결과가 없습니다.</div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default HistoryCard;
