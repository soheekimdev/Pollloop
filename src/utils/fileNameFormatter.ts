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

// 테스트 코드
if (import.meta.env.DEV) {
  const testCases = [
    "Hello World.jpg",
    "My File!@#$%.png",
    "테스트 파일 (1).pdf",
    "document__.doc",
    "image   with   spaces.jpg",
    "test-file_name(1).txt"
  ];

  console.log("File name formatting test cases:");
  testCases.forEach(fileName => {
    console.log(`Original: ${fileName}`);
    console.log(`Formatted: ${formatFileName(fileName)}\n`);
  });
}