// npm install lucide-react recharts firebase
import React, { useState, useEffect, useRef } from "react";
import { Check, X, Home, ChevronRight, RefreshCw, BarChart2, BookOpen, User, ArrowRight, HelpCircle } from "lucide-react";
import { initializeApp } from "firebase/app";
import { getAuth, signInAnonymously, onAuthStateChanged } from "firebase/auth";
import { getFirestore, doc, setDoc, onSnapshot, getDoc } from "firebase/firestore";

const APP_ID = "QuizApp_Capital_And_Cost_001";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "dummy",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "dummy",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "dummy",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "dummy",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "dummy",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "dummy",
};

let app, auth, db;
try {
  app = initializeApp(firebaseConfig);
  auth = getAuth(app);
  db = getFirestore(app);
} catch (error) {
  console.warn("Firebase Init Error", error);
}

const quizData = [
  {
    id: 1,
    title: "２商品間の売上金額の相関係数",
    source: "平成30年 第36問",
    question: "商品Ａ〜Ｄの1年間における日別の売上金額について、2商品間の売上金額の相関係数を計算したところ、下表のようになった。これらの結果の解釈および相関係数の一般的な知識に関する記述として、最も適切なものを下記の解答群から選べ。",
    table: {
      headers: ["組み合わせ", "相関係数"],
      rows: [
        ["商品Ａの売上金額 と 商品Ｂの売上金額", "0.5"],
        ["商品Ｂの売上金額 と 商品Ｃの売上金額", "0.1"],
        ["商品Ａの売上金額 と 商品Ｄの売上金額", "-0.7"]
      ],
      note: "＊ここで相関係数とはピアソンの積率相関係数である。"
    },
    choices: [
      "1. 売上金額の相関関係の強さを見ると、商品Ａと商品Ｂの関係より、商品Ａと商品Ｄの関係のほうが強い。",
      "2. 商品Ａと商品Ｂの相関係数が 0.5 で、商品Ｂと商品Ｃの相関係数が 0.1 であるため、表には計算されていないが、商品Ａと商品Ｃの相関係数は 0.4 であると言える。",
      "3. 商品Ａと商品Ｂの相関係数が 0.5 であるため、商品Ｂの平均売上金額は、商品Ａの平均売上金額の半分であると言える。",
      "4. 相関係数は、-100 から 100 までの範囲の値として計算される。",
      "5. 理論的に相関係数は 0 にはならない。"
    ],
    answer: 0,
    explanation: "解答：ア\n\n本問は、売上の相関関係に関する出題です。相関係数については、財務会計でも問われますが、運営管理においても、POSデータを利用したマーケットバスケット分析等を理解する前提として重要になります。相関関係については、以下の関係を理解しておく必要があります。\n\n相関係数＝1　X と Y が全く同じ性質の変動をする\n相関係数＝0　X と Y は無関係の変動をする\n相関係数＝－1　X と Y は全く正反対の性質の変動をする\n\nでは、各選択肢を見ていきましょう。\n\n選択肢アですが、相関関係の強さは、相関係数の絶対値の大きさで表されます。商品Aと商品Bの相関関係は相関係数が0.5、商品Aと商品Dの相関関係は相関係数が-0.7です。絶対値は0.5＜0.7ですので、商品Aと商品Dの相関関係の方が強いことがわかります。従って、記述は適切で、本問の正解です。\n\n選択肢イですが、相関係数は以下の式で表されます。\n相関係数＝（XとYの共分散）/｛（Xの標準偏差）×（Yの標準偏差）｝\nなお、共分散＝E[（X－E[X]）（Y－E[Y]） ]\n※E[ ]は期待値\n相関係数の式から、分母が商品Aと商品Bは、（商品Aの標準偏差×商品Bの標準偏差）となり、商品Bと商品Cは、（商品Bの標準偏差×商品Cの標準偏差）ですから、分母が異なるため、単純に足し算、引き算しても商品Aと商品Cの相関係数が求められるわけではありません。従って、記述は不適切です。\n\n選択肢ウについては、商品Aと商品Bの相関係数が0.5であるとは商品Bの売上金額の変動が商品Aの売上高の変動の1/2であり、平均売上高が1/2ではありません。従って、記述は不適切です。\n\n選択肢エは、相関係数の範囲ですが-1〜1であって、-100〜100ではありません。従って、記述は不適切です。\n\n選択肢オは、相関係数が0とはならないとされていますが、商品の一方が、まったく変動しない場合には、相関係数は0になります。実際には相関係数が0というケースはまれですが、理論的にはあります。"
  },
  {
    id: 2,
    title: "商品仕入",
    source: "平成28年 第27問",
    question: "小売店の商品仕入に関する記述として、最も適切なものはどれか。",
    choices: [
      "1. 委託仕入では、一定期間店頭で販売し、売れ残った商品だけ小売店が買い取る。",
      "2. 委託仕入では、商品の販売価格は原則として小売店が自由に設定する。",
      "3. 委託仕入において、店頭在庫の所有権は小売店にある。",
      "4. 消化仕入では、商品の販売時に小売店に所有権が移転する。",
      "5. 消化仕入をすると、小売店の廃棄ロスが発生しやすい。"
    ],
    answer: 3,
    explanation: "解答：エ\n\n商品の仕入方法に関する問題です。\n仕入方法について覚えていた人は、正解できる問題です。\nまずは、問題で触れられていた、委託仕入と消化仕入の違いを簡単に復習しましょう。\n\n【委託仕入と消化仕入の違い】\n委託仕入は、メーカーなどの売り手が在庫の所有権を持ったまま小売店が販売を行う方法です。委託仕入は、商品が売れ残った場合には、メーカーなどに返品ができます。ただし、在庫の所有権はメーカーなどにありますので、小売店は販売価格を決められず販売した商品に関して販売手数料を受け取ります。\n\n消化仕入（売上仕入ともいいます）は、店頭に商品を置き、売れた分を同時に仕入として計上する方法です。消化仕入では売れない限り、仕入をする必要がないため、小売店は売れ残りのリスクを負いません。\n\nここまで押さえた上で、選択肢を見てみましょう。\n\n選択肢アについて、委託仕入では売れ残った商品はメーカーなどに返品することになります。よって、選択肢アは不適切です。\n\n選択肢イについて、委託仕入では商品の販売価格は原則としてメーカーなどが設定します。よって、選択肢イは不適切です。\n\n選択肢ウについて、委託仕入では店頭在庫の所有権はメーカーなどが有しています。よって、選択肢ウは不適切です\n\n選択肢エについて、消化仕入では商品の販売時に売上と仕入が同時に発生し、小売店に所有権が移転します。よって、選択肢エは適切です。\n\n選択肢オは、消化仕入では売れ残った商品はメーカーに返品することになります。小売店での廃棄ロスが発生しにくいため、選択肢オは不適切です。\n\n～補足～ 買取仕入\nもう一つ代表的な仕入れ方法に買取仕入が有ります。小売店が商品を買い取る方法で、在庫の所有権は小売店が持ち、販売価格も自由に決められます。しかし、商品が売れ残るリスクは小売店が持つ形になります。量販店ではこの形態を多くとっています。"
  },
  {
    id: 3,
    title: "価格設定と価格政策",
    source: "平成25年 第30問",
    question: "小売業の価格設定と価格政策に関する記述として、最も不適切なものはどれか。",
    choices: [
      "1. 慣習価格政策は、すでに一般的に浸透している価格を設定する手法である。",
      "2. コストプラス方式の価格設定は、価格が市場の実情に合わない場合がある。",
      "3. マーケットプライス法は、全国共通の価格を設定する手法である。",
      "4. 名声価格政策は、意識的に高価格を設定することによって、高品質であることを連想させる手法である。"
    ],
    answer: 2,
    explanation: "解答：ウ\n価格政策と価格決定に関する問題です。\n価格政策や価格決定に関する基本的な知識を覚えていれば、正解できる問題です。\nそれでは問題文を見ていきましょう。\n選択肢アについて、慣習価格政策とは、消費者が慣習的に一定の価格のみ受け入れている場合に、その価格に基づいて価格を決定する政策です。例えば、現在は、自動販売機の缶ジュースは130円で売られていることが多いです。これは、一般的に浸透している130円よりも高い価格を設定すると需要が急激に減るためです。よって選択肢アは適切です。\n選択肢イについて、コストプラス方式では、製品の原価に一定の利益を上乗せした価格を設定します。この方式は、供給者側の事情を優先した価格設定のため、市場の実情と合わない場合があります。よって選択肢イは適切です。\n選択肢ウについて、マーケットプライス法は、市場の状況、例えば、顧客の動向や、競合店の価格等を考慮して価格を設定する手法です。全国共通の価格を設定する手法ではありません。よって選択肢ウは不適切で、正解です。\n選択肢エについて、名声価格政策とは、あえて高い価格をつけることで、消費者に高い価値があると認識させる政策です。名声価格は威光価格と呼ばれることもあります。高級時計などのブランド品は、高い価格の方がステータスが上がり、低い価格をつけたときよりも、売れることがあります。よって選択肢エは適切です。"
  },
  {
    id: 4,
    title: "価格政策",
    source: "令和4年 第30問",
    question: "小売業の価格政策と特売に関する記述として、最も適切なものはどれか。",
    choices: [
      "1. EDLP政策の場合、プライスラインは1つしか設けない。",
      "2. 定番価格を高く設定していても、特売を頻繁に繰り返すと顧客の内的参照価格は低下する。",
      "3. 特売による販売促進は、価格弾力性が低い商品ほどチラシなどで告知したときの集客効果が高い。",
      "4. ハイ・ロープライシング政策では、特売時における対象商品の販売数量を最大化することで店全体の利益率が高まる。",
      "5. 端数価格には、買物客に安さを感じさせる心理的効果はない。"
    ],
    answer: 1,
    explanation: "解答：イ\n小売業の価格政策に関する出題です。問われている内容は難しくありませんが、本問では選択肢に含まれている専門用語を理解しているかがポイントになります。これらの専門用語は過去の本試験でもよく出題されていますので、確実に理解しておきたい内容です。\nでは、選択肢を見ていきましょう。\n選択肢アは不適切な記述です。EDLP政策を採用したからと言って、プライスラインは１つとは限りません。EDLP政策とは、EveryDay Low Priceの略で、特売日を設けず常に一定の低価格で販売する価格政策を指します。プライスラインとは、1,000円、2,000円などの価格帯のことを指します。よって、プライスラインを1つに絞ることがEDLP政策ではありません。EDLP政策でも複数のプライスラインを設けるケースはあります。\n選択肢イは適切な記述です。内的参照価格とは、消費者がある商品の価格を見て「高い」「安い」と判断する基準のうち、消費者自身の過去の購買経験から感覚的に判断する基準を指します。分かりやすく言うと、「この商品はこのくらいの価格で売られている」と顧客の中に刷り込まれた基準です。よって、仮に定番価格が1.000円の商品でも、698円で売る特売を頻繁に繰り返していると、顧客の内的参照価格は1.000円ではなく698円に下がってしまいます。\n選択肢ウは不適切な記述です。特売による販売促進は、価格弾力性が高い商品ほどチラシで告知したときの集客効果が高くなります。価格弾力性とは、価格の変動に対する需要の変動の度合いのことです。つまり、商品の価格を上げたり下げたりしたとき、その商品の売れ行きがどの程度変わるかを表したものです。価格弾力性が低い商品は、価格の変化に対して売れ行きに大きな影響は表れません。したがって、価格弾力性が低い商品をチラシで訴求しても集客効果は期待できません。ちなみに、価格弾力性の高い商品であれば、価格の変化に対して売れ行きが大きく連動しますので、チラシ掲載による集客効果が期待できます。\n選択肢エは不適切な記述です。ハイ・ロープライシング政策では、特売時における対象商品の販売数量を最大化すると、店全体の利益率は下がります。ハイ・ロープライシング政策とは、通常価格で販売する時期と、低価格で販売する時期を繰り返す価格政策です。特売時は価格を下げて販売するわけですから、一般的には仕入れの条件等が変わらなければ利益率は下がります。よって、ロープライスで提供する特売時の販売数量を最大化すれば、店全体の利益率は低下します。\n選択肢オは不適切な記述です。端数価格とは、500円、1,000円といったキリのよい価格設定ではなく、498円、980円といった端数で設定する価格政策です。これにより、その価格差は僅かでありながら、顧客には心理的にそれ以上の安さを感じさせる効果があります。\n小売業の価格政策と特売は、出題頻度が高いテーマです。価格政策の特徴とそれらに関連する用語について、理解を深めておきましょう。"
  },
  {
    id: 5,
    title: "陳列",
    source: "平成24年 第29問",
    question: "商品陳列方法とそのメリットに関する記述として、最も不適切なものはどれか。",
    choices: [
      "1. カットケース陳列には、高級感を出しやすいというメリットがある。",
      "2. ゴンドラ陳列には、フェイスをそろえやすいというメリットがある。",
      "3. ジャンブル陳列には、ディスプレイに手間がかからないというメリットがある。",
      "4. ショーケース陳列には、商品が汚れにくいというメリットがある。",
      "5. フック陳列には、陳列されている商品の在庫量が分かりやすいというメリットがある。"
    ],
    answer: 0,
    explanation: "解答：ア\n商品陳列方法に関する出題です。\nそれぞれの商品陳列方法の基本を押さえていれば正解できる問題です。\nそれでは選択肢を見ていきましょう。\n選択肢アについて、カットケース陳列は、商品が入っていたダンボール箱をカットしてそのまま陳列する方法です。カットケース陳列は、陳列の手間がかからず、安さを訴求できることから、ディスカウントストアなどでよく用いられています。選択肢アは、高級感が出しやすいメリットがある、としていますがこれは不適切です。よって、これが正解です。\n選択肢イについて、ゴンドラ陳列は、ゴンドラに商品を並べる陳列です。ゴンドラ陳列は、スーパーマーケットなどで、定番品の陳列などに用いられます。通常、ゴンドラ陳列では、棚に商品の前面が向くように並べて陳列します。選択肢イは、フェイスがそろえやすいメリットがある、としています。よって、選択肢イは適切です。\n選択肢ウについて、ジャンブル陳列は、投げ込み陳列とも呼ばれ、カゴの中に商品が大量に投げ込まれている陳列方法です。ジャンブル陳列は、小さい商品を1つずつ陳列する必要がないため陳列が容易です。選択肢ウは、ディスプレイに手間がかからないというメリットがある、としています。よって、選択肢ウは適切です。\n選択肢エについて、ショーケース陳列は、その名の通り、ショーケースに入れて陳列する方法です。ショーケースは、多くの場合、ガラスで覆われています。選択肢エは、商品が汚れにくいというメリットがある、としています。よって、選択肢エは適切です。\n選択肢オについて、フック陳列は、商品をフックで吊るす陳列です。陳列される商品にはフックがついていて、それをフック・バーにかけて吊るします。フック陳列を行うと、商品が見やすく、手に取る事も簡単です。選択肢オは、陳列されている商品の在庫量が分かりやすいというメリットがある、としています。フック陳列では、陳列されている商品の個数が一目で分かります。よって、選択肢オは適切です。\n陳列の方法は、名前を聞いたら具体的なイメージが湧くように復習しておきましょう。"
  },
  {
    id: 6,
    title: "陳列方法",
    source: "令和2年 第29問",
    question: "店舗における売場づくりに関して、以下に示す【陳列手法】と【陳列の特徴】の組み合わせとして、最も適切なものを下記の解答群から選べ。\n\n【陳列手法】\n① レジ前陳列\n② ジャンブル陳列\n③ フック陳列\n\n【陳列の特徴】\na 商品を見やすく取りやすく陳列でき、在庫量が把握しやすい。\nb 非計画購買を誘発しやすく、少額商品の販売に適している。\nc 陳列が容易で、低価格のイメージを演出できる。",
    choices: [
      "1. ①とa　②とb　③とc",
      "2. ①とa　②とc　③とb",
      "3. ①とb　②とa　③とc",
      "4. ①とb　②とc　③とa",
      "5. ①とc　②とa　③とb"
    ],
    answer: 3,
    explanation: "解答：エ\n陳列手法に関する問題です。基本的な知識を問う問題です。\n① レジ前陳列ですが非計画購買を誘発しやすく、少額商品の販売に適しています。したがって、bが適切な記述です。\n② ジャンブル陳列ですが、陳列が容易で割安感を抱かせるもので、cが適切な記述です。\n③ フック陳列は、フックバーに商品をかけて展開する陳列方法です。小型の文具等で使われることが多く、陳列されている商品の在庫量がわかりやすいというメリットがあります。したがって、aが適切な記述です。\n以上より、①－b、②－c、③－aが適切な組み合わせですので選択肢エが正解となります。"
  },
  {
    id: 7,
    title: "ビジュアル・マーチャンダイジング（VMD）",
    source: "令和3年 第29問",
    question: "ビジュアル・マーチャンダイジング（VMD）における3つの表現区分①〜③とその役割に関する記述a〜cの組み合わせとして、最も適切なものを下記の解答群から選べ。\n\n① IP（Item Presentation）\n② PP（Point of Sales Presentation）\n③ VP（Visual Presentation）\n\na ショーウインドーやステージなど特定の場所で行い、客の目をひきつけ誘導する。\nb 商品の特徴や機能を明示し、選択のヒントを示して客の判断を手助けする。\nc 単品商品を分類・整理し、見やすく、分かりやすく、選びやすく陳列し、購買欲求を高める。",
    choices: [
      "1. ア ①とa",
      "2. イ ①とc",
      "3. ウ ②とa",
      "4. エ ③とb",
      "5. オ ③とc"
    ],
    answer: 1,
    explanation: "解答：イ\nビジュアル・マーチャンダイジング（VMD）に関する出題です。\nそれぞれの意味を知らなかった場合でも、問題文に英語表記がありますので、ある程度推測して正解したい問題です。\nビジュアル・マーチャンダイジング（VMD）とは、視覚的にマーチャンダイジングをする手法です。品揃えや陳列だけでなく、什器やPOPなどを含めて統一したコンセプトのもとに、売場を視覚的に訴求することで顧客に商品価値をわかりやすく提案してきます。例えば、ハロウィンやクリスマスなどのシーズンに、そのイベントをテーマとして関連商品を集めて陳列したり、ディスプレイや店内装飾を統一して展開している例が見られますが、これがVMDの一例です。\nでは、選択肢を見ていきましょう。\n① IP（Item Presentation）とは、売場の大半を占める商品陳列の場です。商品のサイズ・色・デザインなどをわかりやすく分類し、選びやすく、買いやすく陳列して購買意欲を高めます。\n② PP（Point of Sales Presentation）とは、商品の特徴や機能を視覚的に表現し、型や色、コーディネートなどのバリエーションを顧客に提示し、商品の魅力を強調して見せる場です。\n③ VP（Visual Presentation）とは、お店のコンセプトやシーズンテーマに基づくメッセージなど、常に新鮮な情報を視覚的に発信し、顧客を店内へ誘導するための重要な演出の場です。\nよって、①とc、②とb、③とaが正しい組み合わせで、選択肢イが正解です。\nVMDの出題頻度は高くありませんので、学習に時間をかける必要はありませんが、実務では売上に直結するため非常によく使われます。今後も基本的な知識は出題される可能性がありますので、VMDの考え方は覚えておきましょう。"
  },
  {
    id: 8,
    title: "インストア・マーチャンダイジング",
    source: "平成26年 第31問",
    question: "インストアマーチャンダイジングに関する次の文中の空欄ＡとＢに入る語句の組み合わせとして、最も適切なものを下記の解答群から選べ。\n\n客単価を上げるためには、インストアマーチャンダイジングを実践することが有効である。たとえば、Ａためにはマグネットポイントの配置を工夫することが重要である。また、棚の前に立ち寄った客の視認率を上げるためにはＢことが重要である。",
    choices: [
      "1. Ａ：買上率を高める　Ｂ：ＣＲＭを実施する",
      "2. Ａ：買上率を高める　Ｂ：プラノグラムを工夫する",
      "3. Ａ：客の動線長を伸ばす　Ｂ：ＣＲＭを実施する",
      "4. Ａ：客の動線長を伸ばす　Ｂ：プラノグラムを工夫する"
    ],
    answer: 3,
    explanation: "解答：エ\nインストアマーチャンダイジングに関する出題です。基本的な知識が穴埋めで問われており、取り組みやすい問題となっています。\nインストアマーチャンダイジングは、小売店内で顧客への販売を促進するための科学的手法です。簡単に言えば、1人あたりの顧客の売上である客単価を増やすための手法を体系化したものです。\n客単価は分解すると、次のようになります。\n\n客単価 ＝ 動線長Ｘ立寄率Ｘ視認率Ｘ買上率Ｘ買上個数Ｘ商品単価\n\nでは、設問文を確認していきましょう。\n最初の空欄Ａに続く文章では、「マグネットポイントの配置を工夫する」とあります。マグネットポイントとは、目を引く商品を店奥に配置し、来店客の回遊性を高めて客動線を伸ばすための売場を指します。よって、空欄Ａは「買上率」ではなく、「客動線」に関する文章が適切です。\n続いて、空欄Ｂを確認してみましょう。「棚の前に立ち寄った客の視認率を上げる」とあります。CRMは、CustomerRelationshipManagementの略で、顧客関係管理のことです。顧客との関係を深めることで、顧客ロイヤルティを高め、収益を拡大しようとするマーケティング手法です。視認率を上げる事とは関係がありません。一方、プラノグラムは棚割計画のことです。棚のどの位置に、どの商品を、どれくらいのフェイス数で陳列するかを決める計画を指します。視認率に大きく影響しますので、空欄Ｂは「プラノグラムの工夫」が適切です。\nよって、選択肢エが正解となります。"
  },
  {
    id: 9,
    title: "インストア・プロモーション",
    source: "平成24年 第28問",
    question: "インストア・プロモーション（ISP）には価格主導型ISPと非価格主導型ISPがある。価格主導型ISPとして最も適切なものの組み合わせを下記の解答群から選べ。\n\na クロスマーチャンダイジング\nb サンプリング\nc 増量パック\nd バンドル販売",
    choices: [
      "1. aとc",
      "2. aとd",
      "3. bとc",
      "4. bとd",
      "5. cとd"
    ],
    answer: 4,
    explanation: "解答：オ\nインストア・プロモーションに関する出題です。\nインストア・プロモーションの種類と代表的な方法を押さえていれば正解できる問題です。\nまず、インストア・プロモーションについて簡単に復習しておきましょう。\n\n【インストア・プロモーション】\nインストア・プロモーションは、小売店内で行う積極的な販売促進活動です。インストア・プロモーションには、価格主導型と、非価格主導型の活動があります。価格主導型の活動には、特売や値引き、ポイントカードやクーポンなどがあります。非価格主導型の活動には、デモ販売やPOPなどがあります。本問では、価格主導型のインストア・プロモーションについて問われています。\n\nここまで押さえた上で選択肢を見ていきましょう。\n選択肢aについて、クロスマーチャンダイジングは、関連商品をまとめて陳列･演出することで、買上個数を増やす活動です。関連購買を促進することで、1人あたりの買上個数を増やすことを目的としています。このように、クロスマーチャンダイジングは非価格主導型のインストア・プロモーションです。よって、選択肢aは不適切です。\n選択肢bについて、サンプリングは、商品の見本を無料で消費者に提供することです。消費者はサンプリングの提供を受けることで、商品の存在を知ったり、商品の購入をすることがあります。このように、サンプリングは非価格主導型のインストア・プロモーションです。\nよって、選択肢bは不適切です。\n選択肢cについて、増量パックは、価格はそのままで商品の容量を増やすことです。通常は期間限定で行われます。消費者に割安感を訴求して、購入を促します。このように、増量パックは価格主導型のインストア・プロモーションです。よって選択肢cは適切です。\n選択肢dについて、バンドル販売は、商品をまとめて販売し、その場合に商品単価を引き下げることです。たとえば、１個300円の商品を、４個セットで1000円で販売する方法です。これによって割安感を演出し、消費者に購入を促します。このように、バンドル販売は価格主導型のインストア・プロモーションです。よって選択肢dは適切です。\nこれらより、選択肢cとdが適切であることが分かります。よって、解答群オが正解です。\nインストア・プロモーションでは、価格主導型と、非価格主導型の活動について区別できるようにしておきましょう。"
  },
  {
    id: 10,
    title: "棚割（プラノグラム）",
    source: "平成24年 第31問",
    question: "棚割（プラノグラム）の目的に関する記述として、最も適切なものはどれか。",
    choices: [
      "1. 棚内のゾーニングの工夫によって客動線を長くすることができる。",
      "2. バーティカル陳列によって同じグループ内の商品比較がしやすい売場をつくることができる。",
      "3. フェイシングの工夫によって売上高や商品回転率を上げることができる。",
      "4. ホリゾンタル陳列によって商品グループ間の比較がしやすい売場をつくることができる。"
    ],
    answer: 2,
    explanation: "解答：ウ\n棚割（プラノグラム）に関する出題です。\n棚割（プラノグラム）とは、棚の中の陳列位置やフェイス数を決めることです。\n陳列方法などの特徴を問われており、やや難易度が高い問題です。\nそれでは選択肢を見ていきましょう。\n選択肢アについて、客動線とは、買い物客が店内をどのように見て回るかということです。客動線が長くなるほど、たくさんの商品を見てもらうことができます。ゾーニングとは、売場で商品群ごとの配置領域を区画することです。商品群をどの位置に、どのくらいのスペースをとり、どのように配置するかということです。一般的に、ゾーニングを工夫することで、客動線を長くすることができます。ただし、選択肢アでは、「棚内のゾーニング」としています。どの棚にどの商品群を置くかということによって客動線を長くすることはできますが、１つ棚の中で商品群の配置を変えても客動線は長くなるとは考えられません。よって、選択肢アは不適切です。\n選択肢イについて、バーティカル陳列とは、縦割り陳列とも呼ばれ、同じグループの商品を縦に並べる方法です。顧客が、買い物をするときは、横方向に売場を歩いていきます。\nここで、欲しい種類の商品があると立ち止まり、サイズや色などの細かいアイテムを探します。このとき、縦割り陳列になっていると、顧客は立ち止まったまま縦にアイテムを探すことができるため便利です。ただし、同じグループの商品を比較する場合は、上下を見て比べたり、下の方の商品はしゃがんで見る必要もあります。この場合は、横割り陳列（ホリゾンタル陳列）の方が便利です。よって、選択肢イは不適切です。\n選択肢ウについて、フェイシングとは、売場に陳列する商品と、その商品のフェイス数を決定することをいいます。フェイスとは、商品の顔のことであり、フェイス数は、顧客の目に触れる商品の数のことです。ある商品のフェイス数が多いほど、顧客の目に触れる機会が増えるため、売上は増加します。一方、裏の方に隠れている商品は、顧客の目に触れることがないため、陳列量が多くても売れません。このように、フェイシングによって、売上や商品回転率は変わります。よって選択肢ウは適切であり、これが正解です。\n選択肢エについて、ホリゾンタル陳列とは、横割り陳列とも呼ばれ、同じグループの商品を横に並べる方法です。そのため、同じグループの商品を比較しやすい売り場となります。一方で、他のグループ間の比較をしようとすると、上下を見て比べたり、下の方の商品はしゃがんで見たりする必要があります。この場合は、縦割り陳列の方が便利です。よって選択肢エは不適切です。"
  },
  {
    id: 11,
    title: "販売促進",
    source: "平成28年 第32問",
    question: "小売業の販売促進の方法と主な目的に関する記述として、最も適切なものはどれか。",
    choices: [
      "1. 売り場におけるクロスマーチャンダイジングは、関連する商品同士を並べて陳列することで、計画購買を促進する狙いがある。",
      "2. エンドなどにおける大量陳列は、商品の露出を高めて買い忘れを防止するなど、計画購買を促進する狙いがある。",
      "3. 会計時に発行するレシートクーポンは、次回来店時の計画購買を促進する狙いがある。",
      "4. 試食販売などのデモンストレーション販売は、リピート購買を促進する狙いがある。",
      "5. 新聞折り込みチラシは、お買い得商品の情報を伝えて、想起購買を促進する狙いがある。"
    ],
    answer: 2,
    explanation: "解答：ウ\n小売店の販売促進に関する問題です。\n販売促進の概要を覚えていた人は、正解できる問題です。\n販売促進の方法にはいろいろな種類があります。ここでは、インストア・マーチャンダイジングと陳列方法を簡単に復習しましょう。\n\n【「インストア・マーチャンダイジング」と「陳列方法」】\nインストアマーチャンダイジング（ISM）による方法としては、インストア・プロモーション（ISP）とスペースマネジメントがあります。インストア・プロモーションには、価格主導型と、非価格主導型の活動があります。価格主導型の活動には、特売や値引き、ポイントカードやクーポンなどがあります。非価格主導型の活動には、デモ販売やサンプリング、クロスマーチャンダイジングなどがあります。\n陳列は、量感陳列と展示陳列に大別できます。量感陳列は、商品の豊富さにより最寄品の購買意欲を高める陳列方法です。展示陳列は、店舗の重要商品や買回品のテーマを設定してコーディネートなどを提案する陳列方法です。\n\nここまで押さえた上で、選択肢を見てみましょう。\n選択肢アについて、クロスマーチャンダイジングは関連商品をまとめて陳列･演出することで、買上個数を増やす活動です。クロスマーチャンダイジングは関連購買により「非計画購買」を促進します。よって、選択肢アは不適切です。\n選択肢イについて、大量陳列は商品の豊富さを出して購買意欲を高めることにより「非計画購買」を促進します。よって、選択肢イは不適切です。\n選択肢ウについて、レシートクーポンは次回の来店時にクーポンの商品を買うという計画購買を促進できます。よって、選択肢ウは適切です\n選択肢エについて、デモンストレーション販売は主に新商品販売に際して使われる手法であり、リピート販売の促進には向きません。よって、選択肢エは不適切です。\n選択肢オについて、新聞折り込みチラシは来店者にお買い得商品を記憶してもらうことにより計画購買を促進します。店頭で商品の必要性を思い出す想起購買を促すものではありませんので、選択肢オは不適切です。"
  },
  {
    id: 12,
    title: "売価値入率",
    source: "令和2年 第30問",
    question: "下表の5種類の商品を仕入れて販売することを計画している。\n商品A〜Eの中で、同じ売価に設定される商品が2つある。この2つの商品について、仕入れた数量をすべて設定した売価で販売したときの粗利益額の合計として、最も適切なものを下記の解答群から選べ。なお、それぞれの商品の売価は、売価値入率により設定されるものとする。",
    table: {
      headers: ["", "仕入単価", "仕入数量", "売価値入率"],
      rows: [
        ["商品A", "480円", "50個", "20%"],
        ["商品B", "300円", "60個", "40%"],
        ["商品C", "300円", "100個", "50%"],
        ["商品D", "800円", "30個", "20%"],
        ["商品E", "600円", "40個", "50%"]
      ]
    },
    choices: [
      "1. ア 12,000円",
      "2. イ 36,000円",
      "3. ウ 42,000円",
      "4. エ 60,000円",
      "5. オ 90,000円"
    ],
    answer: 1,
    explanation: "解答：イ\n売価値入率による売価設定と粗利益額に関する問題です。\n売価は仕入単価と売価値入率から以下の式で求められます。\n売価＝仕入単価/（1－売価値入率）\n各商品の売価値入率と粗利益額は次のようになります。\n商品A：売価＝480/（1-0.2）＝600　粗利益額＝（600－480）×50＝6000\n商品B：売価＝300/（1-0.4）＝500　粗利益額＝（500－300）×60＝12000\n商品C：売価＝300/（1-0.5）＝600　粗利益額＝（600－300）×100＝30000\n商品D：売価＝800/（1-0.2）＝1000　粗利益額＝（1000－800）×30＝6000\n商品E：売価＝600/（1-0.5）＝1200　粗利益額＝（1200－600）×40＝24000\n以上より、商品Aと商品Cの売価が同じですので、\n6000＋30000＝36000が合計額となり、選択肢イが正解となります。"
  },
  {
    id: 13,
    title: "GMROI",
    source: "平成24年 第26問",
    question: "ある小売店では、年間売上高2,900万円、期首在庫高（原価）800万円、期中仕入高1,600万円、期末在庫高（原価）700万円であった。この店のGMROIとして最も適切なものはどれか。",
    choices: [
      "1. 120%",
      "2. 130%",
      "3. 160%",
      "4. 180%",
      "5. 200%"
    ],
    answer: 2,
    explanation: "解答：ウ\nGMROIに関する出題です。\nGMROIの計算式を押さえていれば正解できる問題です。\nまず、GMROIについて簡単に復習しておきましょう。\n\n【GMROI】\nGMROIは、商品投下資本粗利益率のことであり、投下した商品に対する粗利益の割合を表します。GMROIを求める式は、次のとおりです。\nGMROI＝粗利益／平均在庫高（原価）\n粗利益は売上総利益と同じです。平均在庫高（原価）は、期首の商品の在庫高と期末の商品の在庫高を平均したものになります。\n\nでは、本問の数値を入れてGMROIを計算します。\nまず、平均在庫高を求めます。\n平均在庫高（原価）＝（期首在庫高（原価）＋期末在庫高（原価））÷2＝（800＋700）÷2＝750（百万円）\n次に、粗利益を求めます。売上高は与えられていますので、売上原価を求める必要があります。\n売上原価＝期首在庫高（原価）＋期中仕入高－期末在庫高（原価）＝800＋1,600－700＝1,700（百万円）\n粗利益＝売上高－売上原価＝2,900－1,700＝1,200（百万円）\nこれらの数値を使うと、GMROIが計算できます。\nGMROI＝粗利益÷平均在庫高（原価）＝1,200÷750＝1.6\nつまり、GMROIは160％となります。\nよって、選択肢ウが正解です。\nGMROIは確実に計算できるようにしておきましょう。"
  },
  {
    id: 14,
    title: "交差比率（交差主義比率）",
    source: "平成27年 第32問",
    question: "商品予算計画に関する以下の用語とその算出方法の組み合わせとして、最も適切なものを下記の解答群から選べ。\n\n＜用語＞\n① GMROI\n② 交差主義比率\n③ 商品回転率\n\n＜算出方法＞\na 粗利益÷平均商品在庫高（原価）\nb 粗利益率×商品回転率\nc 年間売上高÷平均商品在庫高（売価）",
    choices: [
      "1. ①：a　②：b　③：c",
      "2. ①：a　②：c　③：b",
      "3. ①：b　②：a　③：c",
      "4. ①：b　②：c　③：a",
      "5. ①：c　②：a　③：b"
    ],
    answer: 0,
    explanation: "解答：ア\n商品予算計画で用いられる指標と、その算出方法に関する問題です。\n指標の意味を理解していれば正解できる問題です。\nそれでは選択肢の用語と算出方法を見ていきましょう。\n①GMROI（商品投下資本粗利益率：Gross Margin Return On Inventory Investment）\nGMROIは、投下した商品に対する粗利益の割合を表します。仕入れの側面から、投資の効率性を見る指標です。GMROIが高いと、投下した商品から効率的に粗利益を得ていることになります。\nGMROI ＝ 粗利益÷平均商品在庫高（原価）\nよって、計算式はaが適切です。\n②交差主義比率\n交差主義比率は、販売の側面から商品が効率的に粗利益を稼いでいるかを見る指標です。GMROIと同様に、投下した商品に対する粗利益の割合を表しますが、GMROIが商品在庫高を原価基準で計算するのに対して、交差主義比率では売価基準で計算します。\n交差主義比率 ＝ 粗利益÷平均商品在庫高（売価）\n＝ 粗利益売上高 × 売上高平均商品在庫高\n＝ 粗利益率×商品回転率\nよって、計算式はbが適切です。\n③商品回転率\n商品回転率とは、商品が一定期間にどれだけ回転（仕入れ→販売）したかを表すもので、販売の効率性を見る指標です。\n商品回転率の求め方には、売価ベース、原価ベース、数量ベースの３つ方法がありますが、本問題では売価ベースの算出方法が示されています。\n商品回転率（売価ベース） ＝ 売上高÷平均商品在庫高（売価）\n商品回転率（原価ベース） ＝ 売上原価÷平均商品在庫高（原価）\n商品回転率（数量ベース） ＝ 売上数量÷平均商品在庫高（数量）\nよって、計算式はcが適切です。\n以上より、①：a ②：b ③：c となり、選択肢アが正解です。"
  },
  {
    id: 15,
    title: "在庫管理",
    source: "令和3年 第32問",
    question: "最寄品を主に取り扱う小売店舗における在庫管理に関する記述として、最も適切なものはどれか。",
    choices: [
      "1. 1回当たりの発注量が一定の場合、サイクル在庫は一定になる。",
      "2. 欠品を防止するために設定する安全在庫量は、需要量の標準偏差が2倍になると半分になる。",
      "3. 定期発注方式を採用した場合、販売量を一定とすると、1回当たりの発注量は発注から納品までの調達期間が長くなるほど少なくなる。",
      "4. 定量発注方式を採用した場合、発注量の決定には発注間隔があらかじめ決定されている必要がある。",
      "5. 発注点と補充点を設定して発注する方式を採用した場合、1回当たりの発注量は販売量の増減にかかわらず一定になる。"
    ],
    answer: 0,
    explanation: "解答：ア\n最寄品の在庫管理に関する出題です。在庫量を適正に維持するための発注方式について基本的な知識が問われています。様々な発注方式の細かな点まで理解している必要があり、やや難易度の高い問題です。\nでは、選択肢を見ていきましょう。\n選択肢アは適切な記述です。サイクル在庫とは、発注から次の発注までの期間に売れる量の半分を指します。言い換えると、1回の発注量の半分の量です。例えば、1週間に1回発注するとします。1週間で売れる量が20個（発注量も20個）の場合、サイクル在庫は10個です。よって、1回あたりの発注量が一定であればサイクル在庫も一定となります。\n選択肢イは不適切な記述です。安全在庫は、急に売れたり、まとめ買いがあったり、あるいはメーカー側の欠品で入荷しなくなった場合に備えて、店舗側である程度多めに持っておく在庫のことです。安全在庫量は多過ぎると過剰在庫になり、少な過ぎると欠品を起こしますので、適正量を設定する必要があります。正確に設定する場合は次の式で求めます。\n安全在庫 ＝ 安全在庫係数 × 需要量の標準偏差 × √ 調達リードタイム\n上式より、需要量の標準偏差が2倍になれば、安全在庫も2倍になります。但し、本問は計算式を覚えていなくても解答することができます。選択肢には「需要量の標準偏差が2倍になる」と難しく書いてありますが、要するに「バラつきが2倍になる」ということです。売れ行きの振れ幅が2倍になるわけですから、安全在庫の量は半分にはならないことがイメージできると思います。\n選択肢ウは不適切な記述です。定期発注方式は、一定期間ごとにその都度、発注量を決めて発注する方法です。販売量が一定の場合、発注から納品までの調達期間が長くなると、1回当たりの発注量は多くなります。例えば、毎日10個ずつ売れていたとします。発注してから商品が届くまでの期間が長くなればなるほど、その日数分の在庫を持っておく必要がありますので、1回の発注量も必然的に多くなります。\n選択肢エは不適切な記述です。定量発注方式は、在庫量が一定の水準になったときに一定量を発注する方法です。発注量は経済的発注量で決定し、発注間隔は需要の変動に応じて基本的に毎回異なります。発注間隔をあらかじめ決めておく必要があるのは定期発注方式です。\n選択肢オは不適切な記述です。発注点と補充点を決めて発注する方法を「発注点・補充点方式」といいます。在庫量が発注点を下回ったら、補充点まで発注します。このとき、発注量は現時点の在庫量を引いた数となります。例えば、補充点を10個、発注点を4個に設定したとします。在庫が4個を下回ったら、在庫が10個になるように発注しましょうという意味ですので、発注量は10個－4個＝6個となります。ところが、残りの在庫がいつも4個とは限りません。一度にたくさん売れて1個になっているかもしれません。この場合は9個発注することになります。よって、発注点・補充点方式の場合、1回当たりの発注量は一定ではなく、販売量の増減によって変動します。\n在庫管理は頻出テーマです。それぞれ発注方式の特徴は生産管理でも問われますので、しっかりと理解しておきましょう。"
  },
  {
    id: 16,
    title: "小売店舗の在庫管理",
    source: "令和4年 第31問",
    question: "小売店舗における在庫管理に関する以下の文章の空欄Ａ〜Ｃに入る用語の組み合わせとして、最も適切なものを下記の解答群から選べ。\nある商品について、当該店舗の発注担当者は在庫量を毎日確認し、需要予測に基づいて必要と見込まれる数量を毎日発注している。ここで行われている発注方法を一般的に Ａ という。\n適正在庫を維持するためには、発注量を決めるための需要予測量を計算する期間を Ｂ にする必要がある。また、毎日計算する発注量は、需要予測量と安全在庫の合計数量から発注時の Ｃ を減算して求める必要がある。",
    choices: [
      "1. Ａ：定期発注方式　Ｂ：調達期間　Ｃ：手持在庫量",
      "2. Ａ：定期発注方式　Ｂ：調達期間と発注間隔の合計期間　Ｃ：手持在庫量",
      "3. Ａ：定期発注方式　Ｂ：調達期間と発注間隔の合計期間　Ｃ：有効在庫量",
      "4. Ａ：定量発注方式　Ｂ：調達期間　Ｃ：有効在庫量",
      "5. Ａ：定量発注方式　Ｂ：調達期間と発注間隔の合計期間　Ｃ：手持在庫量"
    ],
    answer: 2,
    explanation: "解答：ウ\n小売店舗の在庫管理に関する出題です。適正在庫を維持するための需要予測や発注方式の基本的な知識が問われています。過去の本試験で何度も出題されているテーマです。\nでは、本問を見ていきましょう。\n空欄 A：定期発注方式とは、一定期間ごとに毎回、需要予測や在庫量を考慮して発注量を決めて発注する方式です。一方、定量発注方式とは、在庫量が一定の水準になったときに一定量を発注する方式です。設問文では、「発注担当者が在庫量を毎日確認し、需要予測に基づいて必要と見込まれる数量を毎日発注している」とありますので、「定期発注方式」が適切です。\n空欄 B：定期発注方式において、需要予測量を計算する期間は、発注サイクルと調達リードタイムをあわせた期間になります。したがって、「調達期間と発注間隔の合計期間」が適切です。\n空欄 C：定期発注方式で発注量を求める公式は、次の通りです。\n発注量 ＝ 在庫調整期間の需要予測量 － 現在の在庫量 － 発注残 ＋ 安全在庫\n現在の在庫量を手持在庫量といい、現在の在庫量に発注残を加えた量を有効在庫量といいます。したがって、発注時に計算する発注量は、需要予測量と安全在庫の合計数量から発注時の「有効在庫量」を引いた量となります。\n以上より、空欄に入る語句は、A ：定期発注方式、B ：調達期間と発注間隔の合計期間、C ：有効在庫量 となりますので、選択肢ウが正解です。\n在庫管理における発注方式は出題頻度の高いテーマです。生産管理の分野でもよく出題されますので、合格する上で確実に抑えておきたい知識です。特に定量発注方式と定期発注方式の違いはしっかり理解を深めておきましょう。"
  },
  {
    id: 17,
    title: "相乗積1",
    source: "平成25年 第31問",
    question: "小売業では、部門別などのグループごとに売上や粗利益などを管理する。そのひとつの指標として相乗積(利益相乗積係数)がある。小売店舗における相乗積に関する記述として、最も不適切なものはどれか。",
    choices: [
      "1. ある部門の相乗積は、店舗全体の粗利益高に占める当該部門の粗利益高の割合を示す。",
      "2. ある部門の相乗積は、当該部門の売上高構成比と粗利益率の積である。",
      "3. すべての部門の相乗積の和は、店舗全体の粗利益率に等しくなる。",
      "4. 部門ごとの相乗積を比較すると、最も利益を生み出している部門が分かる。"
    ],
    answer: 0,
    explanation: "解答：ア\n相乗積に関する出題です。\n相乗積に関する基本的な内容を覚えていれば、正解できる問題です。\nまず、相乗積について簡単に復習しておきましょう。\n\n【相乗積】\n相乗積とは、複数の部門を有する小売店において、各部門の収益貢献度を示す指標で、次のような計算式で表されます。\n相乗積 ＝ 各部門の売上高構成比 × 各部門の粗利益率\nまた、相乗積には、次のような性質があります。\n・各部門の相乗積の合計は、店舗全体の粗利益率と等しくなる。\n・各部門の相乗積は、店舗全体の売上高に対する、当該部門の粗利益高の割合を示す。\n\nそれでは選択肢を見ていきましょう。\n選択肢アについて、相乗積は、「店舗全体の粗利益高」ではなく、「店舗全体の売上高」に占める、当該部門の粗利益高の割合を示します。よって、選択肢アは不適切で、正正解です。なお、相乗積を求める式を分解すると以下のようになり、計算式からも相乗積が店舗全体の売上高に占める当該部門の粗利高の割合を示していることを導くことができます。\n相乗積＝各部門の売上高構成比×各部門の粗利益率\n＝ 部門の売上高店舗全体の売上高 × 部門の粗利益高部門の売上高\n＝ 部門の粗利益高店舗全体の売上高\n選択肢イについて、ある部門の相乗積は、当該部門の売上高構成比と粗利益率を掛けたものとなります。よって、選択肢イは適切です。\n選択肢ウについて、すべての部門の相乗積の合計は、全部門の粗利益高の合計を店舗全体の売上高で割ったものとなりますので、店舗全体の粗利益率に等しくなります。よって、選択肢ウは適切です。\n選択肢エについて、部門ごとの相乗積は、店舗全体の売上高に占める、当該部門の粗利益高の割合を示します。つまり相乗積が一番大きな部門が、一番利益を生み出している部門です。したがって、相乗積を比較することで、店舗の中で最も利益を生み出している部門が分かります。よって、選択肢エは適切です。\n相乗積に関する問題は、近年頻繁に出題されています。相乗積の計算方法と、その値が持つ意味について、しっかり理解しておきましょう。"
  },
  {
    id: 18,
    title: "相乗積2",
    source: "令和元年 第28問",
    question: "店舗Ｘのある月の営業実績は下表のとおりである。この表から計算される相乗積に関する記述として、最も適切なものを下記の解答群から選べ。",
    table: {
      headers: ["商品カテゴリー", "販売金額(万円)", "販売金額構成比(%)", "粗利益率(%)"],
      rows: [
        ["カテゴリーA", "500", "25", "20"],
        ["カテゴリーB", "300", "15", "20"],
        ["カテゴリーC", "200", "10", "30"],
        ["カテゴリーD", "600", "30", "40"],
        ["カテゴリーE", "400", "20", "50"],
        ["合計", "2,000", "100", ""]
      ]
    },
    choices: [
      "1. ア カテゴリーＡ〜Ｅの合計の販売金額が2倍になると、各カテゴリーの相乗積の合計も2倍になる。",
      "2. イ カテゴリーＡの相乗積は50%である。",
      "3. ウ カテゴリーＡの販売金額も粗利益率も変わらず、他のカテゴリーの販売金額が増加すると、カテゴリーＡの相乗積は減少する。",
      "4. エ カテゴリーＢはカテゴリーＣよりも相乗積が大きい。",
      "5. オ 相乗積が最も大きいカテゴリーは、カテゴリーＥである。"
    ],
    answer: 2,
    explanation: "解答：ウ\n本問は、相乗積について問われています。基本的知識が問われており難易度は高くありません。\nでは、相乗積について復習しましょう。\n各カテゴリーの収益貢献度を示す指標である相乗積は、次の式で求められます。\n相乗積 ＝ 各カテゴリーの粗利益率 × 各カテゴリーの販売金額構成比\nでは、選択肢を見ていきましょう。\n選択肢アですが、各カテゴリーの販売金額が2倍になっても各カテゴリーの相乗積の合計が2倍にはならず、売上高構成比は変化しません。従って、不適切な記述です。\n選択肢イですが、カテゴリーAの相乗積は、カテゴリーAの粗利益率20％×カテゴリーAの販売金額構成比25％＝相乗積5％となりますので、50％とする記述は不適切です。\n選択肢ウですが、カテゴリーAの販売金額も粗利益率も変わらず、他のカテゴリーの販売金額が増加すると、カテゴリーAの売上高構成比が低下しますので、カテゴリーAの相乗積は減少します。従って、適切な記述です。\n選択肢エですが、カテゴリーBの相乗積は、粗利益率20％×販売金額構成比15％＝3％となります。カテゴリーCの相乗積は、粗利益率30％×販売金額構成比10％＝3％となり、双方とも相乗積は3％で同じです。従って、不適切な記述です。\n選択肢オですが、カテゴリーEの相乗積は粗利益率50％×販売金額構成比20％＝10％となります。一方、カテゴリーDの相乗積は粗利益率40％×販売金額構成比30％＝12％となります。上記のように、カテゴリーAの相乗積は5％、カテゴリーBは3％、カテゴリーCは3％です。従って、相乗積が最も大きいカテゴリーはEではなく、Dになりますので、不適切な記述です。"
  }
];

export default function App() {
  const [screen, setScreen] = useState("start");
  const screenRef = useRef(screen);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState("");
  const [userData, setUserData] = useState({});
  const [currentMode, setCurrentMode] = useState("all");
  const [quizList, setQuizList] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedChoice, setSelectedChoice] = useState(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [showResumeDialog, setShowResumeDialog] = useState(false);
  const [resumeData, setResumeData] = useState({ index: 0, mode: "all" });

  useEffect(() => {
    screenRef.current = screen;
  }, [screen]);

  useEffect(() => {
    if (!auth) {
      setLoading(false);
      return;
    }
    const prepareAuth = async () => {
      try {
        await signInAnonymously(auth);
      } catch (err) {
        console.error("Auth error", err);
      } finally {
        setLoading(false);
      }
    };
    prepareAuth();
  }, []);

  const handleStart = async (e) => {
    e.preventDefault();
    if (!userId.trim() || !db) return;
    setLoading(true);
    try {
      const docRef = doc(db, APP_ID, userId);
      const snap = await getDoc(docRef);
      if (snap.exists()) {
        const data = snap.data();
        setUserData(data);
        if (data.progressIndex > 0) {
          setResumeData({ index: data.progressIndex || 0, mode: data.progressMode || "all" });
          setShowResumeDialog(true);
        }
      } else {
        await setDoc(docRef, { history: {}, reviewFlag: {}, progressIndex: 0, progressMode: "all" });
        setUserData({ history: {}, reviewFlag: {}, progressIndex: 0, progressMode: "all" });
      }
      setScreen("dashboard");
    } catch (err) {
      console.error(err);
      setUserData({ history: {}, reviewFlag: {}, progressIndex: 0, progressMode: "all" });
      setScreen("dashboard");
    }
    setLoading(false);
  };

  useEffect(() => {
    if (!db || !userId) return;
    const unsub = onSnapshot(doc(db, APP_ID, userId), (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        setUserData(data);
        if (
          data.progressIndex > 0 &&
          screenRef.current === "dashboard" &&
          !showResumeDialog
        ) {
          // Safeguard to prevent UI popups during active quiz
          setResumeData({ index: data.progressIndex, mode: data.progressMode });
          setShowResumeDialog(true);
        }
      }
    });
    return () => unsub();
  }, [userId, db]);

  const saveProgress = async (idx, mode) => {
    if (!db || !userId) return;
    try {
      console.log(`Saving progress -> index: ${idx}, mode: ${mode}`);
      await setDoc(doc(db, APP_ID, userId), { progressIndex: idx, progressMode: mode }, { merge: true });
    } catch (e) {
      console.error(e);
    }
  };

  const saveHistory = async (qId, isCorrectResp) => {
    if (!db || !userId) return;
    try {
      console.log(`Saving history -> qId: ${qId}, correct: ${isCorrectResp}`);
      await setDoc(
        doc(db, APP_ID, userId),
        {
          history: {
            [qId]: { correct: isCorrectResp, timestamp: new Date().toISOString() }
          }
        },
        { merge: true }
      );
    } catch (e) {
      console.error(e);
    }
  };

  const toggleReview = async (qId, val) => {
    if (!db || !userId) return;
    try {
      await setDoc(
        doc(db, APP_ID, userId),
        { reviewFlag: { [qId]: val } },
        { merge: true }
      );
    } catch (e) {
      console.error(e);
    }
  };

  const startQuiz = (mode, startIndex = 0) => {
    let qList = [];
    if (mode === "all") qList = quizData;
    else if (mode === "wrong") {
      qList = quizData.filter(q => userData?.history?.[q.id]?.correct === false);
    } else if (mode === "review") {
      qList = quizData.filter(q => userData?.reviewFlag?.[q.id] === true);
    }
    
    if (qList.length === 0) {
      alert("該当する問題がありません！");
      return;
    }
    setCurrentMode(mode);
    setQuizList(qList);
    setCurrentIndex(startIndex);
    setScreen("quiz");
    setSelectedChoice(null);
    setShowExplanation(false);
    saveProgress(startIndex, mode);
  };

  const handleChoiceClick = (cIndex) => {
    if (showExplanation) return;
    const currentQ = quizList[currentIndex];
    const correct = cIndex === currentQ.answer;
    setSelectedChoice(cIndex);
    setShowExplanation(true);
    saveHistory(currentQ.id, correct);
  };

  const nextQuestion = () => {
    if (currentIndex + 1 < quizList.length) {
      const nextIdx = currentIndex + 1;
      setCurrentIndex(nextIdx);
      setSelectedChoice(null);
      setShowExplanation(false);
      saveProgress(nextIdx, currentMode);
    } else {
      console.log("Completed all quiz data in this mode.");
      saveProgress(0, "all");
      setScreen("dashboard");
    }
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#0F172A] text-white">
        <div className="flex flex-col items-center">
          <RefreshCw className="h-10 w-10 animate-spin text-indigo-400 mb-4" />
          <p className="text-lg font-medium tracking-wider text-slate-300">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0F172A] text-[#E2E8F0] font-sans selection:bg-indigo-500 selection:text-white">
      {screen === "start" && (
        <div className="flex min-h-screen flex-col items-center justify-center px-4">
          <div className="w-full max-w-md rounded-2xl bg-[#1E293B] p-8 shadow-2xl border border-slate-700/50">
            <div className="mb-8 flex justify-center">
              <div className="rounded-full bg-indigo-500/10 p-4">
                <BookOpen className="h-12 w-12 text-indigo-400" />
              </div>
            </div>
            <h1 className="mb-2 text-center text-2xl font-bold text-white tracking-tight">Focus Exam Builder</h1>
            <p className="mb-8 text-center text-sm text-slate-400">Past Exam Collections - Merchandising 3-8</p>
            <form onSubmit={handleStart} className="space-y-6">
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-300">合言葉 (User ID)</label>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <User className="h-5 w-5 text-slate-500" />
                  </div>
                  <input
                    type="text"
                    required
                    className="block w-full rounded-xl border border-slate-600 bg-slate-800/50 p-4 pl-10 text-white placeholder-slate-500 focus:border-indigo-400 focus:outline-none focus:ring-1 focus:ring-indigo-400 transition pb-3 pt-3"
                    placeholder="Enter your secret key..."
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                  />
                </div>
              </div>
              <button
                type="submit"
                className="flex w-full items-center justify-center space-x-2 rounded-xl bg-indigo-500 p-4 font-semibold text-white transition hover:bg-indigo-400 active:bg-indigo-600"
              >
                <span>ログイン / 登録</span>
                <ArrowRight className="h-5 w-5" />
              </button>
            </form>
          </div>
        </div>
      )}

      {screen === "dashboard" && (
        <div className="mx-auto max-w-4xl p-6">
          <div className="mb-8 flex items-center justify-between border-b border-slate-700 pb-6">
            <h2 className="text-2xl font-bold text-white flex items-center space-x-3">
              <Home className="h-6 w-6 text-indigo-400" />
              <span>ダッシュボード</span>
            </h2>
            <button onClick={() => setScreen("start")} className="text-sm text-slate-400 hover:text-slate-200 transition">
              ログアウト
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <button onClick={() => startQuiz("all")} className="group relative flex flex-col justify-between overflow-hidden rounded-2xl bg-[#1E293B] p-6 border border-slate-700/50 hover:border-indigo-400 hover:bg-slate-800 transition">
              <div className="mb-4 text-indigo-400"><BookOpen className="h-8 w-8" /></div>
              <h3 className="text-lg font-bold text-white mb-1">すべての問題</h3>
              <p className="text-sm text-slate-400">全18問を順番に出題します</p>
            </button>
            <button onClick={() => startQuiz("wrong")} className="group relative flex flex-col justify-between overflow-hidden rounded-2xl bg-[#1E293B] p-6 border border-slate-700/50 hover:border-rose-400 hover:bg-slate-800 transition">
              <div className="mb-4 text-rose-400"><X className="h-8 w-8" /></div>
              <h3 className="text-lg font-bold text-white mb-1">前回不正解のみ</h3>
              <p className="text-sm text-slate-400">間違えた問題を復習します</p>
            </button>
            <button onClick={() => startQuiz("review")} className="group relative flex flex-col justify-between overflow-hidden rounded-2xl bg-[#1E293B] p-6 border border-slate-700/50 hover:border-amber-400 hover:bg-slate-800 transition">
              <div className="mb-4 text-amber-400"><Check className="h-8 w-8" /></div>
              <h3 className="text-lg font-bold text-white mb-1">要復習の問題</h3>
              <p className="text-sm text-slate-400">チェックした問題のみ</p>
            </button>
          </div>

          <div className="rounded-2xl bg-[#1E293B] border border-slate-700/50 overflow-hidden">
            <div className="p-6 border-b border-slate-700/50 bg-slate-800/20 flex items-center space-x-2">
              <BarChart2 className="h-5 w-5 text-indigo-400" />
              <h3 className="text-lg font-bold text-white">学習履歴</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-slate-300">
                <thead className="bg-[#0F172A] text-xs uppercase text-slate-400 border-b border-slate-700">
                  <tr>
                    <th className="px-6 py-4 font-medium">問題</th>
                    <th className="px-6 py-4 font-medium">出題</th>
                    <th className="px-6 py-4 font-medium">結果</th>
                    <th className="px-6 py-4 font-medium">要復習</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700/50">
                  {quizData.map((q) => {
                    const isCorrect = userData?.history?.[q.id]?.correct;
                    const isReview = userData?.reviewFlag?.[q.id];
                    return (
                      <tr key={q.id} className="hover:bg-slate-800/50 transition">
                        <td className="px-6 py-4 whitespace-nowrap font-medium text-slate-200">{q.title}</td>
                        <td className="px-6 py-4 whitespace-nowrap"><span className="px-2 py-1 bg-slate-800 text-slate-300 rounded text-xs">{q.source}</span></td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {isCorrect === true ? (
                            <span className="flex items-center text-emerald-400 text-xs font-bold px-2 py-1 bg-emerald-400/10 rounded w-max"><Check className="w-3 h-3 mr-1"/> 正解</span>
                          ) : isCorrect === false ? (
                            <span className="flex items-center text-rose-400 text-xs font-bold px-2 py-1 bg-rose-400/10 rounded w-max"><X className="w-3 h-3 mr-1"/> 不正解</span>
                          ) : (
                            <span className="text-slate-500 text-xs">-</span>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {isReview ? <span className="w-2 h-2 rounded-full bg-amber-400 inline-block drop-shadow-[0_0_8px_rgba(251,191,36,0.5)]"></span> : <span className="text-slate-600">-</span>}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {showResumeDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0F172A]/80 backdrop-blur-sm p-4">
          <div className="w-full max-w-md rounded-2xl bg-[#1E293B] p-8 shadow-2xl border border-slate-700">
            <h3 className="text-xl font-bold text-white mb-4">途中再開</h3>
            <p className="text-slate-300 mb-8 leading-relaxed">
              前回は【{resumeData.mode === 'all' ? 'すべての問題' : resumeData.mode === 'wrong' ? '間違えた問題' : '要復習'}】モードの
              <span className="text-indigo-400 font-bold mx-1">{resumeData.index + 1}問目</span>
              まで進んでいます。続きから再開しますか？
            </p>
            <div className="flex flex-col space-y-3">
              <button
                onClick={() => {
                  setShowResumeDialog(false);
                  startQuiz(resumeData.mode, resumeData.index);
                }}
                className="w-full rounded-xl bg-indigo-500 p-3 font-semibold text-white hover:bg-indigo-400 transition"
              >
                続きから再開する
              </button>
              <button
                onClick={() => {
                  setShowResumeDialog(false);
                  saveProgress(0, "all");
                }}
                className="w-full rounded-xl bg-slate-700 p-3 font-semibold text-white hover:bg-slate-600 transition"
              >
                最初から始める (リセット)
              </button>
            </div>
          </div>
        </div>
      )}

      {screen === "quiz" && quizList[currentIndex] && (
        <div className="mx-auto max-w-3xl p-4 sm:p-6 pb-24">
          <button onClick={() => { saveProgress(currentIndex, currentMode); setScreen("dashboard"); }} className="mb-6 flex items-center text-sm font-medium text-slate-400 hover:text-slate-200 transition">
            <ChevronRight className="h-4 w-4 rotate-180 mr-1" /> ダッシュボードに戻る
          </button>
          
          <div className="mb-6 flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-widest text-indigo-400">Question {currentIndex + 1} / {quizList.length}</span>
            <span className="rounded bg-indigo-500/10 px-3 py-1 text-xs font-medium text-indigo-300 border border-indigo-500/20">{quizList[currentIndex].source}</span>
          </div>

          <div className="mb-8 rounded-2xl bg-[#1E293B] p-6 sm:p-8 shadow-xl border border-slate-700/50">
            <h2 className="text-xl font-bold leading-relaxed text-white mb-6">
              {quizList[currentIndex].title}
            </h2>
            <div className="text-base leading-loose text-slate-300 mb-6 whitespace-pre-wrap">
              {quizList[currentIndex].question}
            </div>

            {quizList[currentIndex].table && (
              <div className="mb-6 overflow-x-auto rounded-xl border border-slate-700/50 bg-slate-800/30">
                <table className="w-full text-left text-sm text-slate-300">
                  <thead className="bg-[#0F172A]">
                    <tr>
                      {quizList[currentIndex].table.headers.map((h, i) => (
                        <th key={i} className="px-6 py-4 font-medium border-b border-slate-700/50">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-700/50">
                    {quizList[currentIndex].table.rows.map((row, i) => (
                      <tr key={i}>
                        {row.map((cell, j) => (
                          <td key={j} className="px-6 py-4">{cell}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
                {quizList[currentIndex].table.note && (
                  <div className="px-6 py-3 text-xs text-slate-400 border-t border-slate-700/50 bg-slate-800/10">
                    {quizList[currentIndex].table.note}
                  </div>
                )}
              </div>
            )}

            <div className="space-y-3">
              {quizList[currentIndex].choices.map((choice, idx) => {
                const isSelected = selectedChoice === idx;
                const isCorrectAns = quizList[currentIndex].answer === idx;
                let btnClass = "w-full text-left p-4 rounded-xl border transition-all duration-200 text-sm sm:text-base leading-relaxed ";
                
                if (!showExplanation) {
                  btnClass += "border-slate-700 bg-slate-800/50 hover:bg-slate-700 hover:border-slate-500 cursor-pointer text-slate-300";
                } else {
                  if (isCorrectAns) {
                    btnClass += "bg-emerald-500/10 border-emerald-500/50 text-emerald-200 font-medium";
                  } else if (isSelected && !isCorrectAns) {
                    btnClass += "bg-rose-500/10 border-rose-500/50 text-rose-200";
                  } else {
                    btnClass += "border-slate-800 bg-[#0F172A] opacity-50 text-slate-500 cursor-default";
                  }
                }

                return (
                  <button
                    key={idx}
                    disabled={showExplanation}
                    onClick={() => handleChoiceClick(idx)}
                    className={btnClass}
                  >
                    <div className="flex items-start">
                      <div className="mt-1 mr-3 flex-shrink-0">
                        {showExplanation && isCorrectAns && <Check className="h-5 w-5 text-emerald-400" />}
                        {showExplanation && isSelected && !isCorrectAns && <X className="h-5 w-5 text-rose-400" />}
                        {!showExplanation && <div className="h-5 w-5 rounded-full border border-slate-600 bg-slate-700/50"></div>}
                        {showExplanation && !isSelected && !isCorrectAns && <div className="h-5 w-5"></div>}
                      </div>
                      <span>{choice}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {showExplanation && (
            <div className="animate-in slide-in-from-bottom-4 fade-in duration-300">
              <div className="rounded-2xl bg-indigo-500/5 p-6 sm:p-8 border border-indigo-500/20 mb-8 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-indigo-500"></div>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold flex items-center text-white">
                    <HelpCircle className="h-6 w-6 mr-2 text-indigo-400" />
                    解説
                  </h3>
                  <label className="flex items-center space-x-2 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={userData?.reviewFlag?.[quizList[currentIndex].id] || false}
                      onChange={(e) => toggleReview(quizList[currentIndex].id, e.target.checked)}
                      className="w-5 h-5 rounded border-slate-600 bg-slate-800 text-indigo-500 focus:ring-indigo-500 focus:ring-offset-slate-900"
                    />
                    <span className="text-sm font-medium text-slate-300 group-hover:text-white transition">要復習リストに追加</span>
                  </label>
                </div>
                <div className="text-slate-300 leading-loose whitespace-pre-wrap text-sm sm:text-base">
                  {quizList[currentIndex].explanation}
                </div>
              </div>
              <button
                onClick={nextQuestion}
                className="w-full rounded-xl bg-indigo-500 p-5 font-bold text-white shadow-lg hover:bg-indigo-400 hover:-translate-y-0.5 transition-all text-lg flex justify-center items-center"
              >
                {currentIndex + 1 < quizList.length ? (
                  <>次の問題へ <ArrowRight className="ml-2 h-5 w-5" /></>
                ) : (
                  <>完了 <Check className="ml-2 h-5 w-5" /></>
                )}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}