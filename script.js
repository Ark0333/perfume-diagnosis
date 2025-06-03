const questions = [
  { text: "休日の過ごし方は？", options: ["自然の中でリラックス", "ショッピングや街歩き", "本や映画に浸る", "アートやカフェ巡り", "仲間とワイワイ"] },
  { text: "好きな季節は？", options: ["春", "夏", "秋", "冬", "どれも好き"] },
  { text: "自分の性格を一言で？", options: ["やさしい", "活発", "落ち着いてる", "感受性豊か", "個性的"] },
  { text: "理想の香りのイメージは？", options: ["花畑のよう", "太陽のよう", "森の中の空気", "香水ショップ", "非日常な感じ"] },
  { text: "初対面でよく言われる印象は？", options: ["優しそう", "元気そう", "大人っぽい", "おしゃれ", "ミステリアス"] },
  { text: "好きな音楽は？", options: ["クラシック", "ポップ", "ジャズ", "ロック", "エレクトロ系"] },
  { text: "理想のデートは？", options: ["公園デート", "テーマパーク", "美術館", "街ブラ", "夜景"] },
  { text: "一番落ち着くのは？", options: ["花の香り", "太陽の匂い", "森の香り", "アロマ", "お香"] },
  { text: "香水に求めるものは？", options: ["癒し", "元気", "安心", "洗練", "特別感"] }
];

const scentTypes = ["Floral", "Citrus", "Woody", "Powdery", "Oriental"];
const scores = [0, 0, 0, 0, 0];

const results = {
  Floral: "【Floral】お花のようにやさしく、ナチュラルで癒し系のあなたにぴったりな香り。毎日を穏やかに過ごしたい人に◎。",
  Citrus: "【Citrus】明るく元気で爽やかな印象を与える香り。前向きでアクティブなあなたにぴったり！",
  Woody: "【Woody】落ち着いた大人の余裕を感じさせる香り。知的で落ち着いたあなたの魅力を引き立てます。",
  Powdery: "【Powdery】柔らかく繊細、上品で清潔感のある香り。清楚で優しい雰囲気のあなたにぴったり。",
  Oriental: "【Oriental】個性と色気が香るミステリアスな香り。人と違う魅力を持つあなたにフィットします。"
};

let currentQuestion = 0;

function startQuiz() {
  document.getElementById("quiz-start").style.display = "none";
  document.getElementById("quiz-question").style.display = "block";
  showQuestion();
}

function showQuestion() {
  const q = questions[currentQuestion];
  document.getElementById("question-text").textContent = q.text;

  const optionsContainer = document.getElementById("options-container");
  optionsContainer.innerHTML = "";

  q.options.forEach((option, index) => {
    const button = document.createElement("button");
    button.textContent = option;
    button.onclick = () => {
      scores[index]++;
      nextQuestion();
    };
    optionsContainer.appendChild(button);
  });
}

function nextQuestion() {
  currentQuestion++;
  if (currentQuestion < questions.length) {
    showQuestion();
  } else {
    showResult();
  }
}

function showResult() {
  document.getElementById("quiz-question").style.display = "none";
  document.getElementById("quiz-result").style.display = "block";

  const maxScore = Math.max(...scores);
  const topIndexes = scores.map((score, i) => score === maxScore ? i : -1).filter(i => i !== -1);

  const resultText = topIndexes.length === 1
    ? results[scentTypes[topIndexes[0]]]
    : `${results[scentTypes[topIndexes[0]]]}（他にも${topIndexes.length - 1}つの要素を持っています）`;

  document.getElementById("result-text").textContent = resultText;
}
function showResult(resultType) {
  // 質問セクション非表示
  document.getElementById("question-section").style.display = "none";

  // 結果セクション表示
  const resultSection = document.getElementById("result-section");
  resultSection.style.display = "block";

  // すべての結果を非表示にして該当タイプだけ表示
  const allResults = resultSection.querySelectorAll(".result");
  allResults.forEach(res => res.style.display = "none");

  const selectedResult = resultSection.querySelector("." + resultType);
  if (selectedResult) {
    selectedResult.style.display = "block";
  }
}
