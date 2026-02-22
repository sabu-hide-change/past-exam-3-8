// npm install lucide-react recharts
import React, { useState, useEffect } from 'react';
import { Check, X, Home, ChevronRight, BookOpen, Clock, AlertCircle } from 'lucide-react';

// --- データ定義 (全18問収録・表や解説を完全網羅) ---
const quizData = [
  {
    id: 1,
    year: "平成30年 第36問",
    title: "２商品間の売上金額の相関係数",
    question: (
      <div>
        <p>商品Ａ〜Ｄの1年間における日別の売上金額について、2商品間の売上金額の相関係数を計算したところ、下表のようになった。これらの結果の解釈および相関係数の一般的な知識に関する記述として、最も適切なものを下記の解答群から選べ。 [cite: 3]</p>
        <table className="w-full border-collapse border border-gray-400 my-4 text-sm">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-400 p-2">組み合わせ</th>
              <th className="border border-gray-400 p-2">相関係数</th>
            </tr>
          </thead>
          <tbody>
            <tr><td className="border border-gray-400 p-2">商品Ａの売上金額 と 商品Ｂの売上金額</td><td className="border border-gray-400 p-2 text-center">0.5</td></tr>
            <tr><td className="border border-gray-400 p-2">商品Ｂの売上金額 と 商品Ｃの売上金額</td><td className="border border-gray-400 p-2 text-center">0.1</td></tr>
            <tr><td className="border border-gray-400 p-2">商品Ａの売上金額 と 商品Ｄの売上金額</td><td className="border border-gray-400 p-2 text-center">-0.7</td></tr>
          </tbody>
        </table>
        <p className="text-sm text-gray-600">＊ここで相関係数とはピアソンの積率相関係数である。 [cite: 5]</p>
      </div>
    ),
    options: [
      "売上金額の相関関係の強さを見ると、商品Ａと商品Ｂの関係より、商品Ａと商品Ｄの関係のほうが強い。 [cite: 7]",
      "商品Ａと商品Ｂの相関係数が0.5で、商品Ｂと商品Ｃの相関係数が0.1であるため、表には計算されていないが、商品Ａと商品Ｃの相関係数は0.4であると言える。 [cite: 8]",
      "商品Ａと商品Ｂの相関係数が0.5であるため、商品Ｂの平均売上金額は、商品Ａの平均売上金額の半分であると言える。 [cite: 9]",
      "相関係数は、-100から100までの範囲の値として計算される。 [cite: 10]",
      "理論的に相関係数は0にはならない。 [cite: 11]"
    ],
    correctIndex: 0,
    explanation: (
      <div className="space-y-2 text-sm">
        <p><strong>解答：ア</strong> [cite: 13]</p>
        <p>本問は、売上の相関関係に関する出題です。相関関係については、以下の関係を理解しておく必要があります。 [cite: 14]</p>
        <table className="w-full border-collapse border border-gray-400 my-2">
          <tbody>
            <tr><td className="border border-gray-400 p-1">相関係数＝1</td><td className="border border-gray-400 p-1">XとYが全く同じ性質の変動をする [cite: 15]</td></tr>
            <tr><td className="border border-gray-400 p-1">相関係数＝0</td><td className="border border-gray-400 p-1">XとYは無関係の変動をする [cite: 15]</td></tr>
            <tr><td className="border border-gray-400 p-1">相関係数＝－1</td><td className="border border-gray-400 p-1">XとYは全く正反対の性質の変動をする [cite: 15]</td></tr>
          </tbody>
        </table>
        <p>選択肢ア：相関関係の強さは絶対値で表され、0.5 ＜ 0.7 のため商品AとDの方が強い（適切）。 [cite: 17]</p>
        <p>選択肢イ：分母が異なるため単純な足し引きは不可（不適切）。 [cite: 22]</p>
        <p>選択肢ウ：平均売上高が1/2になるわけではない（不適切）。 [cite: 23]</p>
        <p>選択肢エ：範囲は-1～1である（不適切）。 [cite: 24]</p>
        <p>選択肢オ：一方が全く変動しない場合など、理論的に0になるケースはある（不適切）。 [cite: 25]</p>
      </div>
    )
  },
  {
    id: 2,
    year: "平成28年 第27問",
    title: "商品仕入",
    question: (
      <div>
        <p>小売店の商品仕入に関する記述として、最も適切なものはどれか。 [cite: 27]</p>
      </div>
    ),
    options: [
      "委託仕入では、一定期間店頭で販売し、売れ残った商品だけ小売店が買い取る。 [cite: 28]",
      "委託仕入では、商品の販売価格は原則として小売店が自由に設定する。 [cite: 29]",
      "委託仕入において、店頭在庫の所有権は小売店にある。 [cite: 30]",
      "消化仕入では、商品の販売時に小売店に所有権が移転する。 [cite: 31]",
      "消化仕入をすると、小売店の廃棄ロスが発生しやすい。 [cite: 32]"
    ],
    correctIndex: 3,
    explanation: (
      <div className="space-y-2 text-sm">
        <p><strong>解答：エ</strong> [cite: 34]</p>
        <table className="w-full border-collapse border border-gray-400 my-2">
          <tbody>
            <tr><td className="border border-gray-400 p-2 font-bold">委託仕入</td><td className="border border-gray-400 p-2">メーカーなどの売り手が在庫の所有権を持ったまま小売店が販売を行う方法。売れ残りは返品可能。販売価格は決められない。 [cite: 38]</td></tr>
            <tr><td className="border border-gray-400 p-2 font-bold">消化仕入</td><td className="border border-gray-400 p-2">店頭に商品を置き、売れた分を同時に仕入として計上する方法。売れ残りのリスクを負わない。 [cite: 38]</td></tr>
          </tbody>
        </table>
        <p>選択肢ア〜ウは委託仕入の性質と反するため不適切。 [cite: 40, 41, 42]</p>
        <p>選択肢エは適切。消化仕入では販売時に売上と仕入が同時に発生し所有権が移転する。 [cite: 43]</p>
        <p>選択肢オは不適切。消化仕入では廃棄ロスが発生しにくい。 [cite: 44]</p>
        <p className="bg-gray-100 p-2 rounded">補足: 買取仕入は在庫所有権を持ち価格を自由に決められるが売れ残りリスクを持つ。 [cite: 45]</p>
      </div>
    )
  },
  {
    id: 3,
    year: "平成25年 第30問",
    title: "価格設定と価格政策",
    question: <p>小売業の価格設定と価格政策に関する記述として、最も不適切なものはどれか。 [cite: 47]</p>,
    options: [
      "慣習価格政策は、すでに一般的に浸透している価格を設定する手法である。 [cite: 48]",
      "コストプラス方式の価格設定は、価格が市場の実情に合わない場合がある。 [cite: 49]",
      "マーケットプライス法は、全国共通の価格を設定する手法である。 [cite: 50]",
      "名声価格政策は、意識的に高価格を設定することによって、高品質であることを連想させる手法である。 [cite: 51]"
    ],
    correctIndex: 2,
    explanation: (
      <div className="space-y-2 text-sm">
        <p><strong>解答：ウ</strong> [cite: 53]</p>
        <p>選択肢ア：適切。缶ジュースのように浸透している価格を設定する。 [cite: 57]</p>
        <p>選択肢イ：適切。供給者側の事情を優先するため市場と合わない場合がある。 [cite: 58]</p>
        <p>選択肢ウ：不適切（正解）。マーケットプライス法は市場の状況（競合の価格など）を考慮して設定する手法であり、全国共通ではない。 [cite: 59]</p>
        <p>選択肢エ：適切。高級時計などのようにあえて高価格をつける威光価格とも呼ばれる政策。 [cite: 60]</p>
      </div>
    )
  },
  {
    id: 4,
    year: "令和4年 第30問",
    title: "価格政策",
    question: <p>小売業の価格政策と特売に関する記述として、最も適切なものはどれか。 [cite: 63]</p>,
    options: [
      "EDLP政策の場合、プライスラインは1つしか設けない。 [cite: 64]",
      "定番価格を高く設定していても、特売を頻繁に繰り返すと顧客の内的参照価格は低下する。 [cite: 65]",
      "特売による販売促進は、価格弾力性が低い商品ほどチラシなどで告知したときの集客効果が高い。 [cite: 66]",
      "ハイ・ロープライシング政策では、特売時における対象商品の販売数量を最大化することで店全体の利益率が高まる。 [cite: 67]",
      "端数価格には、買物客に安さを感じさせる心理的効果はない。 [cite: 68]"
    ],
    correctIndex: 1,
    explanation: (
      <div className="space-y-2 text-sm">
        <p><strong>解答：イ</strong> [cite: 70]</p>
        <p>選択肢ア：不適切。EDLP（EveryDay Low Price）でも複数のプライスラインを設けるケースはある。 [cite: 73]</p>
        <p>選択肢イ：適切。内的参照価格（顧客の過去の経験から刷り込まれた基準）は、特売を繰り返すと下がってしまう。 [cite: 74]</p>
        <p>選択肢ウ：不適切。価格弾力性が「高い」商品ほど集客効果が高い。 [cite: 75]</p>
        <p>選択肢エ：不適切。特売時の販売数量を最大化すると、一般的に利益率は下がる。 [cite: 76]</p>
        <p>選択肢オ：不適切。端数価格（980円など）は心理的な安さを感じさせる効果がある。 [cite: 77]</p>
      </div>
    )
  },
  {
    id: 5,
    year: "平成24年 第29問",
    title: "陳列",
    question: <p>商品陳列方法とそのメリットに関する記述として、最も不適切なものはどれか。 [cite: 80]</p>,
    options: [
      "カットケース陳列には、高級感を出しやすいというメリットがある。 [cite: 81]",
      "ゴンドラ陳列には、フェイスをそろえやすいというメリットがある。 [cite: 82]",
      "ジャンブル陳列には、ディスプレイに手間がかからないというメリットがある。 [cite: 83]",
      "ショーケース陳列には、商品が汚れにくいというメリットがある。 [cite: 84]",
      "フック陳列には、陳列されている商品の在庫量が分かりやすいというメリットがある。 [cite: 85]"
    ],
    correctIndex: 0,
    explanation: (
      <div className="space-y-2 text-sm">
        <p><strong>解答：ア</strong> [cite: 87]</p>
        <p>選択肢ア：不適切（正解）。カットケース陳列はダンボール箱をカットして陳列し安さを訴求する手法であり、高級感は出しにくい。 [cite: 91]</p>
        <p>選択肢イ：適切。定番品などに用いられフェイスを揃えやすい。 [cite: 92]</p>
        <p>選択肢ウ：適切。カゴに投げ込むため陳列が容易。 [cite: 93]</p>
        <p>選択肢エ：適切。ガラスで覆われているため汚れにくい。 [cite: 94]</p>
        <p>選択肢オ：適切。フックに吊るすため個数が一目で分かる。 [cite: 95]</p>
      </div>
    )
  },
  {
    id: 6,
    year: "令和2年 第29問",
    title: "陳列方法",
    question: (
      <div>
        <p>店舗における売場づくりに関して、以下に示す【陳列手法】と【陳列の特徴】の組み合わせとして、最も適切なものを下記の解答群から選べ。 [cite: 98]</p>
        <p>【陳列手法】<br/>①レジ前陳列<br/>②ジャンブル陳列<br/>③フック陳列 [cite: 99, 100, 101, 102]</p>
        <p>【陳列の特徴】<br/>ａ 商品を見やすく取りやすく陳列でき、在庫量が把握しやすい。<br/>ｂ 非計画購買を誘発しやすく、少額商品の販売に適している。<br/>ｃ 陳列が容易で、低価格のイメージを演出できる。 [cite: 103, 104, 105, 106]</p>
      </div>
    ),
    options: [
      "①とａ　②とｂ　③とｃ [cite: 108]",
      "①とａ　②とｃ　③とｂ [cite: 109]",
      "①とｂ　②とａ　③とｃ [cite: 110]",
      "①とｂ　②とｃ　③とａ [cite: 111]",
      "①とｃ　②とａ　③とｂ [cite: 112]"
    ],
    correctIndex: 3,
    explanation: (
      <div className="space-y-2 text-sm">
        <p><strong>解答：エ</strong> [cite: 114]</p>
        <p>① レジ前陳列は非計画購買を誘発しやすい → b [cite: 116]</p>
        <p>② ジャンブル陳列は陳列が容易で割安感を抱かせる → c [cite: 117]</p>
        <p>③ フック陳列は在庫量がわかりやすい → a [cite: 118]</p>
        <p>したがって、エが正解。 [cite: 119]</p>
      </div>
    )
  },
  {
    id: 7,
    year: "令和3年 第29問",
    title: "ビジュアル・マーチャンダイジング（VMD）",
    question: (
      <div>
        <p>ビジュアル・マーチャンダイジング（VMD）における3つの表現区分①～③とその役割に関する記述a～cの組み合わせとして、最も適切なものを下記の解答群から選べ。 [cite: 121]</p>
        <p>① IP（Item Presentation）<br/>② PP（Point of Sales Presentation）<br/>③ VP（Visual Presentation） [cite: 122, 123, 124]</p>
        <p>ａ ショーウインドーやステージなど特定の場所で行い、客の目をひきつけ誘導する。<br/>ｂ 商品の特徴や機能を明示し、選択のヒントを示して客の判断を手助けする。<br/>ｃ 単品商品を分類・整理し、見やすく、分かりやすく、選びやすく陳列し、購買欲求を高める。 [cite: 125, 126, 127]</p>
      </div>
    ),
    options: [
      "①とａ [cite: 129]",
      "①とｃ [cite: 130]",
      "②とａ [cite: 131]",
      "③とｂ [cite: 132]",
      "③とｃ [cite: 133]"
    ],
    correctIndex: 1,
    explanation: (
      <div className="space-y-2 text-sm">
        <p><strong>解答：イ</strong> [cite: 135]</p>
        <p>① IP（Item Presentation）: 分類・整理して選びやすく陳列する場 → c [cite: 139]</p>
        <p>② PP（Point of Sales Presentation）: 特徴や機能を明示してバリエーションを見せる場 → b [cite: 140]</p>
        <p>③ VP（Visual Presentation）: ショーウィンドウ等で情報を発信し誘導する場 → a [cite: 141]</p>
        <p>よって正しい組み合わせ（①とc）を含む選択肢イが正解。 [cite: 142]</p>
      </div>
    )
  },
  {
    id: 8,
    year: "平成26年 第31問",
    title: "インストア・マーチャンダイジング",
    question: (
      <div>
        <p>次の文中の空欄ＡとＢに入る語句の組み合わせとして、最も適切なものを選べ。 [cite: 145]</p>
        <p className="p-2 bg-gray-50 border border-gray-300">客単価を上げるためには、インストアマーチャンダイジングを実践することが有効である。たとえば、[ Ａ ]ためにはマグネットポイントの配置を工夫することが重要である。また、棚の前に立ち寄った客の視認率を上げるためには[ Ｂ ]ことが重要である。 [cite: 146]</p>
      </div>
    ),
    options: [
      "Ａ：買上率を高める　Ｂ：ＣＲＭを実施する [cite: 147]",
      "Ａ：買上率を高める　Ｂ：プラノグラムを工夫する [cite: 148]",
      "Ａ：客の動線長を伸ばす　Ｂ：ＣＲＭを実施する [cite: 149]",
      "Ａ：客の動線長を伸ばす　Ｂ：プラノグラムを工夫する [cite: 150]"
    ],
    correctIndex: 3,
    explanation: (
      <div className="space-y-2 text-sm">
        <p><strong>解答：エ</strong> [cite: 152]</p>
        <p>マグネットポイント（目を引く商品）の配置は「客動線長を伸ばす」ために行われる。 [cite: 158]</p>
        <p>視認率を上げるためには、棚割計画である「プラノグラムの工夫」が重要（CRMは顧客関係管理）。 [cite: 159]</p>
      </div>
    )
  },
  {
    id: 9,
    year: "平成24年 第28問",
    title: "インストア・プロモーション",
    question: (
      <div>
        <p>インストア・プロモーション（ISP）には価格主導型ISPと非価格主導型ISPがある。価格主導型ISPとして最も適切なものの組み合わせを下記の解答群から選べ。 [cite: 162]</p>
        <p>a クロスマーチャンダイジング<br/>b サンプリング<br/>c 増量パック<br/>d バンドル販売 [cite: 163, 164, 165, 166]</p>
      </div>
    ),
    options: [
      "ａとｃ [cite: 168]",
      "ａとｄ [cite: 169]",
      "ｂとｃ [cite: 170]",
      "ｂとｄ [cite: 171]",
      "ｃとｄ [cite: 172]"
    ],
    correctIndex: 4,
    explanation: (
      <div className="space-y-2 text-sm">
        <p><strong>解答：オ</strong> [cite: 174]</p>
        <p>価格主導型は特売、値引き、ポイント、クーポン、増量など。非価格主導型はデモ販売やPOPなど。 [cite: 178]</p>
        <p>a クロスマーチャンダイジング：非価格主導型 [cite: 180]</p>
        <p>b サンプリング：非価格主導型 [cite: 181]</p>
        <p>c 増量パック：価格据え置きで容量を増やすため価格主導型 [cite: 183]</p>
        <p>d バンドル販売：セットで単価を引き下げるため価格主導型 [cite: 184]</p>
        <p>よって cとd（オ）が正解。 [cite: 185]</p>
      </div>
    )
  },
  {
    id: 10,
    year: "平成24年 第31問",
    title: "棚割（プラノグラム）",
    question: <p>棚割（プラノグラム）の目的に関する記述として、最も適切なものはどれか。 [cite: 188]</p>,
    options: [
      "棚内のゾーニングの工夫によって客動線を長くすることができる。 [cite: 189]",
      "バーティカル陳列によって同じグループ内の商品比較がしやすい売場をつくることができる。 [cite: 190]",
      "フェイシングの工夫によって売上高や商品回転率を上げることができる。 [cite: 191]",
      "ホリゾンタル陳列によって商品グループ間の比較がしやすい売場をつくることができる。 [cite: 192]"
    ],
    correctIndex: 2,
    explanation: (
      <div className="space-y-2 text-sm">
        <p><strong>解答：ウ</strong> [cite: 194]</p>
        <p>選択肢ア：1つの棚の中の配置を変えても客動線は長くならない。 [cite: 199]</p>
        <p>選択肢イ：バーティカル（縦割り）陳列はアイテムは探しやすいが、同じグループの比較には上下移動を伴うためホリゾンタルの方が便利。 [cite: 200, 201]</p>
        <p>選択肢ウ：適切。フェイス数（顧客の目に触れる数）を工夫することで売上や回転率は向上する。 [cite: 202]</p>
        <p>選択肢エ：ホリゾンタル陳列はグループ「内」の比較はしやすいが、グループ「間」の比較には向かない。 [cite: 203]</p>
      </div>
    )
  },
  {
    id: 11,
    year: "平成28年 第32問",
    title: "販売促進",
    question: <p>小売業の販売促進の方法と主な目的に関する記述として、最も適切なものはどれか。 [cite: 205]</p>,
    options: [
      "売り場におけるクロスマーチャンダイジングは、関連する商品同士を並べて陳列することで、計画購買を促進する狙いがある。 [cite: 206]",
      "エンドなどにおける大量陳列は、商品の露出を高めて買い忘れを防止するなど、計画購買を促進する狙いがある。 [cite: 207]",
      "会計時に発行するレシートクーポンは、次回来店時の計画購買を促進する狙いがある。 [cite: 208]",
      "試食販売などのデモンストレーション販売は、リピート購買を促進する狙いがある。 [cite: 209]",
      "新聞折り込みチラシは、お買い得商品の情報を伝えて、想起購買を促進する狙いがある。 [cite: 210]"
    ],
    correctIndex: 2,
    explanation: (
      <div className="space-y-2 text-sm">
        <p><strong>解答：ウ</strong> [cite: 212]</p>
        <p>選択肢ア：クロスマーチャンダイジングは「非計画購買」を促進する。 [cite: 218]</p>
        <p>選択肢イ：大量陳列は「非計画購買」を促進する。 [cite: 219]</p>
        <p>選択肢ウ：適切。レシートクーポンは次回の計画購買を促進する。 [cite: 220]</p>
        <p>選択肢エ：デモ販売は新商品販売向けでありリピート促進には向かない。 [cite: 221]</p>
        <p>選択肢オ：チラシは「計画購買」を促進する（店頭で思い出す想起購買ではない）。 [cite: 222]</p>
      </div>
    )
  },
  {
    id: 12,
    year: "令和2年 第30問",
    title: "売価値入率",
    question: (
      <div>
        <p>下表の 5 種類の商品を仕入れて販売することを計画している。<br/>商品Ａ～Ｅの中で、同じ売価に設定される商品が 2 つある。この 2つの商品について、仕入れた数量をすべて設定した売価で販売したときの粗利益額の合計として、最も適切なものを下記の解答群から選べ。 [cite: 224, 225]</p>
        <table className="w-full border-collapse border border-gray-400 my-4 text-sm text-center">
          <thead><tr className="bg-gray-100"><th className="border border-gray-400 p-2"></th><th className="border border-gray-400 p-2">仕入単価</th><th className="border border-gray-400 p-2">仕入数量</th><th className="border border-gray-400 p-2">売価値入率</th></tr></thead>
          <tbody>
            <tr><td className="border border-gray-400 p-1">商品A</td><td className="border border-gray-400 p-1">480円</td><td className="border border-gray-400 p-1">50個</td><td className="border border-gray-400 p-1">20%</td></tr>
            <tr><td className="border border-gray-400 p-1">商品B</td><td className="border border-gray-400 p-1">300円</td><td className="border border-gray-400 p-1">60個</td><td className="border border-gray-400 p-1">40%</td></tr>
            <tr><td className="border border-gray-400 p-1">商品C</td><td className="border border-gray-400 p-1">300円</td><td className="border border-gray-400 p-1">100個</td><td className="border border-gray-400 p-1">50%</td></tr>
            <tr><td className="border border-gray-400 p-1">商品D</td><td className="border border-gray-400 p-1">800円</td><td className="border border-gray-400 p-1">30個</td><td className="border border-gray-400 p-1">20%</td></tr>
            <tr><td className="border border-gray-400 p-1">商品E</td><td className="border border-gray-400 p-1">600円</td><td className="border border-gray-400 p-1">40個</td><td className="border border-gray-400 p-1">50%</td></tr>
          </tbody>
        </table>
      </div>
    ),
    options: [
      "12,000 円 [cite: 227]",
      "36,000 円 [cite: 228]",
      "42,000 円 [cite: 229]",
      "60,000 円 [cite: 230]",
      "90,000 円 [cite: 231]"
    ],
    correctIndex: 1,
    explanation: (
      <div className="space-y-2 text-sm">
        <p><strong>解答：イ</strong> [cite: 233]</p>
        <p>売価＝仕入単価 / (1－売価値入率) [cite: 236]</p>
        <ul className="list-disc pl-5">
          <li>商品A: 売価 = 480 / 0.8 = 600円。粗利 = (600-480)×50 = 6,000円 [cite: 237]</li>
          <li>商品B: 売価 = 300 / 0.6 = 500円。粗利 = (500-300)×60 = 12,000円 [cite: 238]</li>
          <li>商品C: 売価 = 300 / 0.5 = 600円。粗利 = (600-300)×100 = 30,000円 [cite: 239]</li>
          <li>商品D: 売価 = 800 / 0.8 = 1000円。粗利 = (1000-800)×30 = 6,000円 [cite: 240]</li>
          <li>商品E: 売価 = 600 / 0.5 = 1200円。粗利 = (1200-600)×40 = 24,000円 [cite: 241]</li>
        </ul>
        <p>同じ売価なのはA(600円)とC(600円)。合計＝6,000 ＋ 30,000 ＝ 36,000円。 [cite: 242, 243]</p>
      </div>
    )
  },
  {
    id: 13,
    year: "平成24年 第26問",
    title: "GMROI",
    question: <p>ある小売店では、年間売上高2,900万円、期首在庫高（原価）800万円、期中仕入高1,600万円、期末在庫高（原価）700万円であった。この店のGMROIとして最も適切なものはどれか。 [cite: 245]</p>,
    options: ["120％ [cite: 246]", "130％ [cite: 247]", "160％ [cite: 248]", "180％ [cite: 249]", "200％ [cite: 250]"],
    correctIndex: 2,
    explanation: (
      <div className="space-y-2 text-sm">
        <p><strong>解答：ウ</strong> [cite: 252]</p>
        <p>GMROI ＝ 粗利益 ÷ 平均在庫高（原価） [cite: 256]</p>
        <p>平均在庫高（原価）＝ (800＋700) ÷ 2 ＝ 750万円 [cite: 259]</p>
        <p>売上原価 ＝ 800 ＋ 1,600 － 700 ＝ 1,700万円 [cite: 261]</p>
        <p>粗利益 ＝ 2,900 － 1,700 ＝ 1,200万円 [cite: 262]</p>
        <p>GMROI ＝ 1,200 ÷ 750 ＝ 1.6（160％） [cite: 264, 265]</p>
      </div>
    )
  },
  {
    id: 14,
    year: "平成27年 第32問",
    title: "交差比率（交差主義比率）",
    question: (
      <div>
        <p>商品予算計画に関する以下の用語とその算出方法の組み合わせとして、最も適切なものを下記の解答群から選べ。 [cite: 269]</p>
        <p>＜用語＞<br/>① GMROI<br/>② 交差主義比率<br/>③ 商品回転率 [cite: 270, 271, 272, 273]</p>
        <p>＜算出方法＞<br/>ａ 粗利益÷平均商品在庫高（原価）<br/>ｂ 粗利益率×商品回転率<br/>ｃ 年間売上高÷平均商品在庫高（売価） [cite: 274, 275, 276, 277]</p>
      </div>
    ),
    options: [
      "①：ａ ②：ｂ ③：ｃ [cite: 279]",
      "①：ａ ②：ｃ ③：ｂ [cite: 280]",
      "①：ｂ ②：ａ ③：ｃ [cite: 281]",
      "①：ｂ ②：ｃ ③：ａ [cite: 282]",
      "①：ｃ ②：ａ ③：ｂ [cite: 283]"
    ],
    correctIndex: 0,
    explanation: (
      <div className="space-y-2 text-sm">
        <p><strong>解答：ア</strong> [cite: 285]</p>
        <p>① GMROI = 粗利益 ÷ 平均商品在庫高（原価）→ a [cite: 291, 292]</p>
        <p>② 交差主義比率 = 粗利益率 × 商品回転率（売価ベース）→ b [cite: 297, 298]</p>
        <p>③ 商品回転率（売価ベース）= 年間売上高 ÷ 平均商品在庫高（売価）→ c [cite: 302, 305]</p>
        <p>よってアが正解。 [cite: 306]</p>
      </div>
    )
  },
  {
    id: 15,
    year: "令和3年 第32問",
    title: "在庫管理",
    question: <p>最寄品を主に取り扱う小売店舗における在庫管理に関する記述として、最も適切なものはどれか。 [cite: 308]</p>,
    options: [
      "1回当たりの発注量が一定の場合、サイクル在庫は一定になる。 [cite: 309]",
      "欠品を防止するために設定する安全在庫量は、需要量の標準偏差が2倍になると半分になる。 [cite: 310]",
      "定期発注方式を採用した場合、販売量を一定とすると、1 回当たりの発注量は発注から納品までの調達期間が長くなるほど少なくなる。 [cite: 311]",
      "定量発注方式を採用した場合、発注量の決定には発注間隔があらかじめ決定されている必要がある。 [cite: 312]",
      "発注点と補充点を設定して発注する方式を採用した場合、1回当たりの発注量は販売量の増減にかかわらず一定になる。 [cite: 313]"
    ],
    correctIndex: 0,
    explanation: (
      <div className="space-y-2 text-sm">
        <p><strong>解答：ア</strong> [cite: 315]</p>
        <p>選択肢ア：適切。サイクル在庫は1回の発注量の半分の量であり、発注量が一定ならサイクル在庫も一定。 [cite: 318]</p>
        <p>選択肢イ：不適切。標準偏差（バラつき）が2倍になれば安全在庫も2倍になる。 [cite: 321, 322]</p>
        <p>選択肢ウ：不適切。調達期間が長くなれば、その間の在庫が必要になり1回の発注量は「多く」なる。 [cite: 323]</p>
        <p>選択肢エ：不適切。発注間隔をあらかじめ決めるのは「定期」発注方式。 [cite: 324]</p>
        <p>選択肢オ：不適切。発注点・補充点方式では現時点の在庫量を引くため、販売量により発注量は変動する。 [cite: 325]</p>
      </div>
    )
  },
  {
    id: 16,
    year: "令和4年 第31問",
    title: "小売店舗の在庫管理",
    question: (
      <div>
        <p>以下の文章の空欄Ａ～Ｃに入る用語の組み合わせとして、最も適切なものを下記の解答群から選べ。 [cite: 328]</p>
        <p className="p-2 bg-gray-50 border border-gray-300">ある商品について、当該店舗の発注担当者は在庫量を毎日確認し、需要予測に基づいて必要と見込まれる数量を毎日発注している。ここで行われている発注方法を一般的に [ Ａ ] という。<br/>適正在庫を維持するためには、発注量を決めるための需要予測量を計算する期間を [ Ｂ ] にする必要がある。また、毎日計算する発注量は、需要予測量と安全在庫の合計数量から発注時の [ Ｃ ] を減算して求める必要がある。 [cite: 329, 330]</p>
      </div>
    ),
    options: [
      "Ａ：定期発注方式　Ｂ：調達期間　Ｃ：手持在庫量 [cite: 332]",
      "Ａ：定期発注方式　Ｂ：調達期間と発注間隔の合計期間　Ｃ：手持在庫量 [cite: 333]",
      "Ａ：定期発注方式　Ｂ：調達期間と発注間隔の合計期間　Ｃ：有効在庫量 [cite: 334]",
      "Ａ：定量発注方式　Ｂ：調達期間　Ｃ：有効在庫量 [cite: 335]",
      "Ａ：定量発注方式　Ｂ：調達期間と発注間隔の合計期間　Ｃ：手持在庫量 [cite: 336]"
    ],
    correctIndex: 2,
    explanation: (
      <div className="space-y-2 text-sm">
        <p><strong>解答：ウ</strong> [cite: 338]</p>
        <p>A：毎日確認し需要予測に基づいて発注するのは「定期発注方式」。 [cite: 341]</p>
        <p>B：定期発注方式における需要予測期間は「調達期間と発注間隔の合計期間」。 [cite: 342]</p>
        <p>C：計算式「需要予測量 − 現在の在庫量 − 発注残 ＋ 安全在庫」。現在在庫＋発注残＝「有効在庫量」。 [cite: 344, 345]</p>
      </div>
    )
  },
  {
    id: 17,
    year: "平成25年 第31問",
    title: "相乗積1",
    question: <p>小売業では、部門別などのグループごとに売上や粗利益などを管理する。そのひとつの指標として相乗積(利益相乗積係数)がある。小売店舗における相乗積に関する記述として、最も不適切なものはどれか。 [cite: 349]</p>,
    options: [
      "ある部門の相乗積は、店舗全体の粗利益高に占める当該部門の粗利益高の割合を示す。 [cite: 350]",
      "ある部門の相乗積は、当該部門の売上高構成比と粗利益率の積である。 [cite: 351]",
      "すべての部門の相乗積の和は、店舗全体の粗利益率に等しくなる。 [cite: 352]",
      "部門ごとの相乗積を比較すると、最も利益を生み出している部門が分かる。 [cite: 353]"
    ],
    correctIndex: 0,
    explanation: (
      <div className="space-y-2 text-sm">
        <p><strong>解答：ア</strong> [cite: 355]</p>
        <p>選択肢ア：不適切（正解）。相乗積は、店舗全体の「売上高」に占める当該部門の粗利益高の割合を示す。 [cite: 361]</p>
        <p>選択肢イ：適切。計算式通り。 [cite: 365]</p>
        <p>選択肢ウ：適切。相乗積の和＝店舗全体の粗利益率。 [cite: 366]</p>
        <p>選択肢エ：適切。最も値が大きい部門が一番利益を生み出している。 [cite: 367]</p>
      </div>
    )
  },
  {
    id: 18,
    year: "令和元年 第28問",
    title: "相乗積2",
    question: (
      <div>
        <p>店舗Ｘのある月の営業実績は下表のとおりである。この表から計算される相乗積に関する記述として、最も適切なものを下記の解答群から選べ。 [cite: 370]</p>
        <table className="w-full border-collapse border border-gray-400 my-4 text-sm text-center">
          <thead><tr className="bg-gray-100"><th className="border border-gray-400 p-2">商品カテゴリー</th><th className="border border-gray-400 p-2">販売金額(万円)</th><th className="border border-gray-400 p-2">販売金額構成比(%)</th><th className="border border-gray-400 p-2">粗利益率(%)</th></tr></thead>
          <tbody>
            <tr><td className="border border-gray-400 p-1">カテゴリーA</td><td className="border border-gray-400 p-1">500</td><td className="border border-gray-400 p-1">25</td><td className="border border-gray-400 p-1">20</td></tr>
            <tr><td className="border border-gray-400 p-1">カテゴリーB</td><td className="border border-gray-400 p-1">300</td><td className="border border-gray-400 p-1">15</td><td className="border border-gray-400 p-1">20</td></tr>
            <tr><td className="border border-gray-400 p-1">カテゴリーC</td><td className="border border-gray-400 p-1">200</td><td className="border border-gray-400 p-1">10</td><td className="border border-gray-400 p-1">30</td></tr>
            <tr><td className="border border-gray-400 p-1">カテゴリーD</td><td className="border border-gray-400 p-1">600</td><td className="border border-gray-400 p-1">30</td><td className="border border-gray-400 p-1">40</td></tr>
            <tr><td className="border border-gray-400 p-1">カテゴリーE</td><td className="border border-gray-400 p-1">400</td><td className="border border-gray-400 p-1">20</td><td className="border border-gray-400 p-1">50</td></tr>
            <tr><td className="border border-gray-400 p-1">合計</td><td className="border border-gray-400 p-1">2,000</td><td className="border border-gray-400 p-1">100</td><td className="border border-gray-400 p-1 bg-gray-200"></td></tr>
          </tbody>
        </table>
      </div>
    ),
    options: [
      "カテゴリーＡ～Ｅの合計の販売金額が2倍になると、各カテゴリーの相乗積の合計も2倍になる。 [cite: 372]",
      "カテゴリーＡの相乗積は50%である。 [cite: 373]",
      "カテゴリーＡの販売金額も粗利益率も変わらず、他のカテゴリーの販売金額が増加すると、カテゴリーＡの相乗積は減少する。 [cite: 374]",
      "カテゴリーＢはカテゴリーＣよりも相乗積が大きい。 [cite: 375]",
      "相乗積が最も大きいカテゴリーは、カテゴリーＥである。 [cite: 376]"
    ],
    correctIndex: 2,
    explanation: (
      <div className="space-y-2 text-sm">
        <p><strong>解答：ウ</strong> [cite: 378]</p>
        <p>相乗積 ＝ 粗利益率 × 販売金額構成比 [cite: 382]</p>
        <ul className="list-disc pl-5">
          <li>Aの相乗積: 20% × 25% = 5% [cite: 385]</li>
          <li>Bの相乗積: 20% × 15% = 3% [cite: 387]</li>
          <li>Cの相乗積: 30% × 10% = 3% [cite: 387]</li>
          <li>Dの相乗積: 40% × 30% = 12% [cite: 388]</li>
          <li>Eの相乗積: 50% × 20% = 10% [cite: 388]</li>
        </ul>
        <p>選択肢ア：販売金額が2倍になっても構成比は変わらないため相乗積は変わらない。 [cite: 384]</p>
        <p>選択肢イ：Aの相乗積は5%である。 [cite: 385]</p>
        <p>選択肢ウ：適切。他の販売額が増加するとAの売上構成比が下がるため、相乗積は減少する。 [cite: 386]</p>
        <p>選択肢エ：BとCの相乗積は共に3%で等しい。 [cite: 387]</p>
        <p>選択肢オ：最も大きいのはD(12%)。 [cite: 388]</p>
      </div>
    )
  }
];

export default function App() {
  const [screen, setScreen] = useState('start'); // 'start', 'quiz', 'explanation', 'history'
  const [mode, setMode] = useState('all'); // 'all', 'incorrect', 'review'
  const [currentIndex, setCurrentIndex] = useState(0);
  const [activeQuestions, setActiveQuestions] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  
  const [history, setHistory] = useState({});
  const [reviews, setReviews] = useState({});

  useEffect(() => {
    try {
      const savedHistory = JSON.parse(localStorage.getItem('quiz_history')) || {};
      const savedReviews = JSON.parse(localStorage.getItem('quiz_reviews')) || {};
      setHistory(savedHistory);
      setReviews(savedReviews);
      console.log('Data loaded successfully.');
    } catch (e) {
      console.error('Failed to load data from localStorage', e);
      setHistory({});
      setReviews({});
    }
  }, []);

  const saveHistory = (newHistory) => {
    try {
      localStorage.setItem('quiz_history', JSON.stringify(newHistory));
      setHistory(newHistory);
    } catch (e) {
      console.error('Failed to save history', e);
    }
  };

  const saveReviews = (newReviews) => {
    try {
      localStorage.setItem('quiz_reviews', JSON.stringify(newReviews));
      setReviews(newReviews);
    } catch (e) {
      console.error('Failed to save reviews', e);
    }
  };

  const startQuiz = (selectedMode) => {
    console.log(`Starting quiz in mode: ${selectedMode}`);
    let filtered = [];
    if (selectedMode === 'all') {
      filtered = quizData;
    } else if (selectedMode === 'incorrect') {
      filtered = quizData.filter(q => history[q.id]?.correct === false);
    } else if (selectedMode === 'review') {
      filtered = quizData.filter(q => reviews[q.id] === true);
    }

    if (filtered.length === 0) {
      alert('該当する問題がありません！');
      return;
    }

    setMode(selectedMode);
    setActiveQuestions(filtered);
    setCurrentIndex(0);
    setScreen('quiz');
  };

  const handleAnswer = (index) => {
    const currentQuestion = activeQuestions[currentIndex];
    const isCorrect = index === currentQuestion.correctIndex;
    
    setSelectedOption(index);
    
    const newHistory = {
      ...history,
      [currentQuestion.id]: {
        correct: isCorrect,
        lastAttempted: new Date().toISOString()
      }
    };
    saveHistory(newHistory);
    setScreen('explanation');
  };

  const toggleReview = (id) => {
    const newReviews = {
      ...reviews,
      [id]: !reviews[id]
    };
    saveReviews(newReviews);
  };

  const nextQuestion = () => {
    if (currentIndex < activeQuestions.length - 1) {
      setCurrentIndex(c => c + 1);
      setSelectedOption(null);
      setScreen('quiz');
    } else {
      setScreen('start');
    }
  };

  // -------------------------------------------------------------
  // Screens
  // -------------------------------------------------------------
  
  if (screen === 'start') {
    return (
      <div className="max-w-2xl mx-auto p-6 space-y-8 bg-white min-h-screen">
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold text-blue-800">マーチャンダイジング 過去問演習</h1>
          <p className="text-gray-600">全18問収録</p>
        </div>

        <div className="space-y-4">
          <button onClick={() => startQuiz('all')} className="w-full flex items-center justify-between p-4 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition">
            <div className="flex items-center space-x-3 text-blue-800 font-semibold"><BookOpen className="w-5 h-5"/><span>すべての問題</span></div>
            <ChevronRight className="w-5 h-5 text-blue-400"/>
          </button>
          
          <button onClick={() => startQuiz('incorrect')} className="w-full flex items-center justify-between p-4 bg-red-50 border border-red-200 rounded-lg hover:bg-red-100 transition">
            <div className="flex items-center space-x-3 text-red-800 font-semibold"><AlertCircle className="w-5 h-5"/><span>前回不正解の問題のみ</span></div>
            <span className="text-red-500 text-sm">({quizData.filter(q => history[q.id]?.correct === false).length}問)</span>
          </button>

          <button onClick={() => startQuiz('review')} className="w-full flex items-center justify-between p-4 bg-yellow-50 border border-yellow-200 rounded-lg hover:bg-yellow-100 transition">
            <div className="flex items-center space-x-3 text-yellow-800 font-semibold"><Check className="w-5 h-5"/><span>要復習の問題のみ</span></div>
            <span className="text-yellow-600 text-sm">({quizData.filter(q => reviews[q.id]).length}問)</span>
          </button>
        </div>

        <button onClick={() => setScreen('history')} className="w-full mt-8 p-3 text-center text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition font-medium">
          学習履歴を見る
        </button>
      </div>
    );
  }

  if (screen === 'history') {
    return (
      <div className="max-w-3xl mx-auto p-4 md:p-6 bg-white min-h-screen">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">学習履歴</h2>
          <button onClick={() => setScreen('start')} className="p-2 text-gray-500 hover:bg-gray-100 rounded-full">
            <Home className="w-6 h-6"/>
          </button>
        </div>

        <div className="space-y-3">
          {quizData.map((q) => {
            const hist = history[q.id];
            const isReview = reviews[q.id];
            return (
              <div key={q.id} className="border p-4 rounded-lg flex justify-between items-center bg-gray-50">
                <div>
                  <div className="text-xs text-gray-500">{q.year} - 第{q.id}問</div>
                  <div className="font-medium text-gray-800">{q.title}</div>
                  <div className="text-sm mt-1">
                    {hist ? (
                      hist.correct ? <span className="text-green-600 font-bold">正解</span> : <span className="text-red-600 font-bold">不正解</span>
                    ) : (
                      <span className="text-gray-400">未解答</span>
                    )}
                  </div>
                </div>
                <button 
                  onClick={() => toggleReview(q.id)}
                  className={`px-3 py-1 text-sm border rounded-full transition ${isReview ? 'bg-yellow-100 border-yellow-400 text-yellow-800' : 'bg-white text-gray-500 border-gray-300'}`}
                >
                  要復習
                </button>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  const currentQ = activeQuestions[currentIndex];

  if (screen === 'quiz') {
    return (
      <div className="max-w-2xl mx-auto p-4 md:p-6 bg-white min-h-screen flex flex-col">
        <div className="flex justify-between items-center mb-6 border-b pb-4">
          <span className="text-sm font-bold text-gray-500">問題 {currentIndex + 1} / {activeQuestions.length}</span>
          <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">{currentQ.year}</span>
        </div>

        <h2 className="text-xl font-bold mb-4">{currentQ.title}</h2>
        <div className="mb-6 text-gray-800 leading-relaxed bg-gray-50 p-4 rounded-lg">
          {currentQ.question}
        </div>

        <div className="space-y-3 mt-auto">
          {currentQ.options.map((opt, i) => (
            <button 
              key={i} 
              onClick={() => handleAnswer(i)}
              className="w-full text-left p-4 border border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition"
            >
              <div className="flex">
                <span className="font-bold mr-3 text-gray-400">{i + 1}.</span>
                <span>{opt}</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    );
  }

  if (screen === 'explanation') {
    const isCorrect = selectedOption === currentQ.correctIndex;
    const isReview = reviews[currentQ.id] || false;

    return (
      <div className="max-w-2xl mx-auto p-4 md:p-6 bg-white min-h-screen flex flex-col">
        <div className={`p-4 rounded-lg mb-6 flex items-center space-x-3 ${isCorrect ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
          {isCorrect ? <Check className="w-8 h-8"/> : <X className="w-8 h-8"/>}
          <span className="text-2xl font-bold">{isCorrect ? "正解！" : "不正解..."}</span>
        </div>

        <div className="border border-blue-200 rounded-lg p-5 bg-blue-50 mb-6">
          <h3 className="font-bold text-blue-900 mb-3 flex items-center"><BookOpen className="w-5 h-5 mr-2"/>解説</h3>
          <div className="text-gray-800 leading-relaxed">
            {currentQ.explanation}
          </div>
        </div>

        <div className="mt-auto pt-6 border-t flex justify-between items-center">
          <label className="flex items-center space-x-2 cursor-pointer">
            <input 
              type="checkbox" 
              checked={isReview} 
              onChange={() => toggleReview(currentQ.id)}
              className="w-5 h-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
            />
            <span className="font-medium text-gray-700">「要復習」にチェック</span>
          </label>

          <button 
            onClick={nextQuestion}
            className="px-6 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition"
          >
            {currentIndex < activeQuestions.length - 1 ? '次の問題へ' : '結果を終了'}
          </button>
        </div>
      </div>
    );
  }

  return null;
}