# Multilingual Quiz Application

多言語対応の3択クイズアプリケーションです。英語、中国語、韓国語、スペイン語、ベトナム語の問題を提供します。

## Features / 機能

- 5つの言語（英語・中国語・韓国語・スペイン語・ベトナム語）でのクイズ提供
- クイズ問題の表示
- 3つの選択肢から回答を選択
- 即時の正誤判定
- 自動的に次の問題へ進行
- 正解/不正解の視覚的フィードバック

## Technologies / 使用技術

- HTML5
- JavaScript
- Tailwind CSS (via CDN)

## Project Structure / ファイル構成

```
.
├── index.html           # メインのHTMLファイル
├── quizApp.js          # クイズアプリケーションのコアロジック
├── englishQuizData.js  # 英語クイズのデータ
├── chineseQuizData.js  # 中国語クイズのデータ
├── koreanQuizData.js   # 韓国語クイズのデータ
├── spanishQuizData.js  # スペイン語クイズのデータ
└── vietnameseQuizData.js # ベトナム語クイズのデータ
```

## Setup and Running / セットアップと実行方法

1. リポジトリをクローン
```bash
git clone https://github.com/mutsukisaito/multilingual-quiz-app.git
```

2. プロジェクトディレクトリに移動
```bash
cd multilingual-quiz-app
```

3. `index.html` をブラウザで開く

特別なセットアップや依存関係のインストールは不要です。TailwindCSSはCDN経由で読み込まれます。

## Quiz Data Structure / クイズデータ構造

各言語のクイズデータは独立したJavaScriptファイルで管理されています：

- `englishQuizData.js` - 英語の問題セット
- `chineseQuizData.js` - 中国語の問題セット
- `koreanQuizData.js` - 韓国語の問題セット
- `spanishQuizData.js` - スペイン語の問題セット
- `vietnameseQuizData.js` - ベトナム語の問題セット

各クイズデータは以下の形式で構成されています：
```javascript
{
  question: "問題文",
  options: ["選択肢1", "選択肢2", "選択肢3"],
  correct: 0  // 正解の選択肢のインデックス（0-2）
}
```

## Contributing / 貢献

1. Forkする
2. フィーチャーブランチを作成 (`git checkout -b feature/amazing-feature`)
3. 変更をコミット (`git commit -m 'Add some amazing feature'`)
4. ブランチにプッシュ (`git push origin feature/amazing-feature`)
5. Pull Requestを作成

## License / ライセンス

[MIT License](LICENSE)