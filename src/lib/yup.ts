import * as yup from 'yup';

yup.setLocale({
  mixed: {
    required: () => ({
      key: 'required',
    }),
  },
});

export default yup;
