import { useState } from 'react';
import { Trash2, Star, X } from 'lucide-react';
import Breadcrumbs from '../../components/common/Breadcrumbs';
import Button from '../../components/common/Button';

interface Form {
  id: string;
  name: string;
  tags: string[];
  createdAt: string;
  deadline: string;
  status: 'draft' | 'published' | 'closed';
  targetCount: number;
  participantCount: number;
}

export default function Forms() {
  const [selectedForms, setSelectedForms] = useState<string[]>([]);
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);

  const forms: Form[] = Array(20).fill(null).map((_, index) => ({
    id: String(index + 1),
    name: '프론트엔드 6기 만족도 조사 15주차',
    tags: ['오즈부트캠프'],
    createdAt: '2024-12-01',
    deadline: '2024-12-31',
    status: index < 6 ? 'draft' : index < 10 ? 'published' : 'closed',
    targetCount: 27,
    participantCount: index % 27,
  }));

  const handleSelectAll = (checked: boolean) => {
    setSelectedForms(checked ? forms.map(form => form.id) : []);
  };

  const handleSelectForm = (formId: string) => {
    setSelectedForms(prev => 
      prev.includes(formId) 
        ? prev.filter(id => id !== formId)
        : [...prev, formId]
    );
  };

  const getStatusText = (status: Form['status']) => {
    switch (status) {
      case 'draft': return '임시 저장';
      case 'published': return '발행';
      case 'closed': return '종료';
    }
  };

  const getStatusStyle = (status: Form['status']) => {
    switch (status) {
      case 'draft':
        return 'bg-status-yellow-bg text-status-yellow-text';
      case 'published':
        return 'bg-status-green-bg text-status-green-text';
      case 'closed':
        return 'bg-status-red-bg text-status-red-text';
    }
  };

  const getActionButtons = (status: Form['status']) => {
    const handlePreview = () => setIsPreviewModalOpen(true);

    const previewButton = (
      <Button size="sm" variant="neutral" className="w-24" onClick={handlePreview}>
        미리 보기
      </Button>
    );

    switch (status) {
      case 'draft':
        return (
          <div className="flex gap-2">
            {previewButton}
            <div className="flex gap-2">
              <Button size="sm" variant="neutral" className="w-24">수정</Button>
              <Button size="sm" variant="neutral" className="w-20">발행하기</Button>
            </div>
          </div>
        );
      case 'published':
      case 'closed':
        return (
          <div className="flex gap-2">
            {previewButton}
            <Button size="sm" variant="neutral" className="px-4">결과 보기</Button>
          </div>
        );
    }
  };

  const customCheckboxStyle = "w-5 h-5 rounded border-2 border-pollloop-brown-01 text-pollloop-orange bg-pollloop-light-beige focus:ring-0 focus:ring-offset-0";

  return (
    <div className="flex flex-col h-full bg-pollloop-bg-01">

      {/* Main Content */}
      <div className="flex-1 overflow-hidden">
        <div className="px-10 py-4">
          <Breadcrumbs items={['홈', '나의 폼']} />
        </div>
        
        <div className="px-10">
          <div className="flex flex-col h-[calc(100vh-140px)] bg-pollloop-bg-02 rounded-2xl">
            <div className="p-8">
              <div className="flex justify-between items-center">
                <h2 className="text-[22px] font-semibold">나의 폼</h2>
                <div className="flex gap-2">
                  <Button 
                    variant="danger" 
                    size="sm"
                    onClick={() => {/* 삭제 로직 */}}
                    disabled={selectedForms.length === 0}
                  >
                    삭제
                  </Button>
                  <Button
                    variant="primary"
                    size="sm"
                  >
                    폼 만들기
                  </Button>
                </div>
              </div>
            </div>

            <div className="flex-1 overflow-hidden px-8 pb-8">
              <div className="h-full flex flex-col">
                <table className="w-full table-fixed">
                  <colgroup>
                    <col className="w-[300px]" />
                    <col className="w-[120px]" />
                    <col className="w-[120px]" />
                    <col className="w-[120px]" />
                    <col className="w-[100px]" />
                    <col className="w-[100px]" />
                    <col className="w-[80px]" />
                    <col className="w-[300px]" />
                    <col className="w-[80px]" />
                  </colgroup>
                  <thead>
                    <tr className="bg-pollloop-coral rounded-lg">
                      <th className="p-4 font-semibold text-sm text-left rounded-l-lg">
                        <div className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={selectedForms.length === forms.length}
                            onChange={(e) => handleSelectAll(e.target.checked)}
                            className={customCheckboxStyle}
                          />
                          <span>폼 이름</span>
                        </div>
                      </th>
                      <th className="p-4 font-semibold text-sm text-left">태그</th>
                      <th className="p-4 font-semibold text-sm text-left">생성 일자</th>
                      <th className="p-4 font-semibold text-sm text-left">마감 일자</th>
                      <th className="p-4 font-semibold text-sm text-left">상태</th>
                      <th className="p-4 font-semibold text-sm text-left">참여 인원</th>
                      <th className="p-4 font-semibold text-sm text-left">참여율</th>
                      <th className="p-4 font-semibold text-sm text-left"></th>
                      <th className="p-4 rounded-r-lg"></th>
                    </tr>
                  </thead>
                </table>
                <div className="flex-1 overflow-y-auto">
                  <table className="w-full table-fixed">
                    <colgroup>
                      <col className="w-[300px]" />
                      <col className="w-[120px]" />
                      <col className="w-[120px]" />
                      <col className="w-[120px]" />
                      <col className="w-[100px]" />
                      <col className="w-[100px]" />
                      <col className="w-[80px]" />
                      <col className="w-[300px]" />
                      <col className="w-[80px]" />
                    </colgroup>
                    <tbody className="divide-y-4 divide-pollloop-bg-01">
                      {forms.map((form) => (
                        <tr 
                          key={form.id} 
                          className="bg-pollloop-light-beige rounded-lg hover:bg-pollloop-bg-01 h-16"
                        >
                          <td className="p-4 rounded-l-lg">
                            <div className="flex items-center gap-2">
                              <input
                                type="checkbox"
                                checked={selectedForms.includes(form.id)}
                                onChange={() => handleSelectForm(form.id)}
                                className={customCheckboxStyle}
                              />
                              <span className="font-medium">{form.name}</span>
                            </div>
                          </td>
                          <td className="p-4">
                            <div className="flex gap-1">
                              {form.tags.map(tag => (
                                <span 
                                  key={tag} 
                                  className="px-2 py-1 rounded-lg text-xs bg-tag-secondary-bg text-tag-secondary-text"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </td>
                          <td className="p-4 text-sm">{form.createdAt}</td>
                          <td className="p-4 text-sm">{form.deadline}</td>
                          <td className="p-4">
                            <span className={`px-2 py-1 rounded-full text-xs ${getStatusStyle(form.status)}`}>
                              {getStatusText(form.status)}
                            </span>
                          </td>
                          <td className="p-4 text-sm text-left">
                            {form.participantCount}/{form.targetCount}
                          </td>
                          <td className="p-4 text-sm text-left">
                            {((form.participantCount / form.targetCount) * 100).toFixed(0)}%
                          </td>
                          <td className="p-4">
                            {getActionButtons(form.status)}
                          </td>
                          <td className="p-4 rounded-r-lg">
                            <div className="flex gap-4 text-pollloop-brown-01">
                              <button className="hover:text-pollloop-brown-02">
                                <Trash2 size={18} />
                              </button>
                              <button className="hover:text-pollloop-brown-02">
                                <Star size={18} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {isPreviewModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-[612px] bg-pollloop-light-beige rounded-2xl border border-[0.5px] border-pollloop-brown-01">
            <div className="flex flex-col gap-6 p-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium text-pollloop-brown-02">미리 보기</h3>
                <button 
                  onClick={() => setIsPreviewModalOpen(false)}
                  className="text-pollloop-brown-01 hover:text-pollloop-brown-02"
                >
                  <X size={24} />
                </button>
              </div>
              <div className="flex flex-col gap-6">
                <div className="flex justify-end gap-2">
                  <Button variant="neutral" size="sm" className="px-3">
                    수정
                  </Button>
                  <Button variant="primary" size="sm" className="px-4">
                    발행하기
                  </Button>
                </div>
                <div className="bg-pollloop-bg-01 rounded-xl w-[564px] h-[308px] flex items-center justify-center text-pollloop-brown-01/60">
                  (미리보기 내용 생략)
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}