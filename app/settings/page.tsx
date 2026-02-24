'use client';

import { useState } from 'react';
import { List, Info } from 'lucide-react';
import { cn } from '@/lib/utils';

type Tab = 'General' | 'Manga' | 'Shortcuts' | 'Search';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<Tab>('General');

  return (
    <div className="max-w-5xl mx-auto pb-12">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-white">Settings</h1>
        <button className="bg-[#c22543] hover:bg-[#a01d36] text-white px-4 py-1.5 rounded-lg font-medium transition-colors">
          Reset
        </button>
      </div>

      <div className="flex gap-6 mb-6 border-b border-white/10">
        {(['General', 'Manga', 'Shortcuts', 'Search'] as Tab[]).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={cn(
              "pb-3 text-sm font-medium transition-colors relative",
              activeTab === tab ? "text-white" : "text-zinc-500 hover:text-zinc-300"
            )}
          >
            {tab}
            {activeTab === tab && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white rounded-t-full" />
            )}
          </button>
        ))}
      </div>

      <div className="bg-[#141414] border border-white/5 rounded-xl p-6">
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
        checked ? "bg-white" : "bg-zinc-700"
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          "pointer-events-none inline-block h-4 w-4 transform rounded-full shadow ring-0 transition duration-200 ease-in-out",
          checked ? "translate-x-4 bg-black" : "translate-x-0 bg-white"
        )}
      />
    </button>
  );
}

function GeneralSettings() {
  const [theme, setTheme] = useState('System');
  const [fancyAnimations, setFancyAnimations] = useState(true);
  const [showToasts, setShowToasts] = useState(true);
  const [loginMal, setLoginMal] = useState(false);
  const [loginAnilist, setLoginAnilist] = useState(false);
  const [allowAnalytics, setAllowAnalytics] = useState(true);

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center pb-4 border-b border-white/10">
        <h2 className="text-xl font-bold text-white">General</h2>
        <button className="p-2 hover:bg-white/10 rounded-lg transition-colors text-zinc-400 hover:text-white">
          <List className="w-5 h-5" />
        </button>
      </div>

      <section className="space-y-6">
        <h3 className="text-lg font-bold text-white">UI</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <div className="font-medium text-white mb-1">Theme</div>
            <div className="text-sm text-zinc-500 mb-3">Select the application theme.</div>
            <select
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
              className="w-full sm:w-64 bg-transparent border border-white/20 text-white text-sm rounded-lg px-4 py-2.5 focus:outline-none focus:border-white/40 cursor-pointer appearance-none"
            >
              <option value="System" className="bg-[#141414]">System</option>
              <option value="Light" className="bg-[#141414]">Light</option>
              <option value="Dark" className="bg-[#141414]">Dark</option>
            </select>
          </div>
          <div>
            <div className="font-medium text-white mb-1">Fancy Animations</div>
            <div className="text-sm text-zinc-500 mb-3">Such as manga detail pages cover image.</div>
            <Toggle checked={fancyAnimations} onChange={setFancyAnimations} />
          </div>
        </div>
      </section>

      <section className="space-y-6 pt-6 border-t border-white/10">
        <h3 className="text-lg font-bold text-white">Notifications</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <div className="font-medium text-white mb-1">Show Toasts</div>
            <div className="text-sm text-zinc-500 mb-3">Show toast notifications for various actions.</div>
            <Toggle checked={showToasts} onChange={setShowToasts} />
          </div>
          <div>
            <div className="font-medium text-white mb-1">Login Toasts</div>
            <div className="text-sm text-zinc-500 mb-3">Show warnings when you aren't logged in to a service.</div>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-white">MAL</span>
                <Toggle checked={loginMal} onChange={setLoginMal} />
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-white">AniList</span>
                <Toggle checked={loginAnilist} onChange={setLoginAnilist} />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-6 pt-6 border-t border-white/10">
        <h3 className="text-lg font-bold text-white">Privacy</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <div className="font-medium text-white mb-1">Allow Analytics</div>
            <div className="text-sm text-zinc-500 mb-3">Allow the collection of anonymous analytics data.</div>
            <Toggle checked={allowAnalytics} onChange={setAllowAnalytics} />
          </div>
        </div>
      </section>
    </div>
  );
}

function MangaSettings() {
  const [displayType, setDisplayType] = useState('Auto');
  const [showProgress, setShowProgress] = useState(true);
  const [stripWidth, setStripWidth] = useState(144);
  const [readingDirection, setReadingDirection] = useState('Left to Right');
  const [advanceChapter, setAdvanceChapter] = useState(true);

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center pb-4 border-b border-white/10">
        <h2 className="text-xl font-bold text-white">Manga</h2>
        <button className="p-2 hover:bg-white/10 rounded-lg transition-colors text-zinc-400 hover:text-white">
          <List className="w-5 h-5" />
        </button>
      </div>

      <section className="space-y-6">
        <h3 className="text-lg font-bold text-white">UI</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <div className="font-medium text-white">Page Display Type</div>
              <Info className="w-4 h-4 text-zinc-400" />
            </div>
            <div className="text-sm text-zinc-500 mb-3">Select the default reader type for manga.</div>
            <select
              value={displayType}
              onChange={(e) => setDisplayType(e.target.value)}
              className="w-full bg-transparent border border-white/20 text-white text-sm rounded-lg px-4 py-2.5 focus:outline-none focus:border-white/40 cursor-pointer appearance-none"
            >
              <option value="Auto" className="bg-[#141414]">Auto</option>
              <option value="Single Page" className="bg-[#141414]">Single Page</option>
              <option value="Strip" className="bg-[#141414]">Strip</option>
            </select>
          </div>
          <div>
            <div className="font-medium text-white mb-1">Show Page Progress</div>
            <div className="text-sm text-zinc-500 mb-3">Shows a progress bar at the side/ bottom when reading.</div>
            <Toggle checked={showProgress} onChange={setShowProgress} />
          </div>
          <div>
            <div className="font-medium text-white mb-1">Strip Reader Width</div>
            <div className="text-sm text-zinc-500 mb-3">Width of the strip reader.</div>
            <div className="relative pt-6 pb-2">
              <div className="flex justify-between text-sm font-medium text-white mb-2 absolute top-0 w-full">
                <span>32</span>
                <span 
                  className="absolute transform -translate-x-1/2" 
                  style={{ left: `${((stripWidth - 32) / (256 - 32)) * 100}%` }}
                >
                  {stripWidth}
                </span>
                <span>256</span>
              </div>
              <input
                type="range"
                min="32"
                max="256"
                value={stripWidth}
                onChange={(e) => setStripWidth(parseInt(e.target.value))}
                className="w-full h-1 bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-white"
                style={{
                  background: `linear-gradient(to right, white 0%, white ${((stripWidth - 32) / (256 - 32)) * 100}%, #3f3f46 ${((stripWidth - 32) / (256 - 32)) * 100}%, #3f3f46 100%)`
                }}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-6 pt-6 border-t border-white/10">
        <h3 className="text-lg font-bold text-white">Reading</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <div className="font-medium text-white mb-1">Reading Direction</div>
            <div className="text-sm text-zinc-500 mb-3">Select the reading direction for manga.</div>
            <select
              value={readingDirection}
              onChange={(e) => setReadingDirection(e.target.value)}
              className="w-full sm:w-64 bg-transparent border border-white/20 text-white text-sm rounded-lg px-4 py-2.5 focus:outline-none focus:border-white/40 cursor-pointer appearance-none"
            >
              <option value="Left to Right" className="bg-[#141414]">Left to Right</option>
              <option value="Right to Left" className="bg-[#141414]">Right to Left</option>
            </select>
          </div>
          <div>
            <div className="font-medium text-white mb-1">Advance chapter on last page</div>
            <div className="text-sm text-zinc-500 mb-3">Automatically advance to the next chapter when reaching the last page.</div>
            <Toggle checked={advanceChapter} onChange={setAdvanceChapter} />
          </div>
        </div>
      </section>
    </div>
  );
}

function ShortcutsSettings() {
  const [showShortcuts, setShowShortcuts] = useState(true);

  const ShortcutInput = ({ label, description, value }: { label: string, description: string, value: string }) => (
    <div>
      <div className="font-medium text-white mb-1">{label}</div>
      <div className="text-sm text-zinc-500 mb-3">{description}</div>
      <input
        type="text"
        value={value}
        readOnly
        className="w-full bg-transparent border border-white/20 text-white text-sm rounded-lg px-4 py-2.5 focus:outline-none focus:border-white/40 cursor-default"
      />
    </div>
  );

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center pb-4 border-b border-white/10">
        <h2 className="text-xl font-bold text-white">Shortcuts</h2>
        <button className="p-2 hover:bg-white/10 rounded-lg transition-colors text-zinc-400 hover:text-white">
          <List className="w-5 h-5" />
        </button>
      </div>

      <section className="space-y-6">
        <h3 className="text-lg font-bold text-white">UI</h3>
        <div>
          <div className="font-medium text-white mb-1">Show Shortcuts</div>
          <div className="text-sm text-zinc-500 mb-3">Enable or disable keyboard shortcuts.</div>
          <Toggle checked={showShortcuts} onChange={setShowShortcuts} />
        </div>
      </section>

      <section className="space-y-6 pt-6 border-t border-white/10">
        <h3 className="text-lg font-bold text-white">Navigation</h3>
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
      <div className="flex justify-between items-center pb-4 border-b border-white/10">
        <h2 className="text-xl font-bold text-white">Search</h2>
      </div>

      <div className="space-y-6">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search settings by name, description, or key..."
          className="w-full bg-transparent border border-white/20 text-white text-sm rounded-lg px-4 py-3 focus:outline-none focus:border-white/40 transition-colors"
        />
        <div className="text-zinc-500 text-sm">
          Enter text to search for settings.
        </div>
      </div>
    </div>
  );
}
