
## 🤖 프로젝트 소개 

- github pages : <a target="_blank" href="https://kookmin-sw.github.io/capstone-2024-24/">https://kookmin-sw.github.io/capstone-2024-24</a>
- 국민대 2024년 캡스톤 24조 <a target="_blank" href="https://github.com/kookmin-sw/capstone-2024-24">https://github.com/kookmin-sw/capstone-2024-24</a>
- 중간보고서 : <a target="_blank" href="https://drive.google.com/file/d/16NaXpkgVccnvjZIrgBijLE6NKX_uG9iI/view?usp=sharing" >https://drive.google.com/file/d/16NaXpkgVccnvjZIrgBijLE6NKX_uG9iI/view?usp=sharing</a>
- 중간발표자료 : <a target="_blank" href="https://drive.google.com/file/d/1uSfNx9Hp3RWLK9qVZHUtFuv0Xsn-snNT/view?usp=sharing">https://drive.google.com/file/d/1uSfNx9Hp3RWLK9qVZHUtFuv0Xsn-snNT/view?usp=sharing</a>

## 🤖 AI 기반 대화형 키오스크, Jumi(주미)

당신의 주문 도우미 'Jumi(주미)'

키오스크 사용이 복잡하고 어렵지 않으신가요?
AI와의 대화를 통해 더 간편하고, 쉽고, 자신있게 키오스크를 사용하실 수 있습니다. (Jumi)를 통해 매장에서의 불편함을 줄여보세요! 😆

![Jumi_Logo](https://github.com/kookmin-sw/capstone-2024-24/assets/93641814/dd21254e-987e-414b-acb9-e737a7b61659)


서울디지털재단이 발표한 ‘서울시민 디지털 역량 실태조사’에 따르면 55세 이상 고령층의 45.8%만 키오스크 이용 경험이 있다고 응답했습니다. 55세 미만에서 같은 답변이 94.1%였던 것에 비하면 절반에도 못 미치는 수준입니다. 실제로 고령 소비자층은 키오스크를 이용하며 불편한 점으로 ‘복잡한 단계 및 화면 조작’, ‘주문 상품에 대한 문의 불가’ 등을 꼽았습니다.(한국소비자원 설문조사)

Jumi(주미)는 기존의 중노년층이나 가게에 처음오는 사람 등 해당 매장의 키오스크 사용에 미숙한 점이 많아 설명과 도움이 필요한 사람들을 대상으로 개발 중에 있습니다.

대화를 통해 기존 점원들이 진행하던 주문뿐아니라 메뉴 설명, 매장설명 및 손님응대를 ai인 주미가 진행하므로써 손님은 자신만을 위한 작은 테이블위 담당 직원이 생기는 것이고 매장은 더 적은 비용으로 서비스 품질을 늘릴 수 있는 기회가 될 것입니다.

---

Introducing 'Jumi', Your Order Assistant!

Are you finding kiosk usage complex and challenging? With Jumi, you can interact more conveniently, easily, and confidently through AI conversation for smoother kiosk navigation. Let's reduce the inconvenience at your store! 😆

According to the 'Seoul Citizen Digital Competency Survey' released by the Seoul Digital Foundation, only 45.8% of the elderly aged 55 and above responded that they have experience using kiosks. This figure is significantly lower than the 94.1% response from those under 55 years old. In fact, elderly consumers cited 'complex steps and screen manipulation' and 'inability to inquire about ordered items' as inconvenient aspects of using kiosks (Korea Consumer Agency survey).

Jumi is being developed to assist those who are unfamiliar with using kiosks, such as the middle-aged and elderly, or those visiting a store for the first time, by providing explanations and assistance.

Through conversation, Jumi not only handles orders like traditional staff but also provides menu explanations, store guidance, and customer service. This creates a personalized experience for the customer, akin to having a dedicated staff member at their service, while offering the store an opportunity to enhance service quality at lower costs.

## 🤖 소개 영상

[![Video Label](https://img.youtube.com/vi/aUr39A649iQ/0.jpg)](https://youtu.be/aUr39A649iQ) 

## 🤖 프로젝트 기능

### 매장 및 메뉴 관리
관리자 페이지에서 매장 및 메뉴를 관리할 수 있습니다.

### Jumi 학습
관리자 페이지에서 Jumi(AI)에게 유즈케이스를 관리자가 직접 입력함으로써 관리자의 의도와 생각이 잘 반영될 수 있도록 합니다.

### AI 기반 대화 기능
AI와 매장에 관한 대화를 음성으로 자유롭게 나눌 수 있습니다. 대화 내역은 화면에서 확인 가능합니다. 대화 흐름과 매치되는 동작을 자동으로 수행하여 화면 터치 조작 없이 간편하게 키오스크를 사용할 수 있습니다.

### 키오스크 기능
기존 키오스크처럼 터치 조작으로 원하는 메뉴를 조회하고 주문할 수 있습니다.

### 통계자료
관리자 페이지에서 매장의 연도별, 나이대 별 매출을 확인할 수 있으며, 커서를 올리면 해당 시점의 매출 데이터를 상세히 볼 수 있습니다. 이는 매장의 매출 추이와 고객층을 분석하는 데 도움을 줍니다.

## 🤖 사용법

현재 테스트 파일로 각각의 폴더 내의 안내를 참고해 주세요.

구현 내역
- (web) 관리자 페이지
- (android) 키오스크 앱 동작 및 구성
- (server) 데이터 및 LLM에 접근 가능한 서버 엔드포인트 (API) 구현
- (ai) voice detecting 기능과 whisper를 연결하여, 말을 인식하여 음성파일을 만들어 text로 출력하는 테스트 파일

## 🤖 팀원 소개
<table>
    <tr align="center">
        <td style="min-width: 150px;">
            <a href="https://github.com/Roel4990">
              <img src="https://github.com/kookmin-sw/capstone-2024-24/assets/93641814/4977f984-0166-402e-923f-dc5329e0e310" width="100">
              <br />
              <b>안세홍</b>
            </a> 
            <br/>
              20181640
        </td>
        <td style="min-width: 150px;">
            <a href="https://github.com/Eonji-sw">
              <img src="https://github.com/kookmin-sw/capstone-2024-24/assets/93641814/3abed7fd-7d59-4147-a50d-52a6ac8840b6"
 width="100">
              <br />
              <b>김언지</b>
            </a>
                       <br/>
              20212979
        </td>
        <td style="min-width: 150px;">
            <a href="https://github.com/devkaspee">
              <img src="https://media.licdn.com/dms/image/D4D03AQGnXLN8XfT99A/profile-displayphoto-shrink_400_400/0/1709892878675?e=1717632000&v=beta&t=4P74nV3eJ6eIlBHz0JGjL104xmfzodYcDvd72GnUxEM" width="100">
              <br />
              <b>임호준</b>
            </a> 
                       <br/>
              20181685
        </td>
        <td style="min-width: 150px;">
            <a href="https://github.com/kwonbooyeon">
              <img src="https://github.com/kookmin-sw/capstone-2024-24/assets/93641814/fbdded38-3b49-4268-8838-4f6294c63313" width="100">
              <br />
              <b>권부연</b>
            </a> 
                       <br/>
              20203030
        </td>
    </tr>
    <tr align="center">
        <td>
            Front-end(web), TL
        </td>
        <td>
            Front-end(android)
        </td>
        <td>
            Back-end
        </td>
        <td>
            AI
        </td>
    </tr>
</table>

