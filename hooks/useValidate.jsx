export function validateName(name) {
  if (!(name.length > 0)) {
    return "Invalid name";
  } else {
    return "";
  }
}

export function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return "Invalid email address";
  } else {
    return "";
  }
}

export function validatePassword(password) {
  const passwordRegex =
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  //   const passwordRegex = /.+/;
  if (!passwordRegex.test(password)) {
    return "Invalid password";
  } else {
    return "";
  }
}
