import { useEffect, useState } from 'react';
import { Mail } from 'lucide-react';
import Button from '../../components/common/Button';
import { fetchParticipants, sendParticipationRequest } from '../../api/form-detail';
import { FormParticipant } from '../../types/form-details.types';
import { successToast, errorToast } from '../../utils/toast';

interface ParticipantsProps {
  formId: string;
}

export default function Participants({ formId }: ParticipantsProps) {
  const [participants, setParticipants] = useState<FormParticipant[]>([]);
  const [sortByCompleted, setSortByCompleted] = useState(true);
  const [lastRequestTime, setLastRequestTime] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const [isRequesting, setIsRequesting] = useState(false);

  useEffect(() => {
    const loadParticipants = async () => {
      try {
        const { data } = await fetchParticipants(formId);
        setParticipants(data);
        setIsLoading(false);
      } catch (error) {
        console.error('참여자 목록 로딩 실패:', error);
        errorToast('참여자 목록을 불러오는데 실패했습니다.');
        setIsLoading(false);
      }
    };

    loadParticipants();
  }, [formId]);

  const sortParticipants = () => {
    setSortByCompleted(!sortByCompleted);
    setParticipants(prev => 
      [...prev].sort((a, b) => {
        if (sortByCompleted) {
          return a.is_complete === b.is_complete ? 0 : a.is_complete ? 1 : -1;
        }
        return a.is_complete === b.is_complete ? 0 : a.is_complete ? -1 : 1;
      })
    );
  };

  const handleParticipationRequest = async () => {
    const uncompletedEmails = participants
      .filter(p => !p.is_complete)
      .map(p => p.email);

    if (uncompletedEmails.length === 0) {
      errorToast('미응답 참여자가 없습니다.');
      return;
    }

    // 24시간 쿨타임 체크
    if (lastRequestTime) {
      const lastRequest = new Date(lastRequestTime).getTime();
      const now = new Date().getTime();
      const hoursSinceLastRequest = (now - lastRequest) / (1000 * 60 * 60);
      
      if (hoursSinceLastRequest < 24) {
        errorToast('마지막 요청 후 24시간이 지나지 않았습니다.');
        return;
      }
    }

    try {
      setIsRequesting(true);
      await sendParticipationRequest(formId, uncompletedEmails);
      successToast('참여 요청을 보냈습니다.');
      setLastRequestTime(new Date().toISOString());
    } catch (error) {
      console.error('참여 요청 실패:', error);
      errorToast('참여 요청 전송에 실패했습니다.');
    } finally {
      setIsRequesting(false);
    }
  };

  if (isLoading) {
    return <div>로딩 중...</div>;
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between text-sm text-pollloop-brown-01">
        <p>마지막 참여 요청 시간: {lastRequestTime || '-'}</p>
        <div className="flex items-center gap-2">
          <Button 
            onClick={sortParticipants}
            variant="neutral"
            size="sm"
            className="w-[100px]"
          >
            {sortByCompleted ? '응답 완료 순' : '미완료 순'}
          </Button>
          <Button 
            onClick={handleParticipationRequest}
            disabled={isRequesting}
            variant="secondary"
            size="sm"
          >
            참여 요청하기
          </Button>
        </div>
      </div>

      <ul className="flex flex-col gap-2">
        {participants.map((participant, index) => (
          <li 
            key={index}
            className="flex items-center justify-between gap-2 p-4 rounded-lg bg-pollloop-brown-01/15"
          >
            <div className="flex items-center gap-4">
              <Mail size={24} />
              <span>{participant.email}</span>
            </div>
            <span className={`px-2 py-1 text-xs rounded-lg ${
              participant.is_complete 
                ? 'bg-status-green-bg text-status-green-text'
                : 'bg-status-red-bg text-status-red-text'
            }`}>
              {participant.is_complete ? '응답 완료' : '미응답'}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}