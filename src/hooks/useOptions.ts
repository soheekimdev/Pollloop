import { Option, Question } from '@/types/forms';
import { useState } from 'react';

interface UseOptionsResult {
  options: Option[];
  handleAddOption: () => void;
  handleChangeOption: (index: number, value: string) => void;
  handleDeleteOption: (index: number) => void;
}

export function useOptions(
  initialOptions: Option[] = [],
  onUpdate: (updates: Partial<Question>) => void,
): UseOptionsResult {
  const [options, setOptions] = useState<Option[]>(initialOptions);

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

  return {
    options,
    handleAddOption,
    handleChangeOption,
    handleDeleteOption,
  };
}
