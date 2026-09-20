import { defineConfig } from '@playwright/test';
export default defineConfig({
  testDir: './tests/browser', workers: 1,
  use: { channel: 'chrome', baseURL: 'http://127.0.0.1:8768', viewport: { width: 1100, height: 760 } },
  webServer: { command: 'python3 -m http.server 8768 --bind 127.0.0.1', url: 'http://127.0.0.1:8768/demo/', reuseExistingServer: false },
});
