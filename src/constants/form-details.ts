import {
  ShortTypeComponent,
  LongTypeComponent,
  CheckboxComponent,
  RadioComponent,
  DropdownComponent,
  RangeComponent,
  StarRatingComponent,
  ImageSelectComponent,
  NumberComponent,
  DateComponent,
  EmailComponent,
  FileUploadComponent,
} from '../components/details/summary/QuestionComponents';

export const QUESTION_COMPONENTS = {
  SHORT_TYPE: ShortTypeComponent,
  LONG_TYPE: LongTypeComponent,
  CHECKBOX_TYPE: CheckboxComponent,
  RADIO_TYPE: RadioComponent,
  DROPDOWN_TYPE: DropdownComponent,
  RANGE_TYPE: RangeComponent,
  STAR_RATING_TYPE: StarRatingComponent,
  IMAGE_SELECT_TYPE: ImageSelectComponent,
  NUMBER_TYPE: NumberComponent,
  DATE_TYPE: DateComponent,
  EMAIL_TYPE: EmailComponent,
  FILE_UPLOAD_TYPE: FileUploadComponent,
} as const;
