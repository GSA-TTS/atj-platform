import { useNavigate } from 'react-router-dom';

import { BlueprintBuilder } from '@atj/forms';
import { type FormService } from '@atj/form-service';

export const useDocumentImporter = (
  formService: FormService,
  baseUrl: string
) => {
  const navigate = useNavigate();

  return {
    actions: {
      stepOneSelectPdfByUrl: async (url: string) => {
        const data = await fetchUint8Array(`${baseUrl}${url}`);

        const builder = new BlueprintBuilder();
        builder.setFormSummary({
          title: url,
          description: '',
        });
        await builder.addDocument({
          name: url,
          data,
        });

        const result = formService.addForm(builder.form);
        if (result.success) {
          navigate(`/${result.data}/edit`);
        }
      },
      stepOneSelectPdfByUpload: async (fileDetails: {
        name: string;
        data: Uint8Array;
      }) => {
        const builder = new BlueprintBuilder();
        builder.setFormSummary({
          title: fileDetails.name,
          description: '',
        });
        await builder.addDocument(fileDetails);
        const result = await formService.addForm(builder.form);
        if (result.success) {
          navigate(`/${result.data}/edit`);
        }
      },
      createNewForm: async () => {
        const builder = new BlueprintBuilder();
        builder.setFormSummary({
          title: `My form - ${new Date().toISOString()}`,
          description: '',
        });
        const result = await formService.addForm(builder.form);
        if (result.success) {
          navigate(`/${result.data}/edit`);
        }
      },
    },
  };
};

const fetchUint8Array = async (url: string) => {
  const response = await fetch(url);
  const blob = await response.blob();
  return new Uint8Array(await blob.arrayBuffer());
};
