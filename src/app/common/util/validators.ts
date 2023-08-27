function isValidUrl(txt: string): boolean {
  return test(txt, URL_REGEX);
}

function isValidEmail(txt: string): boolean {
  return test(txt, EMAIL_REGEX);
}

function isValidGermanZip(txt: string): boolean {
  return test(txt, GERMAN_ZIP_REGEX);
}

function isValidGermanStreet(txt: string): boolean {
  return test(txt, GERMAN_STREET_REGEX);
}

function isValidGermanPhone(txt: string): boolean {
  return test(txt, GERMAN_PHONE_REGEX);
}

function test(value: string, regex: string | RegExp): boolean {
  const pattern = new RegExp(regex);
  return pattern.test(value);
}

const URL_REGEX = '^((http|https)\\:\\/\\/|)([\\w|\\-]+\\.)+\\w+($|[\\w\\-\\/\\.]+$|[\\w\\/\\.]+\\?[\\w\\=\\&\\.]+$)';
const EMAIL_REGEX = /.+@.+\..+/gm;
const GERMAN_ZIP_REGEX = '^([0]{1}[1-9]{1}|[1-9]{1}[0-9]{1})[0-9]{3}$';
const GERMAN_STREET_REGEX = /^([A-ZÄÖÜ][a-zäöüß]+(([.] )|( )|([-]))*)+/gm;
const GERMAN_PHONE_REGEX = /(\+49|0)([- ()]?\d[- ()]?){6,11}$/g;

export const regExValidator = {
  isValidUrl,
  isValidEmail,
  isValidGermanPhone,
  isValidGermanZip,
  isValidGermanStreet
};
