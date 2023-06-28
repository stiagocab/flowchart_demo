import { useEffect, useState } from 'react';
import { MessageFormatElement } from 'react-intl';

const loadLocaleData = (locale?: string | undefined) => {
    switch (locale) {
        case 'fr':
            return import('utils/locales/fr.json');
        case 'es':
            return import('utils/locales/es.json');
        case 'ro':
            return import('utils/locales/ro.json');
        case 'zh':
            return import('utils/locales/zh.json');
        default:
            return import('utils/locales/en.json');
    }
};

export const useLoadLocaleData = (locale?: string | undefined) => {
    const [localeData, setLocaleData] = useState<Record<string, string> | Record<string, MessageFormatElement[]> | undefined>(undefined);

    useEffect(() => {
        loadLocaleData(locale).then((data: { default: Record<string, string> | Record<string, MessageFormatElement[]> | undefined }) => {
            setLocaleData(data.default);
        });
    }, [locale]);

    return localeData;
};
