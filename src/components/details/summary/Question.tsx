import ScrollableContainer from '../../common/ScrollableContainer';

import {
  ShortAnswerComponent,
  LongAnswerComponent,
  CheckboxComponent,
  RadioComponent,
  DropdownComponent,
  RangeComponent,
  StarComponent,
  ImageSelectComponent,
  NumberComponent,
  DateComponent,
  EmailComponent,
  FileUploadComponent,
} from './QuestionComponents';

import {
  ShortAnswerResultType,
  LongAnswerResultType,
  CheckboxResultType,
  RadioResultType,
  DropdownResultType,
  RangeResultType,
  StarResultType,
  ImageSelectResultType,
  NumberResultType,
  DateResultType,
  EmailResultType,
  FileUploadResultType,
} from './QuestionComponents';

interface QuestionProps {
  questionItem: {
    id: number;
    type: string;
    question: string;
    results: (
      | ShortAnswerResultType
      | LongAnswerResultType
      | CheckboxResultType
      | RadioResultType
      | DropdownResultType
      | RangeResultType
      | StarResultType
      | ImageSelectResultType
      | NumberResultType
      | DateResultType
      | EmailResultType
      | FileUploadResultType
    )[];
  };
}

export default function Question({ questionItem }: QuestionProps) {
  const { type, question, results } = questionItem;

  const renderResults = () => {
    switch (type) {
      case 'SHORT_ANSWER':
        return (
          <div className="">
            <p className="text-sm text-right">참여자 수 : {results.length}</p>
            <ScrollableContainer height={190} className="space-y-2">
              {results.map((result, index) => (
                <ShortAnswerComponent key={index} result={result as ShortAnswerResultType} />
              ))}
            </ScrollableContainer>
          </div>
        );
      case 'LONG_ANSWER':
        return (
          <>
            <p className="text-sm text-right">참여자 수 : {results.length}</p>
            <ScrollableContainer height={190} className="space-y-2">
              {results.map((result, index) => (
                <LongAnswerComponent key={index} result={result as LongAnswerResultType} />
              ))}
            </ScrollableContainer>
          </>
        );

      case 'CHECKBOX':
        return (
          <>
            <p className="text-sm text-right">참여자 수 : {results.length}</p>
            <ScrollableContainer height="auto">
              <CheckboxComponent results={results as CheckboxResultType[]} />
            </ScrollableContainer>
          </>
        );

      case 'RADIO':
        return (
          <>
            <p className="text-sm text-right">참여자 수 : {results.length}</p>
            <ScrollableContainer height="auto">
              <RadioComponent results={results as RadioResultType[]} />
            </ScrollableContainer>
          </>
        );
      case 'DROPDOWN':
        return (
          <>
            <p className="text-sm text-right">참여자 수 : {results.length}</p>
            <ScrollableContainer height="auto">
              <DropdownComponent results={results as DropdownResultType[]} />
            </ScrollableContainer>
          </>
        );
      case 'RANGE':
        return (
          <>
            <p className="text-sm text-right">참여자 수 : {results.length}</p>
            <ScrollableContainer height="auto">
              <RangeComponent results={results as RangeResultType[]} />
            </ScrollableContainer>
          </>
        );
      case 'STAR':
        return (
          <>
            <p className="text-sm text-right">참여자 수 : {results.length}</p>
            <ScrollableContainer height="auto">
              <StarComponent results={results as StarResultType[]} />
            </ScrollableContainer>
          </>
        );
      case 'IMAGE_SELECT':
        return (
          <>
            <p className="text-sm text-right">참여자 수 : {results.length}</p>
            <ScrollableContainer height="auto">
              <ImageSelectComponent results={results as ImageSelectResultType[]} />
            </ScrollableContainer>
          </>
        );
      case 'NUMBER':
        return (
          <>
            <p className="text-sm text-right">참여자 수 : {results.length}</p>
            <ScrollableContainer height="auto">
              <NumberComponent results={results as NumberResultType[]} />
            </ScrollableContainer>
          </>
        );
      case 'DATE':
        return (
          <>
            <p className="text-sm text-right">참여자 수 : {results.length}</p>
            <ScrollableContainer height="auto">
              <DateComponent results={results as DateResultType[]} />
            </ScrollableContainer>
          </>
        );
      case 'EMAIL':
        return (
          <ul className="flex flex-col gap-2">
            {results.map((result, index) => (
              <EmailComponent key={index} result={result as EmailResultType} />
            ))}
          </ul>
        );
      case 'FILE_UPLOAD':
        return (
          <ul className="flex flex-col gap-2">
            {results.map((result, index) => (
              <FileUploadComponent key={index} result={result as FileUploadResultType} />
            ))}
          </ul>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col justify-start gap-6 p-10 rounded-lg bg-pollloop-light-beige">
      <p className="text-xl font-medium">{question}</p>
      {renderResults()}
    </div>
  );
}
