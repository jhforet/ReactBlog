# 리엑트로 블로그 만들기 연습

## 목적
리엑트로 블로그를 만들면서 리엑트 공부

## 변경사항 기록
1. **리엑트 설치 및 Blog에 글을 작성하고 저장하는 기능 생성**  
axios, json-server, react-router-dom 추가로 공부하기

2. **Component, Page 파일을 생성해서 분리, routes로 정리**  
    * 중복해서 사용하는 BlogForm, NavBar Component로 정리  
    * Page 컴포넌트는 page폴더를 만들어서 정리  
    * routes.js를 만들어서 메뉴 부분만 따로 정리  
    * react router bom에 Nav Link 기능을 활용해서 버튼을 선택했을 때 active 효과 추가

3. **블로그 만들기 3**  
    * ListPage.js에서 useEffect으로 블로그 리스트 데이터 받아오기  
    * 받아온 데이터 map 메서드로 화면에 출력하기  
    * 부트스트랩 카드를 이용해서 Card 컴포넌트 만들기  
        + ListPage.js에서 props로 넘겨서 {title}로 받음  
    * props children으로 Card 사이에 자식만들기  
    * prop-types으로 타입지정  
        + prop-types가 정확하게 어떤 기능을 하는지 모르겠어서 추가로 공부하기  
    * ListPage.js에 Link를 이용해서 생성 버튼 추가  


4. **블로그 만들기 4**
    * 전에는 React Router v5를 사용하다가 v6로 업데이트 하면서 변경된 컴포넌트나 속성등을 수정  
    * 게시글을 클릭하면 수정 페이지로 이동  
        + ListPage에서 useNavigate 컴포넌트로 onClick 이벤트가 발생하면 EditPage로 이동  
        + 마우스를 올려도 포인터 모양이 안나와서 index.css에 .cursor-pointer class 효과 추가  
        + Card 컴포넌트 className에 위에 추가한 css효과 추가  
    * 삭제 버튼 이벤트 버블링 수정 stopPropagation()  
    * 삭제 기능 추가 라우터 공식홈페이지 참조  
    * 포스트가 없을 경우 안내 텍스트 추가  
    * 부트스트랩으로 로딩 스피너 컴포넌트 추가  
        + useState()와 if문을 사용해서 true이면 스피너가 보이고 false면 안보이게 설정  
        + 데이터 가져오는 부분에 setLoding을 넣어서 데이터가 불러오면 useState(false)로 변경되도록 설정  
    * Create New 버튼 기능 추가
        + 생성버튼을 누르면 연결되는 CreatePage에 BlogForm 컴포넌트를 임포트해서 글을 입력하는 페이지가 연결되도록 수정  
        + BlogForm에 useNavigate()를 추가해서 글을 등록하면 /blogs 로 이동하게 수정  