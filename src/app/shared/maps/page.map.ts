import { PageName } from '../enums/page-name.enum';

const PageMaps = new Map();

PageMaps.set(PageName.Authentication, 'auth');
PageMaps.set(PageName.Registration, 'registration');
PageMaps.set(PageName.Feed, 'feed');

export { PageMaps };
