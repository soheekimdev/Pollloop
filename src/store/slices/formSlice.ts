import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Form {
  id: string;
  name: string;
  tags: string[];
  createdAt: string;
  deadline: string;
  status: 'draft' | 'published' | 'closed';
  targetCount: number;
  participantCount: number;
}

interface FormsState {
  forms: Form[];
  selectedForms: string[];
  isLoading: boolean;
  error: string | null;
}

const initialState: FormsState = {
  forms: [],
  selectedForms: [],
  isLoading: false,
  error: null,
};

const formSlice = createSlice({
  name: 'forms',
  initialState,
  reducers: {
    setForms: (state, action: PayloadAction<Form[]>) => {
      state.forms = action.payload;
    },
    toggleFormSelection: (state, action: PayloadAction<string>) => {
      const formId = action.payload;
      const index = state.selectedForms.indexOf(formId);
      if (index === -1) {
        state.selectedForms.push(formId);
      } else {
        state.selectedForms.splice(index, 1);
      }
    },
    selectAllForms: (state, action: PayloadAction<boolean>) => {
      state.selectedForms = action.payload 
        ? state.forms.map(form => form.id) 
        : [];
    },
    deleteForms: (state, action: PayloadAction<string[]>) => {
      state.forms = state.forms.filter(form => 
        !action.payload.includes(form.id)
      );
      state.selectedForms = state.selectedForms.filter(id => 
        !action.payload.includes(id)
      );
    },
  },
});

export const { 
  setForms, 
  toggleFormSelection, 
  selectAllForms, 
  deleteForms 
} = formSlice.actions;

export type { Form, FormsState };
export default formSlice.reducer;