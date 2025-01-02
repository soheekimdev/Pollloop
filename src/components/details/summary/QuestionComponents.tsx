export interface ShortAnswerResultType {
  answer: string;
}

export interface LongAnswerResultType {
  answer: string;
}

export interface CheckboxResultType {
  label: string;
  count: number;
}

export interface RadioResultType {
  label: string;
  count: number;
}

export interface DropdownResultType {
  label: string;
  count: number;
}

export interface RangeResultType {
  value: number;
  count: number;
}

export interface StarResultType {
  value: number;
  count: number;
}

export interface ImageSelectResultType {
  label: string;
  count: number;
}

export interface NumberResultType {
  value: number;
  count: number;
}

export interface DateResultType {
  answer: string;
}

export interface EmailResultType {
  answer: string;
}

export interface FileUploadResultType {
  answer: string;
}

const ShortAnswerComponent: React.FC<{ result: ShortAnswerResultType }> = ({ result }) => {
  return (
    <li className="px-3 py-1 text-sm border rounded-lg border-pollloop-brown-01 border-opacity-30 bg-pollloop-brown-01 bg-opacity-15">
      {result.answer}
    </li>
  );
};

const LongAnswerComponent: React.FC<{ result: LongAnswerResultType }> = ({ result }) => {
  return (
    <li className="px-3 py-1 text-sm border rounded-lg border-pollloop-brown-01 border-opacity-30 bg-pollloop-brown-01 bg-opacity-15">
      {result.answer}
    </li>
  );
};

const CheckboxComponent: React.FC<{ result: CheckboxResultType }> = ({ result }) => {
  return (
    <li>
      {result.label} - {result.count}
    </li>
  );
};

const RadioComponent: React.FC<{ result: RadioResultType }> = ({ result }) => {
  return (
    <li>
      {result.label} - {result.count}
    </li>
  );
};

const DropdownComponent: React.FC<{ result: DropdownResultType }> = ({ result }) => {
  return (
    <li>
      {result.label} - {result.count}
    </li>
  );
};

const RangeComponent: React.FC<{ result: RangeResultType }> = ({ result }) => {
  return (
    <li>
      {result.value} - {result.count}
    </li>
  );
};

const StarComponent: React.FC<{ result: StarResultType }> = ({ result }) => {
  return (
    <li>
      {result.value} 점 - {result.count}명
    </li>
  );
};

const ImageSelectComponent: React.FC<{ result: ImageSelectResultType }> = ({ result }) => {
  return (
    <li>
      {result.label} - {result.count}
    </li>
  );
};

const NumberComponent: React.FC<{ result: NumberResultType }> = ({ result }) => {
  return (
    <li>
      {result.value} 시간 - {result.count}명
    </li>
  );
};

const DateComponent: React.FC<{ result: DateResultType }> = ({ result }) => {
  return <li>{result.answer}</li>;
};

const EmailComponent: React.FC<{ result: EmailResultType }> = ({ result }) => {
  return <li>{result.answer}</li>;
};

const FileUploadComponent: React.FC<{ result: FileUploadResultType }> = ({ result }) => {
  return <li>{result.answer}</li>;
};

export {
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
};
