import assert from 'node:assert/strict';
import { JSDOM } from 'jsdom';
import React, { act } from 'react';
import { createRoot } from 'react-dom/client';
import { I18nProvider } from '../src/i18n/I18nProvider';
import { MusicProvider } from '../src/music/MusicProvider';
import { MusicPlayer } from '../src/components/MusicPlayer';
import { EnvelopeIntro } from '../src/components/EnvelopeIntro';

const dom = new JSDOM('<html><body><div id="root"></div></body></html>', { url: 'https://example.test' });
Object.assign(globalThis, {
  React, // JSX runtime for the Node-only TSX test harness.
  window: dom.window,
  document: dom.window.document,
  DOMException: dom.window.DOMException,
  getComputedStyle: dom.window.getComputedStyle.bind(dom.window),
  IS_REACT_ACT_ENVIRONMENT: true,
});
dom.window.matchMedia = () => ({ matches: false, addEventListener() {}, removeEventListener() {} }) as unknown as MediaQueryList;

class FakeAudio extends dom.window.EventTarget {
  static instances: FakeAudio[] = [];
  static outcome: 'playing' | 'error' | 'blocked' = 'playing';
  paused = true;
  error: object | null = null;
  currentTime = 0;
  loop = false;
  preload = '';
  muted = false;
  volume = 1;
  src = '';
  constructor() { super(); FakeAudio.instances.push(this); }
  load() { this.error = null; }
  play() {
    if (FakeAudio.outcome === 'error') {
      this.error = {};
      this.dispatchEvent(new dom.window.Event('error'));
      return Promise.reject(new dom.window.DOMException('Unsupported', 'NotSupportedError'));
    }
    if (FakeAudio.outcome === 'blocked') return Promise.reject(new dom.window.DOMException('Blocked', 'NotAllowedError'));
    this.paused = false;
    this.dispatchEvent(new dom.window.Event('playing'));
    return Promise.resolve();
  }
  pause() { this.paused = true; this.dispatchEvent(new dom.window.Event('pause')); }
}
Object.assign(globalThis, { Audio: FakeAudio });

async function mount() {
  FakeAudio.instances = [];
  const root = createRoot(document.getElementById('root')!);
  await act(async () => root.render(
    <I18nProvider><MusicProvider>
      <MusicPlayer />
      <EnvelopeIntro onOpenStart={() => {}} onOpened={() => {}} />
    </MusicProvider></I18nProvider>,
  ));
  return root;
}
async function click(selector: string) {
  await act(async () => (document.querySelector(selector) as HTMLButtonElement).click());
}
const hint = () => document.querySelector('.music__hint')!;

FakeAudio.outcome = 'error';
let root = await mount();
// Preload failure stays quiet until the user actually tries to play.
await act(async () => FakeAudio.instances[0].dispatchEvent(new dom.window.Event('error')));
assert.equal(hint().classList.contains('is-visible'), false);
await click('.seal');
assert.equal(hint().classList.contains('is-visible'), true);
assert.ok(hint().textContent?.includes('Musiqa hozircha mavjud emas'));
console.log('✓ Envelope play failure shows an error without clicking the music control');
FakeAudio.outcome = 'playing';
await click('.music__btn');
assert.equal(document.querySelector('.music__btn')!.getAttribute('aria-pressed'), 'true');
assert.equal(hint().classList.contains('is-visible'), false);
console.log('✓ Retrying after a load error starts playback and clears the hint');
await act(async () => root.unmount());

FakeAudio.outcome = 'blocked';
root = await mount();
await click('.seal');
assert.equal(hint().classList.contains('is-visible'), true);
assert.ok(hint().textContent?.includes('Musiqani yoqish uchun bosing'));
console.log('✓ Autoplay denial offers a manual retry');
await act(async () => root.unmount());

FakeAudio.outcome = 'playing';
root = await mount();
await click('.music__btn');
const audio = FakeAudio.instances[0];
audio.currentTime = 12;
await click('.seal');
assert.equal(FakeAudio.instances.length, 1);
assert.equal(audio.currentTime, 12);
assert.equal(audio.loop, true);
await click('.music__btn');
assert.equal(audio.paused, true);
assert.equal(document.querySelector('.music__btn')!.getAttribute('aria-pressed'), 'false');
await click('.music__btn');
assert.equal(audio.paused, false);
assert.equal(audio.currentTime, 12);
console.log('✓ Envelope reuses one looping audio instance; pause/resume preserves position');
await act(async () => root.unmount());
dom.window.close();
