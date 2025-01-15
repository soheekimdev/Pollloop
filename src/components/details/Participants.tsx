import { useState, useEffect } from 'react';
import Button from '../../components/common/Button';
import { fetchParticipantsList, sendParticipationReminder } from '../../api/form-detail';
import { successToast, errorToast } from '../../utils/toast';
import { Participant, SortOrder } from '../../types/form-details.types';
import { useInView } from '../../hooks/useInView';

interface ParticipantsProps {
  formId: string;
}

export default function Participants({ formId }: ParticipantsProps) {
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [lastRequestTime, setLastRequestTime] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [sortBy, setSortBy] = useState<SortOrder>('completed');
  
  const { ref, isInView } = useInView<HTMLDivElement>();

  const sortParticipants = (participants: Participant[], sortBy: SortOrder) => {
    return [...participants].sort((a, b) => {
      if (sortBy === 'completed') {
        return Number(b.is_complete) - Number(a.is_complete);
      } else {
        return Number(a.is_complete) - Number(b.is_complete);
      }
    });
  };
  
  const fetchParticipants = async (pageNum: number) => {
    if (!hasMore) return;
    
    try {
      setIsLoading(true);
      const data = await fetchParticipantsList(formId);
      if (data.length === 0) {
        setHasMore(false);
      } else {
        const sortedData = sortParticipants(data, sortBy);
        setParticipants(prev => 
          pageNum === 1 ? sortedData : sortParticipants([...prev, ...data], sortBy)
        );
        setPage(pageNum + 1);
      }
    } catch (error) {
      console.error('참여자 목록 조회 실패:', error);
      errorToast('참여자 목록을 불러오는데 실패했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSort = (newSortBy: SortOrder) => {
    if (sortBy === newSortBy) return;
    setSortBy(newSortBy);
    setPage(1);
    setHasMore(true);
    setParticipants(prev => sortParticipants(prev, newSortBy));
  };

  const sendReminder = async () => {
    if (lastRequestTime) {
      const lastRequest = new Date(lastRequestTime);
      const now = new Date();
      const hoursDiff = (now.getTime() - lastRequest.getTime()) / (1000 * 60 * 60);
      
      if (hoursDiff < 24) {
        errorToast('참여 요청은 24시간에 한 번만 가능합니다.');
        return;
      }
    }

    try {
      setIsLoading(true);
      await sendParticipationReminder(formId);
      setLastRequestTime(new Date().toISOString());
      successToast('참여 요청을 보냈습니다.');
    } catch (error) {
      console.error('참여 요청 메일 전송 실패:', error);
      errorToast('참여 요청 메일 전송에 실패했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (formId) {
      fetchParticipants(1);
    }
  }, [formId, sortBy]);

  useEffect(() => {
    if (isInView && !isLoading && hasMore) {
      fetchParticipants(page);
    }
  }, [isInView]);

  return (
    <div className="flex flex-col gap-4 bg-pollloop-light-beige p-8 rounded-2xl">
      <div className="flex items-center justify-between">
        <p className="text-13 text-tag-secondary-text">
          마지막 참여 요청 시간: {lastRequestTime ? new Date(lastRequestTime).toLocaleString() : '-'}
        </p>
        <div className="flex gap-2">
          <Button
            type="button"
            variant={sortBy === 'completed' ? 'primary' : 'neutral'}
            size="sm"
            className="text-xs px-4"
            onClick={() => handleSort('completed')}
          >
            응답 완료 순
          </Button>
          <Button
            type="button"
            variant={sortBy === 'incomplete' ? 'primary' : 'neutral'}
            size="sm"
            className="text-xs px-4"
            onClick={() => handleSort('incomplete')}
          >
            미완료 순
          </Button>
          <Button 
            type="button"
            variant="primary"
            size="sm"
            className="text-xs px-4"
            onClick={sendReminder}
            disabled={isLoading}
          >
            참여 요청하기
          </Button>
        </div>
      </div>

      <div className="flex flex-col gap-2 max-h-[calc(100vh-300px)] overflow-y-auto scrollable">
        {participants.map((participant, index) => (
          <div 
            key={`${participant.email}-${index}`}
            className="flex items-center justify-between px-4 py-3 bg-[#FFEED1] rounded-lg"
            ref={index === participants.length - 1 ? ref : undefined}
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#FFDBB3] flex items-center justify-center">
                <span className="text-pollloop-brown-01">
                  {participant.email[0].toUpperCase()}
                </span>
              </div>
              <span className="text-pollloop-brown-01">{participant.email}</span>
            </div>
            <span 
              className={`px-2 py-1 text-xs rounded-full ${
                participant.is_complete 
                  ? 'bg-status-green-bg text-status-green-text' 
                  : 'bg-status-red-bg text-status-red-text'
              }`}
            >
              {participant.is_complete ? '응답 완료' : '미응답'}
            </span>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-center py-4">
            <span className="text-sm text-tag-secondary-text">로딩 중...</span>
          </div>
        )}
      </div>
    </div>
  );
}