import {NextIntlClientProvider, hasLocale} from 'next-intl';
import {notFound} from 'next/navigation';
import {routing} from '@/i18n/routing';
import Header from '../../components/Header/Header';
import './globals.css'
import Footer from '@/components/Footer/Footer';

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
          <Header/>
          {children}
          <Footer/>
          </NextIntlClientProvider>
      </body>
    </html>
  );
}