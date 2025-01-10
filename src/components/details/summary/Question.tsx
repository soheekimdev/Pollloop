import { QUESTION_COMPONENTS } from '../../../constants/form-details';
import {
  CheckboxResultType,
  DateResultType,
  DropdownResultType,
  EmailResultType,
  FileUploadResultType,
  ImageSelectResultType,
  LayoutType,
  LongResultType,
  NumberResultType,
  QuestionResultType,
  RadioResultType,
  RangeResultType,
  RangeResultsWithNumType,
  ShortResultType,
  StarRatingResultType,
} from '../../../types/form-details.types';

interface QuestionProps {
  questionItem: QuestionResultType;
}

export default function Question({ questionItem }: QuestionProps) {
  const { layout_type, question, results, min_label, max_label } = questionItem;

  const ResultComponent = QUESTION_COMPONENTS[layout_type as LayoutType];
  if (!ResultComponent) return null;

  const getTypedResults = () => {
    switch (layout_type) {
      case 'SHORT_TYPE':
        return results as ShortResultType[];
      case 'LONG_TYPE':
        return results as LongResultType[];
      case 'CHECKBOX_TYPE':
        return results as CheckboxResultType[];
      case 'RADIO_TYPE':
        return results as RadioResultType[];
      case 'DROPDOWN_TYPE':
        return results as DropdownResultType[];
      case 'RANGE_TYPE':
        if (!min_label || !max_label) return results as RangeResultType[];
        const resultsWithNum: RangeResultsWithNumType = {
          min_label: min_label,
          max_label: max_label,
          results: results as RangeResultType[],
        };
        return resultsWithNum;
      case 'STAR_RATING_TYPE':
        return results as StarRatingResultType[];
      case 'IMAGE_SELECT_TYPE':
        return results as ImageSelectResultType[];
      case 'NUMBER_TYPE':
        return results as NumberResultType[];
      case 'DATE_TYPE':
        return results as DateResultType[];
      case 'EMAIL_TYPE':
        return results as EmailResultType[];
      case 'FILE_UPLOAD_TYPE':
        return results as FileUploadResultType[];
      default:
        return results;
    }
  };

  const typedResults = getTypedResults();

  return (
    <div className="flex flex-col justify-start gap-6 p-10 rounded-lg bg-pollloop-light-beige">
      <p className="pl-2 text-xl font-medium border-l-4 border-pollloop-brown-01">{question}</p>
      <p className="text-sm text-right">{/* 상세 정보 추가 */}</p>
      <ResultComponent results={typedResults as any} />
    </div>
  );
}
