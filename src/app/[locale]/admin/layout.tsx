import {NextIntlClientProvider, hasLocale} from 'next-intl';
import {notFound} from 'next/navigation';
import {routing} from '@/i18n/routing';

import './globals.css'
import SideBar from '@/components/sideBar/SideBar';

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{locale: string}>;
}) {
 
  // Ensure that the incoming `locale` is valid

  const {locale} = await params;
  const isArabic = locale ==='ar'
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <html lang={locale} dir={`${isArabic?"rtl":"ltr"}`}>
      <body>
        <NextIntlClientProvider>
        <SideBar/>
          {children}
          </NextIntlClientProvider>
      </body>
    </html>
  );
}