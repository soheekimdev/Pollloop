import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Trash2, Star, Check } from 'lucide-react';
import Breadcrumbs from '../../components/common/Breadcrumbs';
import Button from '../../components/common/Button';
import FormStatusBadge from '../../components/common/status-badge/FormStatusBadge';
import { cn } from '../../utils/cn';
import { FormInfo, FormListItem, FormStatus } from '../../types/forms/forms.types';
import { successToast, errorToast } from '../../utils/toast';
import 'react-toastify/dist/ReactToastify.css';
import Modal from '../../components/common/Modal';
import { fetchFormListData, fetchFormDeleteData, fetchFormBookmarkData } from '../../api/my-forms';
import FormPreview from '@/components/forms/create/FormPreview';
import { instance } from '@/api/axios';
import MainLoader from '@/components/common/loaders/MainLoader';

// 체크박스 컴포넌트
const CheckboxWithLabel = ({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
}) => (
  <div className="relative flex items-center gap-6">
    <div className="relative w-5 h-5">
      <input
        type="checkbox"
        checked={checked}
        onChange={e => onChange(e.target.checked)}
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
  const [forms, setForms] = useState<FormListItem[]>([]);
  const [selectedForms, setSelectedForms] = useState<string[]>([]);
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);
  const [selectedFormId, setSelectedFormId] = useState<string | null>(null);
  const [previewFormData, setPreviewFormData] = useState<FormInfo | null>(null);
  const [isLoadingPreview, setIsLoadingPreview] = useState(false);
  const [previewError, setPreviewError] = useState<string | null>(null);

  const breadcrumbsItems = ['홈', '나의 폼'];

  useEffect(() => {
    const loadForms = async () => {
      try {
        const forms = await fetchFormListData(); // forms는 FormListItem[] 타입

        const sortedForms = [...forms].sort((a, b) => {
          if (a.is_bookmark === b.is_bookmark) return 0;
          return a.is_bookmark ? -1 : 1;
        });
        setForms(sortedForms);
      } catch (error) {
        console.error('폼 목록 조회 실패:', error);
        errorToast('폼 목록을 불러오는데 실패했습니다.');
      }
    };
    loadForms();
  }, []);

  const loadFormPreview = async (uuid: string) => {
    setIsLoadingPreview(true);
    setPreviewError(null);

    try {
      const response = await instance.get(`/form/uuid:${uuid}/`);
      setPreviewFormData(response.data);
    } catch (error) {
      console.error('폼 데이터 로딩 실패:', error);
      setPreviewError('폼 데이터를 불러오는데 실패했습니다');
    } finally {
      setIsLoadingPreview(false);
    }
  };

  const handleClosePreview = () => {
    setIsPreviewModalOpen(false);
    setSelectedFormId(null);
    setPreviewFormData(null);
    setPreviewError(null);
  };

  const handleSelectAll = (checked: boolean) => {
    setSelectedForms(checked ? forms.map(form => form.uuid) : []);
  };

  const handleSelectForm = (formId: string) => {
    setSelectedForms(prev =>
      prev.includes(formId) ? prev.filter(id => id !== formId) : [...prev, formId],
    );
  };

  const handleToggleBookmark = async (formId: string) => {
    const form = forms.find(f => f.uuid === formId);
    if (!form) return;

    try {
      await fetchFormBookmarkData(formId, !form.is_bookmark);
      const updatedForms = forms.map(f => {
        if (f.uuid === formId) {
          return { ...f, is_bookmark: !f.is_bookmark };
        }
        return f;
      });

      const sortedForms = [...updatedForms].sort((a, b) => {
        if (a.is_bookmark === b.is_bookmark) return 0;
        return a.is_bookmark ? -1 : 1;
      });

      setForms(sortedForms);
      successToast(form.is_bookmark ? '즐겨찾기가 해제되었습니다.' : '즐겨찾기에 추가되었습니다.');
    } catch (error) {
      console.error('즐겨찾기 설정 실패:', error);
      errorToast('즐겨찾기 설정에 실패했습니다.');
    }
  };

  const handleDeleteForms = async (formId?: string) => {
    const formsToDelete = formId ? [formId] : selectedForms;
    
    if (formsToDelete.length === 0) return;
    
    const confirmMessage = formsToDelete.length === 1
      ? '이 폼을 삭제하시겠습니까?'
      : `선택한 ${formsToDelete.length}개의 폼을 삭제하시겠습니까?`;
  
    if (!window.confirm(`${confirmMessage}\n\n삭제한 후에는 복구할 수 없습니다.`)) 
      return;
  
    try {
      await fetchFormDeleteData(formsToDelete);
      
      setForms(prev => prev.filter(form => !formsToDelete.includes(form.uuid)));
      setSelectedForms(prev => prev.filter(id => !formsToDelete.includes(id)));
      
      const successMessage = formsToDelete.length === 1
        ? '폼이 삭제되었습니다.'
        : `${formsToDelete.length}개의 폼이 삭제되었습니다.`;
      successToast(successMessage);
    } catch (error) {
      console.error('폼 삭제 실패:', error);
      errorToast('폼 삭제에 실패했습니다.');
    }
  };

  const getFormStatus = (form: FormListItem): FormStatus => {
    return form.is_closed || 'TEMP';
  };

  const handleActionButton = (form: FormListItem, isPreviewModal: boolean = false) => {
    const status = getFormStatus(form);
    const buttonStyles = isPreviewModal
      ? { size: undefined, className: '' }
      : { size: 'sm' as const, className: 'text-xs' };

    if (status === 'TEMP') {
      return (
        <div className="flex gap-2">
          <Button
            {...buttonStyles}
            variant="neutral"
            className={`${!isPreviewModal ? 'w-14' : ''} ${buttonStyles.className}`}
            onClick={() => {
              if (isPreviewModal) {
                handleClosePreview();
              }
              navigate(`/forms/create/${form.uuid}`);
            }}
          >
            수정
          </Button>
          <Button
            {...buttonStyles}
            variant="primary"
            className={`${!isPreviewModal ? 'w-20' : ''} ${buttonStyles.className}`}
            onClick={() => {
              if (isPreviewModal) {
                handleClosePreview();
              }
              navigate(`/forms/create/${form.uuid}`);
            }}
          >
            발행하기
          </Button>
        </div>
      );
    } else {
      return (
        <Button
          {...buttonStyles}
          variant="neutral"
          className={`${!isPreviewModal ? 'w-[146px]' : ''} ${buttonStyles.className}`}
          onClick={() => {
            if (isPreviewModal) {
              handleClosePreview();
            }
            navigate(`/forms/${form.uuid}`);
          }}
        >
          결과 보기
        </Button>
      );
    }
  };

  return (
    <div className="flex flex-col h-full bg-pollloop-bg-01">
      <div className="flex-1 overflow-hidden pb-10">
        <div className="px-4 py-4 md:px-8">
          <Breadcrumbs items={breadcrumbsItems} />
        </div>

        <div className="px-4 md:px-8">
          <div className="flex flex-col h-[calc(100vh-188px)] bg-pollloop-bg-02 rounded-2xl">
            <div className="px-4 md:px-8 pt-8 pb-6">
              <div className="flex justify-between items-center">
                <h2 className="text-[22px] font-semibold">나의 폼</h2>
                <div className="flex gap-2">
                  <Button
                    variant="danger"
                    onClick={() => handleDeleteForms()}
                    disabled={selectedForms.length === 0}
                  >
                    삭제
                  </Button>
                  <Button variant="primary" onClick={() => navigate('/forms/create')}>
                    폼 만들기
                  </Button>
                </div>
              </div>
            </div>

            <div className="flex-1 overflow-hidden px-4 md:px-8 pb-8">
              <div className="h-full flex flex-col">
                <div className="bg-pollloop-coral rounded-lg pr-2 overflow-hidden">
                  <table className="w-full table-fixed">
                    <colgroup>
                      <col className="w-[300px]" />
                      <col className="w-[120px]" />
                      <col className="w-[120px]" />
                      <col className="w-[120px]" />
                      <col className="w-[120px]" />
                      <col className="w-[100px]" />
                      <col className="w-[80px]" />
                      <col className="w-[120px]" />
                      <col className="w-[200px]" />
                      <col className="w-[80px]" />
                    </colgroup>
                    <thead>
                      <tr>
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
                </div>

                <div className="flex-1 pr-2 scrollable">
                  <table className="w-full table-fixed border-separate border-spacing-y-2">
                    <colgroup>
                      <col className="w-[300px]" />
                      <col className="w-[120px]" />
                      <col className="w-[120px]" />
                      <col className="w-[120px]" />
                      <col className="w-[120px]" />
                      <col className="w-[100px]" />
                      <col className="w-[80px]" />
                      <col className="w-[120px]" />
                      <col className="w-[200px]" />
                      <col className="w-[80px]" />
                    </colgroup>
                    <tbody className="divide-y divide-pollloop-bg-01">
                      {forms.length === 0 ? (
                        <tr className="bg-pollloop-light-beige h-16">
                          <td colSpan={10} className="text-center p-4 rounded-lg">
                            <div className="flex items-center justify-center h-full">
                              생성된 폼이 존재하지 않습니다
                            </div>
                          </td>
                        </tr>
                      ) : (
                        forms.map(form => {
                          const status = getFormStatus(form);
                          return (
                            <tr
                              key={form.uuid}
                              className={cn('bg-pollloop-light-beige hover:bg-pollloop-bg-01 h-16')}
                            >
                              <td className="p-4 rounded-l-lg">
                                <CheckboxWithLabel
                                  checked={selectedForms.includes(form.uuid)}
                                  onChange={() => handleSelectForm(form.uuid)}
                                  label={form.title}
                                />
                              </td>
                              <td className="p-4">
                                {form.tag && (
                                  <span
                                    className="inline-block px-2 py-1 rounded-lg text-xs 
                                  bg-tag-secondary-bg text-tag-secondary-text whitespace-normal break-words"
                                  >
                                    {form.tag}
                                  </span>
                                )}
                              </td>
                              <td className="p-4 text-sm">{form.create_at}</td>
                              <td className="p-4 text-sm">{form.end_at}</td>
                              <td className="p-4">
                                <FormStatusBadge status={status} className="flex-shrink-0" />
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
                                  onClick={async () => {
                                    setSelectedFormId(form.uuid);
                                    setIsPreviewModalOpen(true);
                                    await loadFormPreview(form.uuid);
                                  }}
                                >
                                  미리 보기
                                </Button>
                              </td>
                              <td className="p-4">{handleActionButton(form)}</td>
                              <td className="p-4 rounded-r-lg">
                                <div className="flex gap-4 text-pollloop-brown-01">
                                <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleDeleteForms(form.uuid);
                                    }}
                                    className="hover:text-pollloop-brown-02"
                                    aria-label="폼 삭제"
                                  >
                                    <Trash2 size={18} />
                                  </button>
                                  <button
                                    onClick={() => handleToggleBookmark(form.uuid)}
                                    className={cn(
                                      'hover:text-pollloop-brown-02',
                                      form.is_bookmark && 'text-pollloop-orange',
                                    )}
                                  >
                                    <Star
                                      size={18}
                                      fill={form.is_bookmark ? 'currentColor' : 'none'}
                                    />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          );
                        })
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 미리 보기 모달 */}
      <Modal
        isOpen={isPreviewModalOpen}
        onClose={handleClosePreview}
        width="2xl"
        className="min-h-[620px]"
      >
        <Modal.Header title="미리 보기" onClose={handleClosePreview} />
        <Modal.Content>
          <div className="flex flex-col gap-6">
            <div className="flex justify-end gap-2">
              {selectedFormId &&
                forms.find(form => form.uuid === selectedFormId) &&
                handleActionButton(forms.find(form => form.uuid === selectedFormId)!, true)}
            </div>

            {isLoadingPreview ? (
              <div className="flex items-center justify-center">
                <MainLoader />
              </div>
            ) : previewError ? (
              <div className="bg-pollloop-bg-01 rounded-xl w-full p-8 flex items-center justify-center text-pollloop-brown-01/60">
                {previewError}
              </div>
            ) : previewFormData ? (
              <FormPreview formInfo={previewFormData} />
            ) : null}
          </div>
        </Modal.Content>
      </Modal>
    </div>
  );
}
