import { useState } from 'react';
import { Trash2, Star, X, Check } from 'lucide-react';
import Breadcrumbs from '../../components/common/Breadcrumbs';
import Button from '../../components/common/Button';
import FormStatusBadge from '../../components/common/status-badge/FormStatusBadge';
import { cn } from '../../utils/cn';

// API 응답 데이터 타입
interface Form {
  uuid: string;
  user: number;
  title: string;
  tag: string;
  create_at: string;
  end_at: string;
  is_closed: boolean;
  status?: '임시 저장' | '발행' | '종료';
  access_code?: string;
  is_bookmark: boolean;
  completed_count: number;
  target_count: number;
}

// API 명세서 기반 목업 데이터
export const mockForms = [
  {
    uuid: "12e3a5b415d98be25e8e7a766fb750bf",
    user: 1,
    title: "프론트엔드 6기 만족도 조사 1주차",
    tag: "오즈부트캠프",
    create_at: "2024-12-29",
    end_at: "2024-12-29",
    is_closed: false,
    is_bookmark: false,
    completed_count: 12,
    target_count: 21
  },
  {
    uuid: "bcba661ffc39f4b26ca2d21200fdd117",
    user: 1,
    title: "프론트엔드 6기 만족도 조사 2주차",
    tag: "오즈부트캠프",
    create_at: "2024-11-30",
    end_at: "2024-12-02",
    is_closed: true,
    is_bookmark: false,
    completed_count: 16,
    target_count: 16
  },
  {
    uuid: "255e2a43094a1f15f18a063b19de324e",
    user: 1,
    title: "프론트엔드 6기 만족도 조사 3주차",
    tag: "오즈부트캠프",
    create_at: "2024-11-18",
    end_at: "2024-12-13",
    is_closed: false,
    is_bookmark: false,
    completed_count: 6,
    target_count: 25
  },
  {
    uuid: "049b00dff1570acb4fd4957d1064dba1",
    user: 1,
    title: "프론트엔드 6기 만족도 조사 4주차",
    tag: "오즈부트캠프",
    create_at: "2024-11-21",
    end_at: "2024-12-18",
    is_closed: true,
    is_bookmark: false,
    completed_count: 21,
    target_count: 21
  },
  {
    uuid: "f871383078bed649170c13caa74fb2bb",
    user: 1,
    title: "프론트엔드 6기 만족도 조사 5주차",
    tag: "오즈부트캠프",
    create_at: "2024-12-09",
    end_at: "2024-12-18",
    is_closed: true,
    is_bookmark: false,
    completed_count: 27,
    target_count: 27
  },
  {
    uuid: "28c8b9969a206c0088d31c0bec5b4e20",
    user: 1,
    title: "프론트엔드 6기 만족도 조사 6주차",
    tag: "오즈부트캠프",
    create_at: "2024-11-08",
    end_at: "2024-11-10",
    is_closed: true,
    is_bookmark: false,
    completed_count: 0,
    target_count: 6
  },
  {
    uuid: "a7ab60a9acdfc5189a8d85e49bcdf6d5",
    user: 1,
    title: "프론트엔드 6기 만족도 조사 7주차",
    tag: "오즈부트캠프",
    create_at: "2024-11-18",
    end_at: "2024-11-20",
    is_closed: false,
    is_bookmark: false,
    completed_count: 20,
    target_count: 27
  },
  {
    uuid: "ce7e8ae6ec3afbc945ad97188e21f9c0",
    user: 1,
    title: "프론트엔드 6기 만족도 조사 8주차",
    tag: "오즈부트캠프",
    create_at: "2024-12-01",
    end_at: "2024-12-05",
    is_closed: false,
    is_bookmark: false,
    completed_count: 18,
    target_count: 28
  },
  {
    uuid: "3f8ff66bca294bf7881944c4d14e1537",
    user: 1,
    title: "프론트엔드 6기 만족도 조사 9주차",
    tag: "오즈부트캠프",
    create_at: "2024-11-15",
    end_at: "2024-12-10",
    is_closed: true,
    is_bookmark: true,
    completed_count: 13,
    target_count: 13
  },
  {
    uuid: "785fba2b032f11c8a7b55eb8b8da0fa4",
    user: 1,
    title: "프론트엔드 6기 만족도 조사 10주차",
    tag: "오즈부트캠프",
    create_at: "2024-11-24",
    end_at: "2024-12-12",
    is_closed: false,
    is_bookmark: false,
    completed_count: 8,
    target_count: 10
  },
  {
    uuid: "5822d22783b8cb6e0d858fdb846e312d",
    user: 1,
    title: "프론트엔드 6기 만족도 조사 11주차",
    tag: "오즈부트캠프",
    create_at: "2024-12-14",
    end_at: "2024-12-20",
    is_closed: true,
    is_bookmark: false,
    completed_count: 19,
    target_count: 22
  },
  {
    uuid: "bb8dff36f77211d39c99b49d8b63dce5",
    user: 1,
    title: "프론트엔드 6기 만족도 조사 12주차",
    tag: "오즈부트캠프",
    create_at: "2024-12-04",
    end_at: "2024-12-15",
    is_closed: false,
    is_bookmark: true,
    completed_count: 7,
    target_count: 12
  },
  {
    uuid: "d2b8c687d2d06087f07b7b688e81274f",
    user: 1,
    title: "프론트엔드 6기 만족도 조사 13주차",
    tag: "오즈부트캠프",
    create_at: "2024-11-29",
    end_at: "2024-12-07",
    is_closed: false,
    is_bookmark: false,
    completed_count: 15,
    target_count: 20
  },
  {
    uuid: "b8248ef2f3824d43182169ffda9f9232",
    user: 1,
    title: "프론트엔드 6기 만족도 조사 14주차",
    tag: "오즈부트캠프",
    create_at: "2024-11-23",
    end_at: "2024-12-03",
    is_closed: false,
    is_bookmark: false,
    completed_count: 5,
    target_count: 27
  },
  {
    uuid: "1b7b515c363c9e69904d164882c2d5f4",
    user: 1,
    title: "프론트엔드 6기 만족도 조사 15주차",
    tag: "오즈부트캠프",
    create_at: "2024-11-30",
    end_at: "2024-12-05",
    is_closed: false,
    is_bookmark: false,
    completed_count: 10,
    target_count: 20
  },
  {
    uuid: "76a0017123bcb4d364c9b8757089a516",
    user: 1,
    title: "프론트엔드 6기 만족도 조사 16주차",
    tag: "오즈부트캠프",
    create_at: "2024-12-17",
    end_at: "2024-12-20",
    is_closed: true,
    is_bookmark: false,
    completed_count: 17,
    target_count: 29
  },
  {
    uuid: "edb7cb7a87c2d35e65e00eea0879fed5",
    user: 1,
    title: "프론트엔드 6기 만족도 조사 17주차",
    tag: "오즈부트캠프",
    create_at: "2024-12-23",
    end_at: "2024-12-29",
    is_closed: false,
    is_bookmark: true,
    completed_count: 25,
    target_count: 27
  },
  {
    uuid: "f1854559821c51a31ef18a8e8a6c3f1e",
    user: 1,
    title: "프론트엔드 6기 만족도 조사 18주차",
    tag: "오즈부트캠프",
    create_at: "2024-11-08",
    end_at: "2024-12-03",
    is_closed: false,
    is_bookmark: false,
    completed_count: 16,
    target_count: 24
  }
];

// 체크박스 컴포넌트 - 컴포넌트 분리 예정
const CheckboxWithLabel = ({ checked, onChange, label }: { checked: boolean; onChange: (checked: boolean) => void; label?: string }) => (
  <div className="relative flex items-center gap-6">
    <div className="relative w-5 h-5">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="absolute w-5 h-5 rounded-[4px] border border-pollloop-brown-01 bg-pollloop-bg-02 checked:bg-pollloop-brown-01 checked:border-pollloop-brown-01 cursor-pointer appearance-none peer"
      />
      {checked && (
        <Check 
          className="pointer-events-none absolute left-0 top-0 w-5 h-5 text-pollloop-light-beige stroke-2" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
        />
      )}
    </div>
    {label && <span className="font-medium">{label}</span>}
  </div>
);

export default function Forms() {
  const [forms, setForms] = useState<Form[]>(
    [...mockForms].sort((a, b) => {
      if (a.is_bookmark === b.is_bookmark) return 0;
      return a.is_bookmark ? -1 : 1;
    })
  );
  const [selectedForms, setSelectedForms] = useState<string[]>([]);
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);
  const [selectedFormId, setSelectedFormId] = useState<string | null>(null);

  const handleSelectAll = (checked: boolean) => {
    setSelectedForms(checked ? forms.map(form => form.uuid) : []);
  };

  const handleSelectForm = (formId: string) => {
    setSelectedForms(prev => 
      prev.includes(formId) 
        ? prev.filter(id => id !== formId)
        : [...prev, formId]
    );
  };

  const handleToggleBookmark = async (formId: string) => {
    try {
      // API 호출 예시
      // const response = await fetch(/api/forms/${formId}/bookmark, {
      //   method: 'PUT',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ is_bookmark: true })
      // });
      
      const updatedForms = forms.map(form => {
        if (form.uuid === formId) {
          return { ...form, is_bookmark: !form.is_bookmark };
        }
        return form;
      });
      
      const sortedForms = [...updatedForms].sort((a, b) => {
        if (a.is_bookmark === b.is_bookmark) return 0;
        return a.is_bookmark ? -1 : 1;
      });
      
      setForms(sortedForms);
    } catch (error) {
      console.error('즐겨찾기 설정 실패:', error);
    }
  };

  const handleDeleteForms = async () => {
    if (!window.confirm('선택한 폼을 삭제하시겠습니까?\n\n삭제한 후에는 복구할 수 없습니다.')) return;
    
    try {
      // API 호출 예시
      // await Promise.all(selectedForms.map(formId =>
      //   fetch(/api/forms/${formId}, { method: 'DELETE' })
      // ));
      
      setForms(prev => prev.filter(form => !selectedForms.includes(form.uuid)));
      setSelectedForms([]);
    } catch (error) {
      console.error('폼 삭제 실패:', error);
    }
  };

  const getFormStatus = (form: Form): '임시 저장' | '발행' | '종료' => {
    if (form.is_closed) return '종료';
    // 추가적인 상태 판단 로직 필요 (임시저장/발행)
    return '발행';
  };

  return (
    <div className="flex flex-col h-full bg-pollloop-bg-01">
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
                    onClick={handleDeleteForms}
                    disabled={selectedForms.length === 0}
                  >
                    삭제
                  </Button>
                  <Button
                    variant="primary"
                    size="sm"
                    to="/forms/create"
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
                    <col className="w-[120px]" />
                    <col className="w-[200px]" />
                    <col className="w-[80px]" />
                  </colgroup>
                  <thead>
                    <tr className="bg-pollloop-coral rounded-lg">
                      <th className="p-4 font-semibold text-sm text-left rounded-l-lg">
                        <CheckboxWithLabel 
                          checked={selectedForms.length === forms.length}
                          onChange={handleSelectAll}
                          label="폼 이름"
                        />
                      </th>
                      <th className="p-4 font-semibold text-sm text-left">태그</th>
                      <th className="p-4 font-semibold text-sm text-left">생성 일자</th>
                      <th className="p-4 font-semibold text-sm text-left">마감 일자</th>
                      <th className="p-4 font-semibold text-sm text-left">상태</th>
                      <th className="p-4 font-semibold text-sm text-left">참여 인원</th>
                      <th className="p-4 font-semibold text-sm text-left">참여율</th>
                      <th className="p-4" />
                      <th className="p-4" />
                      <th className="p-4 rounded-r-lg" />
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
                      <col className="w-[120px]" />
                      <col className="w-[200px]" />
                      <col className="w-[80px]" />
                    </colgroup>
                    <tbody className="divide-y-4 divide-pollloop-bg-01">
                      {forms.map((form) => {
                        const status = getFormStatus(form);
                        return (
                          <tr 
                            key={form.uuid} 
                            className={cn(
                              'bg-pollloop-light-beige hover:bg-pollloop-bg-01 h-16'
                            )}
                          >
                            <td className="p-4 rounded-l-lg">
                              <CheckboxWithLabel 
                                checked={selectedForms.includes(form.uuid)}
                                onChange={() => handleSelectForm(form.uuid)}
                                label={form.title}
                              />
                            </td>
                            <td className="p-4">
                              <span className="px-2 py-1 rounded-lg text-xs bg-tag-secondary-bg text-tag-secondary-text">
                                {form.tag}
                              </span>
                            </td>
                            <td className="p-4 text-sm">{form.create_at}</td>
                            <td className="p-4 text-sm">{form.end_at}</td>
                            <td className="p-4">
                              <FormStatusBadge status={status} />
                            </td>
                            <td className="p-4 text-sm">
                              {form.completed_count}/{form.target_count}
                            </td>
                            <td className="p-4 text-sm">
                              {Math.round((form.completed_count / form.target_count) * 100)}%
                            </td>
                            <td className="p-4">
                              <Button
                                size="sm"
                                variant="neutral"
                                className="w-20"
                                onClick={() => {
                                  setSelectedFormId(form.uuid);
                                  setIsPreviewModalOpen(true);
                                }}
                              >
                                미리 보기
                              </Button>
                            </td>
                            <td className="p-4">
                              {status === '임시 저장' ? (
                                <div className="flex gap-2">
                                  <Button size="sm" variant="neutral" className="w-14">수정</Button>
                                  <Button size="sm" variant="neutral" className="w-20">발행하기</Button>
                                </div>
                              ) : (
                                <Button size="sm" variant="neutral" className="w-[146px]">결과 보기</Button>
                              )}
                            </td>
                            <td className="p-4 rounded-r-lg">
                              <div className="flex gap-4 text-pollloop-brown-01">
                                <button 
                                  onClick={() => handleDeleteForms()}
                                  className="hover:text-pollloop-brown-02"
                                >
                                  <Trash2 size={18} />
                                </button>
                                <button
                                  onClick={() => handleToggleBookmark(form.uuid)}
                                  className={cn(
                                    "hover:text-pollloop-brown-02",
                                    form.is_bookmark && "text-pollloop-orange"
                                  )}
                                >
                                  <Star size={18} fill={form.is_bookmark ? "currentColor" : "none"} />
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
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
                  <Button variant="neutral" size="sm" className="w-14">
                    수정
                  </Button>
                  <Button variant="primary" size="sm" className="w-20">
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