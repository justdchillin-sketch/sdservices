// Global link constants to prevent exposing URLs in markup
const LINKS = {
  whatsapp: 'https://wa.me/2348104798480?text=Hello%20STEVEDEV%20Digital%20Services%2C%20I%20am%20interested%20in%20your%20digital%20solutions.',
  email: 'mailto:talkingkeys01@gmail.com?subject=Project%20Enquiry&body=Hello%20STEVEDEV%20Digital%20Services%2C%20I%20am%20interested%20in%20your%20digital%20solutions.',
  telegram: 'https://t.me/GrokDigitals?start=hello',
  facebook: 'https://www.facebook.com/stevedevdigitalservices',
  instagram: 'https://www.instagram.com/stevedevdigitals?igsh=MTdhbm0xazBpdTAxbA=='
};

/**
 * Opens a link by key in a new tab. Keys must be defined in the LINKS object.
 * @param {string} key - The link identifier (whatsapp, email, telegram, facebook, instagram)
 */
function openLink(key) {
  const url = LINKS[key];
  if (url) {
    window.open(url, '_blank');
  }
}
