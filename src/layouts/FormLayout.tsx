import { Outlet, useParams } from 'react-router-dom';
import Navbar from '../components/navbar/Navbar';
import { useFormData } from '@/hooks/useFormData';
import { errorToast, successToast } from '@/utils/toast';
import FormPasswordCheck from '@/pages/forms/FormPasswordCheck';
import { useState } from 'react';

export default function FormLayout() {
  const { formId } = useParams();
  const { formData } = useFormData(formId || '');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handlePasswordSubmit = (accessCode: string) => {
    if (accessCode === formData?.access_code) {
      setIsAuthenticated(true);
      successToast('인증되었습니다.');
    } else {
      errorToast('올바르지 않은 코드입니다.');
    }
  };

  if (formData?.is_private && !isAuthenticated) {
    return <FormPasswordCheck onSubmit={handlePasswordSubmit} />;
  }

  return (
    <div className="flex flex-col h-full gap-4 overflow-auto bg-pollloop-bg-02">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
}
