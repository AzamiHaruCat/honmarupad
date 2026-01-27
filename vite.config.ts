import { defineConfig } from 'vite';
import monkey from 'vite-plugin-monkey';

// https://vitejs.dev/config/
export default defineConfig(({ command }) => {
  const matchPatterns = ['https://play.games.dmm.com/game/tohken'];

  if (command === 'serve') {
    matchPatterns.push('http://127.0.0.1:*/debug.html');
    matchPatterns.push('http://localhost:*/debug.html');
  }

  return {
    plugins: [
      monkey({
        entry: 'src/main.ts',
        build: {
          fileName: 'honmarupad.user.js',
        },
        userscript: {
          name: '本丸ぱっど',
          namespace: 'sanipad/honmarupad',
          version: '2026-01-27',
          description:
            'ブラウザ版「刀剣乱舞ONLINE」のゲーム画面を調整するユーザースクリプトです。このスクリプトはブラウザの表示（DOM）のみを調整します。ゲームデータや通信内容には一切触れていません。ブラウザの標準機能で実現できる表示制御をスクリプトで代行しているだけですが、各位の判断で自己責任のもとご利用ください。',
          license: 'Custom (See LICENSE file)',
          icon: 'https://sanipad.pages.dev/favicon.svg',
          downloadURL:
            'https://raw.githubusercontent.com/AzamiHaruCat/honmarupad/main/dist/honmarupad.user.js',
          updateURL:
            'https://raw.githubusercontent.com/AzamiHaruCat/honmarupad/main/dist/honmarupad.user.js',
          supportURL: 'https://github.com/AzamiHaruCat/honmarupad/issues',
          homepageURL: 'https://sanipad.pages.dev/',
          author: 'AzamiHaru',
          match: matchPatterns,
          noframes: true,
          'run-at': 'document-end',
        },
      }),
    ],
  };
});
