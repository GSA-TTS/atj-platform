import { useNavigate } from 'react-router-dom';

import { BlueprintBuilder } from '@atj/forms';
import { type FormService } from '@atj/form-service';

export const useDocumentImporter = (
  formService: FormService,
  baseUrl: string
) => {
  const navigate = useNavigate();

  return {
    actions: {},
  };
};
