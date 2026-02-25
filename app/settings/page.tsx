'use client';

import { useState } from 'react';
import { List, Info } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useSettings } from '@/components/settings-context';

type Tab = 'General' | 'Manga' | 'Shortcuts' | 'Search';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<Tab>('General');
  const { resetSettings } = useSettings();

  return (
    <div className="max-w-5xl mx-auto pb-12">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold dark:text-white text-black">Settings</h1>
        <button 
          onClick={resetSettings}
          className="bg-[#c22543] hover:bg-[#a01d36] text-white px-4 py-1.5 rounded-lg font-medium transition-colors shadow-sm"
        >
          Reset
        </button>
      </div>

      <div className="flex gap-6 mb-6 border-b dark:border-white/10 border-black/10">
        {(['General', 'Manga', 'Shortcuts', 'Search'] as Tab[]).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={cn(
              "pb-3 text-sm font-medium transition-colors relative",
              activeTab === tab ? "dark:text-white text-black" : "dark:text-zinc-500 text-zinc-500 dark:hover:text-zinc-300 hover:text-zinc-700"
            )}
          >
            {tab}
            {activeTab === tab && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 dark:bg-white bg-black rounded-t-full" />
            )}
          </button>
        ))}
      </div>

      <div className="dark:bg-[#141414] bg-white border dark:border-white/5 border-black/5 rounded-xl p-6 shadow-sm">
        {activeTab === 'General' && <GeneralSettings />}
        {activeTab === 'Manga' && <MangaSettings />}
        {activeTab === 'Shortcuts' && <ShortcutsSettings />}
        {activeTab === 'Search' && <SearchSettings />}
      </div>
    </div>
  );
}

function Toggle({ checked, onChange }: { checked: boolean; onChange: (checked: boolean) => void }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={cn(
        "relative inline-flex h-5 w-9 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none",
        checked ? "dark:bg-white bg-black" : "dark:bg-zinc-700 bg-zinc-300"
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          "pointer-events-none inline-block h-4 w-4 transform rounded-full shadow ring-0 transition duration-200 ease-in-out",
          checked ? "translate-x-4 dark:bg-black bg-white" : "translate-x-0 dark:bg-white bg-white"
        )}
      />
    </button>
  );
}

function GeneralSettings() {
  const { settings, updateSetting } = useSettings();

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center pb-4 border-b dark:border-white/10 border-black/10">
        <h2 className="text-xl font-bold dark:text-white text-black">General</h2>
        <button className="p-2 dark:hover:bg-white/10 hover:bg-black/10 rounded-lg transition-colors dark:text-zinc-400 text-zinc-600 dark:hover:text-white hover:text-black">
          <List className="w-5 h-5" />
        </button>
      </div>

      <section className="space-y-6">
        <h3 className="text-lg font-bold dark:text-white text-black">UI</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <div className="font-medium dark:text-white text-black mb-1">Theme</div>
            <div className="text-sm dark:text-zinc-500 text-zinc-500 mb-3">Select the application theme.</div>
            <select
              value={settings.theme}
              onChange={(e) => updateSetting('theme', e.target.value as any)}
              className="w-full sm:w-64 bg-transparent border dark:border-white/20 border-black/20 dark:text-white text-black text-sm rounded-lg px-4 py-2.5 focus:outline-none dark:focus:border-white/40 focus:border-black/40 cursor-pointer appearance-none"
            >
              <option value="System" className="dark:bg-[#141414] bg-white">System</option>
              <option value="Light" className="dark:bg-[#141414] bg-white">Light</option>
              <option value="Dark" className="dark:bg-[#141414] bg-white">Dark</option>
            </select>
          </div>
          <div>
            <div className="font-medium dark:text-white text-black mb-1">Fancy Animations</div>
            <div className="text-sm dark:text-zinc-500 text-zinc-500 mb-3">Such as manga detail pages cover image.</div>
            <Toggle checked={settings.fancyAnimations} onChange={(v) => updateSetting('fancyAnimations', v)} />
          </div>
        </div>
      </section>

      <section className="space-y-6 pt-6 border-t dark:border-white/10 border-black/10">
        <h3 className="text-lg font-bold dark:text-white text-black">Notifications</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <div className="font-medium dark:text-white text-black mb-1">Show Toasts</div>
            <div className="text-sm dark:text-zinc-500 text-zinc-500 mb-3">Show toast notifications for various actions.</div>
            <Toggle checked={settings.showToasts} onChange={(v) => updateSetting('showToasts', v)} />
          </div>
          <div>
            <div className="font-medium dark:text-white text-black mb-1">Login Toasts</div>
            <div className="text-sm dark:text-zinc-500 text-zinc-500 mb-3">Show warnings when you aren&apos;t logged in to a service.</div>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium dark:text-white text-black">MAL</span>
                <Toggle checked={settings.loginMal} onChange={(v) => updateSetting('loginMal', v)} />
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium dark:text-white text-black">AniList</span>
                <Toggle checked={settings.loginAnilist} onChange={(v) => updateSetting('loginAnilist', v)} />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-6 pt-6 border-t dark:border-white/10 border-black/10">
        <h3 className="text-lg font-bold dark:text-white text-black">Privacy</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <div className="font-medium dark:text-white text-black mb-1">Allow Analytics</div>
            <div className="text-sm dark:text-zinc-500 text-zinc-500 mb-3">Allow the collection of anonymous analytics data.</div>
            <Toggle checked={settings.allowAnalytics} onChange={(v) => updateSetting('allowAnalytics', v)} />
          </div>
        </div>
      </section>
    </div>
  );
}

function MangaSettings() {
  const { settings, updateSetting } = useSettings();

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center pb-4 border-b dark:border-white/10 border-black/10">
        <h2 className="text-xl font-bold dark:text-white text-black">Manga</h2>
        <button className="p-2 dark:hover:bg-white/10 hover:bg-black/10 rounded-lg transition-colors dark:text-zinc-400 text-zinc-600 dark:hover:text-white hover:text-black">
          <List className="w-5 h-5" />
        </button>
      </div>

      <section className="space-y-6">
        <h3 className="text-lg font-bold dark:text-white text-black">UI</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <div className="font-medium dark:text-white text-black">Page Display Type</div>
              <Info className="w-4 h-4 dark:text-zinc-400 text-zinc-600" />
            </div>
            <div className="text-sm dark:text-zinc-500 text-zinc-500 mb-3">Select the default reader type for manga.</div>
            <select
              value={settings.displayType}
              onChange={(e) => updateSetting('displayType', e.target.value as any)}
              className="w-full bg-transparent border dark:border-white/20 border-black/20 dark:text-white text-black text-sm rounded-lg px-4 py-2.5 focus:outline-none dark:focus:border-white/40 focus:border-black/40 cursor-pointer appearance-none"
            >
              <option value="Auto" className="dark:bg-[#141414] bg-white">Auto</option>
              <option value="Single Page" className="dark:bg-[#141414] bg-white">Single Page</option>
              <option value="Strip" className="dark:bg-[#141414] bg-white">Strip</option>
            </select>
          </div>
          <div>
            <div className="font-medium dark:text-white text-black mb-1">Show Page Progress</div>
            <div className="text-sm dark:text-zinc-500 text-zinc-500 mb-3">Shows a progress bar at the side/ bottom when reading.</div>
            <Toggle checked={settings.showProgress} onChange={(v) => updateSetting('showProgress', v)} />
          </div>
          <div>
            <div className="font-medium dark:text-white text-black mb-1">Strip Reader Width</div>
            <div className="text-sm dark:text-zinc-500 text-zinc-500 mb-3">Width of the strip reader.</div>
            <div className="relative pt-6 pb-2">
              <div className="flex justify-between text-sm font-medium dark:text-white text-black mb-2 absolute top-0 w-full">
                <span>32</span>
                <span 
                  className="absolute transform -translate-x-1/2" 
                  style={{ left: `${((settings.stripWidth - 32) / (256 - 32)) * 100}%` }}
                >
                  {settings.stripWidth}
                </span>
                <span>256</span>
              </div>
              <input
                type="range"
                min="32"
                max="256"
                value={settings.stripWidth}
                onChange={(e) => updateSetting('stripWidth', parseInt(e.target.value))}
                className="w-full h-1 dark:bg-zinc-700 bg-zinc-300 rounded-lg appearance-none cursor-pointer dark:accent-white accent-black"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-6 pt-6 border-t dark:border-white/10 border-black/10">
        <h3 className="text-lg font-bold dark:text-white text-black">Reading</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <div className="font-medium dark:text-white text-black mb-1">Reading Direction</div>
            <div className="text-sm dark:text-zinc-500 text-zinc-500 mb-3">Select the reading direction for manga.</div>
            <select
              value={settings.readingDirection}
              onChange={(e) => updateSetting('readingDirection', e.target.value as any)}
              className="w-full sm:w-64 bg-transparent border dark:border-white/20 border-black/20 dark:text-white text-black text-sm rounded-lg px-4 py-2.5 focus:outline-none dark:focus:border-white/40 focus:border-black/40 cursor-pointer appearance-none"
            >
              <option value="Left to Right" className="dark:bg-[#141414] bg-white">Left to Right</option>
              <option value="Right to Left" className="dark:bg-[#141414] bg-white">Right to Left</option>
            </select>
          </div>
          <div>
            <div className="font-medium dark:text-white text-black mb-1">Advance chapter on last page</div>
            <div className="text-sm dark:text-zinc-500 text-zinc-500 mb-3">Automatically advance to the next chapter when reaching the last page.</div>
            <Toggle checked={settings.advanceChapter} onChange={(v) => updateSetting('advanceChapter', v)} />
          </div>
        </div>
      </section>
    </div>
  );
}

const ShortcutInput = ({ label, description, value }: { label: string, description: string, value: string }) => (
  <div>
    <div className="font-medium dark:text-white text-black mb-1">{label}</div>
    <div className="text-sm dark:text-zinc-500 text-zinc-500 mb-3">{description}</div>
    <input
      type="text"
      value={value}
      readOnly
      className="w-full bg-transparent border dark:border-white/20 border-black/20 dark:text-white text-black text-sm rounded-lg px-4 py-2.5 focus:outline-none dark:focus:border-white/40 focus:border-black/40 cursor-default"
    />
  </div>
);

function ShortcutsSettings() {
  const { settings, updateSetting } = useSettings();

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center pb-4 border-b dark:border-white/10 border-black/10">
        <h2 className="text-xl font-bold dark:text-white text-black">Shortcuts</h2>
        <button className="p-2 dark:hover:bg-white/10 hover:bg-black/10 rounded-lg transition-colors dark:text-zinc-400 text-zinc-600 dark:hover:text-white hover:text-black">
          <List className="w-5 h-5" />
        </button>
      </div>

      <section className="space-y-6">
        <h3 className="text-lg font-bold dark:text-white text-black">UI</h3>
        <div>
          <div className="font-medium dark:text-white text-black mb-1">Show Shortcuts</div>
          <div className="text-sm dark:text-zinc-500 text-zinc-500 mb-3">Enable or disable keyboard shortcuts.</div>
          <Toggle checked={settings.showShortcuts} onChange={(v) => updateSetting('showShortcuts', v)} />
        </div>
      </section>

      <section className="space-y-6 pt-6 border-t dark:border-white/10 border-black/10">
        <h3 className="text-lg font-bold dark:text-white text-black">Navigation</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <ShortcutInput label="Search Manga" description="Shortcut to search manga." value="Ctrl+K" />
          <ShortcutInput label="Toggle Sidebar" description="Shortcut to toggle the sidebar." value="Ctrl+B" />
          <ShortcutInput label="Open Settings" description="Shortcut to open settings." value="Ctrl+," />
          <ShortcutInput label="Open Account" description="Shortcut to open account page." value="Ctrl+." />
          <ShortcutInput label="Navigate to Bookmarks" description="Shortcut to navigate to bookmarks." value="Ctrl+Shift+B" />
        </div>
      </section>
    </div>
  );
}

function SearchSettings() {
  const [query, setQuery] = useState('');

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center pb-4 border-b dark:border-white/10 border-black/10">
        <h2 className="text-xl font-bold dark:text-white text-black">Search</h2>
      </div>

      <div className="space-y-6">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search settings by name, description, or key..."
          className="w-full bg-transparent border dark:border-white/20 border-black/20 dark:text-white text-black text-sm rounded-lg px-4 py-3 focus:outline-none dark:focus:border-white/40 focus:border-black/40 transition-colors"
        />
        <div className="dark:text-zinc-500 text-zinc-500 text-sm">
          Enter text to search for settings.
        </div>
      </div>
    </div>
  );
}
