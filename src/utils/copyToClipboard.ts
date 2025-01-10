export const copyToClipboard = (text: string) => (event?: React.MouseEvent) => {
  if (event) {
    event.preventDefault();
    event.stopPropagation();
  }

  navigator.clipboard.writeText(text);
  window.alert('비밀번호가 복사되었습니다.'); // 추후: 토스트 팝업으로 대체
};
