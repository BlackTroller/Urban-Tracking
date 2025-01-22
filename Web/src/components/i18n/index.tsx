import polyglotI18nProvider from 'ra-i18n-polyglot';
import portugueseMessages  from './pt';

export const i18nProvider = polyglotI18nProvider(locale => {

    if (locale === 'fr') {
        return import('./fr').then(messages => messages.default)
    }

    if (locale === 'en') {
        return import('./en').then(messages => messages.default)
    }

    // Always fallback on english
    return portugueseMessages;
}, 'pt',  [{ locale: 'pt', name: 'PT' }, { locale: 'en', name: 'EN' }, { locale: 'fr', name: 'FR' }], { allowMissing: true });