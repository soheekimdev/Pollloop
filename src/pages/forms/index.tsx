import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Trash2, Star, X, Check } from 'lucide-react';
import Breadcrumbs from '../../components/common/Breadcrumbs';
import Button from '../../components/common/Button';
import FormStatusBadge from '../../components/common/status-badge/FormStatusBadge';
import { cn } from '../../utils/cn';
import { FormListItem, FormStatus } from '../../types/forms/forms.types';
import { successToast, errorToast } from '../../utils/toast';
import 'react-toastify/dist/ReactToastify.css';

// 스웨거 기반 목업 데이터
export const mockForms: FormListItem[] = [
  {
    "title": "설문조사 생성 테스트1",
    "tag": "설문조사생성1 태그",
    "create_at": "2025-01-08",
    "end_at": "2025-01-31",
    "is_closed": "OPEN",
    "access_code": "56801",
    "uuid": "96487021696562861821",
    "target_count": 46,
    "is_private": false,
    "is_bookmark": false,
    "completed_count": 8
  },
  {
    "title": "설문조사 생성 테스트2",
    "tag": "설문조사생성2 태그",
    "create_at": "2025-01-08",
    "end_at": "2025-01-31",
    "is_closed": "OPEN",
    "access_code": "56775",
    "uuid": "17998266948177270132",
    "target_count": 30,
    "is_private": false,
    "is_bookmark": true,
    "completed_count": 30
  },
  {
    "title": "설문조사 생성 테스트3",
    "tag": "설문조사생성3 태그",
    "create_at": "2025-01-08",
    "end_at": "2025-01-31",
    "is_closed": "CLOSED",
    "access_code": "61864",
    "uuid": "14328580701078995276",
    "target_count": 50,
    "is_private": false,
    "is_bookmark": true,
    "completed_count": 3
  },
  {
    "title": "설문조사 생성 테스트4",
    "tag": "설문조사생성4 태그",
    "create_at": "2025-01-08",
    "end_at": "2025-01-31",
    "is_closed": "OPEN",
    "access_code": "51545",
    "uuid": "60493137544415082420",
    "target_count": 16,
    "is_private": true,
    "is_bookmark": true,
    "completed_count": 16
  },
  {
    "title": "설문조사 생성 테스트5",
    "tag": "설문조사생성5 태그",
    "create_at": "2025-01-08",
    "end_at": "2025-01-31",
    "is_closed": "CLOSED",
    "access_code": "47378",
    "uuid": "63178930654858518266",
    "target_count": 34,
    "is_private": false,
    "is_bookmark": true,
    "completed_count": 10
  },
  {
    "title": "설문조사 생성 테스트6",
    "tag": "설문조사생성6 태그",
    "create_at": "2025-01-08",
    "end_at": "2025-01-31",
    "is_closed": "OPEN",
    "access_code": "38082",
    "uuid": "56168280976713418989",
    "target_count": 39,
    "is_private": true,
    "is_bookmark": true,
    "completed_count": 0
  },
  {
    "title": "설문조사 생성 테스트7",
    "tag": "설문조사생성7 태그",
    "create_at": "2025-01-08",
    "end_at": "2025-01-31",
    "is_closed": "TEMP",
    "access_code": "54604",
    "uuid": "10469959714114593196",
    "target_count": 32,
    "is_private": false,
    "is_bookmark": false,
    "completed_count": 24
  },
  {
    "title": "설문조사 생성 테스트8",
    "tag": "설문조사생성8 태그",
    "create_at": "2025-01-08",
    "end_at": "2025-01-31",
    "is_closed": "OPEN",
    "access_code": "53556",
    "uuid": "13402484602409938305",
    "target_count": 11,
    "is_private": true,
    "is_bookmark": true,
    "completed_count": 18
  },
  {
    "title": "설문조사 생성 테스트9",
    "tag": "설문조사생성9 태그",
    "create_at": "2025-01-08",
    "end_at": "2025-01-31",
    "is_closed": "CLOSED",
    "access_code": "12485",
    "uuid": "93930161646355766236",
    "target_count": 39,
    "is_private": false,
    "is_bookmark": false,
    "completed_count": 20
  },
  {
    "title": "설문조사 생성 테스트10",
    "tag": "설문조사생성10 태그",
    "create_at": "2025-01-08",
    "end_at": "2025-01-31",
    "is_closed": "CLOSED",
    "access_code": "99760",
    "uuid": "57987118064489438267",
    "target_count": 19,
    "is_private": true,
    "is_bookmark": true,
    "completed_count": 6
  },
  {
    "title": "설문조사 생성 테스트11",
    "tag": "설문조사생성11 태그",
    "create_at": "2025-01-08",
    "end_at": "2025-01-31",
    "is_closed": "OPEN",
    "access_code": "10638",
    "uuid": "34307169726260408301",
    "target_count": 21,
    "is_private": false,
    "is_bookmark": true,
    "completed_count": 17
  },
  {
    "title": "설문조사 생성 테스트12",
    "tag": "설문조사생성12 태그",
    "create_at": "2025-01-08",
    "end_at": "2025-01-31",
    "is_closed": "CLOSED",
    "access_code": "25370",
    "uuid": "23265063914507580651",
    "target_count": 28,
    "is_private": true,
    "is_bookmark": true,
    "completed_count": 1
  },
  {
    "title": "설문조사 생성 테스트13",
    "tag": "설문조사생성13 태그",
    "create_at": "2025-01-08",
    "end_at": "2025-01-31",
    "is_closed": "OPEN",
    "access_code": "82581",
    "uuid": "61149062394764764474",
    "target_count": 11,
    "is_private": false,
    "is_bookmark": true,
    "completed_count": 30
  },
  {
    "title": "설문조사 생성 테스트14",
    "tag": "설문조사생성14 태그",
    "create_at": "2025-01-08",
    "end_at": "2025-01-31",
    "is_closed": "CLOSED",
    "access_code": "90701",
    "uuid": "58812308217458843249",
    "target_count": 35,
    "is_private": false,
    "is_bookmark": false,
    "completed_count": 20
  },
  {
    "title": "설문조사 생성 테스트15",
    "tag": "설문조사생성15 태그",
    "create_at": "2025-01-08",
    "end_at": "2025-01-31",
    "is_closed": "OPEN",
    "access_code": "53512",
    "uuid": "36463169112936639978",
    "target_count": 47,
    "is_private": false,
    "is_bookmark": false,
    "completed_count": 0
  },
  {
    "title": "설문조사 생성 테스트16",
    "tag": "설문조사생성16 태그",
    "create_at": "2025-01-08",
    "end_at": "2025-01-31",
    "is_closed": "OPEN",
    "access_code": "67828",
    "uuid": "37620295372274135693",
    "target_count": 23,
    "is_private": true,
    "is_bookmark": true,
    "completed_count": 2
  }
]

// 체크박스 컴포넌트
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
  const navigate = useNavigate();
  const [forms, setForms] = useState<FormListItem[]>(
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
      setForms(prev => prev.filter(form => !selectedForms.includes(form.uuid)));
      setSelectedForms([]);
      successToast('폼이 삭제되었습니다.');
    } catch (error) {
      console.error('폼 삭제 실패:', error);
      errorToast('폼 삭제에 실패했습니다.');
    }
  };

  const getFormStatus = (form: FormListItem): '임시 저장' | '발행' | '종료' => {
    switch(form.is_closed) {
      case 'CLOSED':
        return '종료';
      case 'TEMP':
        return '임시 저장';
      case 'OPEN':
        return '발행';
      default:
        throw new Error(`Unexpected form status: ${form.is_closed}`);
    }
};

  const handleActionButton = (form: FormListItem) => {
    const status = getFormStatus(form);
    if (status === '임시 저장') {
      return (
        <div className="flex gap-2">
          <Button size="sm" variant="neutral" className="w-14 text-xs">
            수정
          </Button>
          <Button size="sm" variant="neutral" className="w-20 text-xs">
            발행하기
          </Button>
        </div>
      );
    } else {
      return (
        <Button 
          size="sm" 
          variant="neutral" 
          className="w-[146px] text-xs"
          onClick={() => navigate(`/forms/${form.uuid}`)}
        >
          결과 보기
        </Button>
      );
    }
  };

  return (
    <div className="flex flex-col h-full bg-pollloop-bg-01">
      <div className="flex-1 overflow-hidden pb-10">
        <div className="px-10 py-4">
          <Breadcrumbs items={['홈', '나의 폼']} />
        </div>
        
        <div className="px-10">
          <div className="flex flex-col h-[calc(100vh-188px)] bg-pollloop-bg-02 rounded-2xl">
            <div className="px-8 pt-8 pb-6">
              <div className="flex justify-between items-center">
                <h2 className="text-[22px] font-semibold">나의 폼</h2>
                <div className="flex gap-2">
                  <Button 
                    variant="danger" 
                    size="sm"
                    onClick={handleDeleteForms}
                    disabled={selectedForms.length === 0}
                    className="text-xs"
                  >
                    삭제
                  </Button>
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => navigate('/forms/create')}
                    className="text-xs"
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
  
                <div className="flex-1 overflow-y-auto scrollable">
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
                    <tbody className="divide-y divide-pollloop-bg-01 [&>*]:my-2">
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
                                <FormStatusBadge status={status} className='flex-shrink-0'/>
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
                                className="w-20 text-xs"
                                onClick={() => {
                                    setSelectedFormId(form.uuid);
                                    setIsPreviewModalOpen(true);
                                }}
                                >
                                미리 보기
                                </Button>
                            </td>
                            <td className="p-4">
                                {handleActionButton(form)}
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