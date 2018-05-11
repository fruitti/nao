import moment from 'moment-timezone';

export const configureMoment = () => {
  moment.locale('fr');
  moment.tz.setDefault('Europe/Paris');
  return moment;
};

export default configureMoment();
