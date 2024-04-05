
## 🤖 프로젝트 소개 

- github pages : https://kookmin-sw.github.io/capstone-2024-24/
- 국민대 2024년 캡스톤 24조 https://github.com/kookmin-sw/capstone-2024-24

## 🤖 AI 기반 대화형 키오스크, Jumi(주미)

당신의 주문 도우미 'Jumi(주미)'

키오스크 사용이 복잡하고 어렵지 않으신가요?
AI와의 대화를 통해 더 간편하고, 쉽고, 자신있게 키오스크를 사용하실 수 있습니다. (Jumi)를 통해 매장에서의 불편함을 줄여보세요! 😆

![Jumi_Logo](https://github.com/kookmin-sw/capstone-2024-24/assets/93641814/19762b3a-6bf8-4d6f-bcbd-824c30cd62c6)

서울디지털재단이 발표한 ‘서울시민 디지털 역량 실태조사’에 따르면 55세 이상 고령층의 45.8%만 키오스크 이용 경험이 있다고 응답했습니다. 55세 미만에서 같은 답변이 94.1%였던 것에 비하면 절반에도 못 미치는 수준입니다. 실제로 고령 소비자층은 키오스크를 이용하며 불편한 점으로 ‘복잡한 단계 및 화면 조작’, ‘주문 상품에 대한 문의 불가’ 등을 꼽았습니다.(한국소비자원 설문조사)

주미(Jumi)는 기존의 중노년층이나 가게에 처음오는 사람 등 해당 매장의 키오스크 사용에 미숙한 점이 많아 설명과 도움이 필요한 사람들을 대상으로 개발 중에 있습니다.

대화를 통해 기존 점원들이 진행하던 주문뿐아니라 메뉴 설명, 매장설명 및 손님응대를 ai인 주미가 진행하므로써 손님은 자신만을 위한 작은 테이블위 담당 직원이 생기는 것이고 매장은 더 적은 비용으로 서비스 품질을 늘릴 수 있는 기회가 될 것입니다.

---

Introducing 'Jumi', Your Order Assistant!

Are you finding kiosk usage complex and challenging? With Jumi, you can interact more conveniently, easily, and confidently through AI conversation for smoother kiosk navigation. Let's reduce the inconvenience at your store! 😆

According to the 'Seoul Citizen Digital Competency Survey' released by the Seoul Digital Foundation, only 45.8% of the elderly aged 55 and above responded that they have experience using kiosks. This figure is significantly lower than the 94.1% response from those under 55 years old. In fact, elderly consumers cited 'complex steps and screen manipulation' and 'inability to inquire about ordered items' as inconvenient aspects of using kiosks (Korea Consumer Agency survey).

Jumi is being developed to assist those who are unfamiliar with using kiosks, such as the middle-aged and elderly, or those visiting a store for the first time, by providing explanations and assistance.

Through conversation, Jumi not only handles orders like traditional staff but also provides menu explanations, store guidance, and customer service. This creates a personalized experience for the customer, akin to having a dedicated staff member at their service, while offering the store an opportunity to enhance service quality at lower costs.

## 🤖 소개 영상

https://github.com/kookmin-sw/capstone-2024-24/assets/93641814/36993f9d-da9d-41c4-b8c0-489f13e212bc


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

## 🛠 기술 스택

### 🖥 Frontend
|역할|종류|
|-|-|
|Library|<img alt="RED" src ="https://img.shields.io/badge/REACT-61DAFB.svg?&style=for-the-badge&logo=React&logoColor=white"/>|
|UI Framework|![mui](https://img.shields.io/badge/mui-007FFF?style=for-the-badge&logo=mui&logoColor=white)|
|Programming Language|![JavaScript](https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=white)|
|Package Manager|![Npm](https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white)|                                         
|CI/CD|![Vercel](https://img.shields.io/badge/vercel-%23F05033.svg?style=for-the-badge&logo=git&logoColor=white)|
<br />

### 🖥 Android
|역할|종류|
|-|-|
|Development Environment and Tools|![Androidstudio](https://img.shields.io/badge/androidstudio-3DDC84?style=for-the-badge&logo=androidstudio&logoColor=white)|
|Platform|![Android](https://img.shields.io/badge/android-34A853?style=for-the-badge&logo=android&logoColor=white)|    
|Programming Language|![Kotlin](https://img.shields.io/badge/kotlin-7F52FF?style=for-the-badge&logo=kotlin&logoColor=white)|     
<br />

### 🖥 Backend
|역할|종류|
|-|-|
|Framework|![Fastapi](https://img.shields.io/badge/fastapi-009688?style=for-the-badge&logo=fastapi&logoColor=white) ![serverless](https://img.shields.io/badge/serverless-FD5750?style=for-the-badge&logo=serverless&logoColor=white)|
|Database|![MySQL](https://img.shields.io/badge/mysql-4479A1?style=for-the-badge&logo=mysql&logoColor=white)|    
|Database Service|![amazonrds](https://img.shields.io/badge/amazonrds-527FFF?style=for-the-badge&logo=amazonrds&logoColor=white) ![amazons3](https://img.shields.io/badge/amazons3-569A31?style=for-the-badge&logo=amazons3&logoColor=white)|
|Programming Language|![Python](https://img.shields.io/badge/python-3776AB?style=for-the-badge&logo=python&logoColor=white)|
|CI/CD|![githubactions](https://img.shields.io/badge/githubactions-2088FF?style=for-the-badge&logo=githubactions&logoColor=white)|
<br />

### 🖥 AI
|역할|종류|
|-|-|
|Framework|![pytorch](https://img.shields.io/badge/pytorch-EE4C2C?style=for-the-badge&logo=pytorch&logoColor=white)| 
|Programming Language|![Python](https://img.shields.io/badge/python-3776AB?style=for-the-badge&logo=python&logoColor=white)|
<br />


### 🖥 Common
|역할|종류|
|-|-|
|협업 관리|![notion](https://img.shields.io/badge/notion-000000?style=for-the-badge&logo=notion&logoColor=white) ![discord](https://img.shields.io/badge/discord-5865F2?style=for-the-badge&logo=discord&logoColor=white)| 
|디자인|![figma](https://img.shields.io/badge/figma-F24E1E?style=for-the-badge&logo=figma&logoColor=white)|
|Version Control|![Git](https://img.shields.io/badge/git-%23F05033.svg?style=for-the-badge&logo=git&logoColor=white) ![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)|

<br />

