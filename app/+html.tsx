import { ScrollViewStyleReset } from 'expo-router/html';
import { type PropsWithChildren } from 'react';

export default function Root({ children }: Readonly<PropsWithChildren>) {
  return (
    <html lang='en'>
      <head>
        <title>FlashCardFrenzy</title>
        <meta
          name='description'
          content="FlashCardFrenzy is a fun and interactive app that helps users learn new words and phrases through flashcards. With FlashCardFrenzy, you can create your own flashcards, study with spaced repetition, and track your progress. Whether you're a language enthusiast or just looking to improve your vocabulary, FlashCardFrenzy is the perfect tool for you!"
        />
        <meta charSet='utf-8' />
        <meta httpEquiv='X-UA-Compatible' content='IE=edge' />
        <meta name='viewport' content='width=device-width, initial-scale=1, shrink-to-fit=no' />

        <link rel='icon' type='image/x-icon' href='favicon.ico' />
        <link rel='manifest' href='manifest.json' />
        <script dangerouslySetInnerHTML={{ __html: sw }} />

        <ScrollViewStyleReset />
      </head>
      <body style={{ backgroundColor: '#f3ffe0' }}>{children}</body>
    </html>
  );
}
const sw = `
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('sw.js').then(registration => {
            console.log('Service Worker registered with scope:', registration.scope);
        }).catch(error => {
            console.error('Service Worker registration failed:', error);
        });
    });
}
`;
