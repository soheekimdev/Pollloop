import { errorToast, successToast } from './toast';
export const copyToClipboard = async (text: string, infoMessage: string) => {
  try {
    await navigator.clipboard.writeText(text);
    successToast(infoMessage);
  } catch (error) {
    console.error('Failed to copy:', error);
    errorToast('클립보드 복사에 실패했습니다.');
  }
};
