import * as yup from "yup";

export const registerShema = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().min(8).required(),
});

yup.setLocale({
  string: {
    min: "Sorry, very weak password",
  },
});
