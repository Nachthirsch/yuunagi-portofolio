const setCookie = (name, value, days) => {
  const expires = new Date();
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
};

const getCookie = (name) => {
  const cookies = document.cookie.split(';');
  const cookie = cookies.find(c => c.trim().startsWith(`${name}=`));
  return cookie ? cookie.split('=')[1] : null;
};

export { setCookie, getCookie };
