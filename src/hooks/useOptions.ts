import { useCallback, useEffect, useState } from 'react';
import { Option, Question } from '@/types/forms';

interface UseOptionsResult {
  options: Option[];
  handleAddOption: () => void;
  handleChangeOption: (index: number, value: string) => void;
  handleDeleteOption: (index: number) => void;
  handleEtcOption: (hasEtc: boolean) => void;
}

export function useOptions(
  initialOptions: Option[] = [],
  onUpdate: (updates: Partial<Question>) => void,
  hasEtcOption: boolean = false,
): UseOptionsResult {
  const [options, setOptions] = useState<Option[]>(initialOptions);

  const findEtcOptionIndex = useCallback(
    () => options.findIndex(option => option.isEtcOption),
    [options],
  );

  const sortOptionsWithEtcLast = useCallback((opts: Option[]) => {
    const nonEtcOptions = opts.filter(opt => !opt.isEtcOption);
    const etcOption = opts.find(opt => opt.isEtcOption);

    const sortedOptions = [...nonEtcOptions, ...(etcOption ? [etcOption] : [])].map(
      (option, index) => ({
        ...option,
        option_number: (index + 1).toString(),
      }),
    );
    return sortedOptions;
  }, []);

  const handleAddOption = () => {
    const newOption = {
      option_number: (options.length + 1).toString(),
      option_context: '',
    };

    const updatedOptions = sortOptionsWithEtcLast([...options, newOption]);
    setOptions(updatedOptions);
    onUpdate({ options_of_questions: updatedOptions });
  };

  const handleChangeOption = (index: number, value: string) => {
    const updatedOptions = options.map((option, i) =>
      i === index ? { ...option, option_context: value } : option,
    );
    const sortedOptions = sortOptionsWithEtcLast(updatedOptions);
    setOptions(sortedOptions);
    onUpdate({ options_of_questions: updatedOptions });
  };

  const handleDeleteOption = (index: number) => {
    const filteredOptions = options.filter((_, i) => i !== index);
    const sortedOptions = sortOptionsWithEtcLast(filteredOptions);
    setOptions(sortedOptions);
    onUpdate({ options_of_questions: sortedOptions });
  };

  const handleEtcOption = useCallback(
    (hasEtc: boolean) => {
      let updatedOptions;
      const etcIndex = findEtcOptionIndex();

      if (hasEtc && etcIndex === -1) {
        updatedOptions = [
          ...options,
          {
            option_number: (options.length + 1).toString(),
            option_context: '기타',
            isEtcOption: true,
          },
        ];
      } else if (!hasEtc && etcIndex !== -1) {
        updatedOptions = options
          .filter((_, i) => i !== etcIndex)
          .map((option, i) => ({
            ...option,
            option_number: (i + 1).toString(),
          }));
      } else {
        return;
      }

      const sortedOptions = sortOptionsWithEtcLast(updatedOptions);
      setOptions(sortedOptions);
      onUpdate({ options_of_questions: sortedOptions });
    },
    [options, findEtcOptionIndex, onUpdate, sortOptionsWithEtcLast],
  );

  useEffect(() => {
    const etcExists = findEtcOptionIndex() !== -1;
    if (etcExists !== hasEtcOption) {
      handleEtcOption(hasEtcOption);
    }
  }, [hasEtcOption, findEtcOptionIndex, handleEtcOption]);

  return {
    options,
    handleAddOption,
    handleChangeOption,
    handleDeleteOption,
    handleEtcOption,
  };
}
