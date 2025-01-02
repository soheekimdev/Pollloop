import ScrollableList from '../../common/ScrollableList';
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
            <p className="text-sm text-right">답변 수 : {results.length}</p>
            <ScrollableList height={190} className="space-y-2">
              {results.map((result, index) => (
                <ShortAnswerComponent key={index} result={result as ShortAnswerResultType} />
              ))}
            </ScrollableList>
          </div>
        );
      case 'LONG_ANSWER':
        return (
          <div className="">
            <p className="text-sm text-right">답변 수 : {results.length}</p>
            <ScrollableList height={190} className="space-y-2">
              {results.map((result, index) => (
                <LongAnswerComponent key={index} result={result as LongAnswerResultType} />
              ))}
            </ScrollableList>
          </div>
        );
      case 'CHECKBOX':
        return (
          <ul className="flex flex-col gap-2">
            {results.map((result, index) => (
              <CheckboxComponent key={index} result={result as CheckboxResultType} />
            ))}
          </ul>
        );
      case 'RADIO':
        return (
          <ul className="flex flex-col gap-2">
            {results.map((result, index) => (
              <RadioComponent key={index} result={result as RadioResultType} />
            ))}
          </ul>
        );
      case 'DROPDOWN':
        return (
          <ul className="flex flex-col gap-2">
            {results.map((result, index) => (
              <DropdownComponent key={index} result={result as DropdownResultType} />
            ))}
          </ul>
        );
      case 'RANGE':
        return (
          <ul className="flex flex-col gap-2">
            {results.map((result, index) => (
              <RangeComponent key={index} result={result as RangeResultType} />
            ))}
          </ul>
        );
      case 'STAR':
        return (
          <ul className="flex flex-col gap-2">
            {results.map((result, index) => (
              <StarComponent key={index} result={result as StarResultType} />
            ))}
          </ul>
        );
      case 'IMAGE_SELECT':
        return (
          <ul className="flex flex-col gap-2">
            {results.map((result, index) => (
              <ImageSelectComponent key={index} result={result as ImageSelectResultType} />
            ))}
          </ul>
        );
      case 'NUMBER':
        return (
          <ul className="flex flex-col gap-2">
            {results.map((result, index) => (
              <NumberComponent key={index} result={result as NumberResultType} />
            ))}
          </ul>
        );
      case 'DATE':
        return (
          <ul className="flex flex-col gap-2">
            {results.map((result, index) => (
              <DateComponent key={index} result={result as DateResultType} />
            ))}
          </ul>
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
