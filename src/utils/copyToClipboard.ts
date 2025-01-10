export const copyToClipboard = async (text: string, infoMessage: string) => {
  try {
    await navigator.clipboard.writeText(text);
    window.alert(infoMessage); // 추후: 토스트 팝업으로 대체
  } catch (error) {
    console.error('Failed to copy:', error);
  }
};
