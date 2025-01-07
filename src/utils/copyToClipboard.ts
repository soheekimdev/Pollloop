export const copyToClipboard =
  (text: string, infoMessage: string) => (event?: React.MouseEvent) => {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }

    navigator.clipboard.writeText(text);
    window.alert(infoMessage); // 추후: 토스트 팝업으로 대체
  };
