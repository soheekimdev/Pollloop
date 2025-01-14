export function formatFileName(fileName: string): string {
  // 파일 이름과 확장자 분리
  const lastDotIndex = fileName.lastIndexOf('.');
  if (lastDotIndex === -1) return fileName;

  const name = fileName.slice(0, lastDotIndex);
  const extension = fileName.slice(lastDotIndex + 1);
  
  // 1. 공백을 하이픈으로 변경
  // 2. 허용된 특수문자(-, _, (, ))를 제외한 모든 특수문자 제거
  // 3. 연속된 하이픈을 하나로 통합
  const formattedName = name
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^a-zA-Z0-9\-_()가-힣]/g, '')
    .replace(/-+/g, '-');
  
  return `${formattedName}.${extension}`;
}