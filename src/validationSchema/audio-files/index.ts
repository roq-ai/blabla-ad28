import * as yup from 'yup';

export const audioFileValidationSchema = yup.object().shape({
  file_path: yup.string().required(),
  duration: yup.number().integer().required(),
  organization_id: yup.string().nullable(),
});
