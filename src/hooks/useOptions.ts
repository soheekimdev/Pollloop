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
    () => options.findIndex(option => option.option_context === '기타'),
    [options],
  );

  const handleAddOption = () => {
    const updatedOptions = [
      ...options,
      {
        option_number: (options.length + 1).toString(),
        option_context: '',
      },
    ];
    setOptions(updatedOptions);
    onUpdate({ options_of_questions: updatedOptions });
  };

  const handleChangeOption = (index: number, value: string) => {
    const updatedOptions = options.map((option, i) =>
      i === index ? { ...option, option_context: value } : option,
    );
    setOptions(updatedOptions);
    onUpdate({ options_of_questions: updatedOptions });
  };

  const handleDeleteOption = (index: number) => {
    const filteredOptions = options.filter((_, i) => i !== index);
    const updatedOptions = filteredOptions.map((option, i) => ({
      ...option,
      option_number: (i + 1).toString(),
    }));
    setOptions(updatedOptions);
    onUpdate({ options_of_questions: updatedOptions });
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

      setOptions(updatedOptions);
      onUpdate({ options_of_questions: updatedOptions });
    },
    [options, findEtcOptionIndex, onUpdate],
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
