import type {Metadata} from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css'; // Global styles
import { Sidebar } from '@/components/layout/sidebar';
import { Topbar } from '@/components/layout/topbar';
import { SidebarProvider } from '@/components/layout/sidebar-context';
import { SettingsProvider } from '@/components/settings-context';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
});

export const metadata: Metadata = {
  title: '335 Manga',
  description: 'Manga reading application',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                let theme = localStorage.getItem('app-settings');
                if (theme) {
                  theme = JSON.parse(theme).theme;
                } else {
                  theme = 'System';
                }
                if (theme === 'Dark' || (theme === 'System' && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                  document.documentElement.classList.add('dark');
                } else {
                  document.documentElement.classList.add('light');
                }
              } catch (e) {}
            `,
          }}
        />
      </head>
      <body className="dark:bg-[#050505] bg-zinc-50 dark:text-white text-black flex min-h-screen font-sans transition-colors" suppressHydrationWarning>
        <SettingsProvider>
          <SidebarProvider>
            <Sidebar />
            <div className="flex-1 flex flex-col min-w-0">
              <Topbar />
              <main className="flex-1 overflow-auto p-6">
                {children}
              </main>
            </div>
          </SidebarProvider>
        </SettingsProvider>
      </body>
    </html>
  );
}
