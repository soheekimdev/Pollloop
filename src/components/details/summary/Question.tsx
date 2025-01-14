import { Asterisk } from 'lucide-react';
import { QUESTION_COMPONENTS } from '../../../constants/form-details';
import {
  CheckboxResultType,
  DateResultType,
  DropdownResultType,
  EmailResultType,
  FileUploadResultType,
  FormResultType,
  ImageSelectResultType,
  LayoutType,
  LongResultType,
  NumberResultType,
  QuestionResultType,
  RadioResultType,
  RangeResultType,
  ShortResultType,
  StarRatingResultType,
} from '../../../types/form-details.types';
import useWindowSize from '../../../hooks/useWindowSize';

interface QuestionProps {
  questionItem: QuestionResultType;
}

export default function Question({ questionItem }: QuestionProps) {
  const { width } = useWindowSize();
  const { id, is_required, layout_type, question, results, min_label, max_label } = questionItem;

  // console.log(questionItem);

  const ResultComponent = QUESTION_COMPONENTS[layout_type as LayoutType];
  if (!ResultComponent) return null;

  const getTypedResults = (): FormResultType[] => {
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
        return results as RangeResultType[];
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
    <li
      key={id}
      className="relative flex flex-col justify-start gap-6 p-10 rounded-lg bg-pollloop-light-beige"
    >
      <div className="flex flex-col gap-2 md:flex-row">
        <p className="text-xl font-bold text-pollloop-brown-01/60">{`#${id}`}</p>
        <p className="inline text-xl font-medium">
          <span className="inline">{question}</span>
          {is_required ? (
            <Asterisk size={12} className="inline-block text-red-500 align-top" />
          ) : null}
        </p>
      </div>
      <ResultComponent results={typedResults as any} />
      {layout_type === 'RANGE_TYPE' && (
        <div className="items-center justify-between hidden w-full px-12 ml-5 text-sm text-right md:flex">
          <p
            title={min_label}
            className="text-left line-clamp-1 text-text-truncate"
            style={{ maxWidth: `${width / 4}px` }}
          >
            {min_label}
          </p>
          <p
            title={max_label}
            className="text-right line-clamp-1 text-text-truncate"
            style={{ maxWidth: `${width / 4}px` }}
          >
            {max_label}
          </p>
        </div>
      )}
    </li>
  );
}
