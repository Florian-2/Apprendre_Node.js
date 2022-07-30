export const isEmail = (fieldValue) => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(fieldValue);

export const isPassword = (fieldValue) => /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*+#?&])[A-Za-z\d@$!%*+#?&]{8,}$/.test(fieldValue);