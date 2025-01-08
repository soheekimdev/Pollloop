import {
  CheckboxResultType,
  DateResultType,
  DropdownResultType,
  EmailResultType,
  FileUploadResultType,
  ImageSelectResultType,
  LongResultType,
  NumberResultType,
  QuestionResultType,
  RadioResultType,
  RangeResultType,
  ShortResultType,
  StarRatingResultType,
} from '../../../types/form-details.types';
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

export default function Question({ questionItem }: { questionItem: QuestionResultType }) {
  const { layout_type, question, results } = questionItem;

  const renderResults = () => {
    switch (layout_type) {
      case 'SHORT_TYPE':
        return (
          <div className="">
            <p className="text-sm text-right">참여자 수 : {results.length}</p>
            <ScrollableContainer height={190} className="space-y-2">
              {results.map((result, index) => (
                <ShortAnswerComponent key={index} result={result as ShortResultType} />
              ))}
            </ScrollableContainer>
          </div>
        );
      case 'LONG_TYPE':
        return (
          <>
            <p className="text-sm text-right">참여자 수 : {results.length}</p>
            <ScrollableContainer height={190} className="space-y-2">
              {results.map((result, index) => (
                <LongAnswerComponent key={index} result={result as LongResultType} />
              ))}
            </ScrollableContainer>
          </>
        );

      case 'CHECKBOX_TYPE':
        return (
          <>
            <p className="text-sm text-right">참여자 수 : {results.length}</p>
            <ScrollableContainer height="auto">
              <CheckboxComponent results={results as CheckboxResultType[]} />
            </ScrollableContainer>
          </>
        );

      case 'RADIO_TYPE':
        return (
          <>
            <p className="text-sm text-right">참여자 수 : {results.length}</p>
            <ScrollableContainer height="auto">
              <RadioComponent results={results as RadioResultType[]} />
            </ScrollableContainer>
          </>
        );
      case 'DROPDOWN_TYPE':
        return (
          <>
            <p className="text-sm text-right">참여자 수 : {results.length}</p>
            <ScrollableContainer height="auto">
              <DropdownComponent results={results as DropdownResultType[]} />
            </ScrollableContainer>
          </>
        );
      case 'RANGE_TYPE':
        return (
          <>
            <p className="text-sm text-right">참여자 수 : {results.length}</p>
            <ScrollableContainer height="auto">
              <RangeComponent results={results as RangeResultType[]} />
            </ScrollableContainer>
          </>
        );
      case 'STAR_RATING_TYPE':
        return (
          <>
            <p className="text-sm text-right">참여자 수 : {results.length}</p>
            <ScrollableContainer height="auto">
              <StarComponent results={results as StarRatingResultType[]} />
            </ScrollableContainer>
          </>
        );
      case 'IMAGE_SELECT_TYPE':
        return (
          <>
            <p className="text-sm text-right">참여자 수 : {results.length}</p>
            <ScrollableContainer height="auto">
              <ImageSelectComponent results={results as ImageSelectResultType[]} />
            </ScrollableContainer>
          </>
        );
      case 'NUMBER_TYPE':
        return (
          <>
            <p className="text-sm text-right">참여자 수 : {results.length}</p>
            <ScrollableContainer height="auto">
              <NumberComponent results={results as NumberResultType[]} />
            </ScrollableContainer>
          </>
        );
      case 'DATE_TYPE':
        return (
          <>
            <p className="text-sm text-right">참여자 수 : {results.length}</p>
            <ScrollableContainer height="auto">
              <DateComponent results={results as DateResultType[]} />
            </ScrollableContainer>
          </>
        );
      case 'EMAIL_TYPE':
        return (
          <ul className="flex flex-col gap-2">
            {results.map((result, index) => (
              <EmailComponent key={index} result={result as EmailResultType} />
            ))}
          </ul>
        );
      case 'FILE_UPLOAD_TYPE':
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
